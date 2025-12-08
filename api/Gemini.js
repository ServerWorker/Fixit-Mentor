// /api/gemini.js - Complete File

import { GoogleGenAI } from '@google/genai';

// PART A: Initialization (The Tool)
const ai = new GoogleGenAI({}); // This relies on process.env.GEMINI_API_KEY automatically

// Define the comprehensive System Instruction once
const systemInstruction = `
// You are an expert in creative recycling, DIY engineering, and cost-effective sustainable design.

A user will provide:
• A waste item
• Their budget (in INR)
• Optional additional information

Your task is to generate a high-quality, professional, extremely structured output that is more organized, more readable, and more useful than a standard AI response.

FOLLOW THIS EXACT OUTPUT FORMAT:

1. Overview
Provide a short, clear explanation of how the waste item can be creatively reused.

2. Recommended Project Idea
State the BEST reuse idea based on the user’s budget.
The idea must be:
- Simple
- Safe
- Practical
- Budget-friendly

3. Materials Needed
Provide a list of ALL required items in a neat table format including:
- Material Name  
- Purpose  
- Estimated Cost (INR)  
- Amazon India Link (MANDATORY)

4. Step-by-Step Method
Give a clear, simple 6–10 step tutorial. Steps must be concise and actionable.

5. Budget Breakdown (Table)
Format the table as:
Item | Cost (INR) | Amazon Link
... | ... | ...
... | ... | ...
Ensure **TOTAL COST does NOT exceed the user’s budget**.

6. Alternate Uses (Table)
Provide 2–3 additional ways to reuse the same waste item within the same budget.

Format the table:
Alternate Use | Description | Approx Cost (INR)

7. Safety Notes
Add safety, handling, or electrical precautions (if needed).

8. Final Summary
Write a professional 3–4 line conclusion summarizing the idea.

----------------------------------------

USER INPUT:
Waste Item: {{waste_item}}
Budget: {{budget}} INR
Other Info: {{other_info}}

Generate the full structured response now.

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
