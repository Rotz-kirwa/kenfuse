import React from 'react'
import { Settings as SettingsIcon, Bell, Shield, Globe, Moon } from 'lucide-react'

export default function Settings() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="text-primary-600" size={28} />
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-blue-600" size={22} />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Browser notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-green-600" size={22} />
            <h2 className="text-lg font-semibold">Privacy</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Visibility
              </label>
              <select className="input-field w-full">
                <option>Public</option>
                <option>Private (Only me)</option>
                <option>Friends Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Sharing
              </label>
              <select className="input-field w-full">
                <option>Allow anonymous usage data</option>
                <option>Do not share any data</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Moon className="text-purple-600" size={22} />
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="flex gap-2">
                <button className="flex-1 py-3 border border-gray-300 rounded-lg text-center hover:bg-gray-50">
                  Light
                </button>
                <button className="flex-1 py-3 border border-gray-800 bg-gray-800 text-white rounded-lg text-center">
                  Dark
                </button>
                <button className="flex-1 py-3 border border-gray-300 rounded-lg text-center hover:bg-gray-50">
                  Auto
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="text-orange-600" size={22} />
            <h2 className="text-lg font-semibold">Language & Region</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select className="input-field w-full">
                <option>English (US)</option>
                <option>Swahili</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select className="input-field w-full">
                <option>Africa/Nairobi (EAT)</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="btn-primary px-8">
          Save Changes
        </button>
      </div>
    </div>
  )
}
