import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { ApiResponse } from '../types'

const API_URL = 'https://kenfuse-backend.onrender.com/api/v1'

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kenfuse_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    
    if (error.response?.status === 401) {
      localStorage.removeItem('kenfuse_token')
      localStorage.removeItem('kenfuse_user')
      toast.error('Session expired. Please login again.')
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action')
    } else if (error.response?.status === 404) {
      toast.error('Resource not found')
    } else if (error.response?.status === 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.')
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.')
    }
    
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post<ApiResponse<{ token: string; user: any }>>('/auth/login', { email, password }),
  register: (data: any) => 
    api.post<ApiResponse<{ token: string; user: any }>>('/auth/register', data),
  logout: () => {
    localStorage.removeItem('kenfuse_token')
    localStorage.removeItem('kenfuse_user')
    return Promise.resolve()
  },
  me: () => api.get<ApiResponse<any>>('/auth/me'),
}

// Memorials API
export const memorialsAPI = {
  getAll: () => api.get<ApiResponse<any[]>>('/memorials'),
  getById: (id: number) => api.get<ApiResponse<any>>(`/memorials/${id}`),
  create: (data: any) => api.post<ApiResponse<any>>('/memorials', data),
  update: (id: number, data: any) => api.put<ApiResponse<any>>(`/memorials/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/memorials/${id}`),
  getPDF: (id: number) => 
    api.get(`/memorials/${id}/pdf`, { 
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf'
      }
    }),
}

// Wills API
export const willsAPI = {
  getAll: () => api.get<ApiResponse<any[]>>('/wills'),
  getById: (id: number) => api.get<ApiResponse<any>>(`/wills/${id}`),
  create: (data: any) => api.post<ApiResponse<any>>('/wills', data),
  update: (id: number, data: any) => api.put<ApiResponse<any>>(`/wills/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/wills/${id}`),
  getPDF: (id: number) => 
    api.get(`/wills/${id}/pdf`, { 
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf'
      }
    }),
}

// Beneficiaries API
export const beneficiariesAPI = {
  getAll: () => api.get<ApiResponse<any[]>>('/beneficiaries'),
  getById: (id: number) => api.get<ApiResponse<any>>(`/beneficiaries/${id}`),
  create: (data: any) => api.post<ApiResponse<any>>('/beneficiaries', data),
  update: (id: number, data: any) => api.put<ApiResponse<any>>(`/beneficiaries/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/beneficiaries/${id}`),
}

// Fundraisers API
export const fundraisersAPI = {
  getAll: () => api.get<ApiResponse<any[]>>('/fundraisers'),
  getById: (id: number) => api.get<ApiResponse<any>>(`/fundraisers/${id}`),
  create: (data: any) => api.post<ApiResponse<any>>('/fundraisers', data),
  update: (id: number, data: any) => api.put<ApiResponse<any>>(`/fundraisers/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/fundraisers/${id}`),
  donate: (id: number, data: any) => api.post<ApiResponse<any>>(`/fundraisers/${id}/donate`, data),
}

// Products API
export const productsAPI = {
  getAll: (params?: any) => api.get<ApiResponse<any[]>>('/products', { params }),
  getById: (id: number) => api.get<ApiResponse<any>>(`/products/${id}`),
  getByCategory: (category: string) => api.get<ApiResponse<any[]>>(`/products/category/${category}`),
}

// Orders API
export const ordersAPI = {
  getAll: () => api.get<ApiResponse<any[]>>('/orders'),
  getById: (id: number) => api.get<ApiResponse<any>>(`/orders/${id}`),
  create: (data: any) => api.post<ApiResponse<any>>('/orders', data),
  updateStatus: (id: number, status: string) => 
    api.patch<ApiResponse<any>>(`/orders/${id}/status`, { status }),
}

// Payments API
export const paymentsAPI = {
  initiateMpesa: (data: { phoneNumber: string; amount: number; reference: string }) =>
    api.post<ApiResponse<any>>('/payments/mpesa/stk-push', data),
  checkStatus: (checkoutRequestId: string) =>
    api.get<ApiResponse<any>>(`/payments/mpesa/status/${checkoutRequestId}`),
}

export default api
