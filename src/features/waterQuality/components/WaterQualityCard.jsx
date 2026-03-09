export default function WaterQualityCard({ title, value, unit }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        width: "180px",
      }}
    >
      <h4>{title}</h4>
      <h2>
        {value} {unit}
      </h2>
    </div>
  );
}