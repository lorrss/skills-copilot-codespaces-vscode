const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const comments = [];
const commentsFile = 'comments.json';

fs.readFile(commentsFile, 'utf8', (err, data) => {
  if (err) {
    console.log(`Error reading file from disk: ${err}`);
  } else {
    comments = JSON.parse(data);
  }
});

app.post('/add_comment', (req, res) => {
  const comment = req.body.comment;
  comments.push(comment);
  fs.writeFile(commentsFile, JSON.stringify(comments), (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      res.send('Comment added!');
    }
  });
});

app.get('/comments', (req, res) => {
  res.send(comments);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
