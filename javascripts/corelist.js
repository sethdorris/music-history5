define(function (require) {
	
  return {

  mainjs: function() {


      //Declaring modules required for execution of main code
    	var $ = require("jquery");
    	var firebase = require("firebase");
    	var lodash = require("lodash");
    	var hbs = require("hbs");
    	var bootstrap = require("bootstrap");
    	var dom = require("dom-access");
    	var getSongs = require("get-songs");
    	var getMoreSongs = require("get-more-songs");
    	var add = require("add");
    	var del = require("delete");
      var authentication = require("authentication");

      //declaring other variables
    	var $dom = dom.getOutputElement();
      var moreSongsArray = [];
      var $panel = $("#myPanel");
      var myFirebase = new Firebase("https://seth-music-history.firebaseio.com");
      var currentUser = authentication.getuid();
      
      myFirebase.child("songs").orderByChild("uid").equalTo(currentUser).on("value", function(snapshot) {
        var database = snapshot.val();
      
    //Variable to store getSongs PROMISE
        var listOfSongs = getSongs();

    //Populate DOM with FIREBASE API without AJAX Call
        songs1Data = function(database) {
          require(['hbs!../templates/songs', 'hbs!../templates/panel'], function(domTemplate, panelTemplate) {

            $dom.html(domTemplate({songs: database}));
          	$panel.html(panelTemplate({songs: database}));

          });
        };

        songs1Data(database);

    //Delete Song from FIREBASE and DOM
      	$(document).on("click", ".delete", function() {
      	    del.deleteFunction(database);
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
      	}); //End of Filter Button Event Handler


        //Populate DOM with filtered content  
        var filteredDom = function (filteredArray) {
            require(['hbs!../templates/songs', 'hbs!../templates/panel'], function (domTemplate, panelTemplate) {
              var finalHTML = domTemplate({songs: filteredArray});
              $dom.html(finalHTML);
              $panel.html(panelTemplate({songs: filteredArray}));
            });
          };
        });

        
        //Construction of Add Music Button Event Handler
        var $add = $("#addMusicBtn");

        $add.click(function(event) {
          add.addFunction()
          .then(function (resolvedData) {
            console.log("new song:", resolvedData);
          })
          .fail()
        });

      

        //Rest Filter Event Handler
        $(document).on("click", "#reset-filter", function() {
          songs1Data(database);
        });

      })//End of Firebase Value Change Listener
    } //end of mainjs function
  } //end of return
}); //end of module