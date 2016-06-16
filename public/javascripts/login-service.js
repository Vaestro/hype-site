// var parse = require('../parse');

$(function() {
    // Initialize Parse
    $('.form-control').on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    $("#registration-step-2").show();

    Parse.initialize("5t3F1S3wKnVGIKHob1Qj0Je3sygnFiwqAu6PP400", "NyZCP6peg3Si9VwUYLZdCRMAj62xoNBxOMOgv76M");

    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId: '678431492288292', // Facebook App ID
            status: true, // check Facebook Login status
            cookie: true, // enable cookies to allow Parse to access the session
            xfbml: true, // initialize Facebook social plugins on the page
            version: 'v2.6' // point to the latest Facebook Graph API version
        });

        // Run code after the Facebook SDK is loaded.
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $("#facebook-button").click(function() {
        Parse.FacebookUtils.logIn("public_profile, user_photos, email,user_friends", {
            success: function(user) {
                if (!user.existed()) {
                    FB.api('/me', {
                        fields: 'id,first_name,last_name,name,gender,verified,email,picture.type(large)'
                    }, function(response) {
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

                                },
                                error: function(user, error) {
                                    console.log("Oops, something went wrong saving your account.");
                                }
                            });
                        }
                    });
                } else {
                    $("#registration-step-1").hide();
                    $("#registration-step-2").show();
                }
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    });

    $('#submit').on('click', function() {
        var currentUser = Parse.User.current();
        var email = $('#email-input').val();
        var phoneNumber = $('#phoneNumber-input').val();

        if (email !== "" && phoneNumber !== "") {
            currentUser.set("email", email);
            currentUser.set("phoneNumber", phoneNumber);
            currentUser.save(null, {
                success: function(user) {
                    alert("Saved user phone number.");
                },
                error: function(user, error) {
                    console.log("Oops, something went wrong saving your account.");
                }
            });
        }
    });


});
