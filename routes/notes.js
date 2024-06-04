const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
  });

  // DELETE Route for a specific note
  notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
  
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
  
        return writeToFile('./db/notes.json', result)
          .then(() => {
            res.json({ message: `Item ${noteId} has been deleted` });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete note' });
      });
  });
  
  //POST route for a new note
  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title, 
        text,
        id: uuidv4(),
      };
  
      //Adds new note object to notes.json file
      readAndAppend(newNote, './db/notes.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });
  
module.exports = notes;