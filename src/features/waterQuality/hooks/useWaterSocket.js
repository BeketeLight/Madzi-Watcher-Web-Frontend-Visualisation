// src/features/waterQuality/hooks/useWaterSocket.js
import { useState, useEffect } from 'react';
import { socket } from '@/lib/socket'; // or import { getSocket } and call it

export const useWaterSocket = () => {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connect only once when component mounts
    socket.connect();

    // Inside handleWaterData
const handleWaterData = (newData) => {
  console.log('Received water-quality-data:', newData);

  const normalized = {
    deviceId: newData.deviceId,
    turbidity: newData.turbidity ?? null,
    pH: newData.pH ?? null,                    // map pH → ph
    tds: newData.tds ?? null,
    electricalConductivity: newData.electricalConductivity ?? null,
    waterQualityIndex: newData.waterQualityIndex ?? null,
    location: newData.location,
    timestamp: newData.timestamp 
      ? new Date(newData.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }) 
      : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };

  setData(normalized);
  setHistory(prev => [...prev.slice(-19), normalized]);
};

    socket.on('water-quality-data', handleWaterData);

    // Optional: handle connection status
    socket.on('connect', () => {
      console.log('Connected to backend socket');
      setIsConnected(true);
      setError(null);
    });
    socket.on('connect_error', (err) => {
      console.error('Connection failed:', err);
      setError(err.message);
      setIsConnected(false);
      // You could set an error state here
    });
    socket.on('disconnect', () => {
      console.log('Disconnected');
      setIsConnected(false);
});

    return () => {
      socket.off('water-quality-data', handleWaterData);
      // socket.disconnect();  // optional: disconnect on unmount, or keep alive
    };
  }, []); // empty deps = run once

  return { data, history ,isConnected, error};
};