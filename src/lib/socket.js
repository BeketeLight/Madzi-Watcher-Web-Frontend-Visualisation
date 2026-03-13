// src/lib/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'; // use env var!

let socketInstance = null;

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      autoConnect: false,          // ← crucial: don't connect on import
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling'], // try ws first
      withCredentials: true,       // if using cookies/auth
    });

    // Optional: global error logging
    socketInstance.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });
    socketInstance.on('connect', () => {
      console.log('Socket connected!');
    });
    socketInstance.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });
  }
  return socketInstance;
};

export const socket = getSocket(); // still export for compatibility