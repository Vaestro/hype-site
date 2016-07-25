var express = require('express');
var router = express.Router();
var Parse = require('parse/node');
var Event = Parse.Object.extend("Event");
var AdmissionOption = Parse.Object.extend("AdmissionOption");
var CompletedTransaction = Parse.Object.extend("CompletedTransaction");
var Location = Parse.Object.extend("Location");

Parse.initialize(process.env.PARSE_APPLICATION_ID,
    process.env.PARSE_JAVASCRIPT_KEY, process.env.PARSE_MASTER_KEY);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/admin', {
        title: 'Hype Admin'
    });
});

router.get('/event/:id', function(req, res, next) {
    var event, completedTransactions;

    var eventID = req.params.id;
    var query = new Parse.Query(Event);
    query.include("location");
    query.get(eventID).then(function(fetchedEvent) {
        event = fetchedEvent;
        var completedTransactionQuery = new Parse.Query(CompletedTransaction);
        completedTransactionQuery.equalTo("event", event);
        return completedTransactionQuery.limit(1000).find().then(null, function(error) {
            return next(err);
        });
    }).then(function(completedTransactionQuery) {
        completedTransactions = completedTransactionQuery;
        return res.render('admin/event', {
            event: event,
            completedTransactions: completedTransactions,
            user: req.user
        });
    }).done();
});

module.exports = router;
