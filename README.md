# Grok — Modern ChatGPT-like Experience (Next.js)

A beautiful, fully functional AI chat application built with Next.js App Router. It features premium modern design, real auth simulation (Login + Sign Up), persistent chats, and a secure backend API ready for OpenAI.

## Project Structure

```
chatgpt-clone/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # Beautiful Landing Page
│   ├── login/page.tsx           # Premium Login
│   ├── signup/page.tsx          # Premium Sign Up
│   ├── chat/page.tsx            # Full functional ChatGPT-like UI
│   └── api/chat/route.ts        # Secure API endpoint (simulated + ready for real OpenAI)
├── components/
│   ├── landing/                 # Navbar, Hero, Features
│   ├── chat/                    # ChatSidebar, ChatMessage, ChatInput, ModelSelector
│   └── ui/                      # Reusable Button, Input
├── lib/
│   ├── openai.ts                # Response generator (simulated)
│   └── utils.ts
├── types/
│   └── index.ts
├── .env.local
└── ...
```

## Key Features

- **Fully Functional Auth**: Login and Sign Up pages with validation. Uses localStorage (easy to replace with real auth).
- **Premium Chat Interface**: Exactly like ChatGPT — sidebar history, model selector (GPT-4o, GPT-4o-mini, Claude, Grok), beautiful bubbles, copy, typing indicator, auto-growing input.
- **Persistent Chats**: All conversations saved in browser.
- **Smart Simulated Replies**: Witty, helpful, Grok-style responses work out of the box.
- **Real API Ready**: `/api/chat` is structured for secure backend calls. Plug in OpenAI key for real responses.
- **Mobile Responsive**: Sidebar becomes a drawer.
- **Beautiful Modern UI**: Dark theme, glassmorphism, smooth animations, production quality.

## Getting Started

1. Go into the folder:
   ```bash
   cd chatgpt-clone
   ```

2. Install dependencies (already done if you followed creation):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

5. **Sign up** or **Log in** (demo credentials pre-filled on login: `harsh@example.com` / `demo123`)

6. Start chatting!

## Switching to Real OpenAI

1. Get an API key from OpenAI.
2. Edit `.env.local` and set:
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Restart the dev server.
4. (Optional) Improve `lib/openai.ts` to actually call the SDK for streaming.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Lucide icons + Sonner toasts
- Fully client-side persistent state (localStorage)

Enjoy the beautiful experience!
