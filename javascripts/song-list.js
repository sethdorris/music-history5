define(["angular", "angularRoute", "angularfire"], function (angular, angularRoute, af) {

	angular.module("myApp.songlist", ["ngRoute"])
	.config(["$routeProvider", function ($routeProvider) {
		$routeProvider
		.when("/", {
			templateUrl: "partials/song-list.html",
			controller: "song-list-controller"
		})
	}])
	.controller("song-list-controller", ["$scope","$firebaseArray", function ($scope, $firebaseArray) {
		var ref = new Firebase("https://seth-music-history.firebaseio.com/songs");

		$scope.songs = $firebaseArray(ref);
		$scope.inputAlbumName = "";
		$scope.inputArtistName = "";
		$scope.inputSongName = "";

		console.log($scope.songs);

		$scope.addNewSong = function () {
			console.log("Button Worked!", $scope.inputSongName);
			$scope.songs.$add({album: $scope.inputAlbumName, author: $scope.inputArtistName, title: $scope.inputSongName});
		};

		$scope.removeSong = function (song) {
			$scope.songs.$remove(song);
		};
	}])

})