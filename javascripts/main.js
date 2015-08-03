requirejs(
  ["dom-access", "populate-songs", "get-more-songs"], 
  function(dom, songs1, songs2) {
    
    var $dom = dom.getOutputElement();
	songs1.runAjax();
	var songObject = songs1.getSongs();
    var songs = songObject.songs;
    var artists = songObject.artist;
    var album = songObject.album;
    songs2.runAjax();
    var songObject2 = songs2.getSongs();
    var songs2 = songObject2.songs;
    var artists2 = songObject2.artist;
    var album2 = songObject2.album;

    for (var i = 0; i < songs.length; i++) {
    	$dom.append("<div class='content-song'>" + songObject.songs[i] + "</div>" 
    		+ "<div class='content-artist'>" + artists[i] + "<span class='content-album'>" 
				+ "<em>off the album: </em>" + album[i] + "</span>" + "<button class='delete'>X</button>" + "</div>");
    }

    $dom.append("<button id='more'>More>></button>");
  
	$(document).on("click", ".delete", function() {
		  var $deleteClicked = $(this);
		  var $deleteParent = $deleteClicked.parent();
		  var $parentPrevious = $deleteParent.prev();
		  console.log($deleteParent);
		  $deleteParent.hide();
		  $parentPrevious.hide();
		})

	$(document).on("click", "#more", function(){
		for (var j = 0; j < songs2.length; j++) {
		$dom.append("<div class='content-song'>" + songs2[j] + "</div>");
		$dom.append("<div class='content-artist'>" + "<em>by:</em> "+ artists[j] + "<span class='content-album'>" 
			+ "<em>off the album: </em>" + album2[j] + "</span>" + "<button class='delete'>X</button>" + "</div>");
		$('#more').hide();
		}
	})

  }
);



