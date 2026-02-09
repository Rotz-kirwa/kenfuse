export default function WhatsAppFloat() {
  const phoneNumber = '254700000000' // Replace with actual WhatsApp business number
  const message = 'Hello KENFUSE! I need assistance with...'
  
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="w-9 h-9 fill-current">
        <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.408 1.417-5.267-0.325-0.528c-1.331-2.171-2.035-4.679-2.035-7.251 0-7.589 6.178-13.767 13.767-13.767s13.767 6.178 13.767 13.767-6.178 13.767-13.767 13.767zM23.201 19.43c-0.385-0.193-2.279-1.124-2.632-1.252-0.353-0.128-0.609-0.193-0.865 0.193s-0.993 1.252-1.218 1.508c-0.225 0.257-0.449 0.289-0.834 0.096-0.385-0.193-1.626-0.599-3.096-1.911-1.144-1.021-1.916-2.281-2.141-2.666s-0.024-0.593 0.169-0.785c0.173-0.171 0.385-0.449 0.577-0.673 0.193-0.225 0.257-0.385 0.385-0.641s0.064-0.481-0.032-0.673c-0.096-0.193-0.865-2.085-1.186-2.854-0.313-0.749-0.631-0.647-0.865-0.659-0.225-0.011-0.481-0.013-0.737-0.013s-0.673 0.096-1.026 0.481c-0.353 0.385-1.348 1.317-1.348 3.209s1.38 3.722 1.572 3.978c0.193 0.257 2.72 4.15 6.588 5.819 0.92 0.396 1.638 0.633 2.197 0.81 0.924 0.293 1.765 0.252 2.43 0.153 0.741-0.111 2.279-0.932 2.601-1.833s0.321-1.673 0.225-1.833c-0.096-0.161-0.353-0.257-0.737-0.449z"/>
      </svg>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        Chat with us
      </span>
    </button>
  )
}
