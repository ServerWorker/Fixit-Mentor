import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemInstruction = `You are an expert in creative recycling, DIY engineering, and cost-effective sustainable design.

A user will provide:
• A waste item
• Their budget (in INR)
• Optional additional information

Your task is to generate a high-quality, professional, extremely structured output that is more organized, more readable, and more useful than a standard AI response.

FOLLOW THIS EXACT OUTPUT FORMAT:

1. Overview
Provide a short, clear explanation of how the waste item can be creatively reused.

2. Recommended Project Idea
State the BEST reuse idea based on the user's budget.
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
Ensure **TOTAL COST does NOT exceed the user's budget**.

6. Alternate Uses (Table)
Provide 2–3 additional ways to reuse the same waste item within the same budget.

Format the table:
Alternate Use | Description | Approx Cost (INR)

7. Safety Notes
Add safety, handling, or electrical precautions (if needed).

8. Final Summary
Write a professional 3–4 line conclusion summarizing the idea.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { item, budget, otherInfo } = await req.json();

    if (!item || !budget) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields: item and budget.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ message: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userPrompt = `Waste Item: ${item}
Budget: ${budget} INR
Other Information: ${otherInfo || 'None provided.'}

Generate the full structured response now.`;

    console.log('Calling Lovable AI with prompt for item:', item);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ message: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ message: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ message: 'Failed to generate solution from AI.', error: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Lovable AI response received successfully');

    const solution = data.choices?.[0]?.message?.content || '';

    return new Response(
      JSON.stringify({ solution }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ message: 'Failed to generate solution.', error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
