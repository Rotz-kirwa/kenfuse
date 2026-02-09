import { Shield, Heart, TrendingUp, FileText, Users, Lock, Smartphone, Globe } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Digital Will Creation',
      description: 'Create legally-sound wills through our intuitive wizard. Add assets, beneficiaries, and witnesses with ease.',
      benefits: ['PDF generation', 'Secure storage', 'Easy updates', 'Legal compliance']
    },
    {
      icon: Heart,
      title: 'Memorial Management',
      description: 'Honor loved ones with beautiful digital memorials. Share life stories, photos, and funeral details.',
      benefits: ['Photo galleries', 'Life stories', 'Shareable pages', 'PDF booklets']
    },
    {
      icon: TrendingUp,
      title: 'Fundraising Campaigns',
      description: 'Community-driven support with seamless M-Pesa integration for memorial expenses.',
      benefits: ['M-Pesa payments', 'Real-time tracking', 'Social sharing', 'Donor recognition']
    },
    {
      icon: FileText,
      title: 'Document Generation',
      description: 'Automatically generate professional PDF documents for wills and memorials.',
      benefits: ['Professional templates', 'Instant download', 'Print-ready', 'Legal format']
    },
    {
      icon: Users,
      title: 'Beneficiary Management',
      description: 'Easily manage and update beneficiary information with detailed records.',
      benefits: ['Multiple beneficiaries', 'Percentage allocation', 'Contact details', 'ID verification']
    },
    {
      icon: Lock,
      title: 'Bank-Level Security',
      description: 'Your data is protected with end-to-end encryption and secure authentication.',
      benefits: ['256-bit encryption', 'Secure login', 'Data backup', 'Privacy controls']
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Fully responsive interface optimized for all devices, especially mobile.',
      benefits: ['Touch-friendly', 'Offline capable', 'Fast loading', 'All screen sizes']
    },
    {
      icon: Globe,
      title: 'Marketplace',
      description: 'Connect with verified memorial service providers and vendors.',
      benefits: ['Funeral services', 'Legal assistance', 'Memorial products', 'Verified vendors']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              Powerful Features for <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Complete</span> Legacy Management
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to plan, preserve, and honor your legacy in one comprehensive platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="card hover:scale-105 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
