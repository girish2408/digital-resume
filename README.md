# Girish Watwani - Portfolio Website

A modern, production-grade personal portfolio website built with Next.js 14, showcasing experience in banking, wealth platforms, and agentic AI. Features a "Digital Girish" AI chat assistant powered by OpenAI.

## Features

- 🎨 **Modern UI**: Built with Tailwind CSS, shadcn/ui, and Framer Motion
- 🤖 **AI Chat Assistant**: "Digital Girish" with RAG-based Q&A and tool calling
- 📱 **Mobile Responsive**: Perfect layout on all devices
- 🌙 **Dark Mode**: Full dark/light theme support
- ⚡ **Performance**: Optimized for Lighthouse scores > 90
- 🔒 **Secure**: Rate limiting, input validation, and security best practices
- 📧 **Contact Forms**: Email and SMS integration (Resend + Twilio)
- 🎯 **Accessible**: WCAG-friendly with keyboard navigation

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: TanStack Query (React Query)
- **AI**: OpenAI API (GPT-4)
- **Email**: Resend
- **SMS**: Twilio (optional)
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, or pnpm
- OpenAI API key
- Resend API key (for email)
- Twilio credentials (optional, for SMS)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-resume
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Copy the environment variables file:
```bash
cp .env.example .env
```

4. Fill in your environment variables in `.env`:
```env
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
TWILIO_ACCOUNT_SID=... (optional)
TWILIO_AUTH_TOKEN=... (optional)
TWILIO_PHONE_NUMBER=... (optional)
```

5. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
my-resume/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── chat/          # Chat API endpoint
│   │   ├── contact/       # Email & SMS endpoints
│   │   ├── leads/         # Lead management
│   │   └── tools/         # Tool execution endpoint
│   ├── about/             # About page
│   ├── experience/        # Experience timeline
│   ├── projects/          # Projects showcase
│   ├── agentic-lab/       # AI/Agentic Lab page
│   ├── contact/           # Contact form
│   ├── resume/            # Resume page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ChatWidget.tsx    # AI chat widget
│   ├── Timeline.tsx      # Experience timeline
│   ├── ProjectCards.tsx  # Project cards
│   ├── TechMarquee.tsx   # Animated tech stack
│   └── AnimatedDiagram.tsx # AI diagrams
├── data/                  # Data files
│   ├── profile.json      # Resume/profile data
│   └── projects.json     # Projects data
├── lib/                   # Utility libraries
│   ├── retrieval.ts      # Knowledge retrieval
│   ├── tools.ts          # Tool definitions
│   ├── validators.ts     # Zod schemas
│   ├── rateLimit.ts      # Rate limiting
│   └── utils.ts          # Utility functions
└── public/               # Static assets
    └── resume.pdf        # Resume PDF (placeholder)
```

## Environment Variables

See `.env.example` for all required environment variables. Key variables:

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `RESEND_API_KEY`: Resend API key for email (required)
- `TWILIO_*`: Twilio credentials for SMS (optional)
- `ADMIN_API_KEY`: API key for accessing leads (optional)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Detect Next.js
- Run build commands
- Deploy to production

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Railway
- Netlify
- AWS Amplify
- DigitalOcean App Platform

Make sure to:
1. Set all environment variables
2. Run `npm run build` to test locally
3. Ensure Node.js 18+ is available

## Content Editing Guide

See [CONTENT_EDITING.md](./CONTENT_EDITING.md) for detailed instructions on updating content without touching code.

## API Endpoints

### `/api/chat`
POST - Chat with Digital Girish
- Body: `{ message: string, mode?: "profile" | "recruiter" | "project", conversationId?: string }`
- Returns: `{ message: string, toolCalls?: array }`

### `/api/contact/email`
POST - Send email to Girish
- Body: `{ name: string, email: string, message: string, topic?: string }`
- Returns: `{ success: boolean, messageId?: string }`

### `/api/contact/sms`
POST - Send SMS to Girish (optional)
- Body: `{ name: string, phone: string, message: string }`
- Returns: `{ success: boolean, messageId?: string }`

### `/api/leads`
POST - Create a lead
- Body: `{ name: string, email: string, company?: string, message: string }`
- Returns: `{ success: boolean, leadId: string }`

GET - Get all leads (requires ADMIN_API_KEY)
- Headers: `Authorization: Bearer <ADMIN_API_KEY>`
- Returns: `{ leads: array }`

## Chat Modes

The Digital Girish chat assistant supports three modes:

1. **Profile Q&A** (default): Answers questions about experience, skills, and projects
2. **Recruiter Mode**: Provides interview-ready summaries and role matching
3. **Project Deep Dive**: Explains technical architecture and implementation details

## Security Features

- Rate limiting on all API endpoints (10 requests/minute)
- Input validation with Zod
- No secrets exposed in responses
- Prompt injection resistance
- Safe tool execution

## Performance Optimization

- Image optimization with Next.js Image
- Code splitting
- Lazy loading
- Optimized animations
- Efficient re-renders with React Query

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved

## Contact

- Email: girish.watwani2008@gmail.com
- LinkedIn: linkedin.com/in/girish-watwani/
- GitHub: https://github.com/girish2408
