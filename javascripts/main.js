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
  ["jquery", "firebase", "lodash", "hbs", "bootstrap", "dom-access"], 
  function($, _firebase, _, Handlebars, bootstrap, dom) {
    
    var $dom = dom.getOutputElement();
    var moreSongsArray = [];
    var $panel = $("#myPanel");
    var myFirebase = new Firebase("https://seth-music-history.firebaseio.com");
    
    myFirebase.child("songs").on("value", function(snapshot) {
      var database = snapshot.val();
  
//function that populates the DOM panel 
//and DOM Main-content section with song data GET from firebase Server

    songs1Data = function(database) {
    require(['hbs!../templates/songs', 'hbs!../templates/panel'], function(domTemplate, panelTemplate) {

      $dom.html(domTemplate({songs: database}));
    	$panel.html(panelTemplate({songs: database}));
      });
    };

    songs1Data(database);
  
	$(document).on("click", ".delete", function() {
      var songName = $(this).parent().prev().text();

      var answer = prompt("This will PERMANENTLY DELETE this song from the database, are you sure?");
      answer = answer.toUpperCase();
      var titleKey = "";

      if (answer === "YES") {

        for (var prop in database) {
          if (database[prop].title === songName) {

            // console.log(JSON.stringify(database[prop]));
            // console.log(database[prop]);
            titleKey = _.findKey(database, {"title": songName});
            console.log(titleKey);
          }
        }
      $.ajax({
            url: 'https://seth-music-history.firebaseio.com/songs/' + titleKey + ".json",
            method: "DELETE",
          }).done(function(returnedValue) {
            console.log(returnedValue);
          });
    }
	});

  $(document).on("click", "#filter-button", function(event) {
      event.preventDefault();
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
            filteredArray.push(returnedValue[num]);
          }
        }
        filteredDom(filteredArray);
      });


      
      var filteredDom = function (filteredArray) {
        require(['hbs!../templates/songs', 'hbs!../templates/panel'], function (domTemplate, panelTemplate) {
          var finalHTML = domTemplate({songs: filteredArray});
          $dom.html(finalHTML);
          $panel.html(panelTemplate({songs: filteredArray}));
        });
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
      songs1Data(database);
  });

});


});
 



