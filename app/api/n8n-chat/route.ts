import { NextResponse } from 'next/server';

// The n8n webhook URL - keep this server-side only
const N8N_WEBHOOK_URL = 'https://emaduneme.app.n8n.cloud/webhook/2512b3b5-c75f-44a8-af7c-066e4ff241a2/chat';

// Change this to true to use the real n8n webhook, false to use the local mock
const USE_REAL_WEBHOOK = true;

export async function POST(request: Request) {
  try {
    // Get the query params (action)
    const url = new URL(request.url);
    const action = url.searchParams.get('action') || 'sendMessage';
    
    // Get the request body
    const body = await request.json();
    
    if (USE_REAL_WEBHOOK) {
      // Forward the request to n8n webhook with the action parameter
      const response = await fetch(`${N8N_WEBHOOK_URL}?action=${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      // Get the response from n8n
      const data = await response.json();
      
      // Return the response
      return NextResponse.json(data);
    } else {
      // Use our local mock API instead
      const mockResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      const data = await mockResponse.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error proxying request:', error);
    return NextResponse.json(
      { error: 'Failed to process request', response: 'Sorry, there was an error connecting to the service.' },
      { status: 500 }
    );
  }
} 