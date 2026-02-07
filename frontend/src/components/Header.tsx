import React from 'react'
import { Bell, Search, User, Menu } from 'lucide-react'

interface HeaderProps {
  user?: { name: string; email: string } | null
  onMenuClick?: () => void
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={18} className="text-blue-600" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium truncate max-w-[150px]">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate max-w-[150px]">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
