-- Polymorphic comments for content (erfan_slide, shahnameh_story, chapter, etc.)
-- Keeps discussions.comments unchanged.

CREATE TABLE IF NOT EXISTS content_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commentable_type TEXT NOT NULL,
    commentable_id TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    parent_id INTEGER,
    content TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    depth INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    edited_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES content_comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_content_comments_lookup ON content_comments(commentable_type, commentable_id);
CREATE INDEX IF NOT EXISTS idx_content_comments_user_id ON content_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_content_comments_parent_id ON content_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_content_comments_created_at ON content_comments(created_at);

CREATE TABLE IF NOT EXISTS content_comment_votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content_comment_id INTEGER NOT NULL,
    vote_type INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, content_comment_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (content_comment_id) REFERENCES content_comments(id) ON DELETE CASCADE,
    CHECK(vote_type IN (1, -1))
);

CREATE TABLE IF NOT EXISTS content_comment_reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content_comment_id INTEGER NOT NULL,
    reaction_type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, content_comment_id, reaction_type),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (content_comment_id) REFERENCES content_comments(id) ON DELETE CASCADE,
    CHECK(reaction_type IN ('heart', 'clap', 'thumbs_up', 'thumbs_down'))
);

CREATE INDEX IF NOT EXISTS idx_content_comment_votes_comment_id ON content_comment_votes(content_comment_id);
CREATE INDEX IF NOT EXISTS idx_content_comment_reactions_comment_id ON content_comment_reactions(content_comment_id);

DROP TRIGGER IF EXISTS update_content_comments_updated_at;
CREATE TRIGGER update_content_comments_updated_at
AFTER UPDATE ON content_comments
BEGIN
    UPDATE content_comments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

DROP TRIGGER IF EXISTS update_content_comment_score_on_vote_insert;
CREATE TRIGGER update_content_comment_score_on_vote_insert
AFTER INSERT ON content_comment_votes
BEGIN
    UPDATE content_comments SET score = (
        SELECT COALESCE(SUM(vote_type), 0) FROM content_comment_votes
        WHERE content_comment_id = NEW.content_comment_id
    ) WHERE id = NEW.content_comment_id;
END;

DROP TRIGGER IF EXISTS update_content_comment_score_on_vote_update;
CREATE TRIGGER update_content_comment_score_on_vote_update
AFTER UPDATE ON content_comment_votes
BEGIN
    UPDATE content_comments SET score = (
        SELECT COALESCE(SUM(vote_type), 0) FROM content_comment_votes
        WHERE content_comment_id = NEW.content_comment_id
    ) WHERE id = NEW.content_comment_id;
END;

DROP TRIGGER IF EXISTS update_content_comment_score_on_vote_delete;
CREATE TRIGGER update_content_comment_score_on_vote_delete
AFTER DELETE ON content_comment_votes
BEGIN
    UPDATE content_comments SET score = (
        SELECT COALESCE(SUM(vote_type), 0) FROM content_comment_votes
        WHERE content_comment_id = OLD.content_comment_id
    ) WHERE id = OLD.content_comment_id;
END;
