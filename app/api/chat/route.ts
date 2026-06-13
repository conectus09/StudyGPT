import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/openai';
import { Message, Model } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, model } = body as { messages: Message[]; model: Model };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    // This calls our simulated function (instantly works)
    // Replace with real OpenAI when you have an API key
    const reply = await generateChatResponse(messages, model || 'gpt-4o-mini');

    return NextResponse.json({ 
      content: reply,
      model: model || 'gpt-4o-mini'
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate response' 
    }, { status: 500 });
  }
}
