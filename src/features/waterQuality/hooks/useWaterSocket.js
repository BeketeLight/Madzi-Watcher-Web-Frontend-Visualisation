import { useState, useEffect } from 'react';
//import { socket } from '@/lib/socket';

export const useWaterSocket = () => {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // socket.connect();

    // socket.on('water-data', (newData) => {
    //   setData(newData);
    //   setHistory((prev) => [...prev.slice(-19), newData]);
    // });

    // Simulation for demo purposes since we don't have a real backend socket
    const interval = setInterval(() => {
      const mockData = {
        turbidity: 0.5 + Math.random() * 4.5,
        ph: 6.5 + Math.random() * 2.0,
        tds: 150 + Math.random() * 350,
        conductivity: 250 + Math.random() * 500,
        wqi: 65 + Math.random() * 30,
        timestamp: new Date().toLocaleTimeString(),
      };
      setData(mockData);
      setHistory((prev) => [...prev.slice(-19), mockData]);
    }, 5000);

    return () => {
      // socket.off('water-data');
      // socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  return { data, history };
};
