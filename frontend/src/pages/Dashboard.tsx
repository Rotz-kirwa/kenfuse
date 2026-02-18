import { Sparkles, FileText, Heart, DollarSign, TrendingUp, Users, Calendar, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { willsAPI, memorialsAPI, fundraisersAPI } from '../services/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [chatInput, setChatInput] = useState('')
  const [stats, setStats] = useState([
    { label: 'Active Wills', value: '0', icon: <FileText className="h-5 w-5" />, change: '+0', color: 'bg-blue-100 text-blue-600' },
    { label: 'Memorials', value: '0', icon: <Heart className="h-5 w-5" />, change: '+0', color: 'bg-pink-100 text-pink-600' },
    { label: 'Campaigns', value: '0', icon: <DollarSign className="h-5 w-5" />, change: '+0', color: 'bg-green-100 text-green-600' },
    { label: 'AI Credits', value: '100', icon: <Sparkles className="h-5 w-5" />, change: '+0', color: 'bg-purple-100 text-purple-600' },
  ])

  useEffect(() => {
    const userData = localStorage.getItem('kenfuse_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [willsRes, memorialsRes, fundraisersRes] = await Promise.all([
        willsAPI.getAll().catch(() => ({ data: { data: [] } })),
        memorialsAPI.getAll().catch(() => ({ data: { data: [] } })),
        fundraisersAPI.getAll().catch(() => ({ data: { data: [] } }))
      ])

      const willsCount = willsRes.data.data?.length || 0
      const memorialsCount = memorialsRes.data.data?.length || 0
      const fundraisersCount = fundraisersRes.data.data?.length || 0

      setStats([
        { label: 'Active Wills', value: String(willsCount), icon: <FileText className="h-5 w-5" />, change: `+${willsCount}`, color: 'bg-blue-100 text-blue-600' },
        { label: 'Memorials', value: String(memorialsCount), icon: <Heart className="h-5 w-5" />, change: `+${memorialsCount}`, color: 'bg-pink-100 text-pink-600' },
        { label: 'Campaigns', value: String(fundraisersCount), icon: <DollarSign className="h-5 w-5" />, change: `+${fundraisersCount}`, color: 'bg-green-100 text-green-600' },
        { label: 'AI Credits', value: '100', icon: <Sparkles className="h-5 w-5" />, change: '+0', color: 'bg-purple-100 text-purple-600' },
      ])
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleAskAI = (question: string) => {
    setShowChat(true)
    if (question) {
      setChatMessages([{ role: 'user', content: question }])
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'I can help you with that! This is a demo response. In production, this would connect to an AI service to provide personalized assistance with wills, funeral planning, and legal requirements.' 
        }])
      }, 1000)
    }
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    setChatMessages([...chatMessages, { role: 'user', content: chatInput }])
    setChatInput('')
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Thank you for your question. This is a demo response. In production, this would provide AI-powered assistance.' 
      }])
    }, 1000)
  }

  const recentActivities: any[] = []

  const quickActions = [
    { title: 'Create Will', description: 'Start new will document', icon: <FileText className="h-5 w-5" />, color: 'bg-blue-500', path: '/create-will' },
    { title: 'Start Fundraiser', description: 'Launch fundraising campaign', icon: <DollarSign className="h-5 w-5" />, color: 'bg-green-500', path: '/fundraiser' },
    { title: 'Ask AI', description: 'Get instant assistance', icon: <Sparkles className="h-5 w-5" />, color: 'bg-purple-500', path: '#' },
    { title: 'Invite Family', description: 'Add family members', icon: <Users className="h-5 w-5" />, color: 'bg-pink-500', path: '/beneficiaries' },
  ]

  return (
    <div className="p-3 sm:p-6 md:p-8">
      {/* Welcome Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'User'}! 👋</h1>
        <p className="text-sm sm:text-base text-gray-600">Here's what's happening with your legacy planning today.</p>
      </div>

      {/* Stats Grid - 2 per row on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Quick Actions</h2>
              <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-800">
                View all →
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => action.path !== '#' && navigate(action.path)}
                  className="p-3 sm:p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <div className="text-white">{action.icon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 truncate">{action.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{action.description}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Recent Activities</h2>
            
            {recentActivities.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-sm sm:text-base text-gray-500">No recent activities</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-gray-600">{activity.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          {/* AI Assistant Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-4 sm:p-6 mb-4 sm:mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-gray-900">AI Assistant</h3>
                <p className="text-xs sm:text-sm text-gray-600">Ready to help</p>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <button onClick={() => handleAskAI('Help me write a will')} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 text-xs sm:text-sm">
                ✍️ Help me write a will
              </button>
              <button onClick={() => handleAskAI('Plan funeral expenses')} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 text-xs sm:text-sm">
                💰 Plan funeral expenses
              </button>
              <button onClick={() => handleAskAI('Legal requirements')} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 text-xs sm:text-sm">
                ⚖️ Legal requirements
              </button>
            </div>
            
            <button onClick={() => setShowChat(true)} className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 text-sm sm:text-base">
              Ask Anything
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-4 sm:mb-6">Upcoming</h3>
            
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-gray-500">No upcoming events</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-xs text-gray-600">Ask me anything</p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-12">
                  <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600">How can I help you today?</p>
                </div>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
