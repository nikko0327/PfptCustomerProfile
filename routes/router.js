var express = require("express");
var router = express.Router();
// var User = require("../models/user");
var mongoose = require("mongoose");

// var jwt = require('jsonwebtoken');
// var jwt_secret = 'Just like the stars that have faded, we too, will fade one day and become one with the stars.';



/**
*   ============================ IMPORTANT ============================
*   Use /customerprofile in production if nginx is present, use "" locally/in localhost
*/

var append = "/customerprofile";
// var append = "";

var ldap_auth = require("ldapjs");

var Customer = require("../models/customer");
var ApplianceQuestions = require("../models/appliances");
var DesignSummaryQuestions = require("../models/design_summary");
var DesktopNetworkQuestions = require("../models/desktop_network");
var EmailPSQuestions = require("../models/email_ps");
var EmailSEQuestions = require("../models/email_se");
var JournalingQuestions = require("../models/journaling");
var OtherDataSourcesQuestions = require("../models/other_data_sources");
var UsageQuestions = require("../models/usage");
var ImportQuestions = require("../models/import");
var POCQuestions = require("../models/poc");
var RFEQuestions = require("../models/rfe");
var FinservSupervisionQuestions = require("../models/finserv_supervision");
//var User = require("../models/user");

// For authenticating cookies/sessions.
function authenticate_session(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect(append + "/login");
    }
}

// LOGOUT AND KILL SESSION
router.post("/logout", function (req, res) {
    var user = req.session.user;
    req.session.destroy(() => {
        if (user) {
            console.log("Logging out: " + user);
        }
    });

    res.redirect(append + "/login");
});

//Entry point for the app startup
router.get("/", function (req, res) {
    res.redirect(append + "/index");
});

//NEW ROUTE
router.get("/new", authenticate_session, function (req, res) {
    res.render("new", { error_message: undefined });
});

//
// // REGISTER
// router.get("/register", function (req, res) {
//     res.render("register", {error_message: undefined});
// });
//
// // POST REGISTER
// router.post("/register", function (req, res) {
//     if (!req.body.registration_info["username"] || !req.body.registration_info["password"] || !req.body.registration_info["confirm_password"]) {
//         res.render("register", {error_message: "Please enter all fields."});
//     } else {
//         if (req.body.registration_info["password"] == req.body.registration_info["confirm_password"]) {
//             async function register_user() {
//                 var hashed_password = await bcrypt.hash(req.body.registration_info["password"], 10);
//                 await User.create({username: req.body.registration_info["username"], password: hashed_password});
//             }
//
//             register_user().then(() => {
//                 res.redirect( append + "/login");
//             }).catch((error) => {
//                 if (error["code"] == 11000) {
//                     console.log("-- Duplicate entry for user: " + req.body.registration_info["username"]);
//                     // Send pop up alert to HTML here
//                     res.render("register", {error_message: "User already exists: " + req.body.registration_info["username"]});
//                 } else {
//                     console.log(error);
//                 }
//             });
//         } else {
//             res.render("register", {error_message: "Passwords are not equal."});
//         }
//     }
// });

// LOGIN
router.get("/login", function (req, res) {
    res.render("login", { fail: false });
});

// POST LOGIN
router.post("/login", function (req, res) {
    if (!req.body.login || req.body.login == null) {
        res.render("login", { fail: true });
    } else {
        var client = ldap_auth.createClient({
            url: "ldap://ldap.corp.proofpoint.com"
            // url: "ldaps://ldaps.corp.proofpoint.com"
        });

        var domain_name = "uid=" + req.body.login["username"] + ",ou=People,dc=extreme-email,dc=com";

        // rejectUnauthorized is needed with client.starttls unless we can verify certs
        var options = {
            //ca: [fs.readFileSync('cert.pem')]
            rejectUnauthorized: false
        };

        //console.log("Domain info: " + domain_name);

        // Make the ldap secure, even though we need a secure network, additional safeguard.
        client.starttls(options, [], (error) => {
            if (error) {
                console.log("starttls error:\n" + error);
            } else {
                client.bind(domain_name, req.body.login["password"], (error) => {

                    // Close the connection
                    client.unbind(function (error) {
                        if (error) {
                            console.log("-- LDAP unbinding error:\n" + error)
                        }
                    });

                    if (error) {
                        // console.log(error);
                        console.log("Failed attempt to login using username: " + req.body.login["username"]);
                        res.render("login", { fail: true });


                    } else {
                        console.log("Logged in: " + req.body.login["username"]);
                        req.session.user = req.body.login["username"];
                        res.redirect(append + "/index");
                    }
                });
            }
        });
    }


    // User.findOne({username: req.body.login["username"]}).then((result) => {
    //     if (result == null) {
    //         res.render("login", {fail: true});
    //     } else {
    //         bcrypt.compare(req.body.login["password"], result["password"], function (err, validated) {
    //             if (validated) {
    //                 // Do auth/sessions here
    //                 console.log("Logged in: " + req.body.login["username"]);
    //                 req.session.user = req.body.login["username"];
    //                 res.redirect( append + "/index");
    //             } else {
    //                 res.render("login", {fail: true});
    //             }
    //         });
    //     }
    // }).catch((error) => {
    //     if (error) {
    //         res.render("login", {fail: true});
    //     }
    // });
});

//CREATE ROUTE
router.post("/new", authenticate_session, function (req, res) {
    if (req == undefined || req == null) {
        console.log("req is empty");
    } else {
        console.log("- Trying to create new customer...");

        Customer.create(req.body.customer, (error) => {
            if (error) {
                if (error["code"] == 11000) {
                    console.log("-- Duplicate entry for customer: '" + req.body.customer["name"] + "'");
                    // Send pop up alert to HTML here
                    res.render('new', { error_message: "Duplicate entry for customer: " + req.body.customer["name"] });
                } else {
                    console.log(error);
                }
            } else {
                ApplianceQuestions.create({ name: req.body.customer["name"] });
                DesignSummaryQuestions.create({ name: req.body.customer["name"] });
                DesktopNetworkQuestions.create({ name: req.body.customer["name"] });
                EmailPSQuestions.create({ name: req.body.customer["name"] });
                EmailSEQuestions.create({ name: req.body.customer["name"] });
                ImportQuestions.create({ name: req.body.customer["name"] });
                JournalingQuestions.create({ name: req.body.customer["name"] });
                OtherDataSourcesQuestions.create({ name: req.body.customer["name"] });
                POCQuestions.create({ name: req.body.customer["name"] });
                RFEQuestions.create({ name: req.body.customer["name"] });
                UsageQuestions.create({ name: req.body.customer["name"] });
                FinservSupervisionQuestions.create({ name: req.body.customer["name"] });

                res.redirect(append + "/index");
                console.log("Creation of customer '" + req.body.customer["name"] + "' successful.");
            }
        });
    }

    // Customer.create(req.body.customer).then(() => {
    //     ApplianceQuestions.create({name: req.body.customer["name"]});
    //     DesignSummaryQuestions.create({name: req.body.customer["name"]});
    //     DesktopNetworkQuestions.create({name: req.body.customer["name"]});
    //     EmailPSQuestions.create({name: req.body.customer["name"]});
    //     EmailSEQuestions.create({name: req.body.customer["name"]});
    //     ImportQuestions.create({name: req.body.customer["name"]});
    //     JournalingQuestions.create({name: req.body.customer["name"]});
    //     OtherDataSourcesQuestions.create({name: req.body.customer["name"]});
    //     POCQuestions.create({name: req.body.customer["name"]});
    //     RFEQuestions.create({name: req.body.customer["name"]});
    //     UsageQuestions.create({name: req.body.customer["name"]});
    //
    //     res.redirect( append + "/index");
    //     console.log("Creation of customer " + req.body.customer["name"] + " successful.");
    // }).catch((error) => {
    //     if (error["code"] == 11000) {
    //         console.log("-- Duplicate entry for customer: " + req.body.customer["name"]);
    //         // Send pop up alert to HTML here
    //         res.render("new", {error_message: "Duplicate."});
    //     } else {
    //         console.log(error);
    //     }
    // });
});

//UPDATE ROUTE
router.put("/index/:id", authenticate_session, function (req, res) {
    // Considering changing to else ifs

    // For updating name, make a ton of promises and execute them, THEN render the page.
    if (req.body.customer != undefined && req.body.customer != null) {
        console.log("- Attempting to update customer information...");
        //console.log(req.body.customer.contacts);

        // Make a bunch of await calls and wait for the queries to finish.
        async function updateID() {
            await Customer.findOneAndUpdate({ name: req.params.id }, req.body.customer).exec();
            await ApplianceQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await DesignSummaryQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await DesktopNetworkQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await EmailPSQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await EmailSEQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await ImportQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await JournalingQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await OtherDataSourcesQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await POCQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await RFEQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await UsageQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            await FinservSupervisionQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
        }

        // Only if all the queries finish, redirect the page to the new customer name.
        updateID().then(() => {
            //console.log("Going to " + "/index/" + encodeURIComponent(req.body.customer["name"]));
            res.redirect(append + "/index/" + encodeURIComponent(req.body.customer["name"]));
        }).catch((error) => {
            console.log(error);
            // If an error occurs, catch the error.
            if (error["code"] == 11000) { // Dupe ID
                console.log("-- Duplicate key for customer: " + req.body.customer["name"]);
                res.status(409);
                res.send("Dupe primary key, customer already exists.");
            } else {
                console.log(error + "\n---");
            }
        });
    }

    // Updating appliance questions
    if (req.body.appliance_questions != undefined && req.body.appliance_questions != null) {
        console.log("- Attempting to update Appliance Questions...");
        ApplianceQuestions.findOneAndUpdate({ name: req.params.id }, req.body.appliance_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating design summary questions
    if (req.body.design_summary_questions != undefined && req.body.design_summary_questions != null) {
        console.log("- Attempting to update Design Summary...");
        DesignSummaryQuestions.findOneAndUpdate({ name: req.params.id }, req.body.design_summary_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating desktop network questions
    if (req.body.desktop_network_questions != undefined && req.body.desktop_network_questions != null) {
        console.log("- Attempting to update Desktop Network Questions...");
        DesktopNetworkQuestions.findOneAndUpdate({ name: req.params.id }, req.body.desktop_network_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Email SE Questions
    if (req.body.email_se_questions != undefined && req.body.email_se_questions != null) {
        console.log("- Attempting to update Email Systems SE Questions...");
        EmailSEQuestions.findOneAndUpdate({ "name": req.params.id }, req.body.email_se_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log(req.body.email_se_questions);
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Email PS Questions
    if (req.body.email_ps_questions != undefined && req.body.email_ps_questions != null) {
        console.log("- Attempting to update Email Systems PS Questions...");
        EmailPSQuestions.findOneAndUpdate({ "name": req.params.id }, req.body.email_ps_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Import Questions
    if (req.body.import_questions != undefined && req.body.import_questions != null) {
        console.log("- Attempting to update Import information...");
        ImportQuestions.findOneAndUpdate({ "name": req.params.id }, req.body.import_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Journaling questions
    if (req.body.journaling_questions != undefined && req.body.journaling_questions != null) {
        console.log("- Attempting to update Journalling information...");
        JournalingQuestions.findOneAndUpdate({ "name": req.params.id }, req.body.journaling_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Other Data Sources Questions
    if (req.body.other_data_source_questions != undefined && req.body.other_data_source_questions != null) {
        console.log("- Attempting to update Other Data Sources Questions...");
        OtherDataSourcesQuestions.findOneAndUpdate({ name: req.params.id }, req.body.other_data_source_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating POC Questions
    if (req.body.poc_questions != undefined && req.body.poc_questions != null) {
        console.log("- Attempting to update POC information...");
        POCQuestions.findOneAndUpdate({ name: req.params.id }, req.body.poc_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating RFE Questions
    if (req.body.rfe_questions != undefined && req.body.rfe_questions != null) {
        console.log("- Attempting to update RFE information...");
        RFEQuestions.findOneAndUpdate({ name: req.params.id }, req.body.rfe_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Usage Questions
    if (req.body.usage_questions != undefined && req.body.usage_questions != null) {
        console.log("- Attempting to update Usage Questions...");
        UsageQuestions.findOneAndUpdate({ name: req.params.id }, req.body.usage_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Finserv Supervision Questions
    if (req.body.finserv_supervision_questions != undefined && req.body.finserv_supervision_questions != null) {
        console.log("- Attempting to update Finserv Supervision Questions...");
        FinservSupervisionQuestions.findOneAndUpdate({ name: req.params.id }, req.body.finserv_supervision_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }
});

//INDEX ROUTE
router.get("/index", authenticate_session, function (req, res) {

    Customer.find({}).then((customers) => {
        res.render("index", { customers: customers });
    }).catch((error) => {
        console.log("An error has occurred.");
        console.log(error);
    });

    // Customer.find({}, function (err, customers) {
    //     if (err) {
    //         console.log("An error has occurred.");
    //         console.log(err);
    //     } else {
    //         res.render("index", {customers: customers});
    //     }
    // });
});

// Delete a customer profile
router.delete("/index/:id", authenticate_session, function (req, res) {
    console.log("-- Attemping to delete customer " + req.params.id);

    async function delete_customer(search_term) {
        ApplianceQuestions.findOneAndRemove(search_term).exec();
        Customer.findOneAndRemove(search_term).exec();
        DesignSummaryQuestions.findOneAndRemove(search_term).exec();
        DesktopNetworkQuestions.findOneAndRemove(search_term).exec();
        EmailPSQuestions.findOneAndRemove(search_term).exec();
        EmailSEQuestions.findOneAndRemove(search_term).exec();
        ImportQuestions.findOneAndRemove(search_term).exec();
        JournalingQuestions.findOneAndRemove(search_term).exec();
        OtherDataSourcesQuestions.findOneAndRemove(search_term).exec();
        POCQuestions.findOneAndRemove(search_term).exec();
        RFEQuestions.findOneAndRemove(search_term).exec();
        UsageQuestions.findOneAndRemove(search_term).exec();
        FinservSupervisionQuestions.findOneAndRemove(search_term).exec();
    }

    delete_customer({ "name": req.params.id }).then((result) => {
        res.redirect(append + "/index");
    }).catch((error) => {
        console.log(error);
        res.redirect(append + "/index");
    });
});

// SHOW ROUTE
router.get("/index/:id", authenticate_session, function (req, res) {

    // ATTEMPTING TO ESCAPE CALLBACK HELL: ESCAPED B O I S

    // var appliances_query = ApplianceQuestions.findOne({"name": req.params.id}).exec();
    // var customer_query = Customer.findOne({"name": req.params.id}).exec();
    // var desktop_network_query = DesktopNetworkQuestions.findOne({"name": req.params.id}).exec();
    // var email_ps_questions_query = EmailPSQuestions.findOne({"name": req.params.id}).exec();
    // var email_se_questions_query = EmailSEQuestions.findOne({"name": req.params.id}).exec();
    // var import_query = ImportQuestions.findOne({"name": req.params.id}).exec();
    // var journaling_query = JournalingQuestions.findOne({"name": req.params.id}).exec();
    // var other_data_sources_query = OtherDataSourcesQuestions.findOne({"name": req.params.id}).exec();
    // var poc_query = POCQuestions.findOne({"name": req.params.id}).exec();
    // var usage_query = UsageQuestions.findOne({"name": req.params.id}).exec();

    // Query every table and grab the results in a blocking manner
    async function query(search_term) {
        var questionnaire = {};
        questionnaire["customer"] = await Customer.findOne(search_term).exec();
        if (questionnaire["customer"]) {
            questionnaire["appliance_questions"] = await ApplianceQuestions.findOne(search_term).exec();
            //questionnaire["customer"] = await Customer.findOne(search_term).exec();
            questionnaire["design_summary_questions"] = await DesignSummaryQuestions.findOne(search_term).exec();
            questionnaire["desktop_network_questions"] = await DesktopNetworkQuestions.findOne(search_term).exec();
            questionnaire["email_ps_questions"] = await EmailPSQuestions.findOne(search_term).exec();
            questionnaire["email_se_questions"] = await EmailSEQuestions.findOne(search_term).exec();
            questionnaire["import_questions"] = await ImportQuestions.findOne(search_term).exec();
            questionnaire["journaling_questions"] = await JournalingQuestions.findOne(search_term).exec();
            questionnaire["other_data_source_questions"] = await OtherDataSourcesQuestions.findOne(search_term).exec();
            questionnaire["poc_questions"] = await POCQuestions.findOne(search_term).exec();
            questionnaire["rfe_questions"] = await RFEQuestions.findOne(search_term).exec();
            questionnaire["usage_questions"] = await UsageQuestions.findOne(search_term).exec();
            //questionnaire["finserv_supervision_questions"] = await FinservSupervisionQuestions.findOne(search_term).exec();
            questionnaire["finserv_supervision_questions"] = await FinservSupervisionQuestions.findOneOrCreate(search_term);
        }
        return questionnaire;
    }

    // RENDER ALL THE THINGS
    query({ "name": req.params.id }).then((result) => {
        if (result["customer"]) {
            res.render("show", result);
        } else {
            res.redirect(append + "/");
        }
    }).catch((error) => {
        console.log(error);
        res.redirect(append + "/")
    });
});

module.exports = router;