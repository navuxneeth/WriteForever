# WriteForever - AI Chatbot with Large Output Capability 🚀

A powerful AI chatbot website that can write up to 100 pages at a time, featuring a large token output window powered by advanced language models. Now with VT323 retro font, aesthetic pastel colors, and light/dark mode toggle!

## ✨ Features

- 📝 **Large Token Output**: Generate extensive content up to 100 pages
- 🧠 **Powerful AI Model**: Powered by Llama 3.1 70B via Groq API
- 💾 **Persistent Storage**: SQLite database for conversation history
- ⚡ **Streaming Responses**: Real-time response streaming for better UX
- 🆓 **Free to Use**: Uses free-tier API with generous limits
- 🎨 **Modern UI**: Clean, responsive interface with VT323 retro font
- 🌈 **Aesthetic Pastel Theme**: Beautiful pastel color scheme for both light and dark modes
- 🌙 **Light/Dark Mode**: Toggle between themes with persistence
- 💬 **Multiple Conversations**: Create and manage multiple chat sessions

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/navuxneeth/PicSeek.git
   cd PicSeek
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

   The API key is pre-configured in the `.env` file, so you can start using the chatbot immediately!

4. **Open in browser**
   
   Navigate to `http://localhost:3000`

## 🎯 Usage

The application comes pre-configured with an API key, so you can start chatting immediately:

1. Click "**+ New Chat**" to start a conversation
2. Type your message in the input box
3. Press **Send** or **Ctrl+Enter** to submit
4. Toggle between light and dark mode using the 🌙/☀️ button
5. Watch as the AI generates responses in real-time
6. Request long-form content like:
   - "Write a comprehensive 50-page guide on web development"
   - "Create a detailed fantasy story spanning 100 pages"
   - "Generate an extensive research paper on AI ethics"

## 🛠️ Technical Stack

- **Backend**: Node.js with Express
- **Database**: SQLite3
- **AI API**: Groq (Llama 3.1 70B model)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Streaming**: Server-Sent Events (SSE)

## 📁 Project Structure

```
WriteForever/
├── server.js           # Express server and API endpoints
├── src/
│   └── database.js     # SQLite database layer
├── public/
│   ├── index.html      # Frontend HTML
│   ├── styles.css      # Styling with VT323 font and pastel theme
│   └── app.js          # Frontend JavaScript with theme toggle
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
└── README.md          # This file
```

## 🔧 Configuration

The application comes pre-configured with a Groq API key in the `.env` file. You can edit this file to configure:

- `GROQ_API_KEY`: Pre-configured Groq API key (you can replace with your own if desired)
- `PORT`: Server port (default: 3000)

## 📊 API Endpoints

- `GET /api/conversations` - List all conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id/messages` - Get messages for a conversation
- `DELETE /api/conversations/:id` - Delete a conversation
- `POST /api/chat` - Send message and get AI response (streaming)

## 🌟 Key Capabilities

### Large Token Output
The chatbot is configured to handle very large responses:
- Maximum tokens: 8000+ per response
- Can generate book-length content in a single interaction
- Supports complex, multi-part responses

### Streaming Response
Real-time streaming ensures:
- Immediate feedback as AI generates content
- Better user experience for long responses
- Ability to see content being created

### Conversation Management
- Create multiple chat sessions
- Persistent conversation history
- Delete unwanted conversations
- Context-aware responses based on chat history

## 🆓 Free Tier Details

The application uses Groq's free tier which offers:
- Generous request limits
- Fast inference times
- Access to powerful Llama 3.1 models
- No credit card required for basic usage

## 🐛 Troubleshooting

### Port already in use
- Change the `PORT` in `.env` file
- Or stop the process using port 3000

### Database errors
- Delete `chat.db` file to reset database
- Restart the server

### API Key Issues
- The repository comes with a pre-configured API key
- If you see authentication errors, the API key may have been revoked
- You can get a new free API key at [https://console.groq.com](https://console.groq.com) and update it in the `.env` file

## 📝 License

MIT License - feel free to use this project for any purpose!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 💡 Tips for Best Results

1. **Be specific**: Detailed prompts yield better results
2. **Request structure**: Ask for specific formats (chapters, sections, etc.)
3. **Iterate**: Follow up on responses to refine content
4. **Save conversations**: Use multiple chats to organize different topics
5. **Explore limits**: Test the boundaries of the large output capability

## 🔗 Links

- [Groq Console](https://console.groq.com) - Get your free API key
- [Groq Documentation](https://console.groq.com/docs) - API documentation
- [GitHub Repository](https://github.com/navuxneeth/PicSeek)

---

**Enjoy creating extensive content with WriteForever! 🎉**