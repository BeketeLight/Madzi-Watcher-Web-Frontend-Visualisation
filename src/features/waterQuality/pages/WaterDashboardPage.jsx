import useWaterSocket from "../hooks/useWaterSocket";
import WaterQualityCard from "../components/WaterQualityCard";

export default function WaterDashboardPage() {

  const reading = useWaterSocket();

  if (!reading) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Madzi Watcher Dashboard</h1>
        <p>Waiting for ESP32 sensor data...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>

      <h1>Madzi Watcher Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        <WaterQualityCard
          title="pH"
          value={reading.pH}
        />

        <WaterQualityCard
          title="TDS"
          value={reading.tds}
          unit="ppm"
        />

        <WaterQualityCard
          title="Turbidity"
          value={reading.turbidity}
          unit="NTU"
        />

        <WaterQualityCard
          title="Conductivity"
          value={reading.electricalConductivity}
        />

        <WaterQualityCard
          title="Water Quality Index"
          value={reading.waterQualityIndex}
        />

      </div>

      <div style={{ marginTop: "30px" }}>
        <strong>Device:</strong> {reading.deviceId}
      </div>

      <div>
        <strong>Time:</strong> {reading.time}
      </div>

    </div>
  );
}