var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.get('/', function(req, res){
  // res.send('hello world');
  res.sendFile('public/index.html');
});

app.listen(3000);

console.log('listeng on port 3000');