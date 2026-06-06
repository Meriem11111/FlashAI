import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json()

    const completion = await groq.chat.completions.create({
      model:  'llama-3.3-70b-versatile',   
      messages: [
        {
          role: 'system',
          content: `You are a study assistant. 
          Return ONLY valid JSON, no markdown, no backticks, nothing else.`
        },
        {
          role: 'user',
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

   
    const raw = completion.choices[0].message.content || '{}'
    
    // JavaScript object
    const data = JSON.parse(raw)
    
   
    return NextResponse.json(data)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}