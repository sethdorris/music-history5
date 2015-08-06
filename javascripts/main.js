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
    var $panel = $("#myPanel");


// Populate-Songs Callback Function

    var songs1Data = function(songs1) {
    require(['hbs!../templates/songs', 'hbs!../templates/panel'], function(domTemplate, panelTemplate) {
    	$dom.html(domTemplate(songs1));
    	$panel.html(panelTemplate(songs1));
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

      // $.ajax({
      //   url: 'https://seth-music-history.firebaseio.com/songs.json',
      //   method: "DELETE",
      //   data: JSON.stringify(newAdd)
      // }).done(function(addedsong) {
      //   console.log(addedsong);
      // });

		});

  var $add = $("#addMusicBtn");

  $add.click(function(event) {
    event.preventDefault();
    var addSongName = $("#inputSongName").val();
    var addArtistName = $("#inputArtistName").val();
    var addAlbumName = $("#inputAlbumName").val();
    
    var newAdd = {
      "title": addSongName,
      "author": addArtistName,
      "album": addAlbumName
    };

    console.log(newAdd);

    $.ajax({
      url: 'https://seth-music-history.firebaseio.com/songs.json',
      method: "POST",
      data: JSON.stringify(newAdd)
    }).done(function(addedsong) {
      console.log(addedsong);
    });
    
  });

	// $(document).on("click", "#more", function() {
		
	// 	var moreSongs = function(songs2) {
	//          	$('#more').hide();
	//          	require(['hbs!../templates/songs2', 'hbs!../templates/panelalbum', 'hbs!../templates/panelartist'], function(songTemplate, panelalbum, panelartist) {
	//          		$dom.append(songTemplate(songs2));
	//          		$('select[name="album-option"]').append(panelalbum(songs2));
	//          		$('select[name="artist-option"]').append(panelartist(songs2));
	//          	});
	//     };  
	// 	songs2.runAjax(moreSongs);
	// });

});
 



