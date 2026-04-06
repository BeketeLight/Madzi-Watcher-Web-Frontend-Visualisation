// pages/RequestPasswordResetPage.jsx
import RequestPasswordResetForm from "@/features/auth/components/RequestPasswordResetForm";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function RequestPasswordResetPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { requestPasswordReset, loading, error } = useAuth(); // Assuming this exists in your hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logic to call your backend
      // await requestPasswordReset(email.trim());
      setSubmitted(true);
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
         email={email}
          setEmail={setEmail}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitted={submitted}
        />
        
        <p className="mt-12 text-center text-xs text-blue-400 font-medium uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Madzi-Watcher Project • Clean Water for All
        </p>
      </div>
    </div>
  );
}