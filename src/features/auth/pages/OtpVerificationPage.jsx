import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import OtpForm from "../components/OtpForm"
import { useAuth } from '@/features/auth/hooks/useAuth'
//import { useAuth } from '@/features/auth/hooks/useAuth'


function OtpVerificationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    verifyOtp,
    user,
    loading,
    error,
    status,
    loginSessionId,
    verificationSessionId,
    isAuthenticated,
    clearStatus,
    isAuthReady,
    message,
  } = useAuth()


  /* -------- ROUTE GUARD -------- */
  useEffect(() => {
    if (!isAuthReady) return

    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    } else if (!verificationSessionId) {
      navigate("/identity", { replace: true })
    } else if (!loginSessionId) {
      navigate("/login", { replace: true })
    }
  }, [
    isAuthReady,
    isAuthenticated,
    verificationSessionId,
    loginSessionId,
    navigate,
  ])

  /* -------- STATUS SIDE EFFECT -------- */
  useEffect(() => {
    if (status === "success") {
      clearStatus()
      navigate("/dashboard", { replace: true })
    }
  }, [status, navigate, clearStatus])


  const handleSubmit = async ({ otp }) => {
    try {
      await verifyOtp({ otp })
    } catch {
      // handled by hook
    }
  }

  const handleResend = async () => {
    console.log("Resend OTP requested")
  }
    return (
      <div className="relative min-h-svh w-full flex items-center justify-center p-6 overflow-hidden">
        <div className=" absolute inset-0 z-0 bg-[#0a2540]"></div>
        <div className="relative z-10 w-full max-w-lg">
          <OtpForm
             onSubmit={handleSubmit}
             error={error}
             user={user}
             onResend={handleResend}
             loading={loading}
           />
         </div>
       </div>
     )
}

export default OtpVerificationPage
