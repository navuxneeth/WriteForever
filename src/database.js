const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '../chat.db'), (err) => {
      if (err) {
        console.error('Error opening database', err);
      } else {
        console.log('Database connected');
        this.initDatabase();
      }
    });
  }

  initDatabase() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER,
        role TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id)
      )
    `);
  }

  createConversation(title) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO conversations (title) VALUES (?)',
        [title],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  getConversations() {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM conversations ORDER BY created_at DESC',
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  getMessages(conversationId) {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC',
        [conversationId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  saveMessage(conversationId, role, content) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)',
        [conversationId, role, content],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  deleteConversation(conversationId) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'DELETE FROM conversations WHERE id = ?',
        [conversationId],
        (err) => {
          if (err) reject(err);
          else {
            this.db.run(
              'DELETE FROM messages WHERE conversation_id = ?',
              [conversationId],
              (err) => {
                if (err) reject(err);
                else resolve();
              }
            );
          }
        }
      );
    });
  }
}

module.exports = new Database();
