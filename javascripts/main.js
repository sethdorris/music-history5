requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'lodash': '../bower_components/lodash/lodash',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});



requirejs(
  ["jquery", "firebase", "lodash", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
  function($, _firebase, _, Handlebars, bootstrap, dom, songs1, songs2) {
    
    var $dom = dom.getOutputElement();
    var moreSongsArray = [];
    var $panel = $("#myPanel");
    var myFirebase = new Firebase("https://seth-music-history.firebaseio.com");
    
    myFirebase.child("songs").on("value", function(snapshot) {
      var database = snapshot.val();
      console.log(database); 
  


// Populate-Songs Callback Function

    var songs1Data = function(songs1) {
    require(['hbs!../templates/songs', 'hbs!../templates/panel'], function(domTemplate, panelTemplate) {
    	$dom.html(domTemplate(songs1));
    	$panel.html(panelTemplate(songs1));
      });
    };


// Populate-Songs Retrieve Data
    songs1.runAjax(songs1Data);
  
	$(document).on("click", ".delete", function() {
		  console.log();
		});

  $(document).on("click", "#filter-button", function() {
      var artistSelected = ($("select[name='artist-option']").val());
      var filteredArray = [];

      $.ajax({
        url: 'http://seth-music-history.firebaseio.com/songs.json',
        method: "GET",
        data: JSON.stringify(artistSelected)
      }).done(function(returnedValue) {
        // console.log(returnedValue);
        for (var num in returnedValue) {
          if (returnedValue[num].author === artistSelected) {
            console.log("You have selected: ", returnedValue[num].author);
            filteredArray.push(returnedValue[num])
            console.log("filtered array: ", filteredArray);
          }
        }
        filteredDom(filteredArray);
      });


      
      var filteredDom = function (filteredArray) {
        require(['hbs!../templates/songs', 'hbs!../templates/panel'], function (domTemplate, panelTemplate) {
          console.log("filtered array: ", filteredArray); 
          var finalHTML = domTemplate({songs: filteredArray});
          $dom.html(finalHTML);
          $panel.html(panelTemplate({songs: filteredArray}));
        })
      };
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


  $(document).on("click", "#reset-filter", function() {
      songs1.runAjax(songs1Data);
  });
});


});
 



