const express = require('express');
const router = express.Router();
const notesController = require('../controller/NotesController');


router.get('/', notesController.getAllNotes);
router.get('/create', (req, res) => res.render('create-note'));
router.get('/:id/edit', notesController.getNoteById);
router.post('/create', notesController.createNote);
router.post('/:id/edit', notesController.updateNote);
router.post('/:id/delete', notesController.deleteNote);

module.exports = router;
