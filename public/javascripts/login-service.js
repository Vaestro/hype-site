// var parse = require('../parse');

$(function() {
  // Initialize Parse
    Parse.initialize("5t3F1S3wKnVGIKHob1Qj0Je3sygnFiwqAu6PP400", "NyZCP6peg3Si9VwUYLZdCRMAj62xoNBxOMOgv76M");

    window.fbAsyncInit = function() {
      Parse.FacebookUtils.init({ // this line replaces FB.init({
        appId      : '678431492288292', // Facebook App ID
        status     : true,  // check Facebook Login status
        cookie     : true,  // enable cookies to allow Parse to access the session
        xfbml      : true,  // initialize Facebook social plugins on the page
        version    : 'v2.6' // point to the latest Facebook Graph API version
      });

          // Run code after the Facebook SDK is loaded.
    };

        (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  $("#facebook-button").click(function() {
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          alert("User signed up and logged in through Facebook!");
        } else {
          alert("User logged in through Facebook!");
        }
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  });



});
