const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generateRedactedWordList, redactText } = require('./services');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// middleware to simulate latency
app.use((req, res, next) => setTimeout(next, 1500));

app.post('/api/process-text', (req, res) => {
  if (req.body.words && req.body.text) {
    const words = generateRedactedWordList(req.body.words);
    const { text } = req.body;
    const redacted = redactText(words, text);

    res.send({
      status: 200,
      body: {
        redacted,
      },
    });
  } else {
    res.send({
      status: 500,
      body: {
        message: 'Invalid inputs provided',
      },
    });
  }
});

app.listen(8080);
console.log('listening on 8080');
