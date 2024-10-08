// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = "AIzaSyD2pBeGxXUwcp-Gf5SSIhy3IQi3SO21aYk";
// const genAI = new GoogleGenerativeAI(apiKey);

// async function run(prompt) {
//     const model = await genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//     });

//     const generationConfig = {
//       temperature: 1,
//       topP: 0.95,
//       topK: 64,
//       maxOutputTokens: 8192,
//       responseMimeType: "text/plain",
//     };

//     const chatSession = model.startChat({
//       generationConfig,
//       history: [],
//     });

//     const result =  chatSession.sendMessage(prompt);
//     const text = result.response.text();
//     console.log(text);
//     return text;
// }

// export default run;


/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyD2pBeGxXUwcp-Gf5SSIhy3IQi3SO21aYk";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response;
  return response.text();
}

export default run;