requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'lodash': '../bower_components/lodash/lodash',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'q': '../bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});



requirejs(
  ["jquery", "firebase", "authentication"], 
  function($, _firebase, authentication) {

    var ref = new Firebase("https://seth-music-history.firebaseio.com");
    var authData = ref.getAuth();
    console.log("authentication data", authData);

    if (authData === null) {
      ref.authWithOAuthPopup("github", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          authentication.setuid(authData.uid);
          require(
            ["corelist"], 
            function (mainjs) {
              mainjs.mainjs();
              console.log("successfull");
            });
        }
      })
    } else {
      authentication.setuid(authData.uid);
      require(
        ["corelist"],
        function (mainjs) {
          mainjs.mainjs();
          console.log("else is logging correctly")
        })
    };   
});

 



