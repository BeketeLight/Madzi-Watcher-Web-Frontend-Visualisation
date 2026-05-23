import { useState } from "react";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    email: "",
    assignedArea: "",
    district: "",
  });

  return (
    <div>
      <h2>Register Water Monitor</h2>

      <form>
        <input
          type="email"
          placeholder="Employee Email"
        />

        <input
          type="text"
          placeholder="Assigned Area"
        />

        <select>
          <option>Select District</option>
        </select>

        <button type="submit">
          Register Water Monitor
        </button>
      </form>
    </div>
  );
}