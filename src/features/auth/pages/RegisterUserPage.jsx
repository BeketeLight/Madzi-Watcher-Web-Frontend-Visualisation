import { useState } from "react";

export default function RegisterUser({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    assignedArea: "",
    district: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Register Water Monitor</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Employee Email"
        />

        <input
          type="text"
          name="assignedArea"
          value={formData.assignedArea}
          onChange={handleChange}
          placeholder="Assigned Area"
        />

        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
        >
          <option value="">Select District</option>
        </select>

        <button type="submit">
          Register Water Monitor
        </button>
      </form>
    </div>
  );
}