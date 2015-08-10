define(function() {
  return {
  	    addFunction: function(event) {
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
	    }
	};
  });