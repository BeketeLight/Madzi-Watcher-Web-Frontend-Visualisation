import { cn } from "@/lib/utils"
import Logo from "@/assets/Logo.svg"
import waterDrop from "@/assets/waterDrop.png"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Loader2, Eye, EyeOff} from "lucide-react"
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
        "flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl w-auto ",
        className
      )}
      {...props}
    >
      
    
      <div className="flex flex-col items-center gap-1 text-center">
        <img
          src={waterDrop}
          alt="Madzi-Watcher Logo"
          className="opacity-50 w-32 h-32 mx-auto"
        />
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
          className="rounded-full text-base w-full max-w-[200px] h-12 bg-blue-400 hover:bg-blue-500 font-semibold"
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


// import { cn } from "@/lib/utils"
// import waterDrop from "@/assets/waterDrop.png"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Link } from "react-router-dom"
// import { Loader2, Eye, EyeOff, Droplets } from "lucide-react"
// import { useState } from "react"

// export default function LoginForm({
//   values,
//   onChange,
//   onSubmit,
//   error,
//   loading,
//   className,
//   ...props
// }) {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <form
//       onSubmit={onSubmit}
//       className={cn(
//         "flex flex-col gap-6 p-8 md:p-10 pb-12",
//         "bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]",
//         "rounded-3xl w-full max-w-md mx-auto",
//         className
//       )}
//       {...props}
//     >
//       <div className="flex flex-col items-center gap-2 text-center">
//         <div className="relative">
//           <img
//             src={waterDrop}
//             alt="Madzi-Watcher Logo"
//             className="w-24 h-24 object-contain animate-pulse-slow"
//           />
      
//         </div>
        
//         <div className="space-y-1">
//           <h1 className="text-2xl font-extrabold tracking-tight text-blue-950">
//             Madzi-Watcher Account
//           </h1>
//           <p className="text-sm text-blue-800/60 font-medium">
//            Enter your credentials to access your Madz-Watcher Account
//           </p>
//         </div>
//       </div>

//       <div className="grid gap-4 mt-2">
//         {error && (
//           <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl text-center">
//             {error}
//           </div>
//         )}

//         <div className="grid gap-2">
//           <Label htmlFor="email" className="text-blue-900 font-semibold ml-1">
//             Email 
//           </Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="admin@madzi-watcher.com"
//             required
//             disabled={loading}
//             value={values.email}
//             onChange={onChange}
//             className={cn(
//               "rounded-2xl border-blue-100 bg-white/50 h-12 focus-visible:ring-blue-400 transition-all",
//               values.email && "border-blue-400 ring-1 ring-blue-400"
//             )}
//           />
//         </div>

//         <div className="grid gap-2">
//           <div className="flex justify-between items-center ml-1">
//             <Label htmlFor="password" className="text-blue-900 font-semibold">
//               Password
//             </Label>
//           </div>
//           <div className="relative">
//             <Input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               required
//               disabled={loading}
//               value={values.password}
//               onChange={onChange}
//               className={cn(
//                 "rounded-2xl border-blue-100 bg-white/50 h-12 focus-visible:ring-blue-400 ",
//                 values.password && "border-blue-400 ring-1 ring-blue-400"
//               )}
//             />
//             <button
//               type="button"
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>
     
//       <div className="flex flex-col items-center gap-6 mt-4">
//         <Button
//           size="lg"
//           type="submit"
//           disabled={loading}
//           className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
//         >
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//               Verifying...
//             </>
//           ) : (
//             "Log In"
//           )}
//         </Button>

//         <div className="text-sm text-blue-900/70 font-medium">
//           Don't have an admin account?{" "}
//           <Link
//             to="/signup"
//             className="text-blue-600 font-bold hover:underline underline-offset-4"
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </form>
//   )
// }