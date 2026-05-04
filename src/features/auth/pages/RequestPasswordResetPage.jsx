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
       <div className=" absolute inset-0 z-0 bg-[#0a2540]"></div>
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