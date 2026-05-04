
import LoginForm from "@/features/auth/components/LoginForm";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function LoginPage() {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { login, error, loading, status, clearStatus } = useAuth()

  // Logic remains the same...
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { message, status: loginStatus } = await login({ 
        credentials: { 
            email: formState.email.trim(), 
            password: formState.password 
        } 
      })
      if (loginStatus) navigate('/otp', { state: { otpMessage: message } })
    } catch (err) {
      console.error('LOGIN ERROR:', err)
    }
  }

  return (
    <div className="relative min-h-svh w-full flex items-center justify-center p-6 overflow-hidden">
      {/* Background Water Elements */}
      <div className=" absolute inset-0 z-0 bg-[#0a2540]"></div>
      
      {/* Abstract Water Bubbles */}
      {/* <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse"></div> */}

      <div className="relative z-10 w-full max-w-lg">
        <LoginForm
          values={formState}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
        
      </div>
    </div>
  )
}