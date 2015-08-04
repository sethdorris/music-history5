define(function() {
			
return {
		runAjax: function(callback) {
				$.ajax({
					url: "./javascripts/songs.JSON",
			   }).done(function(data) {
			     callback.call(this, data);
			});
		},

		getSongs: function() {
			return songs;
		}

	};
});
	

