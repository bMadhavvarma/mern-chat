const express = require('express');
const app = express();
const chats = require('./data/data.js');
const cors = require('cors');
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.send(chats);
});

// Get single chat by ID
app.get('/api/:id', (req, res) => {
  const singleChat = chats.find((chat) => chat._id === req.params.id);

  if (!singleChat) {
    return res.status(404).send({ message: 'Chat not found' });
  }

  res.send(singleChat);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
