# Climate Change Solutions Chatbot

An Apple-inspired chat interface for discussing climate change solutions, with n8n webhook integration.

![Climate Change Solutions Chatbot](https://github.com/emaduneme/research-chatbot/blob/main/docs/screenshot.png)

## Live Demo

Try the application at:
- [GitHub Repository](https://github.com/emaduneme/research-chatbot)
- *Live demo link will be added after deployment*

## Features

- 🎨 Apple-inspired UI design with glassmorphism effects
- 🌓 Dark/light theme toggle with system preference detection
- 💬 Interactive chat interface with loading animations
- 🔄 n8n webhook integration for AI-powered responses
- 📱 Fully responsive design for all device sizes
- ⚡ Mock API fallback for offline development
- 🔄 Auto-scrolling to latest messages

## Running Locally

1. Clone the repository:
```bash
git clone https://github.com/emaduneme/research-chatbot.git
cd research-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
# or with a specific port
PORT=3333 npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
# or the port specified in the terminal output
```

## n8n Integration

The application connects to n8n webhooks for processing messages. To use your own n8n instance:

1. Update the webhook URL in `app/api/n8n-chat/route.ts`
2. Set `USE_REAL_WEBHOOK` to `true` for n8n connection or `false` for mock API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 