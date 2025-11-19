# Contributing to PicSeek AI Chatbot

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, browser)

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Potential implementation approach

### Code Contributions

1. **Fork the repository**

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/PicSeek.git
   cd PicSeek
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

6. **Test your changes**
   ```bash
   npm start
   ```
   - Test manually in the browser
   - Ensure no console errors
   - Check responsive design

7. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of changes"
   ```

8. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Create a Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots for UI changes

## Code Style Guidelines

### JavaScript
- Use modern ES6+ syntax
- Use `const` and `let` instead of `var`
- Use meaningful variable names
- Keep functions small and focused
- Add error handling

### CSS
- Follow existing naming conventions
- Use CSS variables for colors and spacing
- Ensure responsive design
- Test on multiple browsers

### HTML
- Use semantic HTML5 elements
- Ensure accessibility (ARIA labels, alt text)
- Keep markup clean and organized

## Commit Message Guidelines

Format: `Type: Brief description`

Types:
- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Modify existing feature
- `Docs:` Documentation changes
- `Style:` Code style changes (formatting)
- `Refactor:` Code refactoring
- `Test:` Add or update tests
- `Chore:` Maintenance tasks

Examples:
```
Add: Implement conversation search feature
Fix: Resolve message streaming issue
Update: Improve mobile responsiveness
Docs: Add deployment instructions
```

## Development Setup

1. Get a free Groq API key from https://console.groq.com
2. Create `.env` file:
   ```
   GROQ_API_KEY=your_key_here
   PORT=3000
   ```
3. Run `npm install`
4. Run `npm start`
5. Visit http://localhost:3000

## Project Structure

```
PicSeek/
├── server.js           # Main server file
├── src/
│   └── database.js     # Database operations
├── public/
│   ├── index.html      # Frontend HTML
│   ├── styles.css      # Styling
│   └── app.js          # Frontend JavaScript
└── package.json        # Dependencies
```

## Areas for Contribution

### High Priority
- Add user authentication
- Implement conversation export (PDF, Markdown)
- Add support for file uploads
- Implement conversation search
- Add dark mode toggle

### Medium Priority
- Add more AI model options
- Implement message editing
- Add conversation sharing
- Improve error handling
- Add unit tests

### Low Priority
- Add keyboard shortcuts
- Implement conversation tags/categories
- Add conversation analytics
- Multi-language support
- Custom themes

## Questions?

Feel free to open an issue for questions or clarifications!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
