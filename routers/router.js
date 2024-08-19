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

        // Define system message and prediction text
        const predictionText = "The density of people now, area A: 54 people, area B: 67 people, area C: 30 people, area D: 50 people.";
        const userInput = "I'm a staff member in Area A. What should I do?";
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

module.exports = router;
