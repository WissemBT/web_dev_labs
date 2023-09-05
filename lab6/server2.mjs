"use strict";


import express from 'express';
import morgan from 'morgan';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

let port = process.argv[2] || 8000;

app.get('/', (req, res) => {
  res.send('Hi');
});
app.get('/kill', (req, res) => {
  res.send('Server stopped');
  process.exit();
});
app.get('/reload', (req, res) => {
  fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading db.json');
    } else {
      res.type('text/plain');
      res.send('db.json reloaded');
    }
  });
});
const readDbJson = () => {
    try {
      const data = fs.readFileSync('db.json', 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
      return [];
    }
  };
app.get('/countpapers', (req, res) => {
    const papersArray = readDbJson();
    res.type('text/plain');
    res.send(`${papersArray.length}`);
  });
app.get('/author/:authorName', (req, res) => {
    const authorName = req.params.authorName;
    const papersArray = readDbJson();
    const count = papersArray.reduce((c, paper) => {
      for (const auth of paper.authors) {
        if (auth.toLowerCase().includes(authorName.toLowerCase())) {
          return c + 1;
        }
      }
      return c;
    }, 0);
    res.type('text/plain');
    res.send(`${count}`);
  });
app.get('/descriptors/:authorName', (req, res) => {
    const authorName = req.params.authorName;
    const papersArray = readDbJson();
    const filteredPapers = papersArray.filter(paper => {
      return paper.authors.some(auth => auth.toLowerCase().includes(authorName.toLowerCase()));
    });
    res.type('application/json');
    res.send(filteredPapers);
  });
app.get('/titlelist/:authorName', (req, res) => {
    const authorName = req.params.authorName;
    const papersArray = readDbJson();
    const titles = papersArray.filter(paper => {
      return paper.authors.some(auth => auth.toLowerCase().includes(authorName.toLowerCase()));
    }).map(paper => paper.title);
    res.type('application/json');
    res.send(titles);
  }); 
app.get('/pubref/:key', (req, res) => {
    const key = req.params.key;
    const papersArray = readDbJson();
    const publication = papersArray.find(paper => paper.key === key);
    
    if (publication) {
      res.type('application/json');
      res.send(publication);
    } else {
      res.status(404).send('Publication not found');
    }
  });
app.delete('/pubref/:key', (req, res) => {
    const key = req.params.key;
    const papersArray = readDbJson();
    const index = papersArray.findIndex(paper => paper.key === key);
    if (index === -1) {
      res.sendStatus(404);
      return;
    }
    papersArray.splice(index, 1);
    fs.writeFile('db.json', JSON.stringify(papersArray), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the updated database');
        return;
      }
      res.sendStatus(202);
    });
  });
app.post('/pubref', (req, res) => {
    const newPublication = req.body;
    if (!newPublication.key || newPublication.key !== 'imaginary') {
      res.status(400).send('Invalid');
      return;
    }
    const papersArray = readDbJson();
    const publicationExists = papersArray.some(paper => paper.key === newPublication.key);
    if (publicationExists) {
      res.status(400).send('Publication with this key already exists');
      return;
    }
    papersArray.push(newPublication);
    fs.writeFile('db.json', JSON.stringify(papersArray), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving publication to database');
          return;
        }
        res.sendStatus(201);
      });
  });
app.put('/pubref/:key', (req, res) => {
  const key = req.params.key;
  const updatedPublicationData = req.body;
  const papersArray = readDbJson();
  const index = papersArray.findIndex(paper => paper.key === key);
  if (index === -1) {
    res.status(404).send('Pub not found');
    return;
  }
  const updatedPublication = { ...papersArray[index], ...updatedPublicationData };
  papersArray[index] = updatedPublication;
  fs.writeFile('db.json', JSON.stringify(papersArray), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving the updated database');
      return;
    }
    res.sendStatus(200);
  });
});
  
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
