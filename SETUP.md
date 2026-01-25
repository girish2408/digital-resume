# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

## 2. Environment Variables

Create a `.env` file in the root directory with:

```env
OPENAI_API_KEY=sk-your-key-here
RESEND_API_KEY=re-your-key-here
OPENAI_MODEL=gpt-4-turbo-preview

# Optional: SMS via Twilio
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=your-number
GIRISH_PHONE_NUMBER=+971503214652

# Optional: Admin API for leads
ADMIN_API_KEY=your-admin-key
```

## 3. Get API Keys

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and paste into `.env`

### Resend (Email)
1. Go to https://resend.com
2. Sign up/login
3. Create an API key
4. Copy and paste into `.env`
5. **Important**: Update the `from` email in `/app/api/contact/email/route.ts` with your verified domain

### Twilio (SMS - Optional)
1. Go to https://www.twilio.com
2. Sign up/login
3. Get Account SID and Auth Token from dashboard
4. Get a phone number
5. Copy credentials into `.env`

## 4. Add Resume PDF

Replace `/public/resume.pdf` with your actual resume PDF file.

## 5. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open http://localhost:3000

## 6. Test Features

- ✅ Navigate all pages
- ✅ Test chat widget (requires OpenAI API key)
- ✅ Test contact form (requires Resend API key)
- ✅ Test dark/light mode toggle
- ✅ Verify mobile responsiveness

## 7. Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Troubleshooting

### Chat not working
- Check OpenAI API key is set correctly
- Check browser console for errors
- Verify API key has credits

### Email not sending
- Verify Resend API key
- Check `from` email is verified in Resend dashboard
- Check Resend dashboard for error logs

### Build errors
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Check Node.js version (18+ required)
