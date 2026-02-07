import axios from 'axios'
import { API_URL, JWT_STORAGE_KEY } from '../config'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(JWT_STORAGE_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(JWT_STORAGE_KEY)
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: any) => 
    api.post('/auth/register', data),
}

export const memorialsAPI = {
  getAll: () => api.get('/memorials'),
  create: (data: any) => api.post('/memorials', data),
  getPDF: (id: number) => 
    api.get(`/memorials/${id}/pdf`, { responseType: 'blob' }),
}

export const willsAPI = {
  getAll: () => api.get('/wills'),
  create: (data: any) => api.post('/wills', data),
  getPDF: (id: number) => 
    api.get(`/wills/${id}/pdf`, { responseType: 'blob' }),
}

export default api