import { io } from 'socket.io-client';
// import dotenv from 'dotenv';

// dotenv.config();

// In a real app, this would be your backend URL
const SOCKET_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
