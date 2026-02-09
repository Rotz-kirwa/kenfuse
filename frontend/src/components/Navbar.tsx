import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Heart, User, LogOut } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = !!localStorage.getItem('kenfuse_token')
  const user = JSON.parse(localStorage.getItem('kenfuse_user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('kenfuse_token')
    localStorage.removeItem('kenfuse_user')
    navigate('/')
  }

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  const dashboardLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Wills', path: '/dashboard/wills' },
    { name: 'Memorials', path: '/dashboard/memorials' },
    { name: 'Fundraiser', path: '/dashboard/fundraiser' },
    { name: 'Marketplace', path: '/dashboard/marketplace' }
  ]

  const links = isAuthenticated ? dashboardLinks : publicLinks

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                KENFUSE
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
                  <User className="w-5 h-5" />
                  <span>{user.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="btn-outline flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-purple-600 font-medium">
                  Sign In
                </Link>
                <Link to="/create-account" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-br from-purple-50 to-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 bg-purple-100 rounded-lg p-2">
            <X className="w-6 h-6 text-purple-600" />
          </button>
          <div className="mt-12 space-y-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium ${
                  location.pathname === link.path ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-gray-700 hover:bg-emerald-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard/profile" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg bg-emerald-50 text-gray-700 hover:bg-emerald-100">
                  Profile
                </Link>
                <button onClick={handleLogout} className="w-full btn-outline mt-4">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg bg-emerald-50 text-gray-700 hover:bg-emerald-100">
                  Sign In
                </Link>
                <Link to="/create-account" onClick={() => setIsOpen(false)} className="block mt-4">
                  <button className="w-full btn-primary">Get Started</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
