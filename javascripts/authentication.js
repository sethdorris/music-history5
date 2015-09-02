define(function (require) {
	var uid = null;

	return {
		getuid: function() {
			console.log("returning ", uid);
			return uid;
		},
		setuid: function(newId) {
			console.log("setting user id to ", newId);
			uid = newId;
		}
	};
});