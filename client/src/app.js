

var angular = require("angular");
// require module from package.json, include this one? or @uirouter/angularjs 
require('angular-ui-router');

// declare module dependency in brackets - if this doesn't work, it's because of package.json dev-dependencies; @uirouter/angularjs vs angular-ui-router
// Or is it ui.router??
angular.module("olympics", ['ui.router'])
.config( ($stateProvider, $urlRouterProvider ) => {
	$urlRouterProvider.otherwise('/sports')
	$stateProvider
	.state('sports', {
		url:'/sports',
		templateUrl:'sports/sports-nav.html'
	})
})
.controller('titleController', function() {
	this.title = "Olympic Games";
})
.controller('sportsController', function($http) {
	$http.get('/sports').then((response) => {
		this.sports = response.data;
	});
})


