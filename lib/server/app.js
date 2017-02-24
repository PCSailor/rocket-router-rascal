console.log('app.js is sourced');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var index = require('./routes/index'); // TODO: folders correct??
var hello = require('./routes/welcome'); // TODO: folders correct??
var parts = require('./routes/parts'); // TODO: folders correct??
var port = 8000;

app.use(express.static('lib/public')); // NOTE: looks okay
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', index);

// app.get('/hello', parts); // Oh, hi there! Wait, who's parts are these?
app.get('/hello', hello);


app.use('/parts', parts);



app.listen(port);
console.log("Listening on port: ", port);
