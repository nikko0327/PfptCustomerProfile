var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var session = require("express-session");
var favicon = require('serve-favicon');
var MongoStore = require("connect-mongo")(session);
var helmet = require('helmet');
var app = express();

//APP CONFIGURATION
app.use(helmet());
app.use(favicon(__dirname + '/public/favicon.ico'));

app.enable('trust proxy');

var databaseUrl = "mongodb://localhost/customerProfile";
mongoose.Promise = require('bluebird');
mongoose.connect(databaseUrl, { useMongoClient: true }).then(
    () => {
        console.log('Database is connected');
    },
    err => {
        console.log('Can not connect to the database' + err);
    }
);

// mongoose.connect(databaseUrl);
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
    cookie: {
        //maxAge: 30 * 24 * 60 * 60 * 1000 // 1 month
    },
    store: new MongoStore({
        mongooseConnection: db
    })
}));


// Used in update
app.locals.make_custom_dropdown = function (name, value, list, classname) {
    if (!classname) {
        classname = '';
    }

    var dropdown = '<select class="form-control ' + classname + '" name="' + name + '">';

    dropdown += '<option value="">No response</option>';

    for (var i = 0; i < list.length; i++) {
        if (value == list[i]) {
            dropdown += '<option value="' + list[i] + '" selected>' + list[i] + '</option>';
        } else {
            dropdown += '<option value="' + list[i] + '">' + list[i] + '</option>';
        }
    }

    dropdown += '</select>';

    return dropdown;
};

// Exposes the username for the header nav bar.
app.use(function expose_username(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// Disables back button from showing contents when logged out.
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

// app.use(function printSession(req, res, next) {
//     console.log('req.session', req.session);
//     next();
// });

// set so we don't have to type .ejs all the time when routing
app.set("view engine", "ejs");
// used so we can make a public folder that contains stylesheet and js, and be able to access it
app.use(express.static(__dirname + "/public"));
//including routes. Seperating the routes to different file, so it will be cleaner.
var routes = require("./routes/router");
// used so we can get data from forms and etc.
app.use(bodyParser.urlencoded({ extended: true }));
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

let port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`App is running on ${port}.`);
});