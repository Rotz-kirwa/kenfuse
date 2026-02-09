import React, { useState } from 'react'
import { ShoppingBag, Search, Filter, Star, Heart, ShoppingCart, Plus, Image as ImageIcon, X } from 'lucide-react'
import { toast } from 'react-toastify'

interface Product {
  id: number
  name: string
  price: number
  type: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  image?: string
}

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState<number[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    type: '',
    category: 'flowers',
    description: '',
    image: null as File | null,
    imagePreview: null as string | null
  })

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'flowers', name: 'Flowers', count: products.filter(p => p.category === 'flowers').length },
    { id: 'coffins', name: 'Coffins', count: products.filter(p => p.category === 'coffins').length },
    { id: 'urns', name: 'Urns', count: products.filter(p => p.category === 'urns').length },
    { id: 'stationery', name: 'Stationery', count: products.filter(p => p.category === 'stationery').length },
    { id: 'services', name: 'Funeral Services', count: products.filter(p => p.category === 'services').length },
    { id: 'gifts', name: 'Gifts', count: products.filter(p => p.category === 'gifts').length },
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProduct({...newProduct, image: file, imagePreview: reader.result as string})
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      type: newProduct.type,
      category: newProduct.category,
      rating: 0,
      reviews: 0,
      inStock: true,
      image: newProduct.imagePreview || undefined
    }
    setProducts([...products, product])
    setNewProduct({ name: '', price: '', type: '', category: 'flowers', description: '', image: null, imagePreview: null })
    setShowCreateForm(false)
    toast.success('Product added successfully!')
  }

  const toggleCart = (productId: number) => {
    setCart(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-display font-bold text-gray-900">Marketplace</h1>
              <p className="text-sm sm:text-base text-gray-600">Browse memorial products from trusted vendors</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {/* Create Product Form */}
      {showCreateForm && (
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add New Product</h2>
            <button onClick={() => setShowCreateForm(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleCreateProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., White Rose Bouquet"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (KES) *</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="5000"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Bouquet, Urn, Card"
                  value={newProduct.type}
                  onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  className="input-field"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  required
                >
                  <option value="flowers">Flowers</option>
                  <option value="coffins">Coffins</option>
                  <option value="urns">Urns</option>
                  <option value="stationery">Stationery</option>
                  <option value="services">Funeral Services</option>
                  <option value="gifts">Gifts</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="input-field min-h-[100px]"
                  placeholder="Product description..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                <input
                  type="file"
                  id="product-image"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="product-image"
                  className="border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 transition-colors cursor-pointer block"
                >
                  {newProduct.imagePreview ? (
                    <div className="space-y-3 p-4">
                      <div className="border-4 border-blue-400 rounded-xl overflow-hidden">
                        <img src={newProduct.imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                      </div>
                      <p className="text-green-600 font-medium">{newProduct.image?.name}</p>
                      <p className="text-sm text-gray-500">Click to change image</p>
                    </div>
                  ) : (
                    <div className="p-8">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">Click to upload product image</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary flex-1">Add Product</button>
              <button type="button" onClick={() => setShowCreateForm(false)} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-outline flex items-center justify-center gap-2">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6 sm:mb-8 flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-200 text-sm sm:text-base ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-300'
            }`}
          >
            {category.name}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === category.id
                ? 'bg-white/20'
                : 'bg-gray-100'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card hover:shadow-xl transition-all duration-300 group">
            {/* Product Image */}
            <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-lg font-medium">{product.type}</span>
              )}
              
              {/* Wishlist Button */}
              <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                <Heart size={18} className="text-gray-400 hover:text-red-500" />
              </button>
              
              {/* Stock Badge */}
              {!product.inStock && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Category Badge */}
              <span className="badge-primary text-xs">
                {product.type}
              </span>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-xl font-bold text-primary-600">
                  KES {product.price.toLocaleString()}
                </p>
              </div>
              
              <button
                onClick={() => toggleCart(product.id)}
                disabled={!product.inStock}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  cart.includes(product.id)
                    ? 'bg-accent-600 text-white'
                    : product.inStock
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Vendor CTA */}
      <div className="card-gradient">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Become a Vendor
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              List your memorial products and services. Reach thousands of families in need.
            </p>
          </div>
          <button 
            onClick={() => {
              const isAuthenticated = !!localStorage.getItem('kenfuse_token')
              window.location.href = isAuthenticated ? '/dashboard/marketplace' : '/create-account'
            }}
            className="btn-secondary whitespace-nowrap w-full sm:w-auto"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border-2 border-primary-200 animate-slide-up">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="text-white" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">{cart.length} items in cart</p>
              <p className="text-xs sm:text-sm text-gray-600">Ready to checkout</p>
            </div>
            <button className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-2 whitespace-nowrap">
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace