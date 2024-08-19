const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000; // Adjust the port as needed

// Define the MongoDB URI with the new port
const mongoURI = 'mongodb://localhost:27018/density_of_people';

// Enable Mongoose debugging for more information
mongoose.set('debug', true);

// Connect to MongoDB
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
