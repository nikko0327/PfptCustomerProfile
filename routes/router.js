var express = require("express");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var mongoxlsx = require("mongo-xlsx");
var XlsxPopulate = require("xlsx-populate");
var _ = require("lodash");
var multer = require("multer");
var upload = multer({dest: "./public/files"});
var fs = require("fs");
var fse = require("fs-extra");
var glob = require("glob");
var path = require("path");
var router = express.Router();
require("dotenv").config();

// var jwt = require('jsonwebtoken');
// var jwt_secret = 'Just like the stars that have faded, we too, will fade one day and become one with the stars.';



/**
*   ============================ IMPORTANT ============================
*   Use /customerprofile in production if nginx is present, use "" locally/in localhost
*/

// var append = "/customerprofile";
var append = "";

var ldap_auth = require("ldapjs");

var {Customer} = require("../models/customer");
var {CustomerVersions} = require("../models/customer");
var {SizingQuestions} = require("../models/sizing");
var {SizingQuestionsVersions} = require("../models/sizing");
var {DesktopNetworkQuestions} = require("../models/desktop_network");
var {DesktopNetworkQuestionsVersions} = require("../models/desktop_network");
var {EmailQuestions} = require("../models/email");
var {EmailQuestionsVersions} = require("../models/email");
var {ConnectorPlatformQuestions} = require("../models/connector_platform");
var {ConnectorPlatformQuestionsVersions} = require("../models/connector_platform");
var {UsageQuestions} = require("../models/usage");
var {UsageQuestionsVersions} = require("../models/usage");
var {ImportQuestions} = require("../models/import");
var {ImportQuestionsVersions} = require("../models/import");
var {POCQuestions} = require("../models/poc");
var {POCQuestionsVersions} = require("../models/poc");
var {RFEQuestions} = require("../models/rfe");
var {RFEQuestionsVersions} = require("../models/rfe");
var {SupervisionQuestions} = require("../models/supervision");
var {SupervisionQuestionsVersions} = require("../models/supervision");
var User = require("../models/user");

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


// REGISTER
router.get("/register", function (req, res) {
    res.render("register", {error_message: undefined});
});

// POST REGISTER
router.post("/register", function (req, res) {
    if (!req.body.registration_info["username"] || !req.body.registration_info["password"] || !req.body.registration_info["confirm_password"]) {
        res.render("register", {error_message: "Please enter all fields."});
    }
    // if (req.body.registration_info["code"] != process.env.CODE) {
    //   res.render("register", {error_message: "Code is incorrect."})
    // }
    else {
        if ((req.body.registration_info["password"] == req.body.registration_info["confirm_password"]) && (req.body.registration_info["code"] == process.env.CODE)) {
            async function register_user() {
                var hashed_password = await bcrypt.hash(req.body.registration_info["password"], 10);
                await User.create({username: req.body.registration_info["username"], password: hashed_password});
            }

            register_user().then(() => {
                res.redirect( append + "/login");
            }).catch((error) => {
                if (error["code"] == 11000) {
                    console.log("-- Duplicate entry for user: " + req.body.registration_info["username"]);
                    // Send pop up alert to HTML here
                    res.render("register", {error_message: "User already exists: " + req.body.registration_info["username"]});
                } else {
                    console.log(error);
                }
            });
        } else {
            res.render("register", {error_message: "Passwords are not equal."});
        }
    }
});

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
                        User.findOne({username: req.body.login["username"]}).then((result) => {
                            if (result == null) {
                                res.render("login", {fail: true});
                            } else {
                                bcrypt.compare(req.body.login["password"], result["password"], function (err, validated) {
                                    if (validated) {
                                        // Do auth/sessions here
                                        console.log("Logged in: " + req.body.login["username"]);
                                        req.session.user = req.body.login["username"];
                                        res.redirect( append + "/index");
                                    } else {
                                        res.render("login", {fail: true});
                                    }
                                });
                            }
                        }).catch((error) => {
                            if (error) {
                                res.render("login", {fail: true});
                            }
                        });
                    } else {
                        console.log("Logged in: " + req.body.login["username"]);
                        req.session.user = req.body.login["username"];
                        res.redirect(append + "/index");
                    }
                });
            }
        });
    }
});

//CREATE ROUTE
router.post("/new", authenticate_session, function (req, res) {
    if (req == undefined || req == null) {
        console.log("req is empty");
    } else {
        console.log("- Trying to create new customer...");

        Customer.create(req.body.customer)
        .then(customer => {
          //update the created by field and the updated by field
          customer.createdBy = req.session.user;
          customer.updatedBy = req.session.user;
          customer.save();

          //update the version array in the versioned collection
          CustomerVersions.create({ refId: customer._id, versions: [customer] });
          SizingQuestions.create({ name: req.body.customer["name"] })
          .then(questions => {
            SizingQuestionsVersions.create({ refId: customer._id, versions: [questions] });
          })
          DesktopNetworkQuestions.create({ name: req.body.customer["name"] })
          .then(questions => {
            DesktopNetworkQuestionsVersions.create({ refId: customer._id, versions: [questions] });
          })
          EmailQuestions.create({ name: req.body.customer["name"] })
          .then(questions => {
            EmailQuestionsVersions.create({ refId: customer._id, versions: [questions] });
          })
          ImportQuestions.create({ name: req.body.customer["name"] })
          .then(questions => {
            ImportQuestionsVersions.create({ refId: customer._id, versions: [questions] });
          })
          ConnectorPlatformQuestions.create({ name: req.body.customer["name"] })
          .then(questions => {
            ConnectorPlatformQuestionsVersions.create({ refId: customer._id, versions: [questions] });
          })
          POCQuestions.create({ name: req.body.customer["name"] })
          .then(questions => {
            POCQuestionsVersions.create({ refId: customer._id, versions: [questions] });
          })
          RFEQuestions.create({ name: req.body.customer["name"] })
          .then(questions => {
            RFEQuestionsVersions.create({ refId: customer._id, versions: [questions] });
          })
          UsageQuestions.create({ name: req.body.customer["name"] })
          .then(questions => {
            UsageQuestionsVersions.create({ refId: customer._id, versions: [questions] });
          })
          SupervisionQuestions.create({ name: req.body.customer["name"] })
          .then(questions => {
            SupervisionQuestionsVersions.create({ refId: customer._id, versions: [questions] });
          })

          // var transporter = nodemailer.createTransport({
          //   service: 'outlook',
          //   auth: {
          //     user: process.env.USER,
          //     pass: process.env.PASS
          //   }
          // });
          // var mailOptions = {
          //   from: 'DriveTracking@proofpoint.com',
          //   to: 'anchen@proofpoint.com, nlee@proofpoint.com',
          //   subject: 'Customer Created',
          //   text: `Customer Name: ${customer.name}, Created At: ${customer.createdAt}, Created By: ${customer.createdBy}`
          // };
          // transporter.sendMail(mailOptions, function(error, info) {
          //   if (error) {
          //     console.log(error);
          //   }
          //   else {
          //     console.log(info.response);
          //   }
          // });

          res.redirect(append + "/index");
          console.log("Creation of customer '" + req.body.customer["name"] + "' successful.");
        })
        .catch(error => {
          if (error["code"] == 11000) {
              console.log("-- Duplicate entry for customer: '" + req.body.customer["name"] + "'");
              // Send pop up alert to HTML here
              res.render('new', { error_message: "Duplicate entry for customer: " + req.body.customer["name"] });
          } else {
              console.log(error);
          }
        })
    }
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
            // await SizingQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            // await DesktopNetworkQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            // await EmailQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            // await ImportQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            // await ConnectorPlatformQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            // await POCQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            // await RFEQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            // await UsageQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            // await SupervisionQuestions.findOneAndUpdate({ name: req.params.id }, { "name": req.body.customer["name"] }).exec();
            // if (req.params.id != req.body.customer["name"]) {
            //   Customer.findOne({ name: req.body.customer["name"] })
            //   .then(customer => {
            //     //update the version array in the versioned collection
            //     CustomerVersions.findOne({ refId: customer._id })
            //     .then(version => {
            //       version.versions.forEach(version => {
            //         version.name = req.body.customer["name"];
            //       })
            //       version.save();
            //     })
            //     SizingQuestions.findOne({ name: req.body.customer["name"] })
            //     .then(questions => {
            //       SizingQuestionsVersions.findOne({ refId: customer._id })
            //       .then(version => {
            //         version.versions.forEach(version => {
            //           version.name = req.body.customer["name"];
            //         })
            //         version.save();
            //       })
            //     })
            //     DesktopNetworkQuestions.findOne({ name: req.body.customer["name"] })
            //     .then(questions => {
            //       DesktopNetworkQuestionsVersions.findOne({ refId: customer._id })
            //       .then(version => {
            //         version.versions.forEach(version => {
            //           version.name = req.body.customer["name"];
            //         })
            //         version.save();
            //       })
            //     })
            //     EmailQuestions.findOne({ name: req.body.customer["name"] })
            //     .then(questions => {
            //       EmailQuestionsVersions.findOne({ refId: customer._id })
            //       .then(version => {
            //         version.versions.forEach(version => {
            //           version.name = req.body.customer["name"];
            //         })
            //         version.save();
            //       })
            //     })
            //     ImportQuestions.findOne({ name: req.body.customer["name"] })
            //     .then(questions => {
            //       ImportQuestionsVersions.findOne({ refId: customer._id })
            //       .then(version => {
            //         version.versions.forEach(version => {
            //           version.name = req.body.customer["name"];
            //         })
            //         version.save();
            //       })
            //     })
            //     ConnectorPlatformQuestions.findOne({ name: req.body.customer["name"] })
            //     .then(questions => {
            //       ConnectorPlatformQuestionsVersions.findOne({ refId: customer._id })
            //       .then(version => {
            //         version.versions.forEach(version => {
            //           version.name = req.body.customer["name"];
            //         })
            //         version.save();
            //       })
            //     })
            //     POCQuestions.findOne({ name: req.body.customer["name"] })
            //     .then(questions => {
            //       POCQuestionsVersions.findOne({ refId: customer._id })
            //       .then(version => {
            //         version.versions.forEach(version => {
            //           version.name = req.body.customer["name"];
            //         })
            //         version.save();
            //       })
            //     })
            //     RFEQuestions.findOne({ name: req.body.customer["name"] })
            //     .then(questions => {
            //       RFEQuestionsVersions.findOne({ refId: customer._id })
            //       .then(version => {
            //         version.versions.forEach(version => {
            //           version.name = req.body.customer["name"];
            //         })
            //         version.save();
            //       })
            //     })
            //     UsageQuestions.findOne({ name: req.body.customer["name"] })
            //     .then(questions => {
            //       UsageQuestionsVersions.findOne({ refId: customer._id })
            //       .then(version => {
            //         version.versions.forEach(version => {
            //           version.name = req.body.customer["name"];
            //         })
            //         version.save();
            //       })
            //     })
            //     SupervisionQuestions.findOne({ name: req.body.customer["name"] })
            //     .then(questions => {
            //       SupervisionQuestionsVersions.findOne({ refId: customer._id })
            //       .then(version => {
            //         version.versions.forEach(version => {
            //           version.name = req.body.customer["name"];
            //         })
            //         version.save();
            //       })
            //     })
            //   })
            // }
        }

        // Only if all the queries finish, redirect the page to the new customer name.
        updateID().then(() => {
            Customer.findOne({ name: req.params.id })
            .then(customer => {
              //update the updated by field
              customer.updatedBy = req.session.user;
              customer.save();

              // var transporter = nodemailer.createTransport({
              //   service: 'outlook',
              //   auth: {
              //     user: process.env.USER,
              //     pass: process.env.PASS
              //   }
              // });
              // var mailOptions = {
              //   from: 'DriveTracking@proofpoint.com',
              //   to: 'anchen@proofpoint.com, nlee@proofpoint.com',
              //   subject: 'Customer Updated',
              //   text: `Customer Name: ${customer.name}, Updated At: ${customer.updatedAt}, Updated By: ${customer.updatedBy}`
              // };
              // transporter.sendMail(mailOptions, function(error, info) {
              //   if (error) {
              //     console.log(error);
              //   }
              //   else {
              //     console.log(info.response);
              //   }
              // });
            })
            .catch(e => {
              console.log(e);
            })
            //console.log("Going to " + "/index/" + encodeURIComponent(req.body.customer["name"]));
            res.redirect(append + "/index/" + encodeURIComponent(req.body.customer["name"]));
        }).catch((error) => {
            //console.log(error);
            // If an error occurs, catch the error.
            if (error["code"] == 11000) { // Dupe ID
                console.log("-- Duplicate key for customer: " + req.body.customer["name"]);
                res.status(409);
                res.send("Dupe primary key, customer already exists.");
            } else {
                console.log(error.error_message + "\n---");
            }
        });
    }

    // Updating sizing questions
    if (req.body.sizing_questions != undefined && req.body.sizing_questions != null) {
        console.log("- Attempting to update Sizing Questions...");
        SizingQuestions.findOneAndUpdate({ name: req.params.id }, req.body.sizing_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            updateVersions({ name: req.body.sizing_questions["name"] });
            // res.status(200).json("{}");
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
            updateVersions({ name: req.body.desktop_network_questions["name"] });
            // res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Email Questions
    if (req.body.email_questions != undefined && req.body.email_questions != null) {
        console.log("- Attempting to update Email Systems Questions...");
        EmailQuestions.findOneAndUpdate({ "name": req.params.id }, req.body.email_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            //console.log(req.body.email_questions);
            console.log("Done");
            updateVersions({ name: req.body.email_questions["name"] });
            // res.status(200).json("{}");
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
            updateVersions({ name: req.body.import_questions["name"] });
            // res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Other Data Sources Questions
    if (req.body.connector_platform_questions != undefined && req.body.connector_platform_questions != null) {
        console.log("- Attempting to update Other Data Sources Questions...");
        ConnectorPlatformQuestions.findOneAndUpdate({ name: req.params.id }, req.body.connector_platform_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            updateVersions({ name: req.body.connector_platform_questions["name"] });
            // res.status(200).json("{}");
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
            updateVersions({ name: req.body.poc_questions["name"] });
            // res.status(200).json("{}");
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
            updateVersions({ name: req.body.rfe_questions["name"] });
            // res.status(200).json("{}");
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
            updateVersions({ name: req.body.usage_questions["name"] });
            // res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    // Updating Finserv Supervision Questions
    if (req.body.supervision_questions != undefined && req.body.supervision_questions != null) {
        console.log("- Attempting to update Finserv Supervision Questions...");
        SupervisionQuestions.findOneAndUpdate({ name: req.params.id }, req.body.supervision_questions).then(() => {
            //res.redirect( append + "/index/" + encodeURIComponent(req.params.id));
            console.log("Done");
            updateVersions({ name: req.body.supervision_questions["name"] });
            // res.status(200).json("{}");
        }).catch((error) => {
            console.log(error);
            res.redirect(append + "/index");
        });
    }

    function updateVersions(search_term) {
      Customer.findOne(search_term)
      .then(customer => {
        //update the version array in the versioned collection
        CustomerVersions.findOne({ refId: customer._id })
        .then(version => {
          version.versions.push(customer);
          version.save();
        })
        SizingQuestions.findOne(search_term)
        .then(questions => {
          SizingQuestionsVersions.findOne({ refId: customer._id })
          .then(version => {
            version.versions.push(questions);
            version.save();
          })
        })
        DesktopNetworkQuestions.findOne(search_term)
        .then(questions => {
          DesktopNetworkQuestionsVersions.findOne({ refId: customer._id })
          .then(version => {
            version.versions.push(questions);
            version.save();
          })
        })
        EmailQuestions.findOne(search_term)
        .then(questions => {
          EmailQuestionsVersions.findOne({ refId: customer._id })
          .then(version => {
            version.versions.push(questions);
            version.save();
          })
        })
        ImportQuestions.findOne(search_term)
        .then(questions => {
          ImportQuestionsVersions.findOne({ refId: customer._id })
          .then(version => {
            version.versions.push(questions);
            version.save();
          })
        })
        ConnectorPlatformQuestions.findOne(search_term)
        .then(questions => {
          ConnectorPlatformQuestionsVersions.findOne({ refId: customer._id })
          .then(version => {
            version.versions.push(questions);
            version.save();
          })
        })
        POCQuestions.findOne(search_term)
        .then(questions => {
          POCQuestionsVersions.findOne({ refId: customer._id })
          .then(version => {
            version.versions.push(questions);
            version.save();
          })
        })
        RFEQuestions.findOne(search_term)
        .then(questions => {
          RFEQuestionsVersions.findOne({ refId: customer._id })
          .then(version => {
            version.versions.push(questions);
            version.save();
          })
        })
        UsageQuestions.findOne(search_term)
        .then(questions => {
          UsageQuestionsVersions.findOne({ refId: customer._id })
          .then(version => {
            version.versions.push(questions);
            version.save();
          })
        })
        SupervisionQuestions.findOne(search_term)
        .then(questions => {
          SupervisionQuestionsVersions.findOne({ refId: customer._id })
          .then(version => {
            version.versions.push(questions);
            version.save();
          })
        })
      })
    }

    updateVersions({ name: req.params.id });
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
        var refId = await Customer.findOne({ name: req.params.id });
        SizingQuestions.findOneAndRemove(search_term).exec();
        SizingQuestionsVersions.findOneAndRemove({ refId: refId }).exec();
        Customer.findOneAndRemove(search_term).exec();
        CustomerVersions.findOneAndRemove({ refId: refId }).exec();
        DesktopNetworkQuestions.findOneAndRemove(search_term).exec();
        DesktopNetworkQuestionsVersions.findOneAndRemove({ refId: refId }).exec();
        EmailQuestions.findOneAndRemove(search_term).exec();
        EmailQuestionsVersions.findOneAndRemove({ refId: refId }).exec();
        ImportQuestions.findOneAndRemove(search_term).exec();
        ImportQuestionsVersions.findOneAndRemove({ refId: refId }).exec();
        ConnectorPlatformQuestions.findOneAndRemove(search_term).exec();
        ConnectorPlatformQuestionsVersions.findOneAndRemove({ refId: refId }).exec();
        POCQuestions.findOneAndRemove(search_term).exec();
        POCQuestionsVersions.findOneAndRemove({ refId: refId }).exec();
        RFEQuestions.findOneAndRemove(search_term).exec();
        RFEQuestionsVersions.findOneAndRemove({ refId: refId }).exec();
        UsageQuestions.findOneAndRemove(search_term).exec();
        UsageQuestionsVersions.findOneAndRemove({ refId: refId }).exec();
        SupervisionQuestions.findOneAndRemove(search_term).exec();
        SupervisionQuestionsVersions.findOneAndRemove({ refId: refId }).exec();
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
    //delete files created by import
    fse.emptyDir("./public/files", function(err) {
      if (err) {
        console.log(err);
      }
    })

    //delete files created by export
    glob("*.xlsx", function(err, files) {
      files.forEach(file => {
        if (err) {
          console.log(err);
        }
        fse.remove(file, function(err) {
          if (err) {
            console.log(err);
          }
        })
      })
    })

    // ATTEMPTING TO ESCAPE CALLBACK HELL: ESCAPED B O I S

    // var sizing_query = SizingQuestions.findOne({"name": req.params.id}).exec();
    // var customer_query = Customer.findOne({"name": req.params.id}).exec();
    // var desktop_network_query = DesktopNetworkQuestions.findOne({"name": req.params.id}).exec();
    // var email_ps_questions_query = EmailPSQuestions.findOne({"name": req.params.id}).exec();
    // var email_se_questions_query = EmailSEQuestions.findOne({"name": req.params.id}).exec();
    // var import_query = ImportQuestions.findOne({"name": req.params.id}).exec();
    // var journaling_query = JournalingQuestions.findOne({"name": req.params.id}).exec();
    // var connector_platform_query = ConnectorPlatformQuestions.findOne({"name": req.params.id}).exec();
    // var poc_query = POCQuestions.findOne({"name": req.params.id}).exec();
    // var usage_query = UsageQuestions.findOne({"name": req.params.id}).exec();

    // Query every table and grab the results in a blocking manner
    async function query(search_term) {
        var questionnaire = {};
        questionnaire["customer"] = await Customer.findOne(search_term).exec();
        if (questionnaire["customer"]) {
            questionnaire["sizing_questions"] = await SizingQuestions.findOne(search_term).exec();
            //questionnaire["customer"] = await Customer.findOne(search_term).exec();
            questionnaire["desktop_network_questions"] = await DesktopNetworkQuestions.findOne(search_term).exec();
            questionnaire["email_questions"] = await EmailQuestions.findOne(search_term).exec();
            questionnaire["import_questions"] = await ImportQuestions.findOne(search_term).exec();
            questionnaire["connector_platform_questions"] = await ConnectorPlatformQuestions.findOne(search_term).exec();
            questionnaire["poc_questions"] = await POCQuestions.findOne(search_term).exec();
            questionnaire["rfe_questions"] = await RFEQuestions.findOne(search_term).exec();
            questionnaire["usage_questions"] = await UsageQuestions.findOne(search_term).exec();
            questionnaire["supervision_questions"] = await SupervisionQuestions.findOne(search_term).exec();
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

router.post("/import/:id", authenticate_session, upload.single("file"), function (req, res) {
  //convert Excel spreadsheets to MongoDB data
  function convertData(collection, section) {
    collection.findOne({ name: req.params.id })
    .then(questions => {
      var content = fs.readFileSync(path.join(__dirname, "../models", `${section}.json`), 'utf8');
      var model = JSON.parse(content);
      mongoxlsx.xlsx2MongoData(`${section}.xlsx`, model, function(err, data) {
        if (err) {
          console.log(err);
        }
        else {
          data = data[0];
          data = _.omit(data, ["name"]);
          collection.findOneAndUpdate({ name: req.params.id }, data)
          .then(questions => {

          })
          .catch(e => {
            console.log(e);
          })
        }
      })
    })
    .catch(e => {
      console.log(e);
    })
  }

  //split one workbook with multiple worksheets into multiple workbooks
  function splitWorkbooks(collection, section) {
    XlsxPopulate.fromFileAsync(req.file.path)
    .then(workbook => {
      XlsxPopulate.fromBlankAsync()
      .then(newWorkbook => {
        var newSheet = newWorkbook.sheet(0);
        var usedRange = workbook.sheet(section).usedRange();
        var oldValues = usedRange.value();
        newSheet.range(usedRange.address()).value(oldValues);
        newWorkbook.toFileAsync(`${section}.xlsx`)
        .then(file => {
          convertData(collection, section);
        })
        .catch(e => {
          console.log(e);
        })
      })
      .catch(e => {
        console.log(e);
      })
    })
    .catch(e => {
      console.log(e);
    })
  }

  splitWorkbooks(Customer, "customer");
  splitWorkbooks(SizingQuestions, "sizing");
  splitWorkbooks(DesktopNetworkQuestions, "desktop_network");
  splitWorkbooks(EmailQuestions, "email");
  splitWorkbooks(ImportQuestions, "import");
  splitWorkbooks(ConnectorPlatformQuestions, "connector_platform");
  splitWorkbooks(POCQuestions, "poc");
  splitWorkbooks(RFEQuestions, "rfe");
  splitWorkbooks(UsageQuestions, "usage");
  splitWorkbooks(SupervisionQuestions, "supervision");

  res.redirect(`/index/${req.params.id}`);
})

router.post("/export/:id", authenticate_session, function (req, res) {
  //find MongoDB data
  async function query() {
    var data = {};
    data["customer"] = await Customer.find({ name: req.params.id }).exec();
    data["sizing"] = await SizingQuestions.find({ name: req.params.id }).exec();
    data["desktop_network"] = await DesktopNetworkQuestions.find({ name: req.params.id }).exec();
    data["email"] = await EmailQuestions.find({ name: req.params.id }).exec();
    data["import"] = await ImportQuestions.find({ name: req.params.id }).exec();
    data["connector_platform"] = await ConnectorPlatformQuestions.find({ name: req.params.id }).exec();
    data["poc"] = await POCQuestions.find({ name: req.params.id }).exec();
    data["rfe"] = await RFEQuestions.find({ name: req.params.id }).exec();
    data["usage"] = await UsageQuestions.find({ name: req.params.id }).exec();
    data["supervision"] = await SupervisionQuestions.find({ name: req.params.id }).exec();
    return data;
  }

  query()
  .then(data => {
    XlsxPopulate.fromBlankAsync()
    .then(newWorkbook => {
      var count = 0;

      //combine multiple workbooks into one workbook with multiple worksheets
      function combineWorkbooks(workbook1, workbook2, section) {
        var newSheet = workbook1.addSheet(section);
        var usedRange = workbook2.sheets()[0].usedRange();
        var oldValues = usedRange.value();
        newSheet.range(usedRange.address()).value(oldValues);
        count++;
        if (count == 10) {
          newWorkbook.deleteSheet("Sheet1");
          newWorkbook.moveSheet("customer", 0);
          newWorkbook.moveSheet("sizing", 1);
          newWorkbook.moveSheet("desktop_network", 2);
          newWorkbook.moveSheet("email", 3);
          newWorkbook.moveSheet("import", 4);
          newWorkbook.moveSheet("connector_platform", 5);
          newWorkbook.moveSheet("poc", 6);
          newWorkbook.moveSheet("rfe", 7);
          newWorkbook.moveSheet("usage", 8);
          newWorkbook.moveSheet("supervision", 9);
          newWorkbook.toFileAsync(`${req.params.id}.xlsx`)
          .then(file => {
            res.download(`${req.params.id}.xlsx`);
          })
          .catch(e => {
            console.log(e);
          })
        }
      }

      //convert MongoDB data to Excel spreadsheets
      function convertData(section) {
        if (section == "customer") {
          data[section][0] = _.omit(data[section][0].toObject(), ["_id", "__v", "createdAt", "updatedAt", "createdBy", "updatedBy"]);
        }
        else {
          data[section][0] = _.omit(data[section][0].toObject(), ["_id", "__v"]);
        }
        var content = fs.readFileSync(path.join(__dirname, "../models", `${section}.json`), 'utf8');
        var model = JSON.parse(content);
        mongoxlsx.mongoData2Xlsx(data[section], model, function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
            XlsxPopulate.fromFileAsync(data.fullPath)
            .then(workbook => {
              combineWorkbooks(newWorkbook, workbook, section);
            })
            .catch(e => {
              console.log(e);
            })
          }
        })
      }

      convertData("customer");
      convertData("sizing");
      convertData("desktop_network");
      convertData("email");
      convertData("import");
      convertData("connector_platform");
      convertData("poc");
      convertData("rfe");
      convertData("usage");
      convertData("supervision");
    })
    .catch(e => {
      console.log(e);
    })
  })
  .catch(e => {
    console.log(e);
  })
})

router.get("/history/:id", authenticate_session, function (req, res) {
  Customer.findOne({ name: req.params.id })
  .then(customer => {
    CustomerVersions.findOne({ refId: customer._id })
    .then(version => {
      res.render("history", {versions: version.versions});
    })
    .catch(e => {
      console.log(e);
    })
  })
  .catch(e => {
    console.log(e);
  })
});

router.get("/history/:id/:version", authenticate_session, function (req, res) {
  async function query() {
    var questionnaire = {};
    var refId = await Customer.findOne({ name: req.params.id });
    if (refId) {
      questionnaire["sizing_questions"] = await SizingQuestionsVersions.findOne({ refId: refId }).exec();
      questionnaire["customer"] = await CustomerVersions.findOne({ refId: refId }).exec();
      questionnaire["desktop_network_questions"] = await DesktopNetworkQuestionsVersions.findOne({ refId: refId }).exec();
      questionnaire["email_questions"] = await EmailQuestionsVersions.findOne({ refId: refId }).exec();
      questionnaire["import_questions"] = await ImportQuestionsVersions.findOne({ refId: refId }).exec();
      questionnaire["connector_platform_questions"] = await ConnectorPlatformQuestionsVersions.findOne({ refId: refId }).exec();
      questionnaire["poc_questions"] = await POCQuestionsVersions.findOne({ refId: refId }).exec();
      questionnaire["rfe_questions"] = await RFEQuestionsVersions.findOne({ refId: refId }).exec();
      questionnaire["usage_questions"] = await UsageQuestionsVersions.findOne({ refId: refId }).exec();
      questionnaire["supervision_questions"] = await SupervisionQuestionsVersions.findOne({ refId: refId }).exec();
      return questionnaire;
    }
  }

  query()
  .then(result => {
    for (var questions in result) {
      result[questions] = result[questions].versions[req.params.version];
    }
    result["version"] = req.params.version;
    res.render("show_history", result);
  })
  .catch(e => {
    console.log(e);
  })
});

module.exports = router;
