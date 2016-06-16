var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var parse = require('../parse');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Hype Nightlife'
    });
});

/* GET beta access page. */
router.get('/signup', function(req, res, next) {
    res.render('registration', {
        title: 'Hype - Registration'

    });
});

/* GET beta access page. */
router.post('/login', function(req, res, next) {
    parse.FacebookUtils.init({ // this line replaces FB.init({
        appId: '678431492288292', // Facebook App ID
        status: true, // check Facebook Login status
        cookie: true, // enable cookies to allow Parse to access the session
        xfbml: true, // initialize Facebook social plugins on the page
        version: 'v2.6' // point to the latest Facebook Graph API version
    });

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

    parse.FacebookUtils.logIn("public_profile, user_photos, email,user_friends", {
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
                              res.send('success');
                            },
                            error: function(user, error) {
                              res.send('error');
                            }
                        });
                    }
                });
            } else {
                res.send('error');
            }
        },
        error: function(user, error) {
            res.send('error');
        }
    });
});

/* GET beta access page. */
router.get('/betarequest', function(req, res, next) {
    res.render('betarequest', {
        title: 'Beta Access - Hypelist'
    });
});

/* POST betarequest. */
router.post('/parsebetarequest', function(req, res, next) {

    parse.insert('BetaRequest', req.body, function(err, response) {
        console.log(response)
    });
    res.json({

    });
});

/* GET hosts application page. */
router.get('/host', function(req, res, next) {
    res.render('host', {
        title: 'Become a Host'
    });
});

/* GET bookings page. */
router.get('/bookings', function(req, res, next) {
    res.render('bookings', {
        title: 'Special Event Booking - Hypelist'
    });
});

/* POST booking. */
router.post('/parsebooking', function(req, res, next) {
    console.log(req.body);
    parse.insert('Booking', req.body, function(err, response) {
        console.log(err);
        if (err) {
            res.json({
                error: "Something Went Wrong"
            });
        } else {
            res.json({
                error: null
            });
        }
    });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', {
        title: 'Contact Us'
    });
});

/* POST contact page. */
router.post('/submitcontact', function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'edgar@thehypelist.co',
            pass: '1ampvCapital'
        }
    });

    // Mail Options
    var mailOptions = {
        from: req.body.firstname + '&lt;' + req.body.email + '&gt;', //grab from data from the request body object
        to: 'edgar@thehypelist.co',
        subject: 'Contact Hypelist',
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        // Email not sent
        if (error) {
            return console.log(error);
            res.render('contact', {
                title: 'Contact Us',
                msg: 'Error occured, message not sent.',
                err: true,
                page: 'contact'
            })
        } else {
            console.log('Message sent: ' + info.response);
            res.render('contact', {
                title: 'Contact Us',
                msg: 'Thanks for emailing us!',
                err: false,
                page: 'contact'
            })
        }
    })
});

/* GET terms & conditions page. */
router.get('/terms', function(req, res, next) {
    res.render('terms', {
        title: 'Terms & Conditions'
    });
});

/* GET privacy page. */
router.get('/privacy', function(req, res, next) {
    res.render('privacy', {
        title: 'Privacy Policy'
    });
});

module.exports = router;
