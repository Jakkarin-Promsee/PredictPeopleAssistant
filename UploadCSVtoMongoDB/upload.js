const mongoose = require('mongoose');
const fs = require('fs');
const csvParser = require('csv-parser');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Define a schema that matches your CSV data structure
const DataSchema = new mongoose.Schema({
    name: String,   // Example fields
    value: Number,  // Example fields
    // Add more fields as per your CSV structure
});

// Create a model
const DataModel = mongoose.model('Data', DataSchema);

// Function to upload CSV data to MongoDB
const uploadCSV = () => {
    const csvFilePath = 'path/to/your/csvfile.csv'; // Replace with the path to your CSV file

    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', async (row) => {
            try {
                const newData = new DataModel(row);
                await newData.save();
            } catch (err) {
                console.error('Error saving data:', err);
            }
        })
        .on('end', () => {
            console.log('CSV file successfully processed and uploaded to MongoDB');
            mongoose.connection.close(); // Close the connection after upload
        });
};

uploadCSV();
