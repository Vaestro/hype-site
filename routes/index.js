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

module.exports = router;
