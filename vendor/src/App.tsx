import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import VendorLogin from './pages/VendorLogin'
import VendorDashboard from './pages/VendorDashboard'
import VendorOnboarding from './pages/VendorOnboarding'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('vendor_token')
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<VendorLogin />} />
        <Route path="/onboarding" element={<VendorOnboarding />} />
        <Route path="/" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  )
}

export default App
