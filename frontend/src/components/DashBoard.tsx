import React from 'react'
import { Users, FileText, Heart, TrendingUp, Calendar, Award, Clock, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const stats = [
    { icon: Users, label: 'Total Memorials', value: '12', color: 'blue', change: '+2' },
    { icon: FileText, label: 'Active Wills', value: '5', color: 'green', change: '+1' },
    { icon: Heart, label: 'Beneficiaries', value: '8', color: 'red', change: '+3' },
    { icon: TrendingUp, label: 'Growth', value: '24%', color: 'purple', change: '+5%' },
  ]

  const recentActivities = [
    { id: 1, action: 'Created memorial for', name: 'John Doe', time: '2 hours ago', icon: Users },
    { id: 2, action: 'Updated will document', name: 'Last Will', time: '1 day ago', icon: FileText },
    { id: 3, action: 'Added beneficiary', name: 'Jane Smith', time: '2 days ago', icon: Heart },
    { id: 4, action: 'Generated PDF for', name: 'Memorial #5', time: '3 days ago', icon: FileText },
  ]

  const upcomingTasks = [
    { id: 1, task: 'Review will documents', due: 'Tomorrow', priority: 'high' },
    { id: 2, task: 'Add beneficiaries to will #3', due: 'In 3 days', priority: 'medium' },
    { id: 3, task: 'Update memorial information', due: 'Next week', priority: 'low' },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={18} />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`text-${stat.color}-600`} size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-600 font-medium">{stat.change}</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Link to="/memorials" className="text-primary-600 hover:text-primary-700 text-sm">
              View all
            </Link>
          </div>
          
          <div className="card">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <activity.icon size={18} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="text-gray-700">{activity.action} </span>
                      <span className="font-medium">{activity.name}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Upcoming */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/create-will" className="card text-center hover:shadow-lg transition-shadow hover:border-primary-300">
                <FileText className="mx-auto text-blue-600 mb-2" size={24} />
                <p className="font-medium">Create Will</p>
              </Link>
              <Link to="/memorials" className="card text-center hover:shadow-lg transition-shadow hover:border-primary-300">
                <Heart className="mx-auto text-red-600 mb-2" size={24} />
                <p className="font-medium">Add Memorial</p>
              </Link>
              <Link to="/beneficiaries" className="card text-center hover:shadow-lg transition-shadow hover:border-primary-300">
                <Users className="mx-auto text-green-600 mb-2" size={24} />
                <p className="font-medium">Manage Beneficiaries</p>
              </Link>
              <Link to="/fundraiser" className="card text-center hover:shadow-lg transition-shadow hover:border-primary-300">
                <DollarSign className="mx-auto text-purple-600 mb-2" size={24} />
                <p className="font-medium">Start Fundraiser</p>
              </Link>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
            <div className="card">
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-gray-500">Due: {task.due}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="mt-8 card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Complete Your Profile</h3>
            <p className="opacity-90">Add more details to get personalized recommendations</p>
          </div>
          <Link to="/profile" className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  )
}