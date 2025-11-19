# WriteForever - Standalone HTML Version

A fully self-contained, pixel-themed AI chatbot that works directly in your browser without any setup! 🎮✨

## ✨ Features

- 🎨 **Pixel Art Theme**: Retro pixel design with Press Start 2P font
- 🎯 **No Setup Required**: Just open the HTML file in your browser
- 🔑 **API Key Embedded**: Ready to use immediately (public key is fine for client-side use)
- 📝 **8000 Tokens Output**: Generate approximately 6000 words per response
- 💾 **Local Storage**: Conversations saved in your browser
- 🌓 **Dark/Light Mode**: Toggle between themes with persistence
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile devices
- 🎨 **Off-White Color Scheme**: Clean, neutral colors instead of pink
- ⚡ **Streaming Responses**: Real-time AI output
- 🆓 **Completely Free**: No server, no cost, no complexity

## 🚀 Quick Start

### Option 1: Direct File Open
1. Download `standalone.html`
2. Double-click to open it in your web browser
3. Start chatting immediately!

### Option 2: Local Server (Recommended for CORS)
If you encounter CORS issues with file:// protocol:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Python 2
python -m SimpleHTTPServer 8080

# Using Node.js
npx http-server -p 8080
```

Then open: `http://localhost:8080/standalone.html`

## 📖 How to Use

1. **Create a New Chat**: Click the `+ NEW CHAT` button
2. **Type Your Message**: Enter your prompt in the text box
3. **Send**: Click `SEND` or press `Ctrl+Enter`
4. **Watch Magic Happen**: AI responses stream in real-time
5. **Toggle Theme**: Click `LIGHT`/`DARK` button to switch themes
6. **Mobile Menu**: On mobile, use the `MENU` button to access the sidebar

## 🎯 What Can You Ask For?

- **Long-form Content**: "Write a comprehensive guide to machine learning (5000 words)"
- **Creative Writing**: "Create a fantasy story with detailed world-building"
- **Technical Documentation**: "Write detailed API documentation for a REST service"
- **Research Papers**: "Explain quantum computing in depth"
- **Code Examples**: "Write a complete tutorial on React hooks with examples"

## 🎨 Design Features

### Pixel Theme
- **Font**: Press Start 2P (retro gaming style)
- **Colors**: Off-white and neutral tones
- **Buttons**: Classic pixel-art style with shadow effects
- **Borders**: Thick, retro-styled borders

### Color Scheme
- **Light Mode**: Off-white backgrounds (#fafaf5) with neutral accents
- **Dark Mode**: Dark gray backgrounds (#1a1a18) with muted highlights
- **Accents**: Subtle gray-green tones (#8b8b7a)

## 💾 Data Storage

All conversations are stored locally in your browser's `localStorage`:
- No server required
- No data sent anywhere except to Groq API for AI responses
- Data persists across browser sessions
- Clear browser data to reset

## 🔒 Privacy & Security

- **API Key**: The embedded API key is intentionally public and rate-limited
- **Local First**: All conversation history stays in your browser
- **No Tracking**: No analytics, cookies, or tracking
- **Direct API Calls**: Communicates only with Groq API

## 📱 Responsive Design

### Desktop (1920px+)
- Full sidebar visible
- Large font sizes for readability
- Spacious layout

### Tablet (768px - 1024px)
- Optimized font sizes
- Adjusted spacing

### Mobile (< 768px)
- Collapsible sidebar with MENU button
- Vertical button layout
- Touch-friendly interface
- Smaller font sizes optimized for small screens

## 🔧 Technical Details

### Technologies Used
- **Pure HTML/CSS/JavaScript**: No frameworks or build tools
- **Groq API**: For AI responses (Llama 3.1 70B model)
- **LocalStorage**: For data persistence
- **Press Start 2P**: Google Font for pixel theme
- **Server-Sent Events**: For streaming responses

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### API Configuration
- **Model**: `llama-3.1-70b-versatile`
- **Max Tokens**: 8000 (approximately 6000 words)
- **Temperature**: 0.7
- **Streaming**: Enabled

## ⚙️ Customization

### Change API Key
Look for this line in the HTML file:
```javascript
const GROQ_API_KEY = 'your-api-key-here';
```

### Modify Colors
Edit the CSS variables in the `:root` section:
```css
:root {
    --primary-color: #f5f5f0;
    --accent-color: #8b8b7a;
    /* ... more colors ... */
}
```

### Adjust Font Sizes
Change the base font size:
```css
body {
    font-size: 10px; /* Adjust this value */
}
```

## 🐛 Troubleshooting

### CORS Errors
If you see CORS errors when opening the file directly:
- Use a local web server (see Quick Start)
- The Groq API supports CORS, but file:// protocol may have restrictions

### Conversations Not Saving
- Check if browser's localStorage is enabled
- Some browsers in private/incognito mode don't persist localStorage

### API Errors
- The embedded API key is rate-limited
- Get your own free API key at https://console.groq.com
- Replace the key in the HTML file

### Mobile Menu Not Working
- Ensure JavaScript is enabled
- Try refreshing the page
- Check browser console for errors

## 📊 Token Limits

- **8000 tokens** = approximately **6000 words**
- **6000 words** = approximately **12 pages** (500 words per page)
- Suitable for:
  - Long essays and articles
  - Detailed tutorials
  - Short stories
  - Technical documentation
  - Research summaries

## 🌐 Getting Your Own API Key

1. Visit https://console.groq.com
2. Sign up for a free account
3. Create a new API key
4. Replace the key in `standalone.html`

**Note**: Groq offers a generous free tier with fast inference times!

## 📝 License

This project is open source and available for personal and commercial use.

## 🎉 Enjoy!

WriteForever is designed to be simple, beautiful, and powerful. No installation, no configuration, just open and write!

---

**Questions or Issues?**  
Open an issue on GitHub or check the code comments in `standalone.html`
