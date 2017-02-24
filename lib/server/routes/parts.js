var express = require("express");
var router = express.Router();
var spaceshipParts = require('../modules/spaceship-parts'); // NOTE: Module spaceship-parts Sent

router.get('/parts', function(req, res){ // parts/parts baby
router.get('/', function(req, res){
  // NOTE: In client.js this line of code(url: '/parts',) is looking for /parts/NOTHING.  The way this was originally written, client.js was looking for /parts/parts.
  res.send(spaceshipParts);
  // QUESTION: What does this send do?  Sends VAR/spaceshipParts back to client.js OR continues on down the path to Modules/spaceship-parts sending the VAR/spaceshipParts (an object-filled array) via module.exports back to client.js?
});
  // NOTE: GET & POSTs must match both files
// router.get('/new', function(req, res){ // keep me posted if you solve this one
router.post('/new', function(req, res){
  spaceshipParts.push(req.body);
  res.sendStatus(200);
});

// router.get('/countRocket', function(req, res){ // count your rockets or rocket your count?
router.get('/rocketCount', function(req, res){ // count your rockets or rocket your count?
  var numberOfSpaceships = Math.floor(spaceshipParts[0].inStock/spaceshipParts[0].needed);
  for(var i = 1; i < spaceshipParts.length; i++){
    numberOfSpaceships = Math.min(numberOfSpaceships, Math.floor(spaceshipParts[i].inStock/spaceshipParts[i].needed));
  }

  var howMany = { count: numberOfSpaceships }
  // res.send(numberOfSpaceships);  // numberOfSpaceships is a number, how does express like that? howMany ways to say this...
  res.send(howMany);
});

module.exports = router;
