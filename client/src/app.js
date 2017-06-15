
const angular = require("angular");

angular.module("olympics", [])
.controller('sportsController', function() {
	this.sports = ["weightlifting", "cycling", "booooo", "bshgdjsfj"];
})
.controller('titleController', function() {
	this.title = "Olympic Games";
});


