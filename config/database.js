const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('notes.db');

const initializeDatabase = () => {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, user_id INTEGER, content TEXT, tags TEXT, color TEXT, is_archived INTEGER, is_trashed INTEGER, created_at TEXT, updated_at TEXT)");

        // Insert some example notes
        db.run("INSERT INTO notes (user_id, content, tags, color, is_archived, is_trashed, created_at, updated_at) VALUES (1, 'First note', 'work,personal', '#ffffff', 0, 0, datetime('now'), datetime('now'))");
        db.run("INSERT INTO notes (user_id, content, tags, color, is_archived, is_trashed, created_at, updated_at) VALUES (1, 'Second note', 'work', '#ffeb3b', 0, 0, datetime('now'), datetime('now'))");
    });
};

module.exports = { db, initializeDatabase };

