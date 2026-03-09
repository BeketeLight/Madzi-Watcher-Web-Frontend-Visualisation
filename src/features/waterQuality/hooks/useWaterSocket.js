import { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";

export default function useWaterSocket() {
  const [reading, setReading] = useState(null);

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected to backend socket");
    });

    socket.on("newReading", (data) => {
      console.log("New sensor reading:", data);
      setReading(data);
    });

    return () => {
      socket.off("newReading");
    };

  }, []);

  return reading;
}