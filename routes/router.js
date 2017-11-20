var express = require("express");
var router = express.Router();
// var User = require("../models/user");
var mongoose = require("mongoose");
// var Customer = require("../models/customer");


var CustomerSchema = new mongoose.Schema({
	name: String,
	status: String,
	salesRep: String,
	archivingSe: String,
	accManager: String,
	location: String,
	supervision: String,
	natIp: String,
	contacts: String,
	created: {type: Date, default: Date.now}
});

var Customer = mongoose.model("Customer", CustomerSchema);

// Customer.create({
// 	name: "Kearny",
// 	status: "OLD",
// 	salesRep: "1One",
// 	archivingSe: "2Two",
// 	accManager: "3Three",
// 	location: "4Four",
// 	supervision: "5Five",
// 	natIp: "6Six",
// 	contacts: "7Seven"
// });

//Entry point for the app startup
router.get("/", function(req, res){
	res.redirect("/index");
});

//NEW ROUTE
router.get("/new", function(req, res){
	res.render("new");
});

//INDEX ROUTE
router.get("/index", function(req, res){
	Customer.find({}, function(err, customers){
		if(err){
			console.log("An Error has occured.");
			console.log(err);
		}else{
			res.render("index", {customers: customers});
		}
	})
});

//SHOW ROUTE
router.get("/show", function(req, res){
	res.render("show");
});

module.exports = router;