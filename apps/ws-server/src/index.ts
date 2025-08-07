import { WebSocketServer } from 'ws';
import { PrismaClient } from '@repo/prisma/dist/index.js';

const client = new PrismaClient();

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', async (ws) => {
  console.log('Client connected');

  // Safely create user (with try-catch to avoid crash)
  try {
    await client.user.create({
      data: {
        username: Math.random().toString(36).substring(2, 15),
        password: Math.random().toString(36).substring(2, 15),
      },
    });
  } catch (err) {
    console.error('Failed to create user:', err);
  }

  ws.send('Hello from WebSocket server!');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('✅ WebSocket server started on ws://localhost:3001');
