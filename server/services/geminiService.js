import { GoogleGenAI } from "@google/genai";

// Gemini Configuration
const getGeminiClient = () => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("Gemini API key is missing");
    }

    return new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });
};

export default getGeminiClient;