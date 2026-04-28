import { useState, useCallback } from 'react';
import { publishCommand, publishConfig, mqttCommands } from '../api/mqttApi';

export const useWaterQuality = (publish) => {
  const [config, setConfig] = useState({
    deviceId: '',
    district: '',
    treatmentPlantId: '',
    buzzerEnabled: true,
  });

  const handleConfigChange = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const turnOn = useCallback(() => {
    publishCommand(publish, mqttCommands.TURN_ON);
  }, [publish]);

  const turnOff = useCallback(() => {
    publishCommand(publish, mqttCommands.TURN_OFF);
  }, [publish]);

  const deepSleep = useCallback(() => {
    if (confirm('Put ESP32 into deep sleep for 10 seconds?')) {
      publishCommand(publish, mqttCommands.POWER_OFF);
    }
  }, [publish]);

  const saveConfig = useCallback(() => {
    publishConfig(publish, config);
    alert('Configuration sent to ESP32 successfully!');
  }, [publish, config]);

  return {
    config,
    handleConfigChange,
    turnOn,
    turnOff,
    deepSleep,
    saveConfig,
  };
};