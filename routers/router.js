const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require('fs');
require('dotenv').config();
const { OpenAI } = require('openai');

// Initialize OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Load API key from environment variable
    baseURL: "https://api.upstage.ai/v1/solar" // Base URL for Upstage AI if needed
});

// Function to handle chat and return predictions
async function handleChatAndPredict(userInput) {
    try {
        // Define the system message and prediction text
        const predictionText = "The density of people now, area A: 54 people, area B: 67 people, area C: 30 people, area D: 50 people.";
        const response = await client.chat.completions.create({
            model: "solar-1-mini-chat",
            messages: [
                { role: "system", content: "Now you are secretary that helps staff by predicting people density and controlling staff actions." },
                { role: "user", content: userInput },
                { role: "assistant", content: predictionText }
            ]
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error during API request:", error);
    }
}

router.get('/', (req, res) => {
    res.send('serve running...');
});

router.get('/data', (req, res) => {
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
// router.get('/data', dataController.getAllData);

// // Route to get data by a specific date
// router.get('/datas', dataController.getDataByDate);

module.exports = router;