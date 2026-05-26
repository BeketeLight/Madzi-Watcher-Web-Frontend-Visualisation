import RegisterUser from "../components/RegisterUser";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterUserPage() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    const existing = JSON.parse(localStorage.getItem("waterMonitors")) || [];

    // Check if email already exists
    const alreadyExists = existing.some((m) => m.email === data.email);
    if (alreadyExists) {
      alert("A water monitor with this email already exists!");
      return;
    }

    // Create new monitor
    const newMonitor = {
      id: Date.now(),
      email: data.email,
      assignedArea: data.assignedArea,
      district: data.district,
    };

    const updated = [...existing, newMonitor];
    localStorage.setItem("waterMonitors", JSON.stringify(updated));

    alert("Water monitor registered successfully!");

    registerUser(data); // Optional: if still needed for auth
    navigate("/dashboard/watermonitors");
  };

  return (
    <div className="p-8">
      <RegisterUser onSubmit={handleRegister} />
    </div>
  );
}