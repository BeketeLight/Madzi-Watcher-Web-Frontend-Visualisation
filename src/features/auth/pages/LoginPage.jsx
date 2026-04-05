// import LoginForm from "@/features/auth/components/LoginForm";
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '@/features/auth/hooks/useAuth'


// export default function LoginPage() {
//   const [formState, setFormState] = useState({ email: '', password: '' })
//   const navigate = useNavigate()

//   const {
//     login,
//     error,
//     loading,
//     status,
//     clearStatus,
//     verificationSessionId,
//     loginSessionId,
//     isAuthenticated,
//     isAuthReady,
//   } = useAuth()

//   const preparePayload = () => ({
//     emailAddress: formState.email.trim(),
//     password: formState.password,
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormState((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const {message, status} = await login({ credentials: preparePayload() })
//       console.log('LOGIN PAGE RECEIVED:', {message, status})
//       if(status)
//       navigate('/otp',{ state: { otpMessage: message } })
//     } catch (err) {
//       console.error('LOGIN PAGE ERROR:', err)
//     }
//   }

//   /* -------- ROUTE GUARD -------- */
//   useEffect(() => {
//     if (!isAuthReady) return

//     // if (isAuthenticated) {
//     //   navigate("/dashboard", { replace: true })
//     // } 
//     // else if (!verificationSessionId) {
//     //   navigate("/identity/verify", { replace: true })
//     // } 
//     //navigating to OTP page on submit only ......
//     // else if (loginSessionId) {
//     //   navigate("/otp", { replace: true })
//     // }
//   }, [
//     isAuthReady,
//     isAuthenticated,
//     verificationSessionId,
//     loginSessionId,
//     navigate,
//   ])

//   useEffect(() => {
//     if (status === "success") {
//       clearStatus()
//     }
//   }, [status, clearStatus])

//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-lg">
//         <LoginForm
//           values={formState}
//           onChange={handleChange}
//           onSubmit={handleSubmit}
//           error={error}
//           loading={loading}
//         />
//       </div>
//     </div>
//   )
// }
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
            emailAddress: formState.email.trim(), 
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
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-cyan-50 to-white"></div>
      
      {/* Abstract Water Bubbles */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 w-full max-w-lg">
        <LoginForm
          values={formState}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
        
        {/* Footer info */}
        <p className="mt-8 text-center text-xs text-blue-400 font-medium uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Madzi-Watcher Project • Clean Water for All
        </p>
      </div>
    </div>
  )
}