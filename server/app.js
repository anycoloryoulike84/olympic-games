
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
			console.log("mongo failed");
		} else {
				console.log(JSON.stringify(docs));}
	});
	// response.json(["Cycling", "Weightlifting", "Beer Drinking"])
});

app.listen(8000, function(){
console.log(" \n Server running, Listening on 8000 ");
});



