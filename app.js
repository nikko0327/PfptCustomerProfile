var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//including routes. Seperating the routes to different file, so it will be cleaner.
var routes = require("./routes/router");
app.use(routes);


app.listen(3000, function(){
	console.log("App is running on 3000");
});