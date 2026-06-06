import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

// This creates one Groq client using your secret key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Next.js calls this function when your frontend sends a POST request to /api/generate
export async function POST(req: NextRequest) {
  try {
    // Read the topic that the frontend sent
    const { topic } = await req.json()

    // Send the topic to Groq's AI and ask for flashcards
    const completion = await groq.chat.completions.create({
      model:  'llama-3.3-70b-versatile',   // free Llama 3 model
      messages: [
        {
          role: 'system',
          // This tells the AI how to behave
          content: `You are a study assistant. 
          Return ONLY valid JSON, no markdown, no backticks, nothing else.`
        },
        {
          role: 'user',
          // This is the actual request with the topic
          content: `Generate 6 flashcards to learn about: "${topic}".
          Return exactly this JSON structure and nothing else:
          {
            "cards": [
              { "question": "...", "answer": "..." },
              { "question": "...", "answer": "..." }
            ]
          }`
        }
      ]
    })

    // Extract the AI's text response
    const raw = completion.choices[0].message.content || '{}'
    
    // Convert that text into a JavaScript object
    const data = JSON.parse(raw)
    
    // Send it back to the frontend
    return NextResponse.json(data)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}