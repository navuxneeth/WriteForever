require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Groq = require('groq-sdk');
const database = require('./src/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'demo-key' // Will use demo mode if no key
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// API Routes

// Get all conversations
app.get('/api/conversations', async (req, res) => {
  try {
    const conversations = await database.getConversations();
    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Create new conversation
app.post('/api/conversations', async (req, res) => {
  try {
    const { title } = req.body;
    const id = await database.createConversation(title || 'New Chat');
    res.json({ id, title: title || 'New Chat' });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Get messages for a conversation
app.get('/api/conversations/:id/messages', async (req, res) => {
  try {
    const messages = await database.getMessages(req.params.id);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Delete a conversation
app.delete('/api/conversations/:id', async (req, res) => {
  try {
    await database.deleteConversation(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});

// Send a message and get AI response
app.post('/api/chat', async (req, res) => {
  try {
    const { conversationId, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Save user message
    await database.saveMessage(conversationId, 'user', message);

    // Get conversation history for context
    const history = await database.getMessages(conversationId);
    const messages = history.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Set up SSE for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let fullResponse = '';

    try {
      // Use Groq's streaming API with a model that supports large outputs
      const stream = await groq.chat.completions.create({
        messages: messages,
        model: 'llama-3.1-70b-versatile', // Large context window model
        max_tokens: 8000, // Maximum tokens for large outputs
        temperature: 0.7,
        stream: true,
      });

      // Stream the response
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      // Save assistant response
      await database.saveMessage(conversationId, 'assistant', fullResponse);

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error('Groq API error:', error);
      
      // Fallback response if API fails
      const fallbackResponse = `I'm currently operating in demo mode. To enable full AI capabilities with up to 100 pages of output:

1. Sign up for a free Groq API key at https://console.groq.com
2. Create a .env file with: GROQ_API_KEY=your_key_here
3. Restart the server

Groq offers free tier access to powerful models like Llama 3.1 70B with large context windows, perfect for generating extensive content.

Your message was: "${message}"`;

      await database.saveMessage(conversationId, 'assistant', fallbackResponse);
      res.write(`data: ${JSON.stringify({ content: fallbackResponse })}\n\n`);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    }
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('');
  console.log('='.repeat(60));
  console.log('  CHATBOT SERVER READY');
  console.log('='.repeat(60));
  console.log('');
  if (!process.env.GROQ_API_KEY) {
    console.log('⚠️  Running in DEMO mode (no API key detected)');
    console.log('');
    console.log('To enable full AI capabilities:');
    console.log('1. Get a free API key: https://console.groq.com');
    console.log('2. Create .env file with: GROQ_API_KEY=your_key');
    console.log('3. Restart the server');
    console.log('');
  } else {
    console.log('✅  AI capabilities enabled with Groq API');
    console.log('');
  }
  console.log('='.repeat(60));
});
