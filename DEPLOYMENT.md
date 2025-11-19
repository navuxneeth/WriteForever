# Deployment Guide

This guide covers multiple deployment options for the PicSeek AI Chatbot.

## Option 1: Local Development

### Prerequisites
- Node.js 14+ installed
- A free Groq API key from https://console.groq.com

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/navuxneeth/PicSeek.git
   cd PicSeek
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Add your Groq API key to `.env`:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open browser to http://localhost:3000

## Option 2: Deploy to Heroku

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps
1. Login to Heroku:
   ```bash
   heroku login
   ```

2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

3. Set environment variables:
   ```bash
   heroku config:set GROQ_API_KEY=your_groq_api_key_here
   ```

4. Deploy:
   ```bash
   git push heroku main
   ```

5. Open the app:
   ```bash
   heroku open
   ```

## Option 3: Deploy to Vercel

### Prerequisites
- Vercel account
- Vercel CLI installed

### Steps
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variable in Vercel dashboard:
   - Go to your project settings
   - Add `GROQ_API_KEY` environment variable

5. Redeploy after setting env var

## Option 4: Deploy to Railway

### Prerequisites
- Railway account

### Steps
1. Visit https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository
5. Add environment variable `GROQ_API_KEY` in the Variables section
6. Deploy!

## Option 5: Deploy to Render

### Prerequisites
- Render account

### Steps
1. Visit https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: picseek-chatbot
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variable:
   - Key: `GROQ_API_KEY`
   - Value: your API key
6. Click "Create Web Service"

## Option 6: Docker Deployment

### Prerequisites
- Docker installed

### Steps
1. Build the Docker image:
   ```bash
   docker build -t picseek-chatbot .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -e GROQ_API_KEY=your_key picseek-chatbot
   ```

3. Access at http://localhost:3000

## Option 7: VPS Deployment (DigitalOcean, AWS, etc.)

### Prerequisites
- VPS with Node.js installed
- Domain name (optional)

### Steps
1. SSH into your VPS:
   ```bash
   ssh user@your-server-ip
   ```

2. Install Node.js (if not installed):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Clone and setup:
   ```bash
   git clone https://github.com/navuxneeth/PicSeek.git
   cd PicSeek
   npm install
   ```

4. Create `.env` file with your API key

5. Install PM2 for process management:
   ```bash
   sudo npm install -g pm2
   ```

6. Start the app:
   ```bash
   pm2 start server.js --name picseek
   pm2 save
   pm2 startup
   ```

7. Setup Nginx reverse proxy (optional):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `GROQ_API_KEY` | No* | API key from Groq Console | None (demo mode) |
| `PORT` | No | Server port | 3000 |

*App runs in demo mode without API key

## Getting Groq API Key (FREE)

1. Visit https://console.groq.com
2. Sign up for a free account (no credit card required)
3. Navigate to API Keys section
4. Click "Create API Key"
5. Copy and save your key securely
6. Add to your `.env` file

## Troubleshooting

### Issue: "Cannot find module"
**Solution**: Run `npm install` again

### Issue: "Port 3000 already in use"
**Solution**: Change PORT in .env or stop the process using port 3000

### Issue: "Demo mode" message
**Solution**: Add valid GROQ_API_KEY to .env file

### Issue: Database errors
**Solution**: Delete `chat.db` file and restart server

### Issue: API rate limits
**Solution**: Groq free tier has generous limits. If exceeded, wait or upgrade plan.

## Performance Tips

1. **Database**: For production, consider upgrading from SQLite to PostgreSQL
2. **Caching**: Implement Redis for session management
3. **Load Balancing**: Use PM2 cluster mode for better performance
4. **CDN**: Serve static files via CDN
5. **Monitoring**: Add logging and monitoring (e.g., Sentry, LogRocket)

## Security Recommendations

1. Never commit `.env` file to Git
2. Use HTTPS in production (Let's Encrypt for free SSL)
3. Implement rate limiting for API endpoints
4. Add authentication for multi-user scenarios
5. Keep dependencies updated

## Support

For issues or questions:
- Open an issue on GitHub
- Check the README.md for documentation
- Review Groq API documentation

---

**Happy Deploying! 🚀**
