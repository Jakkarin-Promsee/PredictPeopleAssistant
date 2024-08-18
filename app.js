const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/router.js');
const path = require("path");
const app = express();

//for use to connect router to response client
app.use(router);

//for dynamic file, work together with router (ejs file from "/views")
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const port = 3000;
const mongoURI = 'mongodb://localhost:27017/density_of_people';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Could not connect to MongoDB:', err);
    });


//for like local server to port 3000
app.listen(port, "0.0.0.0", function () {
    console.log("Listening to port:  " + port);
});