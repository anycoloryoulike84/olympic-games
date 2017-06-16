
"use strict";

var express = require("express");
var app = express();
var mongoUtil = require("./mongoUtil");
mongoUtil.connect();

app.use(express.static(__dirname + '/../client'));

app.get("/sports", function(request,response){
	var sports = mongoUtil.sports();
	sports.find().toArray((err,docs) => {
		if (err) {
			console.log(" Mongo failed on Server");
		} else {
			// convert 'docs' object into array named var sportsNames
			var sportNames = docs.map( (sport) => sport.name);
			response.json(sportNames);
			console.log(" MongoDB returned: \n \n " + JSON.stringify(sportNames));
			// response.json(["Cycling", "Weightlifting", "Beer Drinking"]);

			}
	});
	


	
});

app.listen(8000, function(){
console.log(" \n Server running, Listening on 8000 ");
});



