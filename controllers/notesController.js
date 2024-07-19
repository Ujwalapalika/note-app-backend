const { db } = require('../config/database');

const createNote = (req, res) => {
    const { content, tags, color } = req.body;
    const { id: user_id } = req.user;

    db.run("INSERT INTO notes (user_id, content, tags, color, is_archived, is_trashed, created_at, updated_at) VALUES (?, ?, ?, ?, 0, 0, datetime('now'), datetime('now'))", [user_id, content, tags.join(','), color], function(err) {
        if (err) {
            return res.status(500).send('Failed to create note');
        }
        res.json({ id: this.lastID });
    });
};

const getNotes = (req, res) => {
    const { id: user_id } = req.user;

    db.all("SELECT * FROM notes WHERE user_id = ? AND is_trashed = 0", [user_id], (err, notes) => {
        if (err) {
            return res.status(500).send('Failed to retrieve notes');
        }
        res.json({ notes });
    });
};

// More CRUD operations...

module.exports = { createNote, getNotes };
