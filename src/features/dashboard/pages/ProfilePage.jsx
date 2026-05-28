import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { 
    Mail, 
    ShieldCheck,  
    User,
    Edit3,
    Pencil,
    CheckCircle2,
    Briefcase
} from 'lucide-react'
import React from 'react'
import { useUserProfile } from '../hooks/useUserProfile'


export default function ProfilePage() {
    const navigate = useNavigate()
    const { profile, profileLoading, profileError, fetchProfile } = useUserProfile()

    React.useEffect(() => {
        if (!profile && !profileLoading && !profileError) {
            fetchProfile()
        }
    }, [profile, profileLoading, profileError, fetchProfile])

    // Logic for Name and Initials
    const displayName = React.useMemo(() => {
        if (!profile?.data) return 'User'
        const { firstName, lastName, email } = profile.data
        if (firstName && lastName) return `${firstName} ${lastName}`
        return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    }, [profile])

    const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

    if (profileLoading) {
        return (
            <div className="container mx-auto max-w-2xl py-20 px-4 flex justify-center mt-12">
                <Skeleton className="h-[500px] w-full rounded-3xl" />
            </div>
        )
    }

    if (profileError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-xl font-semibold">Error loading profile</h2>
                <Button onClick={() => fetchProfile()} className="mt-4">Retry</Button>
            </div>
        )
    }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="overflow-hidden rounded-[2rem] border-none shadow-2xl">
          {/* Blue Header */}
          <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 px-10 py-12 text-white overflow-hidden">
            {/* Edit Button */}
            <div className="absolute top-6 right-6">
              <Button className="rounded-full bg-white text-blue-900 hover:bg-blue-100 font-semibold">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit 
              </Button>
            </div>

            {/* Background Decorative Circles */}
            <div className="absolute -top-10 -right-10 h-60 w-60 rounded-full bg-white/5" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/5" />

            <div className="relative flex flex-col md:flex-row items-center gap-10">
              {/* Avatar */}
              <Avatar className="h-40 w-40 border-[6px] border-white shadow-2xl">
                {/* <AvatarImage src="https://i.pravatar.cc/300" /> */}
                <AvatarFallback className="text-4xl font-bold text-black">
                  {initials}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-xl text-blue-100 mb-2">
                  Welcome back,
                </p>

                <h1 className="text-5xl font-black tracking-tight mb-4">
                  {displayName} 
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                

                  {/* Username */}
                  <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <User className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-sm text-blue-100">Username</p>
                      <p className="font-semibold text-sm">
                        {displayName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom White Section */}
          <CardContent className="bg-white px-8 py-10 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                title="Email Address"
                value={profile?.data.email}
                icon={<Mail className="text-blue-600" />}
              />

              <InfoCard
                title="Role"
                value={profile?.data.role}
                icon={<ShieldCheck className="text-blue-600" />}
              />

              <InfoCard
                title="Account Status"
                value={profile?.data.status || 'Active'}
                icon={<CheckCircle2 className="text-green-600" />}
                status
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InfoCard({ title, value, icon, status = false }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all bg-white mt-12 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-2xl bg-slate-100">
          {icon}
        </div>

        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          {status ? (
            <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full mt-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-bold text-green-700">
                {value}
              </span>
            </div>
          ) : (
            <p className="text-lg font-bold text-slate-800 break-all">
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
