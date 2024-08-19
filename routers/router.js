const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require('fs').promises; // Using the promises API of fs module for async/await
require('dotenv').config(); // Load environment variables from .env file
const { OpenAI } = require('openai');

// Initialize OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Load API key from environment variable
    baseURL: "https://api.upstage.ai/v1/solar" // Base URL for Upstage AI if needed
});

// Function to handle chat and return predictions
async function handleChatAndPredict(syscontent, userInput, predictionText) {
    try {
        const response = await client.chat.completions.create({
            model: "solar-1-mini-chat",
            messages: [
                { role: "system", content: syscontent },
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

        // Define the system message and prediction text
        const predictionText = "The density of people now, area A: 54 people, area B: 67 people, area C: 30 people, area D: 50 people.";

        // Example usage
        const userInput = "I'm a staff member in Area A. What should I do?";
        const syscontent = "Now you are secretary that helps staff by predicting people density and controlling staff actions."
        handleChatAndPredict(syscontent, userInput, predictionText).then(response => {
            // console.log("Assistant Response:", response);
            res.render('areaN', { area_number: area_number, data: graphDataArray[area_number], idx: idx_number, upstage_api: response });
        });

        // console.log(graphDataArray[area_number])



    } catch (err) {
        console.error('Error processing files:', err);
        res.status(500).send('Error processing files');
    }
});

module.exports = router;
