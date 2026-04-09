import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import waterDrop from "@/assets/waterDrop.png"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Loader2, Eye, EyeOff } from "lucide-react"

export default function ChangePasswordForm({
  onSubmit,
  values,
  loading,
  className,
  onChange,
  error,
  ...props
}) {

    //state for password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    
    const toggleCurrentPasswordVisibility = () => {
      setShowCurrentPassword((prev) => !prev);
    };  
    const toggleNewPasswordVisibility = () => {
      setShowNewPassword((prev) => !prev);
    };  
    const toggleConfirmNewPasswordVisibility = () => {
      setShowConfirmNewPassword((prev) => !prev);
    };      
  
  return (
    <form 
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl", className)} 
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <img
          src={waterDrop}
          alt="Madzi-Watcher Logo"
          className="opacity-50 w-32 h-32 mx-auto"
        />
        <h1 className="text-xl font-bold">Change Madzi-Watcher Password</h1>
        <p className="text-sm text-gray-600">Update your password at any time</p>
      </div>
       {/* error message display */}
         {error && (
          <p className="text-sm text-red-600 mt-1">
            {error}
          </p>
        )}
       <div className="relative">
       </div>
      <div className="grid gap-3 mt-4">
        <div className="grid gap-1.5">
          <Label htmlFor="currentPassword" className="font-bold text-base">Current Password</Label>

         <div className="relative">
          <Input 
            id="currentPassword" 
            name="currentPassword"
            type= {showCurrentPassword ? "text" : "password"}
            value={values.currentPassword}
            placeholder="Enter current password" 
            required 
            disabled={loading}
            onChange={onChange}
             className={cn(
                "rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg",
                  values.currentPassword ? "border-blue-500" : "border-black"
             )}
          />
               <button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={toggleCurrentPasswordVisibility}
            >
              {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="newPassword" className="font-bold text-base">New Password</Label>

         <div className="relative">
          <Input 
            id="newPassword" 
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            value={values.newPassword}
            placeholder="Enter new password" 
            required 
            disabled={loading}
            onChange={onChange}
            className={cn(
              "rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg",
               values.newPassword ? "border-blue-500" : "border-black"
            )}
          />
          <button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
       </div>

        <div className="grid gap-1.5">
          <Label htmlFor="confirmNewPassword" className="font-bold text-base">Confirm New Password</Label>

         <div className="relative"> 
          <Input 
            id="confirmNewPassword" 
            name="confirmNewPassword"
            type= {showConfirmNewPassword ? "text" : "password"}
            value={values.confirmNewPassword}
            placeholder="Confirm new password" 
            required 
            disabled={loading}
            onChange={onChange}
            className={cn(
              "rounded-xl border-opacity-30 h-12 placeholder:text-gray-500 text-lg",
               values.confirmNewPassword ? "border-blue-500" : "border-black"
            )}
          />
            <button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={toggleConfirmNewPasswordVisibility}
            >
              {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
         
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
        <Button 
          size="lg"
          type="submit"
          disabled={loading}
          className="rounded-full text-base w-full max-w-[240px] h-12 bg-blue-400 hover:bg-blue-500 font-semibold" 
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Change Password"
          )}
        </Button>

       
      </div> 
    </form>
  )
}

  