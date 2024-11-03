const express = require("express");
const { currentDate } = require('./utils/date');
const { makeDirectory, createATextFile } = require("./utils/filesys");
const FoodRouter = require('./controller/Food.controller');
const TodoRouter = require('./controller/Todo.controller');
// require('./sqlite');
require("./dbconfig.js")

require("./model/Food.model");

// Creating and spinning up a Node Express Server
const WEB_SERVER = express();

// Body-parser
WEB_SERVER.use(express.json());

// Routers injection
WEB_SERVER.use('/foods', FoodRouter);
WEB_SERVER.use('/todos', TodoRouter)

/**
 * Returns a web page
 */
WEB_SERVER.get("/", (request, response) => {
    console.log("Root path hit")
    createATextFile();
    return response.send(`<html>
        <head>
            <title>Home</title>
        </head>
        <body>
             <h1>Home page</h1>
        </body>
    </html>`)
});

/**
 * Returns a web page
 */
WEB_SERVER.get("/about", (request, response) => {
    console.log("Home path hit");
    return response.send(`<html>
        <head>
            <title>About</title>
        </head>
        <body>
             <h1>About page</h1>
        </body>
    </html>`)
});

/**
 * Returns a web page with URL PARAM
 */
WEB_SERVER.get("/params/:paramId/:subParamId", (request, response) => {
    console.log(request.params);
    console.log(request.query);
    console.log("Home path hit");
    return response.send(`<html>
        <head>
            <title>Params Page</title>
        </head>
        <body>
             <h1>Parameters page</h1>
             <p>Param Id: ${request.params.paramId}</p>
             <p>Sub Param Id: ${request.params.subParamId}</p>
             <p>Color: ${request.query.color}</p>
             <p>Size: ${request.query.size}</p>
        </body>
    </html>`)
});


// START AND LISTEN THE SERVER
WEB_SERVER.listen(3000, "localhost", () => {
    console.log("Server started at ", currentDate());
    console.log("http://localhost:3000");
    // makeDirectory();
});