const express = require("express");
var cors = require('cors')
const { currentDate } = require('./utils/date');
const FoodRouter = require('./controller/Food.controller');
const TodoRouter = require('./controller/Todo.controller');
const CartRouter = require('./controller/Cart.controller.js');
const AuthRouter = require('./controller/Authentication.controller.js');

// Enable Environment variables
require('dotenv').config();

// require('./sqlite');
require("./dbconfig.js");

// Creating and spinning up a Node Express Server
const WEB_SERVER = express();

// ENABLE CORS
WEB_SERVER.use(cors());

// Body-parser
WEB_SERVER.use(express.json());

// Routers injection
WEB_SERVER.use('/foods', FoodRouter);
WEB_SERVER.use('/todos', TodoRouter);
WEB_SERVER.use('/cart', CartRouter);
WEB_SERVER.use('/auth', AuthRouter);

// START AND LISTEN THE SERVER
WEB_SERVER.listen(process.env.SERVER_PORT, process.env.HOSTNAME, () => {
    console.log("Server started at ", currentDate());
    console.log(`http://${process.env.HOSTNAME}:${process.env.SERVER_PORT}`);
});