// /api/gemini.js - Complete File

import { GoogleGenAI } from '@google/genai';

// PART A: Initialization (The Tool)
const ai = new GoogleGenAI({}); 

// Define the comprehensive System Instruction once
const systemInstruction = `
// [PASTE YOUR ENTIRE DETAILED, STRUCTURED PROMPT TEXT HERE]
// ...
`;

// The Vercel Serverless Function handler combines Part B and C
export default async function handler(req, res) {
    // PART B: Request Handling and Prompt Construction (The Middleman)
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { item, budget, otherInfo } = req.body;

    if (!item || !budget) {
        return res.status(400).json({ message: 'Missing required fields: item and budget.' });
    }

    const userPrompt = `
        Waste Item: ${item}. 
        Budget: ${budget} INR. 
        Other Information: ${otherInfo || 'None provided.'}
    `;

    // PART C: Calling Gemini and Sending the Response (The Output)
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', 
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.2,
            }
        });

        res.status(200).json({ solution: response.text });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ 
            message: 'Failed to generate solution from AI.',
            error: error.message
        });
    }
}
