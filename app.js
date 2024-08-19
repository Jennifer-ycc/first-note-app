const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
require('dotenv').config();

const dotenv = require('dotenv');

app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/welcome',
(req, res) =>{
    res.send("Welcome to my First-note app project.");
}
)
//app.post("Welcome")

/*app.listen(3000, ()=> {
    console.log("Running on port 3000");
}) */

// Routes
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/notes', noteRoutes);
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const noteForm = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');

// Fetch Notes
async function fetchNotes() {
    const res = await fetch('/api/notes', {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    });
    const notes = await res.json();
    notesList.innerHTML = notes.map(note => `
        <li>
            <span>${note.title}</span>
            <button onclick="deleteNote('${note._id}')">Delete</button>
        </li>
    `).join('');
}

// Add Note
noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;

    const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, content })
    });

    if (res.ok) {
        fetchNotes();
        noteForm.reset();
    }
});

// Delete Note
async function deleteNote(id) {
    await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    });
    fetchNotes();
}

// Initial Fetch
fetchNotes();
