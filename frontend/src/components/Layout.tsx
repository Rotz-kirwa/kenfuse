import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { Menu, X } from 'lucide-react'

export default function Layout() {
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  React.useEffect(() => {
    const userStr = localStorage.getItem('kenfuse_user')
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch (e) {
        console.error('Failed to parse user data')
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 h-screen z-50 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
