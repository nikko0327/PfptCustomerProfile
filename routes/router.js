var express = require("express");
var router = express.Router();
// var User = require("../models/user");
var mongoose = require("mongoose");
var Customer = require("../models/customer");
var ApplianceQuestions = require("../models/appliances");
var DesktopNetworkQuestions = require("../models/desktop_network");
var EmailPSQuestions = require("../models/email_ps");
var EmailSEQuestions = require("../models/email_se");
var JournallingQuestions = require("../models/journaling");
var OtherDataSourcesQuestions = require("../models/other_data_sources");
var UsageQuestions = require("../models/usage");
var ImportQuestions = require("../models/import");
var POCQuestions = require("../models/poc");

//Entry point for the app startup
router.get("/", function (req, res) {
    res.redirect("/index");
});

//NEW ROUTE
router.get("/new", function (req, res) {
    res.render("new");
});

//CREATE ROUTE
router.post("/index", function (req, res) {
    ApplianceQuestions.create({
        _id: req.body.customer["_id"]
    }, function (error, result) {
        if (error) {
            console.log(error);
            res.redirect("/new");
        }
    });

    DesktopNetworkQuestions.create({
        _id: req.body.customer["_id"]
    }, function (error, result) {
        if (error) {
            console.log(error);

            res.redirect("/new");

        }
    });

    EmailSEQuestions.create({
        _id: req.body.customer["_id"]
    }, function (error, result) {
        if (error) {
            console.log(error);
            res.redirect("/new");
        }
    });

    EmailPSQuestions.create({
        _id: req.body.customer["_id"]
    }, function (error, result) {
        if (error) {
            console.log(error);
            res.redirect("/new");
        }
    });

    ImportQuestions.create({
        _id: req.body.customer["_id"]
    }, function (error, result) {
        if (error) {
            console.log(error);
            res.redirect("/new");
        }
    });

    JournallingQuestions.create({
        _id: req.body.customer["_id"]
    }, function (error, result) {
        if (error) {
            console.log(error);
            res.redirect("/new");
        }
    });

    OtherDataSourcesQuestions.create({
        _id: req.body.customer["_id"]
    }, function (error, result) {
        if (error) {
            console.log(error);
            res.redirect("/new");
        }
    });

    POCQuestions.create({
        _id: req.body.customer["_id"],
        POC: {
            is_sandbox_poc: "Yes",
            is_prod_poc: "No"
        }
    }, function (error, result) {
        if (error) {
            console.log(error);
            res.redirect("/new");
        }
    });

    UsageQuestions.create({
        _id: req.body.customer["_id"]
    }, function (error, result) {
        if (error) {
            console.log(error);
            res.redirect("/new");
        }
    });

    Customer.create(req.body.customer, function (err, foundEntry) {
        if (err) {
            console.log(err);
            res.redirect("/new");
        } else {
            res.redirect("/index");
        }
    });
});

//UPDATE ROUTE
router.put("/index/:id", function (req, res) {
    Customer.findByIdAndUpdate(req.params.id, req.body.customer, function (err, updateEntry) {
        if (err) {
            res.redirect("/index/:id");
        } else {
            res.redirect("/index/" + req.params.id);
        }
    });
});

//INDEX ROUTE
router.get("/index", function (req, res) {
    Customer.find({}, function (err, customers) {
        if (err) {
            console.log("An error has occurred.");
            console.log(err);
        } else {
            res.render("index", {customers: customers});
        }
    });
});

// SHOW ROUTE
router.get("/index/:id", function (req, res) {
    Customer.findById(req.params.id, function (err, result) {
        if (err) {
            res.redirect("/index");
        } else {
            var customer = result;
        }

        POCQuestions.findById(req.params.id, function (err, result) {
            if (err) {
                res.redirect("/index");
            } else {
                var poc_questions = result;
            }

            res.render("show", {customer: customer, poc_questions: poc_questions});
        });
    });
});

module.exports = router;