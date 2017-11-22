const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const fs = require("fs");
const path = require("path");
const queries = require("./queries.js");
const auth = require("./auth.js");
const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const exerciseRouter = require("./routes/exercise");

var enableCors = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	next();
};

var app = express();
app.use(auth.initialize());
app.use(bodyParser.json({limit: "20mb"}));
app.use(enableCors);
app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);
app.use("/api/exercise", exerciseRouter);
app.post("/api/authenticate", auth.generate);

console.log("Express configured.");

var port = "4000";
var server = http.createServer(app);
console.log("Server created.");
server.listen(port, () => {
	console.log("Now listening on port " + port + ". Good luck.");
});
