
"use strict";

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/../client'));

app.get("/sports", function(request,response){
	response.json(["Cycling", "Weightlifting"])
});

app.listen(8000, function(){
console.log("listenng on 8000");
});



