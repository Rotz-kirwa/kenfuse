import { useState } from 'react'
import { Phone, CreditCard, Smartphone, Shield, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [amount, setAmount] = useState('1000')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const handleMpesaPayment = () => {
    if (!phoneNumber.match(/^0[0-9]{9}$/)) {
      alert('Please enter a valid Kenyan phone number (0XXXXXXXXX)')
      return
    }
    alert(`M-Pesa STK Push sent to ${phoneNumber} for KES ${amount}`)
  }

  const handleCardPayment = () => {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
      alert('Please fill all card details')
      return
    }
    alert(`Card payment processed for KES ${amount}`)
  }

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Pay instantly via M-Pesa STK Push'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Pay with Visa, Mastercard, or American Express'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Payment</h1>
        <p className="text-gray-600">Secure payment processing for KENFUSE services</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
          
          <div className="space-y-4 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as 'mpesa' | 'card')}
                className={`w-full p-4 border rounded-lg text-left transition-colors ${
                  paymentMethod === method.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${
                    paymentMethod === method.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {method.icon}
                  </div>
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                  {paymentMethod === method.id && (
                    <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (KES)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                KES
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                min="100"
                step="100"
              />
            </div>
            <div className="flex gap-2 mt-3">
              {[500, 1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    amount === amt.toString() 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  KES {amt}
                </button>
              ))}
            </div>
          </div>

          {paymentMethod === 'mpesa' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                  +254
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="712 345 678"
                  maxLength={9}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Enter your M-Pesa registered phone number
              </p>
              <button
                onClick={handleMpesaPayment}
                className="w-full mt-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 flex items-center justify-center"
              >
                <Smartphone className="h-5 w-5 mr-2" />
                Pay with M-Pesa
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <button
                onClick={handleCardPayment}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pay with Card
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Security</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <div className="font-medium">Bank-Level Security</div>
                  <div className="text-sm text-gray-600">All transactions are encrypted with SSL/TLS</div>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <div className="font-medium">M-Pesa Verified</div>
                  <div className="text-sm text-gray-600">Direct integration with Safaricom M-Pesa</div>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <div className="font-medium">PCI DSS Compliant</div>
                  <div className="text-sm text-gray-600">Card payments processed securely</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">M-Pesa Support</div>
                <div className="font-medium">+254 700 123 456</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Card Support</div>
                <div className="font-medium">+254 700 789 012</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">payments@kenfuse.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}