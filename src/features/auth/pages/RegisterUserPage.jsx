import { RegisterUser } from "../components/RegisterUser";  

export default function RegisterUserPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterUser onSubmit={(data) => console.log('Register data:', data)} />
    </div>
  )
}       