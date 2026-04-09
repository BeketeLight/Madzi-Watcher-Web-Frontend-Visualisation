import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import waterDrop from "@/assets/waterDrop.png"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Loader2, Eye, EyeOff, Droplets} from "lucide-react"

export default function SignupForm({
  onSubmit,
  values,
  loading,
  className,
  onChange,
  error,
  ...props
}) {

  
  return (
    <form 
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-6 p-6 md:p-8 pb-12 bg-white rounded-xl", className)} 
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="bg-blue-300 p-5 rounded-full mx-auto mb-2 shadow-sm">
          <Droplets className="w-12 h-12 text-white" />
       </div>
       
        <h1 className="text-xl font-bold">Register Madzi-Watcher </h1>
        <p className="text-sm text-gray-600">Register an Employee to become Madzi-Watcher</p>
      </div>
       {/* error message display */}
         {error && (
          <p className="text-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      <div className="grid gap-3 mt-4">
        <div className="grid gap-1.5">
          <Label htmlFor="email" className="font-bold text-base">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email"
            value={values.email}
            placeholder="Enter your email" 
            required 
            disabled={loading}
            onChange={onChange}
             className={cn(
                "rounded-xl border-opacity-30 border-black h-10 placeholder:text-gray-500 text-lg",
                  values.email ? "border-blue-500" : "border-black"
             )}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="Role" className="font-bold text-base">Role</Label>
          <Input 
            id="role" 
            name="role"
            type="text"
            value={values.role}
            placeholder="Enter the role" 
            required 
            disabled={loading}
            onChange={onChange}
            className={cn(
              "rounded-xl border-opacity-30 border-black h-10 placeholder:text-gray-500 text-lg",
               values.role ? "border-blue-500" : "border-black"
            )}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="assignedArea" className="font-bold text-base">Assigned Area</Label>
          <div className="relative"> 
          <Input 
            
            id="assignedArea" 
            name="assignedArea"
            type= "text" 
            value={values.assignedArea}
            placeholder="Enter the assigned Area" 
            required 
            disabled={loading}
            onChange={onChange}
            className={cn(
              "rounded-xl border-opacity-30 h-10 placeholder:text-gray-500 text-lg",
               values.assignedArea ? "border-blue-500" : "border-black"
            )}
          />
          </div>
         
        </div>
      </div>
       <div className="grid gap-1.5">
          <Label htmlFor="district" className="font-bold text-base">District</Label>
          <Input 
            id="district" 
            name="district"
            type="text"
            value={values.district}
            placeholder="Enter the district" 
            required 
            disabled={loading}
            onChange={onChange}
            className={cn(
              "rounded-xl border-opacity-30 border-black h-10 placeholder:text-gray-500 text-lg",
               values.district ? "border-blue-500" : "border-black"
            )}
          />
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
            "Register"
          )}
        </Button>

       
      </div> 
    </form>
  )
}

  