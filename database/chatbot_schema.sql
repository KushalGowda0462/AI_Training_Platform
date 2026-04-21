CREATE DATABASE IF NOT EXISTS aurilearn_chatbot
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE aurilearn_chatbot;

CREATE TABLE IF NOT EXISTS chat_sessions (
  id CHAR(36) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  work_email VARCHAR(190) NOT NULL,
  company_name VARCHAR(190) DEFAULT NULL,
  role_label VARCHAR(120) DEFAULT NULL,
  job_title VARCHAR(150) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_message_at DATETIME DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_chat_sessions_created_at (created_at),
  KEY idx_chat_sessions_work_email (work_email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  session_id CHAR(36) NOT NULL,
  sender ENUM('user', 'assistant') NOT NULL DEFAULT 'user',
  message_text TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_chat_messages_session_created_at (session_id, created_at),
  CONSTRAINT fk_chat_messages_session
    FOREIGN KEY (session_id) REFERENCES chat_sessions (id)
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Useful query in phpMyAdmin to inspect the latest captured chats:
--
-- SELECT
--   s.id,
--   s.full_name,
--   s.work_email,
--   s.company_name,
--   s.role_label,
--   s.job_title,
--   s.created_at,
--   s.last_message_at,
--   m.message_text,
--   m.created_at AS message_created_at
-- FROM chat_sessions s
-- LEFT JOIN chat_messages m
--   ON m.session_id = s.id
-- ORDER BY s.created_at DESC, m.created_at ASC;
