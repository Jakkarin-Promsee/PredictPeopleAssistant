require('dotenv').config();

console.log("Environment Variables Loaded:", process.env); // Should list all environment variables
console.log("API Key:", process.env.OPENAI_API_KEY); // Specifically check the API key
