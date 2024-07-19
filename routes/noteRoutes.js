
const express = require('express');
const { createNote, getNotes } = require('../controllers/notesController');
const router = express.Router();

router.post('/', createNote);
router.get('/', getNotes);

// More routes...

module.exports = router;
