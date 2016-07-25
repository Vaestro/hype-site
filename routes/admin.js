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
    var event, completedTransactions, maleAdmissions, femaleAdmissions;
    var eventID = req.params.id;
    var query = new Parse.Query(Event);
    query.include("location");
    query.get(eventID).then(function(fetchedEvent) {
        event = fetchedEvent;
        var maleAdmissionQuery = new Parse.Query(CompletedTransaction);
        maleAdmissionQuery.equalTo("event", event);
        maleAdmissionQuery.equalTo("description", "Male Admission Ticket ");
        return maleAdmissionQuery.limit(62).find().then(null, function(error) {
            return next(err);
        });
    }).then(function(maleAdmissionQuery) {
        maleAdmissions = maleAdmissionQuery;
        var femaleAdmissionQuery = new Parse.Query(CompletedTransaction);
        femaleAdmissionQuery.equalTo("event", event);
        femaleAdmissionQuery.equalTo("description", "Female Admission Ticket ");
        return femaleAdmissionQuery.limit(1000).find().then(null, function(error) {
            return next(err);
        });
    }).then(function(femaleAdmissionQuery) {
        femaleAdmissions = femaleAdmissionQuery;
        completedTransactions = femaleAdmissions.concat(maleAdmissions);
        console.log(completedTransactions);

        return res.render('admin/event', {
            event: event,
            completedTransactions: completedTransactions,
            maleAdmissions: maleAdmissions,
            femaleAdmissions: femaleAdmissions,
            user: req.user
        });
    }).done();
});

module.exports = router;
