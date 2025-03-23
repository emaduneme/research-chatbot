# Project Rules

1. **No Changes Without Permission**: Never make changes to the codebase without explicit permission from the project owner.
2. **Simplicity First**: Always prioritize simplicity and elegance in the code. If a feature can be simplified, it should be.
3. **Minimalist Design**: Follow Apple's design principles - clean, intuitive, and focused on user experience.
4. **Color Guidelines**: Avoid dark blue unless absolutely necessary. Use neutral, calming tones with subtle accent colors.
5. **Visual Effects**: Use glassmorphism and blur effects when appropriate to enhance the UI.
6. **Mobile-First**: Ensure the design is fully responsive and optimized for mobile devices first.
7. **Performance**: Keep the codebase lightweight and optimized for performance.
8. **Step-by-Step Implementation**: Implement features one at a time, ensuring each works perfectly before moving on.
9. **n8n Integration**: The backend will use n8n webhooks to process messages and return formatted responses.
10. **Documentation**: Keep documentation clear and up-to-date for all implemented features.

## Implementation Phases
1. Set up basic Next.js project structure
2. Create minimal chat UI with Apple-inspired design
3. Implement n8n webhook integration
4. Add glassmorphism and design refinements
5. Test and optimize for all devices 

## n8n Integration - CRITICAL SETUP (March 25, 2024)

1. **n8n Webhook Configuration**
   - Webhook URL: `https://emaduneme.app.n8n.cloud/webhook/2512b3b5-c75f-44a8-af7c-066e4ff241a2/chat`
   - Endpoint must include query parameter: `?action=sendMessage`
   - Request body format:
     ```json
     {
       "sessionId": "chat-session-{timestamp}",
       "chatInput": "{user message}"
     }
     ```
   - Response format:
     ```json
     {
       "response": "Bot message content"
     }
     ```

2. **API Integration Modes**
   - The application supports two modes:
     1. **Direct n8n Mode**: Main page (`page.tsx`) connects directly to n8n
     2. **Proxy API Mode**: `/chat` page connects via `/api/n8n-chat` route
   - The proxy API (`app/api/n8n-chat/route.ts`) has a toggle:
     ```typescript
     // Change this to true to use the real n8n webhook, false to use the mock
     const USE_REAL_WEBHOOK = true;
     ```
   - Setting to `false` will use the mock API for testing without n8n

3. **How to Restore This Working State**
   - If the n8n integration breaks, verify these key files:
     
     a. In `app/api/n8n-chat/route.ts`:
     ```typescript
     const N8N_WEBHOOK_URL = 'https://emaduneme.app.n8n.cloud/webhook/2512b3b5-c75f-44a8-af7c-066e4ff241a2/chat';
     const USE_REAL_WEBHOOK = true;
     ```
     
     b. In `app/page.tsx`:
     ```typescript
     // Use the API route instead of direct call
     const N8N_WEBHOOK_URL = '/api/n8n-chat';
     ```
     
     c. Ensure proper request format in both pages:
     ```typescript
     const response = await fetch(`${N8N_WEBHOOK_URL}?action=sendMessage`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         sessionId: 'chat-session-' + Date.now(),
         chatInput: message
       }),
     });
     ```

4. **Server Restart Protocol**
   - If experiencing 404 errors or connection issues:
     ```bash
     # Kill all stray Next.js processes
     pkill -f "node.*next"
     
     # Clear all caches
     rm -rf .next node_modules/.cache
     
     # Restart on specific port
     PORT=3333 npm run dev
     ```
   - Current working port: 3333 (verified connection)
   - Access the app at: `http://localhost:3333/`

5. **Design Elements to Preserve**
   - Glassmorphism effect on message bubbles:
     ```css
     .glass {
       background: rgba(255, 255, 255, 0.7);
       backdrop-filter: blur(10px);
       border: 1px solid rgba(255, 255, 255, 0.3);
       box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
     }
     ```
   - Apple-inspired color scheme with accent color `#2997ff`

## Completed Tasks (March 23, 2024)

1. **Fixed 404 Error Issues**
   - Identified Next.js caching issues causing 404 errors
   - Removed corrupted cache files using `rm -rf .next`
   - Fixed port conflicts by killing stray server processes

2. **UI/UX Enhancements**
   - Restored original Apple-inspired UI design
   - Applied glassmorphism effects to chat components
   - Ensured consistent styling across the application
   - Verified mobile-first responsiveness

3. **API Integration**
   - Implemented `/api/n8n-chat` route to connect to n8n webhook
   - Added mock API fallback for testing without n8n
   - Ensured proper request/response handling with error management

4. **Component Structure**
   - Maintained separation of concerns with dedicated components:
     - `ChatMessage`: For rendering each message bubble
     - `ChatInput`: For user message input with loading states
     - `Header`: For application branding and navigation

5. **Performance Optimization**
   - Simplified Next.js configuration for better reliability
   - Removed unnecessary components that were causing issues
   - Optimized client-side state management for chat history
   - Implemented efficient auto-scrolling to latest messages

6. **App Structure**
   - Fixed routing for the main page and `/chat` route
   - Ensured smooth navigation between pages
   - Set up proper layouts with appropriate metadata
   
The application is now stable and functional with both mock API and n8n webhook integration options. The UI follows the Apple-inspired design principles with glassmorphism effects as specified in the project requirements.

## Completed Tasks (March 26, 2024)

1. **Dark Mode Support**
   - Added theme toggle in the Header component
   - Implemented detection of system preference for initial theme
   - Updated all components with dark mode styles
   - Added theme persistence in localStorage
   - Used CSS variables to control theme colors
   - Smooth transitions between light and dark modes

2. **Loading Bubbles Enhancement**
   - Improved loading animation in the chat interface
   - Fixed issues with loading bubbles not appearing properly
   - Made bubbles appear in the message flow as a temporary message
   - Used consistent styling with the design system
   - Added small delay to ensure proper display order
   - Increased size and visibility of the loading dots
   - Enhanced dark mode support for the animation

## Current Status (March 26, 2024)
1. **Functional Features**
   - Chat interface with Apple-inspired design
   - Dark/light theme toggle with system preference detection
   - Real-time loading bubbles animation in chat flow
   - n8n webhook integration via proxy API
   - Mock API fallback for offline development
   - Responsive design for all device sizes
   - Auto-scrolling to latest messages

2. **Additional Improvements**
   - Enhanced glassmorphism effects with dark mode support
   - Improved loading state animations and transitions
   - Consistent component styling across pages
   - Optimized server restart protocol for development
   - Timestamps on messages
   - Chat reset functionality

## Pending Tasks (March 26, 2024)

*No pending tasks at the moment.*

## Server Configuration Notes

1. **Port Usage**
   - Default port 3000 is often occupied by other processes
   - The application automatically uses alternative ports (3001-3009)
   - Current working port: 3009 (as of last restart)
   - Use `curl http://localhost:3009` to verify the server is running

2. **Common Server Issues**
   - Webpack caching failures with error: `Caching failed for pack: Error: ENOENT: no such file or directory`
   - SWC module resolution errors in vendor chunks
   - Fast Refresh sometimes requires full reload
   - Multiple server instances may accumulate if not properly terminated

3. **Troubleshooting Steps**
   - Clear Next.js cache with `rm -rf .next` to resolve 404 errors
   - Use `pkill -f "node.*next"` to kill all stray Next.js processes
   - Also clear node_modules cache with `rm -rf node_modules/.cache`
   - Simplify `next.config.js` to avoid complex configurations causing errors

4. **Current Working URLs**
   - Home page: http://localhost:3333/
   - Chat interface: http://localhost:3333/chat
   - API endpoint: http://localhost:3333/api/n8n-chat?action=sendMessage

## Project Structure

```
research-chatbot/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts        # Mock API for chat responses
│   │   └── n8n-chat/
│   │       └── route.ts        # Proxy API to connect with n8n webhook
│   ├── chat/
│   │   └── page.tsx            # Chat page with dedicated UI
│   ├── globals.css             # Global CSS styles including glassmorphism
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Home page with chat interface
├── components/
│   ├── ChatInput.tsx           # User input component with loading state
│   ├── ChatMessage.tsx         # Message bubble component
│   ├── FloatingN8nChat.tsx     # Floating chat button UI (not currently used)
│   └── Header.tsx              # App header with branding
├── tailwind.config.js          # Tailwind CSS configuration
├── next.config.js              # Next.js configuration
└── Todo.md                     # Project documentation and tasks
```

## Key Files and Their Contents

### 1. app/page.tsx
The main home page that includes:
- Chat interface with Apple-inspired design
- Message history state management
- API integration with n8n webhook
- Auto-scrolling to the latest message
- Error handling for failed API requests

### 2. app/chat/page.tsx
A dedicated chat page that:
- Contains its own implementation of chat components
- Connects to the n8n webhook via the proxy API
- Has a clean, responsive design
- Includes a link back to the home page

### 3. app/api/n8n-chat/route.ts
A proxy API that:
- Provides a configurable toggle between real n8n webhook and mock API
- Forwards requests with proper formatting
- Handles errors gracefully
- Returns standardized responses

### 4. app/api/chat/route.ts
A mock API that:
- Simulates responses based on user queries
- Supports keywords related to climate change topics
- Includes a delay to simulate real processing time

### 5. components/ChatMessage.tsx
A reusable component that:
- Renders message bubbles with different styles for user and bot
- Includes timestamps
- Uses glassmorphism effects for bot messages
- Has responsive design for all screen sizes

### 6. components/ChatInput.tsx
An input component that:
- Handles user message submission
- Shows loading state when sending messages
- Has a disabled state to prevent multiple submissions
- Includes keyboard shortcuts (Enter to send)

### 7. components/Header.tsx
A simple header component with:
- App title "Climate Change Solutions"
- Glass effect styling
- Theme toggle button

### 8. app/globals.css
Global styles including:
- Tailwind CSS configuration
- Glassmorphism effect classes
- Custom scrollbar styling
- Color scheme variables

### 9. app/layout.tsx
The root layout that:
- Wraps all pages
- Sets up metadata
- Applies global font and background styles

### 10. tailwind.config.js
Configuration for Tailwind CSS with:
- Custom color scheme (primary, secondary, accent, dark)
- Apple-inspired font stack
- Backdrop filter settings for glassmorphism
- Custom shadow settings

This structure follows an Apple-inspired design with glassmorphism effects, maintains separation of concerns with dedicated components, and provides flexible API integration options between mock responses and n8n webhook communication. 