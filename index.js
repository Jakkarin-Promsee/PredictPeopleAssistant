const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 3000;

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/density_of_people';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Define a schema
const DataSchema = new mongoose.Schema({
    name: String,
    value: Number
});

// Create a model
const DataModel = mongoose.model('Data', DataSchema);

app.get('/', async (req, res) => {
    try {
        const newData = new DataModel({ name: 'Example', value: 42 });
        await newData.save();

        const data = await DataModel.find({});
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
