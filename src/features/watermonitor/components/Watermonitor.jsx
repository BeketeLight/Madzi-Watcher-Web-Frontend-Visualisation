import { useState } from "react";
import useWaterMonitors from "../hooks/useWatermonitor";
import api from "@/lib/axios";

export default function WaterMonitorsPage() {
  const { data: monitors = [], isLoading, isError, error, refetch } = useWaterMonitors();
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this monitor?");
    if (!confirmDelete) return;

    try {
      await api.delete(`water-monitor/${id}`, getAuthHeaders());
      refetch();
    } catch (err) {
      console.error("Failed to delete monitor:", err);
    }
  };

  const filteredMonitors = monitors.filter((m) => {
    const query = searchQuery.toLowerCase();
    return (
      m.email.toLowerCase().includes(query) ||
      m.assignedArea.toLowerCase().includes(query) ||
      m.district.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return <p className="text-gray-400">Loading water monitors...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-white text-2xl mb-6">Water Monitors</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email, area, or district..."
          className="w-full p-2 rounded-lg bg-[#092240] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredMonitors.length === 0 ? (
        <p className="text-gray-400">No monitors found</p>
      ) : (
        filteredMonitors.map((m) => (
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