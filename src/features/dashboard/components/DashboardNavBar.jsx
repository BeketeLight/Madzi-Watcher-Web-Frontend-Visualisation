import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  BarChart3,
  User,
  Users
} from "lucide-react";
import React from "react";
import { useDashboardNavigation } from '../hooks/useDashboardNavigation';

const CLIENT_NAV_ITEMS = [
  {
    label: 'Live Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    label: 'Statistics',
    icon: BarChart3,
    path: '/dashboard/stats'
  },
  {
    label: 'Notifications',
    icon: Bell,
    badge: '3',
    path: '/dashboard/notifications'
  },
];

const OFFICER_NAV_ITEMS = [
  {
    label: 'Live Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    label: 'Statistics',
    icon: BarChart3,
    path: '/dashboard/stats'
  },
  {
    label: 'Notifications',
    icon: Bell,
    badge: '5',
    path: '/dashboard/notifications'
  },
  {
    label: 'Users',
    icon: Users,
    path: '/dashboard/users/me/profile'   // you can adjust later
  },
];

function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left
        text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'bg-[#2C7BE5] text-white shadow-md' 
          : 'text-blue-100 hover:bg-[#1e3a5f] hover:text-white'
        }
      `}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1">{item.label}</span>
      
      {item.badge && (
        <Badge className="ml-auto bg-white/20 text-white border-0 hover:bg-white/30">
          {item.badge}
        </Badge>
      )}
    </button>
  );
}

function UserProfile({ user, onSignOut, userProfile, onTraverse }) {
  return (
    <div className="mt-auto border-t border-[#1e3a5f] p-4 space-y-3 bg-[#0a2540]">
      <div className="flex items-center gap-3 px-2">
        <Button 
          variant="ghost" 
          className="p-0 hover:bg-transparent" 
          onClick={onTraverse}
        >
          <div className="h-10 w-10 rounded-2xl bg-[#2C7BE5] flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0 ml-3">
            <p className="font-medium text-white text-sm truncate">
              {userProfile?.firstName || user?.firstName || user?.emailAddress?.split('@')[0] || "User"}
            </p>
            <p className="text-xs text-blue-300 capitalize">
              {user?.role || "Client"}
            </p>
          </div>
        </Button>
      </div>

      <Button
        variant="ghost"
        onClick={onSignOut}
        className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-950/50"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}

export default function DashboardNavBar({
  onSelect,
  onSignOut,
  user,
  userProfile,
  className = ""
}) {
  const navigate = useNavigate();
  const { activeView, setActiveView } = useDashboardNavigation();

  const handleNavigation = (path, label) => {
    navigate(path);
    setActiveView(label);
    if (onSelect) onSelect();
  };

  const isItemActive = (itemLabel) => activeView === itemLabel;

  const role = user?.role?.toLowerCase();
  const navItems = (role === 'officer' || role === 'admin' || role === 'superadmin')
    ? OFFICER_NAV_ITEMS
    : CLIENT_NAV_ITEMS;

  return (
    <aside className={`flex flex-col bg-[#0a2540] w-64 border-r border-[#1e3a5f] h-screen ${className}`}>
      {/* Logo/Header Area */}
      <div className="h-16 flex items-center px-6 border-b border-[#1e3a5f]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-[#2C7BE5] flex items-center justify-center">
            💧
          </div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Madzi Watcher</h2>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={isItemActive(item.label)}
            onClick={() => handleNavigation(item.path, item.label)}
          />
        ))}
      </nav>

      {/* User Profile Section */}
      <UserProfile
        user={user || { role: 'client' }}
        onSignOut={onSignOut}
        userProfile={userProfile}
        onTraverse={() => navigate('/dashboard/users/me/profile')}
      />
    </aside>
  );
}

export { DashboardNavBar };