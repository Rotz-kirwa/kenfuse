import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  Home, 
  Heart, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  User,
  Target,
  PlusCircle,
  ShoppingBag,
  Sparkles,
  X
} from 'lucide-react'
import { toast } from 'react-toastify'

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate()
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/', color: 'text-primary-600' },
    { icon: Heart, label: 'Memorials', path: '/memorials', color: 'text-memorial-600' },
    { icon: FileText, label: 'Wills', path: '/wills', color: 'text-primary-600' },
    { icon: Users, label: 'Beneficiaries', path: '/beneficiaries', color: 'text-secondary-600' },
    { icon: Target, label: 'Fundraiser', path: '/fundraiser', color: 'text-accent-600' },
    { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace', color: 'text-primary-600' },
  ]

  const secondaryItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: User, label: 'Profile', path: '/profile' },
  ]

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('kenfuse_token')
      localStorage.removeItem('kenfuse_user')
      toast.success('Logged out successfully')
      navigate('/login')
      onClose?.()
    }
  }

  const handleCreateWill = () => {
    navigate('/create-will')
    onClose?.()
  }

  const handleNavClick = () => {
    onClose?.()
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen shadow-lg lg:shadow-sm">
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center shadow-md">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold bg-gradient-to-r from-primary-700 via-secondary-600 to-memorial-600 bg-clip-text text-transparent">
                KENFUSE
              </h1>
              <p className="text-xs text-gray-500">Digital Legacy</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>
      </div>
      
      {/* Quick Action Button */}
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <button
          onClick={handleCreateWill}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl hover:shadow-lg hover:from-primary-700 hover:to-primary-600 flex items-center justify-center gap-2 font-medium transition-all duration-200 text-sm sm:text-base"
        >
          <PlusCircle size={18} />
          Create Will
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            Main Menu
          </h3>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl transition-all duration-200 text-sm sm:text-base ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md font-medium'
                        : 'text-gray-700 hover:bg-white hover:shadow-sm'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={18} className={!isActive ? item.color : ''} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            Account
          </h3>
          <ul className="space-y-1">
            {secondaryItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl transition-all duration-200 text-sm sm:text-base ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md font-medium'
                        : 'text-gray-700 hover:bg-white hover:shadow-sm'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* User Profile & Logout */}
      <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-gray-700 hover:text-red-600 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl hover:bg-red-50 transition-all duration-200 font-medium text-sm sm:text-base"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
        
        {/* Footer */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © 2026 KENFUSE v1.0.0
          </p>
        </div>
      </div>
    </div>
  )
}
