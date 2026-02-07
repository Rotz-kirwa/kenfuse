// Global TypeScript interfaces and types

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  avatar?: string
  createdAt: string
}

export interface Will {
  id: number
  userId: number
  title: string
  executor: string
  beneficiaries: Beneficiary[]
  assets: Asset[]
  witnesses: Witness[]
  createdAt: string
  updatedAt: string
  status: 'draft' | 'completed' | 'executed'
}

export interface Beneficiary {
  id: number
  willId?: number
  name: string
  email: string
  phone: string
  relationship: string
  address: string
  percentage: number
  idNumber?: string
  dateOfBirth?: string
}

export interface Asset {
  id: number
  willId: number
  name: string
  type: 'property' | 'vehicle' | 'bank_account' | 'investment' | 'other'
  value: number
  location?: string
  description?: string
}

export interface Witness {
  id: number
  willId: number
  name: string
  idNumber: string
  email?: string
  phone?: string
  address?: string
}

export interface Memorial {
  id: number
  userId: number
  title: string
  name: string
  birthDate: string | null
  deathDate: string | null
  biography: string | null
  photos?: string[]
  createdAt: string
  updatedAt: string
}

export interface Fundraiser {
  id: number
  userId: number
  title: string
  description: string
  goal: number
  raised: number
  donors: number
  daysLeft: number
  image: string
  status: 'active' | 'completed' | 'cancelled'
  createdAt: string
  endDate: string
}

export interface Donation {
  id: number
  fundraiserId: number
  donorName: string
  amount: number
  message?: string
  isAnonymous: boolean
  createdAt: string
}

export interface Product {
  id: number
  vendorId: number
  name: string
  description: string
  price: number
  category: 'flowers' | 'urns' | 'stationery' | 'gifts' | 'services'
  images: string[]
  inStock: boolean
  rating?: number
  reviews?: number
}

export interface Order {
  id: number
  userId: number
  products: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: string
  createdAt: string
}

export interface OrderItem {
  productId: number
  quantity: number
  price: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface FormErrors {
  [key: string]: string
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'
