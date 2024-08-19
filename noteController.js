const Note = require('../models/noteModel');

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({
      title,
      content,
      userId: req.user.id,
    });
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndRemove(req.params.id);
    res.json({ message: 'Note removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
