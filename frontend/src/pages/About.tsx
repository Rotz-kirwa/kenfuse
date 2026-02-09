import { Target, Eye, Heart, Users, Award, TrendingUp, Shield, Lightbulb, Globe, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <Navbar />
      
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">KENFUSE</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Empowering Kenyan families to plan, preserve, and honor their legacy through modern technology
            </p>
          </div>

          {/* Our Story */}
          <div className="card mb-8">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                KENFUSE was born from a simple observation: estate planning and memorial services in Kenya were expensive, complicated, and inaccessible to most families. Traditional legal services cost upwards of KSh 50,000, paper-based wills were prone to loss and disputes, and there was no unified platform for families to manage their legacy.
              </p>
              <p>
                We set out to change this. KENFUSE is Kenya's first comprehensive digital legacy management platform, designed specifically for the Kenyan market. We combine cutting-edge technology with deep understanding of local needs to make estate planning accessible, affordable, and secure for everyone.
              </p>
              <p>
                Today, we serve over 10,000 families across Kenya, helping them create wills, honor loved ones through digital memorials, and raise funds for memorial expenses through our M-Pesa integrated fundraising platform.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To democratize estate planning and memorial services in Kenya by providing an accessible, affordable, and secure digital platform that empowers individuals and families to preserve their legacies with dignity and honor their loved ones with compassion.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become East Africa's leading digital legacy management platform, transforming how families plan for the future and honor their loved ones through innovative technology, compassionate service, and unwavering commitment to accessibility.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">What We Do</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Digital Wills', desc: 'Create legally-compliant wills through our intuitive wizard. Add assets, beneficiaries, and witnesses with ease. Generate professional PDFs instantly.' },
                { icon: Heart, title: 'Memorial Services', desc: 'Honor loved ones with beautiful digital memorials. Share life stories, photos, and funeral details. Create lasting tributes that families can cherish forever.' },
                { icon: TrendingUp, title: 'Fundraising', desc: 'Community-driven support with M-Pesa integration. Raise funds for memorial expenses transparently. Track donations in real-time with social sharing.' }
              ].map((item, i) => (
                <div key={i} className="card">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why We're Different */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Why We're Different</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-600">Designed for Kenyan Families</h3>
                <ul className="space-y-3">
                  {[
                    'Affordable estate planning accessible to all families',
                    'Community fundraising support during difficult times',
                    'Digital memorials that preserve family history forever',
                    'Local support team that understands your culture',
                    'Legally compliant wills recognized in Kenya'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-emerald-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-emerald-600">Secure & Reliable</h3>
                <ul className="space-y-3">
                  {[
                    'Your will and documents protected with encryption',
                    'Automatic backups ensure nothing is ever lost',
                    'Access your legacy plan from any device, anytime',
                    'Generate legal PDFs for official documentation',
                    'Works even with poor internet connection'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { icon: Users, value: '10,000+', label: 'Families Served', color: 'purple' },
                { icon: Shield, value: '3,200+', label: 'Wills Created', color: 'amber' },
                { icon: Heart, value: '5,000+', label: 'Memorials', color: 'pink' },
                { icon: TrendingUp, value: 'KSh 50M+', label: 'Funds Raised', color: 'emerald' }
              ].map((stat, i) => (
                <div key={i} className="card text-center p-3 md:p-6">
                  <div className={`w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-4`}>
                    <stat.icon className={`w-5 h-5 md:w-8 md:h-8 text-${stat.color}-600`} />
                  </div>
                  <div className="text-xl md:text-4xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-base text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: 'Compassion', desc: 'We serve with empathy, understanding the sensitive nature of legacy planning' },
                { icon: Shield, title: 'Trust', desc: 'Your data and legacy are protected with the highest security standards' },
                { icon: Users, title: 'Community', desc: 'We believe in supporting families together through difficult times' },
                { icon: Lightbulb, title: 'Innovation', desc: 'We continuously improve to provide modern solutions for modern families' }
              ].map((value, i) => (
                <div key={i} className="card text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <value.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Future Vision */}
          <div className="card mb-8">
            <h2 className="text-3xl font-bold mb-6">Looking Ahead</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Our journey is just beginning. We're committed to expanding KENFUSE across East Africa, bringing accessible legacy planning to millions more families. Our roadmap includes:
              </p>
              <ul className="grid md:grid-cols-2 gap-4 mt-6">
                {[
                  'AI-powered will drafting assistance',
                  'Blockchain-based asset verification',
                  'Integration with government registries',
                  'Countrywide support across all regions',
                  'Expansion to Uganda, Tanzania, Rwanda',
                  'Advanced analytics for estate planning'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
