define(function() {
	var songs2 = "";
		return {
				runAjax: function(callback) {
						$.ajax({
							url: "./javascripts/songs2.JSON"
					   }).done(function(data) {
					     callback.call(this, data);
							})
						},

				getSongs: function() {
					return songs2;
					}

				}
});