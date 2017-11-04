var express = require("express");
var bodyParser = require("body-parser");
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var rabbit2 = require("./rabbitEx.js")(app);
app.rabbit = rabbit2;
var routes = require("./routes/routes.js")(app);
 
var server = app.listen(3300, function () {
	console.log("Listening on port %s...", server.address().port);
});