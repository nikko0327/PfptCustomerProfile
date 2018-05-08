var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var app = express();


//APP CONFIGURATION

var databaseUrl = "mongodb://localhost/customerProfile";
mongoose.connect(databaseUrl);

var db = mongoose.connection;

//handling mongo error
db.on("error", console.error.bind(console, "Connection Error: "));
// db.once("open", function () {
//     //Connection Message?
// });

//using sessions for tracking logins
app.use(session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

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

//catch 404 and forward to error handler
app.use(function () {
    var err = new Error("File Not Found");
    err.status = 404;
});

//error handler
//defined as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


app.listen(8080, function () {
    console.log("App is running on 8080");
});