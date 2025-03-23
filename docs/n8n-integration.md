# n8n Integration Guide

This guide will help you set up an n8n workflow to handle the chat messages sent from your Research Chatbot.

## Prerequisites

- An n8n instance (cloud or self-hosted)
- Access to create new workflows
- Basic understanding of HTTP requests

## Step 1: Create a new n8n workflow

1. Log in to your n8n instance
2. Click on "Workflows" in the sidebar
3. Click the "+ Create Workflow" button
4. Name your workflow (e.g., "Research Chat Handler")

## Step 2: Add a Webhook node

1. In the workflow editor, click the "+ Add node" button
2. Search for "Webhook" and select it
3. Configure the Webhook node:
   - Set the Authentication to "None" (or set up authentication if needed)
   - Method: POST
   - Path: Choose a unique path (e.g., `/research-chat`)
   - Response Mode: "Last Node"

4. Click "Save" to apply the configuration
5. Click "Deploy Webhook" to activate it

## Step 3: Copy the Webhook URL

1. After deploying the webhook, copy the generated URL
2. Update the `N8N_WEBHOOK_URL` in your `config/webhook.ts` file

## Step 4: Process the incoming message

1. Add a "Set" node after the Webhook node
2. Configure it to extract the message from the incoming request:
   ```
   Name: Extract Message
   Value: {{ $json.message }}
   ```

## Step 5: Add your processing logic

Here you can add nodes to process the message:

- Use "HTTP Request" nodes to call external APIs
- Add "Function" nodes for custom JavaScript processing
- Connect to databases or other services as needed

## Step 6: Format the response

1. Add a final "Set" node to format the response
2. Configure it as follows:
   ```
   Name: Format Response
   Keep Only Set: Enabled
   Options: JSON
   Value1.Name: response
   Value1.Value: Your processed response here
   ```

3. This will create a JSON object with a `response` property that the chat interface expects

## Step 7: Test your workflow

1. Save and activate your workflow
2. Open your Research Chatbot
3. Send a test message
4. Check the n8n execution logs to debug any issues

## Additional Configuration

### Error Handling

To add error handling:

1. Add "Error Trigger" nodes to catch specific errors
2. Connect them to "Set" nodes that return appropriate error messages

### Authentication

To secure your webhook:

1. In the Webhook node, set Authentication to "Basic Auth" or "Header Auth"
2. Update your frontend code to include the authentication credentials

## Example Workflow

A simple echo workflow would look like:

1. Webhook node (receives the message)
2. Set node (formats the response):
   ```
   Name: Echo Response
   Keep Only Set: Enabled
   Options: JSON
   Value1.Name: response
   Value1.Value: You said: {{ $node["Webhook"].json.message }}
   ``` 