define(function() {
		var songs = "";
			
return {
		runAjax: function() {
				$.ajax({
					url: "./javascripts/songs.JSON"
			   }).done(function(data) {
			     songs = data;
			})
		},

		getSongs: function() {
			return songs;
		}

	}
});
	

