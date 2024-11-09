const express = require("express");
const { currentDate } = require('./utils/date');
const FoodRouter = require('./controller/Food.controller');
const TodoRouter = require('./controller/Todo.controller');


// Enable Environment variables
require('dotenv').config();

// require('./sqlite');
require("./dbconfig.js")

// Creating and spinning up a Node Express Server
const WEB_SERVER = express();

// Body-parser
WEB_SERVER.use(express.json());

// Routers injection
WEB_SERVER.use('/foods', FoodRouter);
WEB_SERVER.use('/todos', TodoRouter)

// START AND LISTEN THE SERVER
WEB_SERVER.listen(process.env.SERVER_PORT, process.env.HOSTNAME, () => {
    console.log("Server started at ", currentDate());
    console.log(`http://${process.env.HOSTNAME}:${process.env.SERVER_PORT}`);
});