import { Link } from 'react-router-dom'
import { Heart, Shield, Users, TrendingUp, ArrowRight, CheckCircle, Star } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" fill="currentColor" />
                Trusted by 10,000+ Kenyan Families
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Preserve Your <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Legacy</span> with Dignity
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Kenya's first digital platform for wills, memorials, and legacy planning. Secure, affordable, and accessible to all.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/create-account" className="btn-primary text-center">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </Link>
                <Link to="/features" className="btn-outline text-center">
                  Learn More
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  100% Secure
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl">
                    <Heart className="w-8 h-8 text-purple-600 mb-2" />
                    <div className="text-2xl font-bold text-purple-900">5,000+</div>
                    <div className="text-sm text-purple-700">Memorials</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-6 rounded-xl">
                    <Shield className="w-8 h-8 text-amber-600 mb-2" />
                    <div className="text-2xl font-bold text-amber-900">3,200+</div>
                    <div className="text-sm text-amber-700">Wills Created</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-6 rounded-xl">
                    <Users className="w-8 h-8 text-emerald-600 mb-2" />
                    <div className="text-2xl font-bold text-emerald-900">10K+</div>
                    <div className="text-sm text-emerald-700">Users</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-pink-600 mb-2" />
                    <div className="text-2xl font-bold text-pink-900">KSh 50M+</div>
                    <div className="text-sm text-pink-700">Raised</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Comprehensive legacy management in one platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Digital Wills', desc: 'Create legally-sound wills in minutes', color: 'purple' },
              { icon: Heart, title: 'Memorials', desc: 'Honor loved ones with beautiful tributes', color: 'pink' },
              { icon: TrendingUp, title: 'Fundraising', desc: 'Community support with M-Pesa integration', color: 'emerald' }
            ].map((feature, i) => (
              <div key={i} className="card hover:scale-105 transition-transform">
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Legacy?</h2>
          <p className="text-xl mb-8 text-purple-100">Join thousands of Kenyan families planning for the future</p>
          <Link to="/create-account" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors">
            Start Your Free Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
