define(function() {
			
return {
		runAjax: function(callback) {
				$.ajax({
					url: "https://seth-music-history.firebaseio.com/.json",
			   }).done(function(data) {
			     callback.call(this, data);
			});
		},

		getSongs: function() {
			return songs;
		}

	};
});
	

