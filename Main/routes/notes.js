const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
  });

notes.get('/:note_id', (req, res) => {
    console.log("inside get of note id")//not getting into the get function because this isn't printing
    const noteId = req.params.note_id;
    console.log(noteId); //why isn't this getting printed
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID');
        });
    });

  // DELETE Route for a specific tip
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.note_id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/notes.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
  
  
  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title, 
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });
  
module.exports = notes;