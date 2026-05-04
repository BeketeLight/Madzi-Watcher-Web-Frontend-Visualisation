import { useEffect, useState, useCallback, useRef } from 'react';
import mqtt from 'mqtt';

const MQTT_BROKER_URL = import.meta.env.VITE_MQTT_BROKER_URL;
const MQTT_PORT = import.meta.env.VITE_MQTT_PORT || 1883;
const MQTT_USERNAME = import.meta.env.VITE_MQTT_USERNAME;
const MQTT_PASSWORD = import.meta.env.VITE_MQTT_PASSWORD;


export const useMqtt = () => {
  const clientRef = useRef(null); //useRef instead of state

  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('Disconnected');

  const clientId = import.meta.env.VITE_MQTT_CLIENT_ID;

  useEffect(() => {
    if (clientRef.current) return; //  prevent double connection (Strict Mode)

    const mqttClient = mqtt.connect(`${MQTT_BROKER_URL}:${MQTT_PORT}`, {
      clientId,
      reconnectPeriod: 5000,
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
    });

    clientRef.current = mqttClient;

    mqttClient.on('connect', () => {
      setIsConnected(true);
      setStatus('Connected');
      console.log('MQTT Connected');
    });

    mqttClient.on('close', () => {
      setIsConnected(false);
      setStatus('Disconnected');
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT Error:', err);
      setStatus('Error');
    });

    return () => {
      mqttClient.end();
      clientRef.current = null;
    };
  }, [clientId]);

  const publish = useCallback((topic, message) => {
    const client = clientRef.current;

    if (client && isConnected) {
      console.log(`Publishing to ${topic}:`, message);
      client.publish(topic, message, { qos: 1 }, (err) => {
        if (err) console.error('Publish error:', err);
      });
    } else {
      console.warn('MQTT not connected');
    }
  }, [isConnected]);

  return {
    isConnected,
    status,
    publish,
  };
};