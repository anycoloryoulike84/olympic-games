
var angular = require("angular");
// require module from package.json, include this one? or @uirouter/angularjs 
require('angular-ui-router');

// Declare module dependency in brackets
angular.module("olympics", ['ui.router'])
.config( ($stateProvider, $urlRouterProvider ) => {
	// On page load, 'otherwise' means, go straight to /sports.
	$urlRouterProvider.otherwise('/sports')
	// This is where all states will be defined
	$stateProvider
	.state('sports', {
		url:'/sports',
		templateUrl:'sports/sports-nav.html',
		// Resolve waits for data to load before loading template:
		resolve: {
			sportsService: function($http) {
			return $http.get('/sports');
			}
		},
		controller: function(sportsService, $location) {
			this.sports = sportsService.data;

			this.isActive = function(sport) {

		  var pathRegexp = /sports\/(\w+)/;
          var match = pathRegexp.exec($location.path());
          
          if(match === null || match.length === 0) return false;
          var selectedSportName = match[1];
          // console.log('below', selectedSportName, sport)

          return sport === selectedSportName;

			};

		},
		// Specify the name of local controller:
		controllerAs: 'sportsCtrl'
	})
	.state('sports.medals', {
		url: '/:sportName',
		templateUrl: 'sports/sports-medals.html',
		resolve: {
			// Create route that draws real Data from Endpoint
			sportService: function($http, $stateParams) {
				return $http.get(`/sports/${$stateParams.sportName}`)
			}
		},
		controller: function(sportService) {
			this.sport = sportService.data;
		},
		controllerAs: 'sportCtrl'
	})
	.state('sports.new', {
		url: '/:sportName/medal/new',
		templateUrl: 'sports/new-medal.html',
		controller: function($stateParams, $state, $http) {
			this.sportName = $stateParams.sportName;

			this.saveMedal = function(medal){
			$http({
				method: 'POST',
				url: `/sports/${$stateParams.sportName}/medals`,
				data: {medal}
			}).then(function(){
				$state.go('sports.medals',{sportName: $stateParams.sportName});
				console.log("medal", medal);
			});
			};
		},
		controllerAs: 'newMedalCtrl'


	})

})











