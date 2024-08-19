const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const fs = require('fs');
const path = require('path');
const { time } = require('console');

function readFileAndProcess(callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Access the data at index 0
            const indexData = jsonData[0];

            // Call the callback with the indexData
            callback(indexData);
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
        }
    });
}

router.get('/', (req, res) => {
    const { area, idx } = req.query;

    area_number = 0
    if (area <= 1) area_number = 1;
    else if (area >= 5) area_number = 5;
    else area_number = area;

    idx_number = 0;
    if (Number(idx) > 0) idx_number = idx_number + Number(idx)

    const filePath = `public/density_of_people_Area${area_number}.json`;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Slice to get up to the first 6 elements, or all if fewer
            const slicedData = jsonData.slice(idx_number, idx_number + 5);

            const graphData = {
                labels: ['now', '10m', '20m', '30m', '60m'], // Extract time values for labels
                values: slicedData.map(item => item.number_people) // Extract numberpeopl

            }
            res.render('areaN', { area_number: area_number, data: graphData, idx: idx_number });
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
        }
    });




    //res.send('Welcome to the People Density API!');
});

// Route to get data from MongoDB
router.get('/data', dataController.getAllData);

// Route to get data by a specific date
router.get('/datas', dataController.getDataByDate);

module.exports = router;