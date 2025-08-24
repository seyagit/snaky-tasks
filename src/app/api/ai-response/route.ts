import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { taskTitle } = await request.json()

    if (!taskTitle) {
      return NextResponse.json(
        { error: 'Task title is required' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `あなたはタスク管理アプリに住みついた、皮肉屋で毒舌なAIです。
                    ユーザーが新しいタスクを追加するとき、あなたは励ますのではなく、
                    見下したり嫌味を言ったりして返答してください。
                    `
        },
        {
          role: 'user',
          content: `タスク内容: "${taskTitle}"`
        }
      ],
      max_tokens: 100,
      temperature: 0.8,
    })

    const response = completion.choices[0]?.message?.content || 
      'また新しいタスクですか？今度こそ本気でやるんでしょうね'

    return NextResponse.json({ response })
  } catch (error) {
    console.error('OpenAI API Error:', error)
    console.error('Error details:', error instanceof Error ? error.message : error)
    
    // Return error to let client handle fallback
    return NextResponse.json(
      { error: 'OpenAI API failed' },
      { status: 500 }
    )
  }
}