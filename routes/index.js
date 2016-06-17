var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Parse = require('parse/node');
var Event = Parse.Object.extend("Event");
var AdmissionOption = Parse.Object.extend("AdmissionOption");
var Location = Parse.Object.extend("Location");
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

Parse.initialize("5t3F1S3wKnVGIKHob1Qj0Je3sygnFiwqAu6PP400",
    "NyZCP6peg3Si9VwUYLZdCRMAj62xoNBxOMOgv76M", "NUwTuaL9aqcGkgFc0MUrng4SdQz9RPDcEudMvUGZ");

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

router.post('/fblogin', function(req, res, next) {

    // var defaultLanguage = req.app.get('defaultLanguage');
    var sessionToken = req.body.sessionToken;
    console.log("server -- user.sessionToken = " + sessionToken);

    // var user = new Parse.User();
    // console.log("server -- user is = " + user);

    console.log(JSON.stringify(req.user.become(sessionToken)));

    req.user.become(sessionToken).then(function(user) {

        console.log("exports.fblogin -- become -- success");
        // The current user is now set to user.
        return res.redirect('/');

    }, function(error) {
        // The token could not be validated.
        console.log("exports.fblogin -- become -- error = " + error);
        return next(error);
    });
});

/* GET beta access page. */
router.post('/save-user', function(req, res, next) {
    console.log(req.body);
    var currentUser = Parse.User.current();
    var email = req.body.email;
    // var phoneNumber = req.body.phoneNumber;

    if (email !== "") {
        return res.redirect('/');
        //
        // currentUser.set("email", email);
        // // currentUser.set("phoneNumber", phoneNumber);
        // currentUser.save(null, {
        //     success: function(user) {
        //       return res.redirect('/');
        //     },
        //     error: function(user, error) {
        //         console.log("Oops, something went wrong saving your account.");
        //     }
        // });
    }
});

router.get('/events', function(req, res, next) {
    var Event = Parse.Object.extend("Event");
    var query = new Parse.Query(Event);
    query.limit(10);
    query.include("location");
    query.addDescending("date");
    return query.find({
        success: function(results) {
            return res.render('events', {
                events: results,
                user: req.user
            });
        },
        error: function(error) {
            return next(error);
        }
    });
});

router.get('/event/:id', function(req, res, next) {
    var event, admissionOptions;

    var eventID = req.params.id;
    var query = new Parse.Query(Event);
    query.include("location");
    query.get(eventID).then(function(fetchedEvent) {
        event = fetchedEvent;

        var admissionQuery = new Parse.Query(AdmissionOption);
        var location = new Location();
        location.id = event.get('location').id;
        admissionQuery.equalTo("location", location);
        return admissionQuery.find().then(null, function(error) {
            return next(err);
        });
    }).then(function(admissionQuery) {
        admissionOptions = admissionQuery;
        return res.render('event', {
            event: event,
            admissionOptions: admissionOptions,
            user: req.user
        });
    }).done();
});

router.get('/event/:eventID/:admissionOptionID/checkout', function(req, res, next) {
    var admissionOptionID = req.params.admissionOptionID;
    var eventID = req.params.eventID;
    var query = new Parse.Query(Event);
    query.include("location");
    query.get(eventID).then(function(fetchedEvent) {
        console.log('fetched event is ' + JSON.stringify(fetchedEvent));
        event = fetchedEvent;

        var query = new Parse.Query(AdmissionOption);
        query.include("location");
        query.get(admissionOptionID).then(function(admissionOption) {
            console.log('fetched admissionOption is ' + JSON.stringify(admissionOption));
            return res.render('checkout', {
                event: event,
                admissionOption: admissionOption,
                user: req.user
            });
        }).done();
    });
});

router.post('/charge', function(req, res, next) {
    var stripeToken = req.body.stripeToken;
    stripe.customers.create({

        source: stripeToken,
        description: req.body.email
    }).then(function(customer) {

        console.log('customer ' + JSON.stringify(customer));

        return stripe.charges.create({
            amount: req.body.price * 100,
            currency: "usd",
            customer: customer.id
        });
    }).then(function(charge) {

        console.log('successful payment ' + JSON.stringify(charge));

        var data = {
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            admissionOptionId: req.body.admissionOptionID,
            eventId: req.body.eventID,
            customerName: req.body.name
        };

        console.log('data is ' + JSON.stringify(data));

        return Parse.Cloud.run('hypeLaunchPartyPurchase', data);
    }).then(function(response) {
        return res.render('checkout-success', {
            title: 'Thank you!'
        });
    }, function(error) {
        return next(error);
    });
});

// router.post('/free-charge', function(req, res, next) {
//
// });

/* GET beta access page. */
router.get('/betarequest', function(req, res, next) {
    res.render('betarequest', {
        title: 'Beta Access - Hypelist'
    });
});

/* POST betarequest. */
router.post('/parsebetarequest', function(req, res, next) {

    parse.insert('BetaRequest', req.body, function(err, response) {
        console.log(response);
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
