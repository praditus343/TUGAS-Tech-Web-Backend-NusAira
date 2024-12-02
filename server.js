const express = require('express');
const path = require('path');
const pool = require('./config/db');
const notesRoutes = require('./routes/NotesRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/notes', notesRoutes);


const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/notes`);
});