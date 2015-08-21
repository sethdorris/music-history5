define(["jquery", "q"], function($, Q) {
	return {
		deleteFunction: function(database) {
			var songName = $(event.target).parent().parent().prev().text();
			var titleKey = "";
			var deferred = Q.defer();

			console.log(songName);

			for (var prop in database) {
				if (database[prop].title === songName) {
					titleKey = _.findKey(database, {"title": songName});
					console.log(titleKey);
				}
			}

			$.ajax({
				url: 'https://seth-music-history.firebaseio.com/songs/' + titleKey + ".json",
				method: "DELETE",
			}).done(function(returnedValue) {
				deferred.resolve(returnedValue);
			});


			return deferred.promise;
		}
	};
});