import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/assets/Logo.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Loader2, Eye, EyeOff } from "lucide-react"


export default function SignupForm() {

 

 return (
     <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Register WaterMonitor Page
        </h1>
      </div>
    </div>
  );
}


  