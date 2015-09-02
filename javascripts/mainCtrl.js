app.controller("mainCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray) {

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




}]);