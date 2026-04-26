import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function ConfigPage() {
  const [employees, setEmployees] = useState([]);
  const [dams, setDams] = useState([]);

  const [name, setName] = useState("");
  const [selectedDam, setSelectedDam] = useState("");

  const [damName, setDamName] = useState("");
  const [damId, setDamId] = useState("");
  const [damError, setDamError] = useState("");

  const addEmployee = () => {
    if (!name || !selectedDam) return;

    setEmployees([
      ...employees,
      {
        name,
        dam: selectedDam,
      },
    ]);

    setName("");
    setSelectedDam("");
  };

  const deleteEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const addDam = () => {
    if (!damName || !damId) return;

    if (!damId.toLowerCase().startsWith("mw-")) {
      setDamError("Dam ID should start with MW-");
      return;
    }

    const exists = dams.some((d) => d.id === damId);
    if (exists) {
      setDamError("Dam ID already exists");
      return;
    }

    setDamError("");
    setDams([
      ...dams,
      {
        id: damId,
        name: damName,
        status: "Active",
      },
    ]);

    setDamName("");
    setDamId("");
  };

  const deleteDam = (index) => {
    setDams(dams.filter((_, i) => i !== index));
  };

  const toggleStatus = (index) => {
    const updated = [...dams];
    updated[index].status =
      updated[index].status === "Active" ? "Inactive" : "Active";
    setDams(updated);
  };

  const activeDams = dams.filter((d) => d.status === "Active");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-700 to-blue-500 p-6 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Madzi Watcher - Configuration Panel
      </motion.h1>

      <Card className="mb-6 bg-white/10 backdrop-blur-xl border-none rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Admin Details</h2>
          <p>Name: Admin User</p>
          <p>Email: admin@madzi.com</p>
        </CardContent>
      </Card>

      {/* Add Dam */}
      <Card className="mb-6 bg-white/10 backdrop-blur-xl border-none rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3">Register Dam</h2>
          <div className="flex gap-3 flex-wrap">
            <Input
              placeholder="Dam ID (MW-xxx)"
              value={damId}
              onChange={(e) => setDamId(e.target.value)}
              className="text-black"
            />
            <Input
              placeholder="Dam Name"
              value={damName}
              onChange={(e) => setDamName(e.target.value)}
              className="text-black"
            />
            <Button
              onClick={addDam}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Register
            </Button>
          </div>
          {damError && <p className="text-red-600 mt-2">{damError}</p>}
        </CardContent>
      </Card>

      {/* Dam List */}
      <Card className="mb-6 bg-white/10 backdrop-blur-xl border-none rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3">Dam List</h2>
          {dams.length === 0 ? (
            <p>No dams added yet.</p>
          ) : (
            <ul className="space-y-2">
              {dams.map((d, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center bg-white/20 p-3 rounded-xl"
                >
                  <div>
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-sm">ID: {d.id}</p>
                    <p className="text-sm">Status: {d.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleStatus(index)}
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      Toggle
                    </Button>
                    <Button
                      onClick={() => deleteDam(index)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Add Employee */}
      <Card className="mb-6 bg-white/10 backdrop-blur-xl border-none rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3">Register Employee</h2>
          <div className="flex gap-3 flex-wrap">
            <Input
              placeholder="Employee Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black"
            />

            <select
              value={selectedDam}
              onChange={(e) => setSelectedDam(e.target.value)}
              className="px-3 py-2 rounded-md text-black"
            >
              <option value="">Select Dam</option>
              {activeDams.map((d, i) => (
                <option key={i} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            <Button
              onClick={addEmployee}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              Register
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card className="bg-white/10 backdrop-blur-xl border-none rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3">Employee List</h2>
          {employees.length === 0 ? (
            <p>No employees added yet.</p>
          ) : (
            <ul className="space-y-2">
              {employees.map((emp, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center bg-white/20 p-3 rounded-xl"
                >
                  <div>
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-sm">Dam: {emp.dam}</p>
                  </div>
                  <Button
                    onClick={() => deleteEmployee(index)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </motion.li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
