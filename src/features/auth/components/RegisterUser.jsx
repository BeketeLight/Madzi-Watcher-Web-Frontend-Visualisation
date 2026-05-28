import { useState } from "react";
import {
  Mail,
  MapPin,
  ShieldCheck,
  UserPlus,
  Loader2,  
} from "lucide-react";

export default function RegisterUser({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    assignedArea: "",
    district: "",
  });

  const [isLoading, setIsLoading] = useState(false);   // ← Added

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerData = {
    
      email: formData.email,
      location: {
        assignedArea: formData.assignedArea,
        district: formData.district,
      },
      role: "water_monitor",
    } ;
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ← Set loading state
    // onSubmit(registerData);
    try {
      await onSubmit(registerData);          // ← Wait for parent to finish
    } finally {
      setIsLoading(false);                   // ← Stop loading
    }
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

        <div>
          <label className="block text-white font-medium mb-3">
            Assigned Area
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A8DFF]"
            />

            <input
              type="text"
              name="assignedArea"
              placeholder="e.g. Blantyre Water Zone A"
              value={formData.assignedArea}
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

        <div>
          <label className="block text-white font-medium mb-3">
            District
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A8DFF]"
            />

            <select
              name="district"
              value={formData.district}
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
                focus:outline-none
                focus:border-[#3B82F6]
                focus:ring-1
                focus:ring-[#3B82F6]
                transition-all
              "
            >
              <option value="">Select District</option>
              <option value="Lilongwe">Lilongwe</option>
              <option value="Blantyre">Blantyre</option>
              <option value="Mzuzu">Mzuzu</option>
              <option value="Zomba">Zomba</option>
              <option value="Mangochi">Mangochi</option>
            </select>
          </div>
        </div>

        <div className="border-t border-[#183B63] pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full
              bg-[#3B82F6]
              hover:bg-[#2563EB]
              text-white
              font-semibold
              py-4
              rounded-xl
              transition-all
              flex
              items-center
              justify-center
              gap-3
            "
>
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Register Water Monitor
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}