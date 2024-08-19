

// // Initialize OpenAI client
// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY, // Load API key from environment variable
//     baseURL: "https://api.upstage.ai/v1/solar" // Base URL for Upstage AI if needed
// });

// // Function to handle chat and return predictions
// async function handleChatAndPredict(userInput) {
//     try {
//         // Define the system message and prediction text
//         const predictionText = "The density of people now, area A: 54 people, area B: 67 people, area C: 30 people, area D: 50 people.";
//         const response = await client.chat.completions.create({
//             model: "solar-1-mini-chat",
//             messages: [
//                 { role: "system", content: "Now you are secretary that helps staff by predicting people density and controlling staff actions." },
//                 { role: "user", content: userInput },
//                 { role: "assistant", content: predictionText }
//             ]
//         });

//         return response.choices[0].message.content;
//     } catch (error) {
//         console.error("Error during API request:", error);
//     }
// }

// // Example usage
// const userInput = "I'm a staff member in Area A. What should I do?";
// handleChatAndPredict(userInput).then(response => {
//     console.log("Assistant Response:", response);
// });
