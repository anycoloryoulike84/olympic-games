
"use strict";

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/../client'));

app.get("/sports", function(request,response){
	response.json(["Cycling", "Weightlifting", "Beer Drinking"])
});

app.listen(8000, function(){
console.log("Listening on 8000");
});



