var express = require('express');
var router = express.Router();
var Parse = require('parse/node');
var Event = Parse.Object.extend("Event");
var AdmissionOption = Parse.Object.extend("AdmissionOption");
var CompletedTransaction = Parse.Object.extend("CompletedTransaction");
var Location = Parse.Object.extend("Location");
var moment = require('moment');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

Parse.initialize(process.env.PARSE_APPLICATION_ID,
    process.env.PARSE_JAVASCRIPT_KEY, process.env.PARSE_MASTER_KEY);

function generateToken(user) {
    var payload = {
        iss: 'www.gethype.co',
        sub: user,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
}

function fetchEventsForOrganizer(user) {
    var query = new Parse.Query(Event);
    query.include("location");
    query.equalTo("organizer", user);
    query.addDescending("date");
    return query.find({
        success: function(results) {
            return results;
        },
        error: function(error) {
            return next(error);
        }
    });
}


/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('admin/login', {
        title: 'Hype Admin'
    });
});

router.post('/authenticate', function(req, res, next) {
  console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    Parse.User.logIn(username, password).then(function(user) {
      console.log('succesfully logged in');
        var token = generateToken(user);
        return res.redirect('/admin?token=' + token);
    }, function(error) {
        return next(error);
    });
});

// route middleware to verify a token
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                console.log('token decoded')
                next();
            }
        });

    } else {
        return res.redirect('/admin/login');

    }
});

router.get('/', function(req, res, next) {
    var user = req.decoded.sub;
    var innerQuery = new Parse.Query(Event);
    innerQuery.equalTo("organizerId", user.objectId);
    var query = new Parse.Query(CompletedTransaction);
    query.matchesQuery("event", innerQuery);
    query.include("event");
    query.addDescending("date");
    return query.limit(1000).find().then(function(results) {
      console.log(results.length);
        res.render('admin/manager', {
            title: 'Hype Admin',
            user: req.decoded.sub,
            transactions: results,
            token: req.query.token
        });
    }, function(error) {
        return next(error);
    });
});
/* GET home page. */
// router.get('/', function(req, res, next) {
//     var user = req.decoded.sub;
//     var query = new Parse.Query(Event);
//     query.include("location");
//     query.equalTo("organizerId", user.objectId);
//     query.addDescending("date");
//     return query.find().then(function(results) {
//         res.render('admin/manager', {
//             title: 'Hype Admin',
//             user: req.decoded.sub,
//             events: results,
//             token: req.query.token
//         });
//     }, function(error) {
//         return next(error);
//     });
// });

router.get('/event/:id', function(req, res, next) {
    var event, completedTransactions;
    var eventID = req.params.id;
    var query = new Parse.Query(Event);
    query.include("location");
    query.get(eventID).then(function(fetchedEvent) {
        event = fetchedEvent;
        var completedTransactionQuery = new Parse.Query(CompletedTransaction);
        completedTransactionQuery.equalTo("event", event);
        return completedTransactionQuery.find().then(null, function(error) {
            return next(err);
        });
    }).then(function(completedTransactionQuery) {
        completedTransactions = completedTransactionQuery;
        return res.render('admin/event', {
            event: event,
            transactions: completedTransactions,
            user: req.user
        });
    }).done();
});

module.exports = router;
