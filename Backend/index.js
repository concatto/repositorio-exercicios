const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const fs = require("fs");
const path = require("path");
const queries = require("./queries.js");

var enableCors = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	next();
};

const pgConfig = {
	host: "localhost",
	port: 5432,
	database: "reap",
	user: "postgres",
	password: "123456"
};

const db = pgp(pgConfig);

function replyData(query, res, params = {}) {
	db.any(query, params).then(data => {
		console.log(data);
		res.status(200).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
}

// Router para exercícios
const exerciseRouter = express.Router();

exerciseRouter.get("/", (req, res) => {
	replyData(queries.allExercises(), res);
});

exerciseRouter.post("/", (req, res) => {
  console.log(req.body);
  replyData(queries.createExercise(), res, req.body);
});

console.log("Routers created.");

var app = express();
app.use(bodyParser.json({limit: "20mb"}));
app.use(enableCors);
app.use("/api/exercise", exerciseRouter);
//app.use(express.static("public"));

console.log("Express configured.");

var port = "4000";
var server = http.createServer(app);
console.log("Server created.");
server.listen(port, () => {
	console.log("Now listening on port " + port + ". Good luck.");
});
