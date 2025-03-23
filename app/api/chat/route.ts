import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const message = body.chatInput || body.message; // Support both formats
  
  // Simple response generator based on user input
  let response = '';
  
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    response = 'Hello there! How can I help you with climate change solutions today?';
  } else if (message.toLowerCase().includes('climate') || message.toLowerCase().includes('global warming')) {
    response = 'Climate change is a critical issue that requires immediate action. Solutions include renewable energy, reducing carbon emissions, and sustainable practices.';
  } else if (message.toLowerCase().includes('renewable') || message.toLowerCase().includes('solar') || message.toLowerCase().includes('wind')) {
    response = 'Renewable energy sources like solar and wind power are essential alternatives to fossil fuels. They help reduce carbon emissions and combat climate change.';
  } else if (message.toLowerCase().includes('carbon') || message.toLowerCase().includes('emissions')) {
    response = 'Reducing carbon emissions is crucial for mitigating climate change. This can be achieved through renewable energy, energy efficiency, and sustainable transportation.';
  } else {
    response = `Thank you for your message. I'm an AI assistant focused on climate change solutions. Is there something specific you'd like to know about climate action?`;
  }
  
  // Add a small delay to simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json({ response });
} 