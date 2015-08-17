var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hypelist' });
});

/* GET beta signup page. */
router.get('/betarequest', function(req, res, next) {
  res.render('betarequest', { title: 'Hypelist - Beta Access' });
});

/* GET terms & conditions page. */
router.get('/terms', function(req, res, next) {
  res.render('terms', { title: 'Terms & Conditions' });
});

/* GET privacy page. */
router.get('/privacy', function(req, res, next) {
  res.render('privacy', { title: 'Privacy' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
