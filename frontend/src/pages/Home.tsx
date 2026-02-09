import { Link } from 'react-router-dom'
import { Heart, Shield, Users, TrendingUp, ArrowRight, CheckCircle, Star, FileText, Smartphone, Lock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  const isAuthenticated = !!localStorage.getItem('kenfuse_token')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 min-h-screen md:min-h-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" fill="currentColor" />
                Trusted by 10,000+ Kenyan Families
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Preserve Your <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Legacy</span> with Dignity
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Kenya's first digital platform for wills, memorials, and legacy planning. Secure, affordable, and accessible to all families.
              </p>
              <div className="flex flex-row gap-3">
                <Link to="/create-account" className="btn-primary text-center inline-flex items-center justify-center gap-2 flex-1">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/features" className="btn-outline text-center flex-1">
                  Learn More
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  No credit card
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  100% Secure
                </div>
              </div>
            </div>
            
            {/* Animated Stats Card */}
            <div className="relative">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-4 md:p-8">
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 md:p-6 rounded-xl">
                    <Heart className="w-5 h-5 md:w-8 md:h-8 text-purple-600 mb-1 md:mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-purple-900">5,000+</div>
                    <div className="text-xs md:text-sm text-purple-700">Memorials</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-3 md:p-6 rounded-xl">
                    <Shield className="w-5 h-5 md:w-8 md:h-8 text-amber-600 mb-1 md:mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-amber-900">3,200+</div>
                    <div className="text-xs md:text-sm text-amber-700">Wills Created</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 md:p-6 rounded-xl">
                    <Users className="w-5 h-5 md:w-8 md:h-8 text-emerald-600 mb-1 md:mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-emerald-900">10K+</div>
                    <div className="text-xs md:text-sm text-emerald-700">Users</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-3 md:p-6 rounded-xl">
                    <TrendingUp className="w-5 h-5 md:w-8 md:h-8 text-pink-600 mb-1 md:mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-pink-900">KSh 50M+</div>
                    <div className="text-xs md:text-sm text-pink-700">Raised</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Everything You Need in One Platform</h2>
            <p className="text-xl text-gray-600">Comprehensive legacy management made simple</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: 'Digital Wills', 
                desc: 'Create legally-sound wills in minutes with our intuitive wizard',
                color: 'purple',
                link: isAuthenticated ? '/dashboard/wills' : '/create-account'
              },
              { 
                icon: Heart, 
                title: 'Memorials', 
                desc: 'Honor loved ones with beautiful digital tributes and memories',
                color: 'pink',
                link: isAuthenticated ? '/dashboard/memorials' : '/create-account'
              },
              { 
                icon: TrendingUp, 
                title: 'Fundraising', 
                desc: 'Community support with seamless M-Pesa integration',
                color: 'emerald',
                link: isAuthenticated ? '/dashboard/fundraiser' : '/create-account'
              }
            ].map((feature, i) => (
              <Link key={i} to={feature.link} className="card hover:scale-105 transition-transform group">
                <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.desc}</p>
                <div className="flex items-center text-purple-600 font-medium">
                  Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KENFUSE */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Why Choose KENFUSE?</h2>
            <p className="text-xl text-gray-600">Built specifically for Kenyan families</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: 'Legally Compliant Wills', desc: 'Create legally-sound wills that meet Kenyan succession laws' },
              { icon: Smartphone, title: 'M-Pesa Integrated Payments', desc: 'Seamless donations and payments via M-Pesa STK Push' },
              { icon: Shield, title: 'Verified Service Providers', desc: 'Connect with trusted funeral homes and legal experts' },
              { icon: Users, title: '24/7 Kenyan Support', desc: 'Local customer service team ready to assist anytime' }
            ].map((item, i) => (
              <div key={i} className="card text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">See what our users say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Jane Wanjiku', role: 'Nairobi', text: 'KENFUSE made creating my will so easy. I did it from my phone in 30 minutes!' },
              { name: 'David Omondi', role: 'Kisumu', text: 'The memorial page for my father was beautiful. Family from abroad could contribute easily.' },
              { name: 'Grace Muthoni', role: 'Mombasa', text: 'Affordable and secure. Finally, estate planning that makes sense for Kenyans.' }
            ].map((testimonial, i) => (
              <div key={i} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-500" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Legacy?</h2>
          <p className="text-xl mb-6 text-purple-100">Join thousands of Kenyan families planning for the future today</p>
          <Link to="/create-account" className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors">
            Start Your Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-purple-200 text-sm">No credit card required • Free forever</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
