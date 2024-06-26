const express = require('express');
const path = require('path');
const api = require('./routes/index');
const notesRouter = require('./routes/notes')

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware for parsing JSON and urlencoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', notesRouter);

app.use(express.static('public'));

//GET route for landing page.
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Get route for notes page.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);    
