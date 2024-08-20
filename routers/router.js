const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();
const { OpenAI } = require('openai');


// Initialize OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.upstage.ai/v1/solar" // Ensure this is the correct base URL
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
        return 'Error during API request'; // Return a default message or handle it as needed
    }
}

router.get('/', (req, res) => {
    res.send('Server running...');
});

router.get('/data', async (req, res) => {
    const { area = 1, idx = 0 } = req.query;

    const area_number = Math.max(1, Math.min(5, Number(area)));
    const idx_number = Math.max(0, Number(idx));

    // Generate file paths based on area_number
    const filePath = `public/density_of_people_Area${area_number}.json`;

    try {
        // Read the file asynchronously
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        // Process the data
        const slicedData = jsonData.slice(idx_number, idx_number + 5);
        const graphData = {
            labels: ['now', '10m next', '20m next', '30m next', '60m next'],
            values: slicedData.map(item => item.number_people)
        };

        console.log(graphData);

        // Define system message and prediction text
        const predictionText = `The density of people now, Area1:{labels: [ 'now', '10m next', '20m next', '30m next', '60m next' ], values: [ 59, 61, 52, 66, 51 ], Area2:{labels: [ 'now', '10m next', '20m next', '30m next', '60m next' ], values: [ 34, 41, 36, 38, 43 ]}, Area3: {labels: [ 'now', '10m next', '20m next', '30m next', '60m next' ], values: [ 43, 47, 40, 45, 39 ]}, Area4: {labels: [ 'now', '10m next', '20m next', '30m next', '60m next' ], values: [ 45, 41, 44, 36, 36 ]}, Area5, {labels: [ 'now', '10m next', '20m next', '30m next', '60m next' ], values: [ 16, 19, 23, 16, 16 ]}`;

        const userInput = `I'm a staff member in Area${area_number}. now I'm so exhausted, What should I do next?`;

        const syscontent = "Now you are secretary that helps staff by predicting people density and controlling staff actions.";

        // Handle chat and prediction
        const apiResponse = await handleChatAndPredict(syscontent, userInput, predictionText);

        // Render the response
        res.render('areaN', { area_number, data: graphData, idx: idx_number, upstage_api: apiResponse });
    } catch (err) {
        console.error('Error processing file:', err);
        res.status(500).send('Error processing file');
    }
});

router.get('/q', async (req, res) => {
    // Destructure query parameters with default values
    const { area = 1, idx = 0, q: userInput = "" } = req.query;

    // Ensure area is between 1 and 5, and idx is non-negative
    const areaNumber = Math.max(1, Math.min(5, Number(area)));
    const idxNumber = Math.max(0, Number(idx));

    // Construct file path based on areaNumber
    const filePath = `public/density_of_people_Area${areaNumber}.json`;

    try {
        // Read the file asynchronously
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        // Slice data for the given index
        const slicedData = jsonData.slice(idxNumber, idxNumber + 5);
        const graphData = {
            labels: ['now', '10m next', '20m next', '30m next', '60m next'],
            values: slicedData.map(item => item.number_people)
        };

        console.log(graphData);

        // Define system message and prediction text
        // Pull data from json. 😥 sorry for that, We couldn't make it in time.
        const predictionText = `The density of people now, Area1: {labels: ['now', '10m next', '20m next', '30m next', '60m next'], values: [59, 61, 52, 66, 51]}, Area2: {labels: ['now', '10m next', '20m next', '30m next', '60m next'], values: [34, 41, 36, 38, 43]}, Area3: {labels: ['now', '10m next', '20m next', '30m next', '60m next'], values: [43, 47, 40, 45, 39]}, Area4: {labels: ['now', '10m next', '20m next', '30m next', '60m next'], values: [45, 41, 44, 36, 36]}, Area5: {labels: ['now', '10m next', '20m next', '30m next', '60m next'], values: [16, 19, 23, 16, 16]}`;

        // System content for the OpenAI model
        const sysContent = "Now you are secretary that helps staff by predicting people density and controlling staff actions.";

        // Call the function to handle chat and prediction
        const apiResponse = await handleChatAndPredict(sysContent, userInput, predictionText);

        // Render the response with the user's question and the API response
        res.render('search', { qus: userInput, ans: apiResponse });
    } catch (err) {
        console.error('Error processing file:', err);
        res.status(500).send('Error processing file');
    }
});


module.exports = router;
