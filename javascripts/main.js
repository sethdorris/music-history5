requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});



requirejs(
  ["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
  function($, Handlebars, bootstrap, dom, songs1, songs2) {
    
    var $dom = dom.getOutputElement();
    var moreSongsArray = [];


// Populate-Songs Callback Function

    var songs1Data = function(songs1) {
    require(['hbs!../templates/songs'], function(songTemplate) {
    	$dom.html(songTemplate(songs1));
    });

  //       for (var i = 0; i < songs1.songs.length; i++) {
  //   	$dom.append("<div class='content-song'>" + songs1.songs[i] + "</div>" + "<div class='content-artist'>" + songs1.artist[i] + "<span class='content-album'>" + "<em>off the album: </em>" + songs1.album[i] + "</span>" + "<button class='delete'>X</button>" + "</div>");
		// }
	 //    $dom.append("<button id='more'>More>></button>");
    };


// Populate-Songs Retrieve Data
    songs1.runAjax(songs1Data);
  
	$(document).on("click", ".delete", function() {
		  var $deleteClicked = $(this);
		  var $deleteParent = $deleteClicked.parent();
		  var $parentPrevious = $deleteParent.prev();
		  console.log($deleteParent);
		  $deleteParent.hide();
		  $parentPrevious.hide();
		});

	$(document).on("click", "#more", function() {
		
		var moreSongs = function(songs2) {
	         	$('#more').hide();
	         	require(['hbs!../templates/songs2'], function(songTemplate) {
	         		$dom.append(songTemplate(songs2));
	         	});
	    };  
		songs2.runAjax(moreSongs);
	});

});
 



