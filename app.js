const express = require('express');
const router = require('./routers/router.js');
const path = require("path");
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//for use to connect router to response client
app.use(router);

//for dynamic file, work together with router (ejs file from "/views")
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const port = 3000;

//for like local server to port 3000
app.listen(port, () => {
    console.log("Listening to port:  " + port);
});

module.exports = app