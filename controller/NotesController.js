const pool = require('../config/db');


exports.getAllNotes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM notes');
        res.render('index', { notes: rows });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};


exports.getNoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.render('edit-note', { note: rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch note' });
    }
};


exports.createNote = async (req, res) => {
    const { title, datetime, note } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note]);
        res.redirect('/notes');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
};


exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    try {
        await pool.query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, id]);
        res.redirect('/notes');
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
};


exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM notes WHERE id = ?', [id]);
        res.redirect('/notes');
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
};
