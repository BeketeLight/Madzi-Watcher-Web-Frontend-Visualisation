// configuration/api/mqttApi.js
export const mqttCommands = {
  TURN_ON: 'turnon',
  TURN_OFF: 'turnoff',
  POWER_OFF: 'poweroff',
  CLOSE_VALVE: 'closesolenoidvalve',
  OPEN_VALVE: 'opensolenoidvalve',
};

export const publishCommand = (publish, command) => {
  if (!publish) return;
  publish('waterquality/commands', command);
};

export const publishConfig = (publish, config) => {
  if (!publish) return;
  publish('waterquality/config', JSON.stringify(config));
};