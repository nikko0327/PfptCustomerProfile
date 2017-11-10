var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("bady-parser");
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var app = express();


//APP CONFIGURATION

var databaseUrl = "mongodb://localhost/customerProfile";
mongoose.connect(databaseUrl);

// set so we dont have to type .ejs all the time when routing
app.set("view engine", "ejs");
// used so we can make a public folder that contains stylesheet and js, and be able to access it
app.use(express.static(__dirname + "/public"));
//including routes. Seperating the routes to different file, so it will be cleaner.
var routes = require("./routes/router");
// used so we can get data from forms and etc.
app.use(bodyParser.urlencoded({extended: true}));
// security. This line of code has to be always after body-parser
app.use(expressSanitizer());
// so we can use PUT request
app.use(methodOverride("_method"));
app.use(routes);


app.listen(3000, function(){
	console.log("App is running on 3000");
});