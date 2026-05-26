import { useEffect, useState } from "react";

export default function WaterMonitorsPage() {
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("waterMonitors")) || [];

    setMonitors(data);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-white text-2xl mb-6">
        Water Monitors
      </h2>

      {monitors.length === 0 ? (
        <p className="text-gray-400">
          No monitors registered yet
        </p>
      ) : (
        monitors.map((m) => (
          <div
            key={m.id}
            className="bg-[#092240] p-4 rounded-xl mb-3"
          >
            <h3 className="text-white">{m.email}</h3>
            <p className="text-[#7EA6D9]">{m.assignedArea}</p>
            <p className="text-[#7EA6D9]">{m.district}</p>
          </div>
        ))
      )}
    </div>
  );
}