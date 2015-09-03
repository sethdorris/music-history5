define([
	'angular',
	'angularRoute',
	'angularfire',
	'angularfilter',
	'song-list'
], function(angular, angularRoute, af, angularFilter, songlist) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'firebase',
		'angular.filter',
		'myApp.songlist'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.otherwise({
			redirectTo: '/'});
	}]);
});