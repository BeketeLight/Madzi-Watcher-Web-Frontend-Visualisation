import { useEffect, useState } from "react";

export default function WaterMonitorsPage() {
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("waterMonitors")) || [];
    setMonitors(data);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this monitor?"
    );
    if (!confirmDelete) return;

    const existing = JSON.parse(localStorage.getItem("waterMonitors")) || [];
    const updated = existing.filter((m) => m.id !== id);
    localStorage.setItem("waterMonitors", JSON.stringify(updated));
    setMonitors(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-white text-2xl mb-6">Water Monitors</h2>

      {monitors.length === 0 ? (
        <p className="text-gray-400">No monitors registered yet</p>
      ) : (
        monitors.map((m) => (
          <div
            key={m.id}
            className="bg-[#092240] p-4 rounded-xl mb-3 flex justify-between items-center"
          >
            <div>
              <h3 className="text-white">{m.email}</h3>
              <p className="text-[#7EA6D9]">Assigned Area: {m.assignedArea}</p>
              <p className="text-[#7EA6D9]">District: {m.district}</p>
            </div>

            <button
              onClick={() => handleDelete(m.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}