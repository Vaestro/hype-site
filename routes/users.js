var express = require('express');
var router = express.Router();

/*
 * GET beta request list.
 */
router.get('/betarequests', function(req, res) {
    var db = req.db;
    var collection = db.get('betarequests');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to submitBetaRequest.
 */
router.post('/submitbetarequest', function(req, res) {
    var db = req.db;
    var collection = db.get('betarequests');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
