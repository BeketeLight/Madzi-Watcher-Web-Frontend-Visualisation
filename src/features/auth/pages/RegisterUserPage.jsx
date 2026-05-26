import RegisterUser from "../components/RegisterUser";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterUserPage() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    const newMonitor = {
      id: Date.now(),
      ...data,
    };

    const existing = JSON.parse(localStorage.getItem("waterMonitors")) || [];
    existing.push(newMonitor);
    localStorage.setItem("waterMonitors", JSON.stringify(existing));

    registerUser(data); // Optional: if you still want to use the auth hook
    navigate("/dashboard/watermonitors");
  };

  return (
    <div className="p-8">
      <RegisterUser onSubmit={handleRegister} />
    </div>
  );
}