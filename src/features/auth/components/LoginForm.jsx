import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Loader2, Eye, EyeOff, Droplets } from "lucide-react"
import { useState } from "react"
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
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex flex-col gap-6 p-6 md:p-8 pb-12 bg-white rounded-3xl w-auto shadow-xl",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="bg-blue-500 p-5 rounded-full mx-auto mb-2 shadow-sm">
          <Droplets className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-blue-400">Madzi-Watcher Account</h1>
        <p className="text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="grid gap-3 mt-4">
        {error && (
          <p className="text-sm text-red-600 mt-1 text-center font-medium">{error}</p>
        )}

        {/* Email Input */}
        <div className="grid gap-1.5">
          <Label htmlFor="email" className="font-semibold text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@madzi.com"
            autoComplete="email"
            required
            disabled={loading}
            value={values.email || ""}
            onChange={onChange}
            className={cn(
              "rounded-2xl border-2 border-gray-200 h-14 text-base placeholder:text-gray-400",
              "focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none",
              "transition-all duration-200 shadow-sm hover:shadow-md"
            )}
          />
        </div>

        {/* Password Input */}
        <div className="grid gap-1.5">
          <Label htmlFor="password" className="font-semibold text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              disabled={loading}
              value={values.password || ""}
              onChange={onChange}
              className={cn(
                "rounded-2xl border-2 border-gray-200 h-14 text-base placeholder:text-gray-400 pr-12",
                "focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none",
                "transition-all duration-200 shadow-sm hover:shadow-md"
              )}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        <Button
          size="lg"
          type="submit"
          disabled={loading}
          className="rounded-2xl text-base w-full h-14 bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200 transition-all duration-200"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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