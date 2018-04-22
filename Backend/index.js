const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const queries = require('./queries.js');
const auth = require('./auth.js');
const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');
const ideRouter = require('./routes/ide');
const Compiler = require('./compiler.js');

// const __user = require("./entities/user");

// __user.register({password: "123", email: "test@test.com", username: "tester"});

/* const source = `
#include <iostream>

int main() {
	int input;
	std::cin >> input;
    std::cout << "I received " << (2 * input) << "!\\n";
}
`;

Compiler.compareCaseTest(source, 'cpp', [
	{input: 5, output: "10"},
	{input: 10, output: "20"},
]);
*/


const enableCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  next();
};

const app = express();
app.use(auth.initialize());
app.use(bodyParser.json({limit: '20mb'}));
app.use(enableCors);
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/ide', ideRouter);
app.post('/api/authenticate', auth.generate);


console.log('Express configured.');

const port = '4000';
const server = http.createServer(app);
console.log('Server created.');
server.listen(port, () => {
  console.log('Now listening on port ' + port + '. Good luck.');
});
