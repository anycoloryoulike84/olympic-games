

var angular = require("angular");

angular.module("olympics", [])
.controller('titleController', function() {
	this.title = "Olympic Games";
})
.controller('sportsController', function($http) {
	$http.get('/sports').then((response) => {
		this.sports = response.data;
	});
})


