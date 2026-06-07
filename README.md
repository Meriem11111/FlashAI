# 🗒️ FLASHAI

AI-powered flashcard generator. Enter any topic and instantly get flashcards to study, revise, and learn faster.

🔗 **Live Demo:** [flash-ai-gilt.vercel.app](https://flashh-ai.vercel.app/)

---

## Features

- Generate 6 AI-powered flashcards from any topic in seconds
- Flip cards to reveal answers with a smooth animation
- Add multiple topics and switch between them via the sidebar
- Built with Groq's LLaMA 3.3 70B model for fast inference

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **AI:** Groq SDK — LLaMA 3.3 70B Versatile
- **Deployment:** Vercel

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/flashai.git
cd flashai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file at the root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # API route — calls Groq
│   ├── layout.tsx
│   ├── page.tsx              # Home page
│   └── globals.css
└── components/
    └── card.tsx              # Flashcard logic and UI
```

---

## How It Works

1. User enters a topic
2. Next.js API route sends the topic to Groq's LLaMA model
3. The model returns 6 flashcards as JSON
4. Cards are displayed with a flip animation — question on front, answer on back
5. Users can add more topics and navigate between them

---
