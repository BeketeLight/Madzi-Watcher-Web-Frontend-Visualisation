import { useState } from "react";
import {
  Mail,
  MapPin,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

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
    <div className="bg-[#071B34] border border-[#123055] rounded-2xl p-8 shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Register Water Monitor
        </h2>

        <p className="text-[#7EA6D9] mt-1">
          Create and assign monitoring accounts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <div>
          <label className="block text-white font-medium mb-3">
            Employee Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A8DFF]"
            />

            <input
              type="email"
              name="email"
              placeholder="e.g. employee@madziwatcher.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full
                bg-[#092240]
                border border-[#183B63]
                rounded-xl
                py-4
                pl-12
                pr-4
                text-white
                placeholder:text-[#7EA6D9]
                focus:outline-none
                focus:border-[#3B82F6]
                focus:ring-1
                focus:ring-[#3B82F6]
                transition-all
              "
            />
          </div>
        </div>

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