import { useMqtt } from '../hooks/useMqtt';
import { useWaterQuality } from '../hooks/useWaterQuality';

import SystemControl from '../components/SystemControl';
import ConfigForm from '../components/ConfigForm';

export default function ConfigurationPage() {
  const { isConnected, status, publish } = useMqtt();

  const {
    config,
    handleConfigChange,
    turnOn,
    turnOff,
    deepSleep,
    saveConfig
  } = useWaterQuality(publish);

  return (
    <div className="min-h-screen bg-[#081627] text-[#ddeef8]">
      
      <div className="container mx-auto py-8 max-w-4xl space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">
            Water Quality System Control
          </h1>

          <p className="text-muted-foreground">
            Manage your ESP32 via MQTT
          </p>
        </div>

        {/* CONNECTION STATUS */}
        <div
          className={`px-4 py-1 rounded-full text-sm flex items-center gap-2 border w-fit
            ${isConnected
              ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30'
              : 'bg-red-500/10 text-red-400 border-red-500/30'}
          `}
        >
          {status}
        </div>

        {/* SYSTEM CONTROL */}
        <SystemControl
          onTurnOn={turnOn}
          onTurnOff={turnOff}
          onDeepSleep={deepSleep}
        />

        {/* CONFIG FORM */}
        <ConfigForm
          config={config}
          onConfigChange={handleConfigChange}
          onSave={saveConfig}
          isConnected={isConnected}
        />

      </div>
    </div>
  );
}