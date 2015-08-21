define(["jquery", "q", "authentication"], function($, Q, authentication) {
	return {
		addFunction: function() {
			var addSongName = $("#inputSongName").val();
			var addArtistName = $("#inputArtistName").val();
			var addAlbumName = $("#inputAlbumName").val();
			var deferred = Q.defer();

			var newAdd = {
				"title": addSongName,
				"author": addArtistName,
				"album": addAlbumName,
				"uid": authentication.getuid()
			};

			console.log(newAdd);

			$.ajax({
				url: 'https://seth-music-history.firebaseio.com/songs.json',
				method: "POST",
				data: JSON.stringify(newAdd)
			}).done(function(addedsong) {
				deferred.resolve(addedsong);
			});

			return deferred.promise;
		}
	};
});