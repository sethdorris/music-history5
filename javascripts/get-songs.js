define(["jquery", "q"], function($, Q) {

	return function() {
		
		var deferred = Q.defer();


		$.ajax({
			url: "https://seth-music-history.firebaseio.com/songs.json"
		}).done(function(songs_data) {
			deferred.resolve(songs_data);
		})
		.fail(function(xhr, status, error) {
			deferred.reject(error);
		});

		return deferred.promise;
	}

});