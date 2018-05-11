var express = require("express");
var router = express.Router();
// var User = require("../models/user");
var mongoose = require("mongoose");
mongoose.Promise = Promise;

var Customer = require("../models/customer");
var ApplianceQuestions = require("../models/appliances");
var DesktopNetworkQuestions = require("../models/desktop_network");
var EmailPSQuestions = require("../models/email_ps");
var EmailSEQuestions = require("../models/email_se");
var JournalingQuestions = require("../models/journaling");
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
        name: req.body.customer["name"]
    }, function (error, result) {
        if (error) {
            console.log(error);
        }
    });

    DesktopNetworkQuestions.create({
        name: req.body.customer["name"]
    }, function (error, result) {
        if (error) {
            console.log(error);
        }
    });

    EmailSEQuestions.create({
        name: req.body.customer["name"]
    }, function (error, result) {
        if (error) {
            console.log(error);
        }
    });

    EmailPSQuestions.create({
        name: req.body.customer["name"]
    }, function (error, result) {
        if (error) {
            console.log(error);
        }
    });

    ImportQuestions.create({
        name: req.body.customer["name"]
    }, function (error, result) {
        if (error) {
            console.log(error);
        }
    });

    JournalingQuestions.create({
        name: req.body.customer["name"]
    }, function (error, result) {
        if (error) {
            console.log(error);
        }
    });

    OtherDataSourcesQuestions.create({
        name: req.body.customer["name"]
    }, function (error, result) {
        if (error) {
            console.log(error);
        }
    });

    POCQuestions.create({
        name: req.body.customer["name"]
    }, function (error, result) {
        if (error) {
            console.log(error);
        }
    });

    UsageQuestions.create({
        name: req.body.customer["name"]
    }, function (error, result) {
        if (error) {
            console.log(error);
        }
    });

    Customer.create({
        name: req.body.customer["name"],
        impSpecialist: req.body.customer["impSpecialist"],
        salesRep: req.body.customer["salesRep"],
        status: req.body.customer["status"],
        archivingSe: req.body.customer["archivingSe"],
        accManager: req.body.customer["accManager"],
        location: req.body.customer["location"],
        supervision: req.body.customer["supervision"],
        tem: req.body.customer["tem"],
        tam: req.body.customer["tam"],
        natIp: req.body.customer["natIp"],
        contacts: req.body.customer["contacts"],
        incumbentSolution: req.body.customer["incumbentSolution"],
        numberOfUsers: req.body.customer["numberOfUsers"]
    }, function (err, foundEntry) {
        if (err) {
            console.log(err);
            alert("WARNING");
            //res.redirect("/new");
        } else {
            res.redirect("/index");
        }
    });
});

//UPDATE ROUTE
router.put("/index/:id", function (req, res) {
        // Just for updating name, needs the update to be nested.
        if (req.body.customer !== undefined && req.body.customer !== null) {
            Customer.findOneAndUpdate({name: req.params.id}, req.body.customer, function (err, updateEntry) {
                    if (err) {
                        if (err["codeName"] === "DuplicateKey") {
                            res.json({already_exists: true});
                        } else {
                            console.log(err);
                            res.redirect("/index");
                        }
                    }
                }
            );

            EmailSEQuestions.findOneAndUpdate({"name": req.params.id}, {"name": req.body.customer["name"]}, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.redirect("/index");
                    }
                }
            );

            POCQuestions.findOneAndUpdate({"name": req.params.id}, {"name": req.body.customer["name"]}, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect("/index");
                }
            });

            JournalingQuestions.findOneAndUpdate({"name": req.params.id}, {"name": req.body.customer["name"]}, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect("/index");
                }
            });

            res.redirect("/index/" + req.body.customer["name"]);
        }

// Updating POC questions
        if (req.body.poc_questions !== undefined && req.body.poc_questions !== null) {
            POCQuestions.findOneAndUpdate({name: req.params.id}, req.body.poc_questions, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect("/index");
                } else {
                    res.redirect("/index/" + req.params.id);
                }
            });
        }

// Updating Email SE Questions
        if (req.body.email_se_questions !== undefined && req.body.email_se_questions !== null) {
            EmailSEQuestions.findOneAndUpdate({"name": req.params.id}, req.body.email_se_questions, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect("/index");
                } else {
                    res.redirect("/index/" + req.params.id);
                }
            });
        }


// Updating journaling questions
        if (req.body.journaling_questions !== undefined && req.body.journaling_questions !== null) {
            POCQuestions.findOneAndUpdate({name: req.params.id}, req.body.journaling_questions, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect("/index");
                } else {
                    res.redirect("/index/" + req.params.id);
                }
            });
        }
    }
)
;

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
    // CALLBACK HELL BOIS

    // Customer.findOne({"name": req.params.id}, function (err, result) {
    //     if (err) {
    //         console.log(err);
    //         res.redirect("/index");
    //     } else {
    //         var customer = result;
    //     }
    //
    //     EmailSEQuestions.findOne({"name": req.params.id}, function (err, result) {
    //         if (err) {
    //             console.log(err);
    //             res.redirect("/index");
    //         } else {
    //             var email_se_questions = result;
    //         }
    //
    //         JournalingQuestions.findOne({"name": req.params.id}, function (err, result) {
    //                 if (err) {
    //                     console.log(err);
    //                     res.redirect("/index");
    //                 } else {
    //                     var journaling_questions = result;
    //
    //                     POCQuestions.findOne({"name": req.params.id}, function (err, result) {
    //                         if (err) {
    //                             console.log(err);
    //                             res.redirect("/index");
    //                         } else {
    //                             var poc_questions = result;
    //                         }
    //
    //                         res.render("show", {
    //                             customer: customer,
    //                             email_se_questions: email_se_questions,
    //                             poc_questions: poc_questions,
    //                             journaling_questions: journaling_questions
    //                         });
    //                         console.log({
    //                             customer: customer,
    //                             email_se_questions: email_se_questions,
    //                             poc_questions: poc_questions,
    //                             journaling_questions: journaling_questions
    //                         });
    //                         console.log("-----");
    //                     });
    //                 }
    //             }
    //         );
    //     });
    // });

    // ATTEMPTING TO ESCAPE CALLBACK HELL

    // Make a shit ton of promises, but be careful, we're not catching any errors.
    var appliances_query = ApplianceQuestions.findOne({"name": req.params.id}).exec();
    var customer_query = Customer.findOne({"name": req.params.id}).exec();
    var desktop_network_query = DesktopNetworkQuestions.findOne({"name": req.params.id}).exec();
    var email_ps_questions_query = EmailPSQuestions.findOne({"name": req.params.id}).exec();
    var email_se_questions_query = EmailSEQuestions.findOne({"name": req.params.id}).exec();
    var import_query = ImportQuestions.findOne({"name": req.params.id}).exec();
    var journaling_query = JournalingQuestions.findOne({"name": req.params.id}).exec();
    var poc_query = POCQuestions.findOne({"name": req.params.id}).exec();
    var usage_query = UsageQuestions.findOne({"name": req.params.id}).exec();

    // Needs to fulfill all promises and queries before we render the page, otherwise
    // the page borks because it can't find certain query values because they have not ben completed yet.
    Promise.all([
        appliances_query,
        customer_query,
        desktop_network_query,
        email_ps_questions_query,
        email_se_questions_query,
        import_query,
        journaling_query,
        poc_query,
        usage_query
    ]).then((result) => {
        // Although async by nature, Promise.all aggregates the output to the order of the promises in the list.

        var responses = {
            appliance_questions: result[0],
            customer: result[1],
            desktop_network_questions: result[2],
            email_ps_questions: result[3],
            email_se_questions: result[4],
            import_questions: result[5],
            journaling_questions: result[6],
            poc_questions: result[7],
            usage_questions: result[8]
        };

        res.render("show", responses);
        for (var key in responses) {
            if (responses.hasOwnProperty(key) && (responses[key] == undefined || responses[key] == null)) {
                console.log("%s is %s", key, responses[key]);
            }
        }
        console.log("---");
    });
});

module.exports = router;