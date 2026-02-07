// src/pages/Home.tsx
import { Link } from 'react-router-dom'
import { Shield, Heart, DollarSign, Users, ArrowRight, CheckCircle } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Will Creation",
      description: "Create legally valid wills with PDF export",
      link: "/will"
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Digital Memorials",
      description: "Honor loved ones with beautiful memorials",
      link: "/memorials"
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Fundraising",
      description: "Raise funds with M-Pesa integration",
      link: "/fundraiser"
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Marketplace",
      description: "Verified funeral service providers",
      link: "/marketplace"
    }
  ]

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">KENFUSE</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-blue-600">
                Sign In
              </Link>
              <Link to="/create-account" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Peace of Mind for
            <span className="text-blue-600 block">Life's Transitions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Kenya's premier platform for end-of-life planning, memorial services, 
            and verified vendor marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/create-account"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/login"
              className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Complete Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for dignified end-of-life planning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.link}
                className="block"
              >
                <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                  <div className="mt-4 text-blue-600 font-medium text-center flex items-center justify-center">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-10 opacity-90">
              Join thousands of Kenyan families who trust KENFUSE
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/create-account"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100"
              >
                Create Free Account
              </Link>
              <Link 
                to="/contact"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10"
              >
                Contact Support
              </Link>
            </div>
            <p className="mt-8 text-sm opacity-80">
              <CheckCircle className="inline h-4 w-4 mr-2" />
              No credit card required • Cancel anytime • 24/7 Support
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}