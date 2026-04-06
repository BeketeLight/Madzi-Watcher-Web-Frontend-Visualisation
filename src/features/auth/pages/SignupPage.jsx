import React from "react"
import SignupForm from "../components/SignupForm"
import { useNavigate } from "react-router-dom"
import { useAuth } from '@/features/auth/hooks/useAuth' 

function SignupPage() {

  const [formState, setFormState] = React.useState({
    email: '',
    role: '',
    assignedArea: '', 
    district: ''
  })
  const navigate = useNavigate()

  const{
    signup,
    error,
    loading,
    status
  } = useAuth()

  //preparing signup payload
  const preparePayload = () => {
    return {
      email: formState.email.trim(),
      role: formState.role.trim(),
      assignedArea: formState.assignedArea.trim(),
      district: formState.district.trim()
    }
  }
 //handling register form change fields
 const handleChange = (e) => {
  const { name, value } = e.target
  setFormState((prev) => ({ ...prev, [name]: value }))
}
//handling register form submission
const handleSubmit = async (e) => {
  e.preventDefault()
  const payload = preparePayload()
  await signup(payload)
}

React.useEffect(() => {
  if(!status) return
  if(status === "success") {
    navigate("/login")
  } 
}, [status, navigate])
 return (
    <div className="relative min-h-svh w-full flex items-center justify-center p-6 overflow-hidden">
      {/* Background Water Elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-cyan-50 to-white"></div>
      
      {/* Abstract Water Bubbles */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 w-full max-w-lg">
        <SignupForm
          values={formState}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
        
        {/* Footer info */}
        
      </div>
    </div>
  )
}

export default SignupPage