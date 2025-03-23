// Use environment variable if available, otherwise fall back to a placeholder
// In production, make sure to set the NEXT_PUBLIC_N8N_WEBHOOK_URL in your environment
export const N8N_WEBHOOK_URL = 
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'YOUR_N8N_WEBHOOK_URL';

// Optional: Authentication credentials if your webhook requires them
export const WEBHOOK_AUTH = {
  username: process.env.NEXT_PUBLIC_WEBHOOK_AUTH_USERNAME || '',
  password: process.env.NEXT_PUBLIC_WEBHOOK_AUTH_PASSWORD || '',
}; 
