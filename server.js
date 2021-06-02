const fs = require('fs');
const express = require('express');
const path = require('path');
const { notes } = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
// const {
    // show,
    // hide,
    // getNotes,
    // saveNote,
    // deleteNote,
    // renderActiveNote,
    // handleNoteSave,
    // handleNoteDelete,
    // handleNoteView,
    // handleNewNoteView,
    // handleRenderSaveBtn,
    // renderNoteList,
    // getAndRenderNotes } = require('./public/assets/js/index.js')

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    const newNote = req.body;
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes }, null, 2)
    )
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});