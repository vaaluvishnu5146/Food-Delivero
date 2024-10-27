const express = require("express");
const { currentDate } = require('./utils/date');
const { makeDirectory, createATextFile } = require("./utils/filesys");
require('./sqlite');

// Creating and spinning up a Node Express Server
const WEB_SERVER = express();

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


// START AND LISTEN THE SERVER
WEB_SERVER.listen(3000, "localhost", () => {
    console.log("Server started at ", currentDate());
    console.log("http://localhost:3000");
    // makeDirectory();
});