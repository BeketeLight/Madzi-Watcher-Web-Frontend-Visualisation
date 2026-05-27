import RegisterUser from "../components/RegisterUser";
import { useAuth } from "../hooks/useAuth";

export default function RegisterUserPage() {
  const { registerUser, error, loading, status, message } = useAuth();

  const handleRegister = async (data) => {
    console.log("Registering user with data:", data);
    await registerUser(data); // Await the registration
  };

  return (
    <div className="p-8">
      {/* Display error message if registration fails */}
      {error && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
          {error}
        </div>
      )}

      {/* Display success message if registration succeeds */}
      {status === "success" && (
        <div className="mb-4 p-4 bg-green-500 text-white rounded-lg">
          {message || "User registered successfully!"}
        </div>
      )}

      {/* Pass the loading state to disable the button during submission */}
      <RegisterUser onSubmit={handleRegister} loading={loading} />
    </div>
  );
}