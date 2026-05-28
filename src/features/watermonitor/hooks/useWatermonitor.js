import getWaterMonitors from "../api/watermonitor.api";
import { useQuery } from "@tanstack/react-query";

export default function useWaterMonitors() {
  return useQuery({
    queryKey: ['waterMonitors'],
    queryFn: async () => {
      try {
        const data = await getWaterMonitors();
        console.log("API Data:", data);
        return data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    retry: 1,
  });
}