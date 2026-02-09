import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6" fill="white" />
              </div>
              <span className="text-2xl font-bold">KENFUSE</span>
            </div>
            <p className="text-purple-200 text-sm">
              Preserving legacies, honoring memories, and supporting families across Kenya.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="text-purple-200 hover:text-white">Features</Link></li>
              <li><Link to="/about" className="text-purple-200 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-purple-200 hover:text-white">Contact</Link></li>
              <li><Link to="/create-account" className="text-purple-200 hover:text-white">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-purple-200">Digital Wills</li>
              <li className="text-purple-200">Memorial Services</li>
              <li className="text-purple-200">Fundraising</li>
              <li className="text-purple-200">Marketplace</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-purple-200">
                <Mail className="w-4 h-4" />
                support@kenfuse.com
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <Phone className="w-4 h-4" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <MapPin className="w-4 h-4" />
                Nairobi, Kenya
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#1DA1F2] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-6 pt-6 text-center text-sm text-purple-200">
          <p>&copy; {new Date().getFullYear()} KENFUSE. All rights reserved. | Built with ❤️ for Kenya</p>
        </div>
      </div>
    </footer>
  )
}
