"use strict";

var express = require("express");
var app = express();
var mongoUtil = require("./mongoUtil");
mongoUtil.connect();

// Require the bodyParser Middleware

app.use(express.static(__dirname + '/../client'));

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.get("/sports", (request,response) => {

	// Access mongoUtility and access the collection 'db.sports'
	var sports = mongoUtil.sports();

	sports.find().toArray((err,docs) => {
		if (err) {
			console.log(" Mongo failed on Server");
		} else {
			// convert 'docs' object into array named var sportsNames
			var sportNames = docs.map( (sport) => sport.name);
			response.json(sportNames);
			console.log(" \n MongoDB returned: \n " + JSON.stringify(sportNames));
			// response.json(["Cycling", "Weightlifting", "Beer Drinking"]);
			}
	});

});

// Add API endpoint for sports data, from Mongo data
app.get("/sports/:name", (request, response) => {
	// Return sportName from url as entered by user, and...
	var sportName = request.params.name;

	// Access mongoUtility and access the collection 'db.sports'
	var sports = mongoUtil.sports();
	sports.find({name: sportName}).limit(1).next( (err,doc) => {
		if (err) {
			response.sendStatus(400);
		} 
			console.log("Sport Doc: ", doc);
			// Returning 'sport' object data:
			response.json(doc);
	});
});

app.post('/sports/:name/medals', jsonParser, (request, response) => {
// Unlike .get, .post needs an additional middleware in order to be parsed
// Body-parser parses the body of the payload that's sent by the client
	var sportName = request.params.name;
	var newMedal = request.body.medal || {};
	// Validation for new medal in db.findOneAndUpdate:
	if(!newMedal.division || !newMedal.year || !newMedal.country) {
		response.sendStatus(400);
	}
	// Access mongoUtility and access the collection 'db.sports'
	var sports = mongoUtil.sports();
	var query = {name: sportName};
	var update = {$push: {goldMedals: newMedal}};

	sports.findOneAndUpdate(query, update, (err,res) => {
		if (err) {
			response.sendStatus(400);
			console.log("Mongo Failed on medal POST ");
			
		} else {
		response.sendStatus(201);
	    console.log("Sport name: " + sportName );
		console.log("Medal Name: " + JSON.stringify(newMedal) );
		
		}
	});
});



app.listen(process.env.PORT || 8888, function(){
console.log(" \n Server running, Listening on " + process.env.PORT);
});

// NOTES:
// Changed localhost to 127.1.1 -- if I see error, change it back to localhost;
// Test w Curl:
// curl -iX POST -H "Content-Type: application/json" -d '{ "medal": {"division":"elite", "country":"elite","year":"elite" } }' localhost:8000/sports/Cycling/medals
