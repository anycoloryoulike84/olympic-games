

var angular = require("angular");
// require module from package.json, include this one? or @uirouter/angularjs 
require('angular-ui-router');

// Declare module dependency in brackets - if this doesn't work, it's because of package.json dev-dependencies; @uirouter/angularjs vs angular-ui-router
// Or is it ui.router??
angular.module("olympics", ['ui.router'])
.config( ($stateProvider, $urlRouterProvider ) => {
	// On page load, 'otherwise' means, go straight to /sports
	$urlRouterProvider.otherwise('/sports')
	// This is where all states will be defined
	$stateProvider
	.state('sports', {
		url:'/sports',
		templateUrl:'sports/sports-nav.html',
		// Resolve prevents loading of curly braces:
		resolve: {
			sportsService: function($http) {
			return $http.get('/sports');
			}
		},
		controller: function(sportsService) {
				this.sports = sportsService.data
		},
		// Specify the name of local controller:
		controllerAs: 'sportsCtrl'
	})
	.state('sports.medals', {
		url: '/:sportName',
		templateUrl: 'sports/sports-medals.html'
	})
})