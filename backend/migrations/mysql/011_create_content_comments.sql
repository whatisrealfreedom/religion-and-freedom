-- MySQL version of migration 011: Create polymorphic comments tables
-- Differences from SQLite version:
--   - INT AUTO_INCREMENT instead of INTEGER PRIMARY KEY AUTOINCREMENT
--   - VARCHAR(255) instead of TEXT for shorter fields
--   - TEXT for longer content fields
--   - TINYINT(1) instead of BOOLEAN
--   - Backticks for reserved words
--   - FOR EACH ROW in triggers

CREATE TABLE IF NOT EXISTS content_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commentable_type VARCHAR(255) NOT NULL,
    commentable_id VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    parent_id INT,
    content TEXT NOT NULL,
    score INT DEFAULT 0,
    depth INT DEFAULT 0,
    is_deleted TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    edited_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES content_comments(id) ON DELETE CASCADE,
    INDEX idx_content_comments_lookup (commentable_type, commentable_id),
    INDEX idx_content_comments_user_id (user_id),
    INDEX idx_content_comments_parent_id (parent_id),
    INDEX idx_content_comments_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS content_comment_votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content_comment_id INT NOT NULL,
    vote_type INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_comment_vote (user_id, content_comment_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (content_comment_id) REFERENCES content_comments(id) ON DELETE CASCADE,
    CHECK (vote_type IN (1, -1)),
    INDEX idx_content_comment_votes_comment_id (content_comment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS content_comment_reactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content_comment_id INT NOT NULL,
    reaction_type VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_comment_reaction (user_id, content_comment_id, reaction_type),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (content_comment_id) REFERENCES content_comments(id) ON DELETE CASCADE,
    CHECK (reaction_type IN ('heart', 'clap', 'thumbs_up', 'thumbs_down')),
    INDEX idx_content_comment_reactions_comment_id (content_comment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- MySQL triggers require DELIMITER for multi-statement triggers
-- But for single-statement triggers, we can use standard syntax

DROP TRIGGER IF EXISTS update_content_comments_updated_at;
CREATE TRIGGER update_content_comments_updated_at
AFTER UPDATE ON content_comments
FOR EACH ROW
BEGIN
    UPDATE content_comments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

DROP TRIGGER IF EXISTS update_content_comment_score_on_vote_insert;
CREATE TRIGGER update_content_comment_score_on_vote_insert
AFTER INSERT ON content_comment_votes
FOR EACH ROW
BEGIN
    UPDATE content_comments SET score = (
        SELECT COALESCE(SUM(vote_type), 0) FROM content_comment_votes
        WHERE content_comment_id = NEW.content_comment_id
    ) WHERE id = NEW.content_comment_id;
END;

DROP TRIGGER IF EXISTS update_content_comment_score_on_vote_update;
CREATE TRIGGER update_content_comment_score_on_vote_update
AFTER UPDATE ON content_comment_votes
FOR EACH ROW
BEGIN
    UPDATE content_comments SET score = (
        SELECT COALESCE(SUM(vote_type), 0) FROM content_comment_votes
        WHERE content_comment_id = NEW.content_comment_id
    ) WHERE id = NEW.content_comment_id;
END;

DROP TRIGGER IF EXISTS update_content_comment_score_on_vote_delete;
CREATE TRIGGER update_content_comment_score_on_vote_delete
AFTER DELETE ON content_comment_votes
FOR EACH ROW
BEGIN
    UPDATE content_comments SET score = (
        SELECT COALESCE(SUM(vote_type), 0) FROM content_comment_votes
        WHERE content_comment_id = OLD.content_comment_id
    ) WHERE id = OLD.content_comment_id;
END;
