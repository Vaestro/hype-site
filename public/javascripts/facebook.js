function loginWithFacebook () {
  Parse.FacebookUtils.logIn("public_profile, user_photos, email,user_friends", {
    success: function(user) {
      if (!user.existed()) {
        alert("User signed up and logged in through Facebook!");
      } else {
        FB.api('/me',{fields:'id,first_name,last_name,name,gender,verified,email,picture.type(large)'}, function(response) {
              if (!response.error) {
                // We save the data on the Parse user
                user.set("fbId", response.id);
                user.set("firstName", response.first_name);
                user.set("lastName", response.last_name);
                user.set("gender", response.gender);
                user.set("fbEmail", response.email);
                user.set("image", response.picture.type(large));
                user.save(null, {
                  success: function(user) {
                    $("#registration-step-1").hide();
                    $("#registration-step-1").show();
                  },
                  error: function(user, error) {
                    console.log("Oops, something went wrong saving your account.");
                  }
                });
              }
            });
      }
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
  });
}

exports.loginWithFacebook = loginWithFacebook;
