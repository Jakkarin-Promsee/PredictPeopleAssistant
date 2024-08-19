const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require('fs').promises; // Using the promises API of fs module for async/await


router.get('/', (req, res) => {
    res.send('serve running...');
});

router.get('/data', async (req, res) => {
    const { area, idx } = req.query;

    let area_number = 0;
    if (area <= 1) area_number = 1;
    else if (area >= 5) area_number = 5;
    else area_number = Number(area);

    let idx_number = 0;
    if (Number(idx) > 0) idx_number = Number(idx);

    // Paths to all JSON files you want to read
    const filePaths = [];

    for (let i = 1; i <= 5; i++) {
        filePaths.push(`public/density_of_people_Area${i}.json`);
    }

    try {
        // Read all files asynchronously
        const fileDataArray = await Promise.all(filePaths.map(filePath => fs.readFile(filePath, 'utf8')));

        // Parse all JSON data
        const jsonDataArray = fileDataArray.map(data => JSON.parse(data));

        // Process the data from each JSON file
        const graphDataArray = jsonDataArray.map((jsonData, index) => {
            const slicedData = jsonData.slice(idx_number, idx_number + 5);

            return {
                labels: ['now', '10m next', '20m next', '30m next', '60m next'],
                values: slicedData.map(item => item.number_people) // Adjust according to your JSON structure
            };
        });

        console.log(graphDataArray[area_number])


        res.render('areaN', { area_number: area_number, data: graphDataArray[area_number], idx: idx_number, upstage_api: "connecting ...." });

    } catch (err) {
        console.error('Error processing files:', err);
        res.status(500).send('Error processing files');
    }
});

module.exports = router;
