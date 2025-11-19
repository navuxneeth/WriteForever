// State management
let currentConversationId = null;
let isStreaming = false;

// Theme management
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// DOM Elements
const conversationsList = document.getElementById('conversationsList');
const messagesContainer = document.getElementById('messagesContainer');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const sendBtnText = document.getElementById('sendBtnText');
const sendBtnLoading = document.getElementById('sendBtnLoading');
const newChatBtn = document.getElementById('newChatBtn');
const chatTitle = document.getElementById('chatTitle');
const deleteChatBtn = document.getElementById('deleteChatBtn');
const themeToggle = document.getElementById('themeToggle');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadConversations();
    setupEventListeners();
    updateThemeIcon();
});

// Theme toggle function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

// Event Listeners
function setupEventListeners() {
    messageForm.addEventListener('submit', handleMessageSubmit);
    newChatBtn.addEventListener('click', createNewConversation);
    deleteChatBtn.addEventListener('click', deleteCurrentConversation);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = Math.min(messageInput.scrollHeight, 200) + 'px';
    });

    // Allow Ctrl+Enter to submit
    messageInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            messageForm.dispatchEvent(new Event('submit'));
        }
    });
}

// API Functions
async function loadConversations() {
    try {
        const response = await fetch('/api/conversations');
        const conversations = await response.json();
        
        conversationsList.innerHTML = '';
        
        if (conversations.length === 0) {
            conversationsList.innerHTML = '<p style="padding: 1rem; text-align: center; color: var(--text-secondary);">No conversations yet</p>';
            return;
        }
        
        conversations.forEach(conv => {
            const item = createConversationElement(conv);
            conversationsList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading conversations:', error);
        showError('Failed to load conversations');
    }
}

function createConversationElement(conv) {
    const div = document.createElement('div');
    div.className = 'conversation-item';
    if (conv.id === currentConversationId) {
        div.classList.add('active');
    }
    
    const date = new Date(conv.created_at).toLocaleDateString();
    
    div.innerHTML = `
        <h3>${conv.title}</h3>
        <p>${date}</p>
    `;
    
    div.addEventListener('click', () => loadConversation(conv.id));
    
    return div;
}

async function createNewConversation() {
    try {
        const response = await fetch('/api/conversations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'New Chat' })
        });
        
        const conversation = await response.json();
        await loadConversations();
        loadConversation(conversation.id);
    } catch (error) {
        console.error('Error creating conversation:', error);
        showError('Failed to create new conversation');
    }
}

async function loadConversation(id) {
    try {
        currentConversationId = id;
        
        const response = await fetch(`/api/conversations/${id}/messages`);
        const messages = await response.json();
        
        // Update UI
        chatTitle.textContent = `Chat #${id}`;
        deleteChatBtn.style.display = 'block';
        
        // Update active state in sidebar
        document.querySelectorAll('.conversation-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Clear messages container
        messagesContainer.innerHTML = '';
        
        // Display messages
        if (messages.length === 0) {
            messagesContainer.innerHTML = `
                <div class="welcome-message">
                    <h2>New Conversation Started! 💬</h2>
                    <p>Start chatting by typing a message below. WriteForever can generate extensive content:</p>
                    <ul>
                        <li>Ask for detailed explanations or tutorials</li>
                        <li>Request long-form content like articles or stories</li>
                        <li>Get comprehensive research summaries</li>
                        <li>Create detailed documentation</li>
                    </ul>
                </div>
            `;
        } else {
            messages.forEach(msg => {
                displayMessage(msg.role, msg.content, false);
            });
            scrollToBottom();
        }
        
        // Reload conversations to update active state
        loadConversations();
        
        // Focus input
        messageInput.focus();
    } catch (error) {
        console.error('Error loading conversation:', error);
        showError('Failed to load conversation');
    }
}

async function deleteCurrentConversation() {
    if (!currentConversationId) return;
    
    if (!confirm('Are you sure you want to delete this conversation?')) {
        return;
    }
    
    try {
        await fetch(`/api/conversations/${currentConversationId}`, {
            method: 'DELETE'
        });
        
        currentConversationId = null;
        chatTitle.textContent = 'Select or create a new chat';
        deleteChatBtn.style.display = 'none';
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <h2>Welcome to WriteForever! 🚀</h2>
                <p>This chatbot is powered by advanced AI models capable of generating extensive content:</p>
                <ul>
                    <li>✍️ Write up to 100 pages at a time</li>
                    <li>🧠 Large context window for complex tasks</li>
                    <li>💾 Persistent conversation history</li>
                    <li>⚡ Streaming responses for real-time output</li>
                    <li>🆓 Completely free to use</li>
                </ul>
                <p><strong>Get started:</strong> Create a new chat or ask me anything!</p>
            </div>
        `;
        
        loadConversations();
    } catch (error) {
        console.error('Error deleting conversation:', error);
        showError('Failed to delete conversation');
    }
}

async function handleMessageSubmit(e) {
    e.preventDefault();
    
    if (!currentConversationId) {
        // Create a new conversation first
        await createNewConversation();
        // Wait a bit for the conversation to be created
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    const message = messageInput.value.trim();
    
    if (!message || isStreaming) return;
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Display user message
    displayMessage('user', message);
    
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    
    // Disable input
    setInputState(false);
    
    try {
        // Send message to API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                conversationId: currentConversationId,
                message: message
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Create assistant message element
        const assistantMessage = createMessageElement('assistant', '');
        const contentDiv = assistantMessage.querySelector('.message-content');
        messagesContainer.appendChild(assistantMessage);
        
        // Stream the response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        
        isStreaming = true;
        
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            
            // Process complete SSE messages
            const lines = buffer.split('\n\n');
            buffer = lines.pop() || '';
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = JSON.parse(line.slice(6));
                    
                    if (data.content) {
                        contentDiv.textContent += data.content;
                        scrollToBottom();
                    }
                    
                    if (data.done) {
                        isStreaming = false;
                    }
                }
            }
        }
        
        scrollToBottom();
    } catch (error) {
        console.error('Error sending message:', error);
        typingIndicator.remove();
        showError('Failed to send message. Please try again.');
    } finally {
        setInputState(true);
        messageInput.focus();
    }
}

// UI Functions
function displayMessage(role, content, animate = true) {
    const messageEl = createMessageElement(role, content);
    
    if (!animate) {
        messageEl.style.animation = 'none';
    }
    
    messagesContainer.appendChild(messageEl);
    scrollToBottom();
}

function createMessageElement(role, content) {
    const div = document.createElement('div');
    div.className = `message ${role}`;
    
    const roleText = role === 'user' ? '👤 You' : '🤖 AI Assistant';
    
    div.innerHTML = `
        <div class="message-header">${roleText}</div>
        <div class="message-content">${content}</div>
    `;
    
    return div;
}

function showTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(div);
    scrollToBottom();
    return div;
}

function setInputState(enabled) {
    messageInput.disabled = !enabled;
    sendBtn.disabled = !enabled;
    
    if (enabled) {
        sendBtnText.style.display = 'inline';
        sendBtnLoading.style.display = 'none';
    } else {
        sendBtnText.style.display = 'none';
        sendBtnLoading.style.display = 'inline';
    }
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message assistant';
    errorDiv.innerHTML = `
        <div class="message-header">⚠️ Error</div>
        <div class="message-content">${message}</div>
    `;
    messagesContainer.appendChild(errorDiv);
    scrollToBottom();
}
