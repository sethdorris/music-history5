var app = angular.module("app", ['ngRoute', 'angular.filter', 'firebase']);

app.config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: '',
			controller: ''
		}).
		when('', {
			templateUrl: '',
			controller: 'ß'
		}).
		otherwise({
			redirectTo: '/',
		});
	}]);