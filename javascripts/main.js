requirejs(
  ["dom-access", "populate-songs", "get-more-songs"], 
  function(dom, songs1, songs2) {
    
    var $dom = dom.getOutputElement();
    var moreSongsArray = [];


// Populate-Songs Callback Function

    var songs1Data = function(songs1) {
    console.log(songs1);
    console.log(songs1.songs);

        for (var i = 0; i < songs1.songs.length; i++) {
    	$dom.append("<div class='content-song'>" + songs1.songs[i] + "</div>" + "<div class='content-artist'>" + songs1.artist[i] + "<span class='content-album'>" + "<em>off the album: </em>" + songs1.album[i] + "</span>" + "<button class='delete'>X</button>" + "</div>");
		}
	    $dom.append("<button id='more'>More>></button>");
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
			for (var i = 0; i < songs2.songs.length; i++) {
	         	$('#more').hide();
	         	$dom.append("<div class='content-song'>" + songs2.songs[i] +"</div>" + "<div class='content-artist'>" + songs2.artist[i] + "<span class='content-album'>" + "<em>off the album: </em>" + songs2.album[i] + "</span>" + "<button class='delete'>X</button>" + "</div>");
	         }

	    };  
		songs2.runAjax(moreSongs);
	});

});

 



