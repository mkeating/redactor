const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/process-text', (req, res) => {
  console.log(req.body);
  res.send('test');
});

app.listen(8080);
console.log('listening on 8080');
