import React from 'react'
import SignupForm from '../components/SignupForm'
import LoginAvatar from "@/assets/LoginAvatar.png"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

function SignupPage() {
 

 return (
     <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Register Watermonitor  Page
        </h1>
      </div>
    </div>
  );
}

export default SignupPage