var express = require("express");
var router = express.Router();
// var User = require("../models/user");
// var Customer = require("../models/customer");

//Entry point for the app startup
router.get("/", function(req, res){
	res.render("index");
});

module.exports = router;