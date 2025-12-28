-- ============================================
-- Discussions System Migration
-- ============================================
-- This migration creates tables for a threaded discussion/Q&A system
-- similar to Hacker News with nested comments, votes, and reactions

-- Create threads table (main discussion posts/questions)
CREATE TABLE IF NOT EXISTS threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT 0,
    is_locked BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    edited_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create comments table (nested comments with unlimited depth)
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thread_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    parent_id INTEGER, -- NULL for top-level comments, references another comment for replies
    content TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    depth INTEGER DEFAULT 0, -- Calculated depth for display optimization
    is_deleted BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    edited_at DATETIME,
    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Create votes table (upvotes/downvotes for threads and comments)
CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    thread_id INTEGER, -- NULL if voting on a comment
    comment_id INTEGER, -- NULL if voting on a thread
    vote_type INTEGER NOT NULL, -- 1 for upvote, -1 for downvote
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, thread_id, comment_id), -- One vote per user per item
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    CHECK((thread_id IS NOT NULL AND comment_id IS NULL) OR (thread_id IS NULL AND comment_id IS NOT NULL))
);

-- Create reactions table (emoji reactions: ❤️, 👏, 👍, 👎)
CREATE TABLE IF NOT EXISTS reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    thread_id INTEGER, -- NULL if reacting to a comment
    comment_id INTEGER, -- NULL if reacting to a thread
    reaction_type TEXT NOT NULL, -- 'heart', 'clap', 'thumbs_up', 'thumbs_down'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, thread_id, comment_id, reaction_type), -- One reaction per type per user per item
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    CHECK((thread_id IS NOT NULL AND comment_id IS NULL) OR (thread_id IS NULL AND comment_id IS NOT NULL)),
    CHECK(reaction_type IN ('heart', 'clap', 'thumbs_up', 'thumbs_down'))
);

-- Create thread_drafts table (for saving draft posts)
CREATE TABLE IF NOT EXISTS thread_drafts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT,
    content TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_threads_user_id ON threads(user_id);
CREATE INDEX IF NOT EXISTS idx_threads_created_at ON threads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_threads_score ON threads(score DESC);
CREATE INDEX IF NOT EXISTS idx_threads_is_pinned ON threads(is_pinned DESC);

CREATE INDEX IF NOT EXISTS idx_comments_thread_id ON comments(thread_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);
CREATE INDEX IF NOT EXISTS idx_comments_depth ON comments(depth);

CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);
CREATE INDEX IF NOT EXISTS idx_votes_thread_id ON votes(thread_id);
CREATE INDEX IF NOT EXISTS idx_votes_comment_id ON votes(comment_id);

CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_reactions_thread_id ON reactions(thread_id);
CREATE INDEX IF NOT EXISTS idx_reactions_comment_id ON reactions(comment_id);

CREATE INDEX IF NOT EXISTS idx_thread_drafts_user_id ON thread_drafts(user_id);

-- Create trigger to update thread.updated_at on update
-- Drop first if exists to avoid conflicts
DROP TRIGGER IF EXISTS update_threads_updated_at;
CREATE TRIGGER update_threads_updated_at 
AFTER UPDATE ON threads
BEGIN
    UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Create trigger to update comment.updated_at on update
DROP TRIGGER IF EXISTS update_comments_updated_at;
CREATE TRIGGER update_comments_updated_at 
AFTER UPDATE ON comments
BEGIN
    UPDATE comments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Create trigger to update thread.comment_count when comments are added/deleted
DROP TRIGGER IF EXISTS update_thread_comment_count_insert;
CREATE TRIGGER update_thread_comment_count_insert
AFTER INSERT ON comments
BEGIN
    UPDATE threads SET comment_count = (
        SELECT COUNT(*) FROM comments 
        WHERE thread_id = NEW.thread_id AND is_deleted = 0
    ) WHERE id = NEW.thread_id;
END;

DROP TRIGGER IF EXISTS update_thread_comment_count_delete;
CREATE TRIGGER update_thread_comment_count_delete
AFTER UPDATE ON comments
WHEN NEW.is_deleted = 1 AND OLD.is_deleted = 0
BEGIN
    UPDATE threads SET comment_count = (
        SELECT COUNT(*) FROM comments 
        WHERE thread_id = NEW.thread_id AND is_deleted = 0
    ) WHERE id = NEW.thread_id;
END;

-- Create trigger to update thread.score when votes are added/updated
DROP TRIGGER IF EXISTS update_thread_score_on_vote;
CREATE TRIGGER update_thread_score_on_vote
AFTER INSERT OR UPDATE OR DELETE ON votes
WHEN NEW.thread_id IS NOT NULL OR OLD.thread_id IS NOT NULL
BEGIN
    UPDATE threads SET score = (
        SELECT COALESCE(SUM(vote_type), 0) FROM votes 
        WHERE thread_id = COALESCE(NEW.thread_id, OLD.thread_id)
    ) WHERE id = COALESCE(NEW.thread_id, OLD.thread_id);
END;

-- Create trigger to update comment.score when votes are added/updated
DROP TRIGGER IF EXISTS update_comment_score_on_vote;
CREATE TRIGGER update_comment_score_on_vote
AFTER INSERT OR UPDATE OR DELETE ON votes
WHEN NEW.comment_id IS NOT NULL OR OLD.comment_id IS NOT NULL
BEGIN
    UPDATE comments SET score = (
        SELECT COALESCE(SUM(vote_type), 0) FROM votes 
        WHERE comment_id = COALESCE(NEW.comment_id, OLD.comment_id)
    ) WHERE id = COALESCE(NEW.comment_id, OLD.comment_id);
END;

