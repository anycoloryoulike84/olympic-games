"use strict";

var express = require("express");
var app = express();
var mongoUtil = require("./mongoUtil");
mongoUtil.connect();

app.use(express.static(__dirname + '/../client'));

app.get("/sports", (request,response) => {
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
app.get("/sports/:name", (request,response) => {
	// Return sportName from url as entered by user, and...
	var sportName = request.params.name;
	
	var sports = mongoUtil.sports();
	sports.find({name: sportName}).limit(1).next( (err,doc) => {
		if (err) {
			response.sendStatus(400);
		} 
			console.log("Sport Doc: ", doc);
			// Returning 'sport' object data:
			response.json(doc);
	})
})


app.listen(8000, function(){
console.log(" \n Server running, Listening on 8000 ");
});








