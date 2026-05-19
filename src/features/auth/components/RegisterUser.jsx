export function RegisterUser({ onSubmit, loading, error, className, ...props }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })    

    const handleChange = (e) => {                           
        const { name, value } = e.target            
        setFormData((prevData) => ({ ...prevData, [name]: value }))     
    }                           
    const handleSubmit = (e) => {   
        e.preventDefault()          
        if (loading) return         
        onSubmit(formData)          
    }           
    return (        
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 p-6 md:p-8 pb-12 bg-white rounded-xl", className)} {...props}> 
            <div className="flex flex-col items-center gap-1 text-center">      
                <h1 className="text-2xl font-bold text-blue-400">Register</h1>  
                <p className="text-sm text-gray-600">Create a new account to get started.</p>
            </div>  
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}  
            <div className="flex flex-col gap-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>  
            <button type="submit" disabled={loading} className="w-full py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">   Register</button>
        </form>    
    ) 
}                                              

