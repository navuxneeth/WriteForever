# Quick Start Guide - PicSeek AI Chatbot

Get your chatbot running in 5 minutes! ⚡

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Get Free API Key (2 minutes)

1. Open https://console.groq.com in your browser
2. Click **Sign Up** (use Google/GitHub for quick signup)
3. Once logged in, go to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `gsk_...`)

## Step 3: Configure (30 seconds)

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and paste your API key
# GROQ_API_KEY=gsk_your_actual_key_here
```

Or on Windows:
```cmd
copy .env.example .env
notepad .env
```

## Step 4: Start the Server (30 seconds)

```bash
npm start
```

You should see:
```
============================================================
  CHATBOT SERVER READY
============================================================

✅  AI capabilities enabled with Groq API

============================================================
```

## Step 5: Use the Chatbot (1 minute)

1. Open your browser to **http://localhost:3000**
2. Click **"+ New Chat"**
3. Try these prompts:
   - "Write a comprehensive guide on machine learning in 10 sections"
   - "Create a detailed fantasy story spanning 50 pages"
   - "Generate an extensive research paper on climate change"

## Optional: Demo Mode

Want to try it without an API key first?

```bash
npm start
```

The app will run in demo mode and show you how to enable AI capabilities.

## Troubleshooting

### "npm: command not found"
Install Node.js from https://nodejs.org (LTS version recommended)

### "Port 3000 already in use"
Change the port in `.env`:
```
PORT=8080
```

### "Cannot find module"
Make sure you ran `npm install` first

### Still in demo mode?
Check that:
1. `.env` file exists in the project root
2. `GROQ_API_KEY=` line has your actual key (no quotes)
3. You restarted the server after adding the key

## What to Try

### Short Content
- "Explain quantum computing"
- "Write a short story about space"
- "Summarize the history of the internet"

### Long Content (This is where it shines!)
- "Write a complete 100-page novel about time travel"
- "Create a comprehensive 50-page guide on web development"
- "Generate an extensive 80-page business plan for a startup"

## Next Steps

- Read the full [README.md](README.md) for detailed features
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Need Help?

- Check if your API key is correct
- Make sure you have internet connection
- Look at the server logs for error messages
- Open an issue on GitHub with:
  - What you tried
  - What error you got
  - Your Node.js version (`node --version`)

---

**Enjoy creating amazing content with PicSeek AI! 🚀**
