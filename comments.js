// Create a web server 
// 1. Create a web server
// 2. Create a comments array
// 3. Create a form to submit comments
// 4. Create a route to handle POST requests to add comments
// 5. Create a route to handle GET requests to return all comments

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

// Run the file with node and test the server with curl or Postman

// curl -d "comment=Hello from curl" -X POST http://localhost:3000/add_comment
// curl http://localhost:3000/comments

// Postman
// POST http://localhost:3000/add_comment
// Body: form-data
// key: comment
// value: Hello from Postman
// Send
// GET http://localhost:3000/comments
// Send