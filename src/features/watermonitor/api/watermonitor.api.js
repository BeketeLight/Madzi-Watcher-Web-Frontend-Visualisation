import api from "@/lib/axios";

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

function handleError(error) {
  if (error.response) {
    return new Error(
      `API Error: ${error.response.status} - ${
        error.response.data.message || error.response.statusText
      }`
    );
  } else if (error.request) {
    return new Error("API Error: No response received from server");
  } else {
    return new Error(`API Error: ${error.message}`);
  }
}

export default async function getWaterMonitors() {
  try {
    const { data } = await api.get("water-monitor", getAuthHeaders());

    console.log("RAW API RESPONSE:", data);

    // ✅ FIX: Always return an array
    if (Array.isArray(data)) return data;

    if (Array.isArray(data.monitors)) return data.monitors;

    if (Array.isArray(data.data)) return data.data;

    // fallback (prevents crashes)
    return [];
  } catch (error) {
    throw handleError(error);
  }
}