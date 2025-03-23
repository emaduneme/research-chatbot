# Research Chatbot

A minimalist, Apple-inspired chat interface for integration with n8n webhooks. This project follows design principles inspired by Apple, Steve Jobs, Jony Ive, and Dieter Rams.

## Features

- Clean, minimalist UI with glassmorphism effects
- Responsive design for all devices
- Integration with n8n webhooks
- Real-time chat functionality

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Update the webhook URL:
   - Open `config/webhook.ts`
   - Replace `YOUR_N8N_WEBHOOK_URL` with your actual n8n webhook URL

4. Run the development server:
   ```
   npm run dev
   ```

## n8n Webhook Configuration

1. In your n8n instance, create a new workflow
2. Add an HTTP Webhook node as a trigger
3. Configure the webhook to receive POST requests
4. Set up the workflow to process the incoming message from the `message` field in the request body
5. Return a response with the following structure:
   ```json
   {
     "response": "Your processed response here"
   }
   ```

## Design Principles

- **Simplicity and Clarity**: Clean, uncluttered layout with intuitive navigation
- **High-Quality Aesthetic**: Refined color palette with neutral tones and subtle accent colors
- **Function Over Form**: All design choices prioritize usability
- **Precision in Details**: Carefully considered spacing, typography, and interactions
- **Human-Centered Design**: Creating a seamless experience across all devices

## Customization

- Colors can be modified in `tailwind.config.js`
- UI components are separated for easy customization

## License

MIT 