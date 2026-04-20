import { cn } from "@/lib/utils"
import Logo from "@/assets/Logo.svg"
import waterDrop from "@/assets/waterDrop.png"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Loader2, Eye, EyeOff, Droplets} from "lucide-react"
import { useState } from "react"
import { AUTH_FLOW } from "@/utils/constants"
import { useAuth } from "../hooks/useAuth"

export default function LoginForm({
  values,
  onChange,
  onSubmit,
  error,
  loading,
  className,
  ...props
}) {

  //state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex flex-col gap-6 p-6 md:p-8 pb-12 bg-white rounded-xl w-auto ",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
       <div className="bg-blue-300 p-5 rounded-full mx-auto mb-2 shadow-sm">
          <Droplets className="w-12 h-12 text-white" />
       </div>


        <h1 className="text-xl font-bold">Madzi-Watcher Account</h1>
        <p className="text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="grid gap-3 mt-4">
        {error && (
          <p className="text-sm text-red-600 mt-1 text-center">{error}</p>
        )}

        <div className="grid gap-1.5">
          <Label htmlFor="email" className="font-bold text-base">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            autoComplete="email"
            required
            disabled={loading}
            value={values.email}
            onChange={onChange}
            className={cn(
              "rounded-2xl border-opacity-30 border-black h-12  placeholder:text-gray-500 text-lg",
               values.email ? "border-blue-500" : "border-black"
            )}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password" className="font-bold text-base">
            Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              autoComplete="current-password"
              required
              disabled={loading}
              value={values.password}
              onChange={onChange}
              className={cn(
                "rounded-xl border-opacity-30 h-12 placeholder:text-gray-500 text-lg",
                 values.password ? "border-blue-500" : "border-black"
              )}
            />
            <button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>
     
      <div className="flex flex-col items-center gap-4 mt-4">
        <Button
          size="lg"
          type="submit"
          disabled={loading}
           className="rounded-full text-base w-full max-w-[240px] h-12 bg-blue-400 hover:bg-blue-500 font-semibold shadow-lg shadow-blue-200 mt-8 mb-4 "
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </div>
    </form>
  )
}

