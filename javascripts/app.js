require.config({
	paths: {
		angular: '../bower_components/angular/angular',
		angularRoute: '../bower_components/angular-route/angular-route',
		angularfire: '../bower_components/angularfire/dist/angularfire.min',
		firebase: '../bower_components/firebase/firebase',
		angularfilter: '../bower_components/angular-filter/dist/angular-filter.min'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularfire': ['angular', 'firebase'],
		'firebase': {'exports' : 'Firebase'},
		'angularfilter': ['angular']
	},
	priority: [
		"angular"
	]
});

require([
	'angular',
	'start'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['myApp']);
		});
	}
);



// var app = angular.module("app", ['ngRoute', 'angular.filter', 'firebase']);

// app.config(['$routeProvider', 
// 	function ($routeProvider) {
// 		$routeProvider.
// 		when('/', {
// 			templateUrl: './partials/song-list.html',
// 			controller: 'mainCtrl'
// 		}).
// 		when('/add', {
// 			templateUrl: 'partials/add.html',
// 			controller: 'mainCtrl'
// 		}).
// 		otherwise({
// 			redirectTo: '/',
// 		});
// 	}]);