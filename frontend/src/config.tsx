// For Vite projects, use import.meta.env
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
export const JWT_STORAGE_KEY = 'kenfuse_token'

// Add type declaration for Vite env
declare global {
  interface ImportMeta {
    env: {
      VITE_API_URL?: string
    }
  }
}