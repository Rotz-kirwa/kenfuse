// src/components/DashboardLayout.tsx
import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, X, Bell, Search, User, Settings, 
  HelpCircle, Home, FileText, Heart, DollarSign, 
  Users, BarChart, MessageCircle, ChevronRight, Shield
} from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { icon: <BarChart className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FileText className="h-5 w-5" />, label: 'Will Creation', path: '/will' },
    { icon: <Heart className="h-5 w-5" />, label: 'Memorials', path: '/memorials' },
    { icon: <DollarSign className="h-5 w-5" />, label: 'Fundraising', path: '/fundraiser' },
    { icon: <Users className="h-5 w-5" />, label: 'Marketplace', path: '/marketplace' },
    { icon: <MessageCircle className="h-5 w-5" />, label: 'Messages', path: '/messages' },
    { icon: <User className="h-5 w-5" />, label: 'Profile', path: '/profile' }, // Added Profile
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <Link to="/" className="ml-4 lg:ml-0 flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">KENFUSE</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">JD</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">Premium Plan</p>
                  </div>
                  <ChevronRight className="hidden md:block h-4 w-4 text-gray-400" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 hidden group-hover:block z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="inline h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="inline h-4 w-4 mr-2" />
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <HelpCircle className="inline h-4 w-4 mr-2" />
                    Help
                  </a>
                  <div className="border-t my-2"></div>
                  <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Home className="inline h-4 w-4 mr-2" />
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 lg:static lg:inset-auto`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">John's Family</h2>
                  <p className="text-sm text-gray-500">Family Account</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 lg:p-8">
          <div className="bg-white rounded-xl border border-gray-200">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}