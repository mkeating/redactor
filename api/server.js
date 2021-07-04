const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generateRedactedWordList, redactText } = require('./services');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/process-text', (req, res) => {
  console.log(generateRedactedWordList(req.body.words));
  const words = ['lorem', 'foo', 'ipsum'];
  const text = 'lorem ipsum lorem';
  redactText(words, text);
  res.send('test');
});

app.listen(8080);
console.log('listening on 8080');
