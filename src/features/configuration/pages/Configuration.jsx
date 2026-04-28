import { useMqtt } from '../hooks/useMqtt';
import { useWaterQuality } from '../hooks/useWaterQuality';

export default function ConfigurationPage() {
  const { publish } = useMqtt();
  const { config, handleConfigChange } = useWaterQuality(publish);

  return (
    <div className="min-h-screen bg-[#081627] text-[#ddeef8]">
      <div className="container mx-auto py-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold">
            Water Quality System Control
          </h1>
          <p className="text-muted-foreground">
            Manage your ESP32 via MQTT
          </p>
        </div>
      </div>
    </div>
  );
}