import { Message, Model } from '@/types';

// This file is ready for real OpenAI integration.
// To use real OpenAI:
// 1. Add OPENAI_API_KEY to .env.local
// 2. Uncomment the real implementation below and install openai package if needed.
// 3. The API route will call this.

const MOCK_RESPONSES = [
  "That's a fascinating question. From my perspective, the key is understanding the underlying principles and then iterating quickly based on real feedback.",
  "Great point. Most people overlook the simple fundamentals here. Here's how I'd approach it practically:",
  "Interesting take. The honest answer is nuanced — it depends on your specific constraints, timeline, and what success looks like for you.",
  "I've thought about this a lot. The best path forward is usually a combination of clear goals + consistent small wins. Want me to break it down step-by-step?",
  "Solid question. One thing I've learned is that the highest leverage usually comes from protecting deep focus time rather than adding more tools.",
  "Love this direction. Here's my direct take: focus on solving a painful problem extremely well for a small group of people first.",
];

function getSmartReply(userMessage: string, model: Model): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hey! What's on your mind today? I'm here to help you brainstorm, learn, code, or just chat.";
  }
  if (lower.includes('how are you')) {
    return "I'm doing great — fully powered and ready to help. How can I assist you today?";
  }
  if (lower.includes('who are you') || lower.includes('what are you')) {
    return "I'm an advanced AI (in the spirit of Grok / ChatGPT). Built to be helpful, truthful, and a little bit witty. What would you like to explore?";
  }
  if (lower.includes('joke') || lower.includes('funny')) {
    return "Why do programmers prefer dark mode?\n\nBecause light attracts bugs. 😄 Want another one or shall we get back to work?";
  }
  if (lower.includes('thank')) {
    return "You're very welcome! Happy to help anytime.";
  }
  if (lower.includes('code') || lower.includes('react') || lower.includes('typescript')) {
    return "I love working with code. Share what you're building and I'll give you clean, practical suggestions, explanations, or help debug.";
  }

  // Use model name in response for fun
  const modelName = model === 'grok-4' ? 'Grok 4' : model.replace(/-/g, ' ').toUpperCase();

  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)] + 
    `\n\n(Responding as ${modelName})`;
}

// Simulated response generator (works immediately without API key)
export async function generateChatResponse(
  messages: Message[], 
  model: Model = 'gpt-4o-mini'
): Promise<string> {
  // Simulate network delay + thinking
  await new Promise(resolve => setTimeout(resolve, 650 + Math.random() * 750));

  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');

  if (!lastUserMessage) {
    return "How can I help you today?";
  }

  // For real OpenAI, you would do something like:
  /*
  import OpenAI from 'openai';
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const completion = await openai.chat.completions.create({
    model: model === 'grok-4' ? 'gpt-4o' : model,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
    temperature: 0.7,
  });
  return completion.choices[0].message.content || "Sorry, I couldn't generate a response.";
  */

  return getSmartReply(lastUserMessage.content, model);
}

// You can also export a streaming version later using ReadableStream if desired.
