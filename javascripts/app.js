var app = angular.module("app", ['ngRoute', 'angular.filter', 'firebase']);

app.config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: './partials/song-list.html',
			controller: 'mainCtrl'
		}).
		when('/add', {
			templateUrl: 'partials/add.html',
			controller: 'mainCtrl'
		}).
		otherwise({
			redirectTo: '/',
		});
	}]);