// pages/RequestPasswordResetPage.jsx
import RequestPasswordResetForm from "@/features/auth/components/RequestPasswordResetForm";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function RequestPasswordResetPage() {
  const [formState, setFormState] = useState({
    email: ''
  });
  
  const { 
    forgotPassword, 
    loading, 
    error,
    status
  } = useAuth(); // Assuming this exists in your hook

  const preparePayload = () => {
    return {
      email: email.trim(),
    }
  } 

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormState((prev) => ({ ...prev, [name]: value }));
  } 

//handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = preparePayload();
    try {
      await forgotPassword(payload);
    } catch (err) {
      console.error('RESET REQUEST ERROR:', err);
    }
  };
  

  return (
    <div className="relative min-h-svh w-full flex items-center justify-center p-6 overflow-hidden">
      {/* Background Water Elements - Same as Login */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-cyan-50 to-white"></div>
      
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 w-full max-w-lg">
        <RequestPasswordResetForm
         values={formState}
         onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}