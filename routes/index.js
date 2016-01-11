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
router.get('/betarequest', function(req, res, next) {
  res.render('betarequest', {
    title: 'Beta Access - Hypelist'
  });
});

/* POST betarequest. */
router.post('/parsebetarequest', function(req, res, next) {

  parse.insert('BetaRequest', req.body , function(err, response) {
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
  parse.insert('Booking', req.body , function(err, response) {
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
