import RegisterUser from "../components/RegisterUser";
import {useAuth} from "../hooks/useAuth";

export default function RegisterUserPage() {
  const {registerUser} =useAuth()
  const handleRegister = (data) => {
    console.log("Registering user with data:", data);
    // Here you would typically send the data to your backend API
    registerUser(data);
  };

  return (
    <div className="p-8">
      <RegisterUser onSubmit={handleRegister} />
    </div>
  );
}