// features/auth/components/RequestResetForm.jsx
import { cn } from "@/lib/utils";
import waterDrop from "@/assets/waterDrop.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft, Send, Droplets} from "lucide-react";

export default function RequestPasswordResetForm({
  values,
  onSubmit,
  onChange,
  error,
  loading,
  className,
  ...props
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex flex-col gap-6 p-6 md:p-8 pb-12 bg-white rounded-xl w-auto shadow-xl",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
       <div className="bg-blue-300 p-5 rounded-full mx-auto mb-2 shadow-sm">
          <Droplets className="w-12 h-12 text-white" />
       </div>
        <h1 className="text-2xl font-bold text-blue-400">Recover Access</h1>
        <p className="text-sm text-gray-600 px-4">
          Provide your email and we'll send a recovery link.
        </p>
      </div>

      
        <div className="grid gap-4 mt-4">
          {error && (
            <p className="text-sm font-bold text-red-600 text-center">{error}</p>
          )}

          <div className="grid gap-1.5">
            <Label htmlFor="email" className="font-bold text-base">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="employee@madzi.com"
              required
              disabled={loading}
              value={values.email || ''}
              onChange={onChange}
              className={cn(
                "rounded-2xl border-2 border-gray-200 h-14 text-base placeholder:text-gray-400 pr-12",
                "focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none",
                "transition-all duration-200 shadow-md hover:shadow-lg"
              )}
            />
          </div>

          <div className="flex flex-col items-center gap-4 mt-2">
            <Button
              size="lg"
              type="submit"
              disabled={loading}
              className="rounded-2xl text-base w-full h-14 bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200 transition-all duration-200 mt-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Send Recovery Link"
              )}
            </Button>
          </div>
        </div>
    
      <div className="text-center">
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm font-bold text-blue-500 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </Link>
      </div>
    </form>
  );
}