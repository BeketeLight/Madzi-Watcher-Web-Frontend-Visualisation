import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@/layouts/AppLayout'
import BareLayout from '@/layouts/BareLayout'

import LandingPage from '@/pages/LandingPage'
import About from '@/pages/About'
import Contacts from '@/pages/Contacts'
import FAQs from '@/pages/FAQs'
import UnauthorizedPage from '@/pages/UnauthorizedPage'
import NotFoundPage from '@/pages/NotFoundPage'

import LoginPage from '@/features/auth/pages/LoginPage'
import SignupPage from '@/features/auth/pages/SignupPage'
import OtpVerificationPage from '@/features/auth/pages/OtpVerificationPage'
import RequestPasswordResetPage from '@/features/auth/pages/RequestPasswordResetPage'

import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import DashboardOverview from '@/features/dashboard/components/DashboardOverview'
import NotificationsPage from '@/features/notifications/pages/NotificationsPage'
// import StatisticsPage from '@/features/dashboard/pages/StatisticsPage'
import StatisticsPage from '@/features/statistics/pages/StatisticsDashboard'
import { RoleRoute } from './RoleRoute'
import ProfilePage from '@/features/dashboard/pages/ProfilePage'
import UserDetailPage from '@/features/dashboard/pages/UserDetailsPage'

export const router = createBrowserRouter([

  // BARE LAYOUT (NO HEADER / NO FOOTER)
  {
    element: <BareLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/otp', element: <OtpVerificationPage /> },
      { path: '/request-reset', element: <RequestPasswordResetPage />},
      { path: '/unauthorized', element: <UnauthorizedPage /> },
    ],
  },

  // Header & Footer Layout
  {
    element: <AppLayout />,
    children: [
      // Public
      { path: '/', element: <LandingPage /> },
      { path: '/about', element: <About /> },
      { path: '/contacts', element: <Contacts /> },
      { path: '/faqs', element: <FAQs /> },
      
    ],
  },

  // Role-based routes(no header / no footer)
  {
    element: <RoleRoute allowedRoles={['superadmin', 'admin', 'officer','client']} />,
    children: [
      { 
        path: '/dashboard', 
        element: <DashboardPage />,
        children: [
              { index: true, element: <DashboardOverview /> , allowedRoles: ['client','officer', 'admin','superadmin'] },
              { path: 'notifications', element: <NotificationsPage />, allowedRoles: ['officer','client', 'admin', 'superadmin']},
              { path: 'stats', element: <StatisticsPage />, allowedRoles: ['officer','admin','superadmin'] },
              { path: 'users/me/profile', element: <ProfilePage />, allowedRoles: ['client','officer', 'admin','superadmin']},
              { path: 'users/:userId', element: <UserDetailPage />, allowedRoles: ['admin','superadmin']}
        ]
      },
    ]
  },
    
   // System
  { path: '*', element: <NotFoundPage /> }
])

export default router
