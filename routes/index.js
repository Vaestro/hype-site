var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Parse = require('node-parse-api').Parse;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Hypelist'
  });
});

/* GET beta signup page. */
router.get('/betarequest', function(req, res, next) {
  res.render('betarequest', {
    title: 'Hypelist - Beta Access'
  });
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
    title: 'Privacy'
  });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {
    title: 'Contact Us'
  });
});

router.post('/parse', function(req, res, next) {
  var app = new Parse('ZFX6js0KDbrUJNMKgxIVYMp82oECqIh7PbT4keL0', 'WVlrwfTX48O9LLUp7rtuE9njBJURDrpJWX9tQF8o');
  app.insert('BetaRequest', req.body , function(err, response) {
    console.log(response)
  });
  res.json({
    
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

module.exports = router;
