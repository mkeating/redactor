const express = require('express');

const app = express();

app.get('/hi', (req, res) => {
  res.send('test');
});

app.listen(8080);
console.log('listening on 8080');
