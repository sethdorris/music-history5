define(function() {
	var songs2 = "";
		return {
				runAjax: function() {
						$.ajax({
							url: "./javascripts/songs2.JSON"
					   }).done(function(data) {
					     songs2 = data;
							})
						},

				getSongs: function() {
					return songs2;
					}

				}
});