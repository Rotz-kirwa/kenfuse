# KENFUSE Project - Comprehensive Analysis

## 📋 Executive Summary

**KENFUSE** is a comprehensive **Digital Legacy Management Platform** designed specifically for the Kenyan market. It's a full-stack web application that combines estate planning, memorial management, community fundraising, and a marketplace for memorial services into one integrated platform.

---

## 🏗️ Project Architecture Overview

KENFUSE follows a **multi-application monorepo structure** with:
- **Backend API** (Node.js + Express)
- **Frontend** (React + Vite) - Main user application
- **Admin Portal** (React + Vite) - Administrative dashboard
- **Vendor Portal** (React + Vite) - Marketplace vendor management

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18 + TypeScript | Type-safe UI components |
| **Build Tool** | Vite | Fast development & optimized builds |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Routing** | React Router v6/v7 | Client-side navigation |
| **HTTP Client** | Axios | API communication |
| **Notifications** | React Toastify | Toast notifications |
| **Backend Framework** | Express.js + TypeScript | REST API server |
| **Database** | PostgreSQL | Primary data store |
| **ORM** | Prisma | Type-safe database operations |
| **Authentication** | JWT + bcrypt | Secure auth & password hashing |
| **PDF Generation** | PDFKit | Document generation |
| **Logging** | Winston | Application logging |
| **Rate Limiting** | express-rate-limit | API protection |
| **Email** | Nodemailer | Email notifications |
| **Security** | Helmet | HTTP headers security |

---

## 📁 Directory Structure & Purpose

### 1. **Backend** (`/backend`)

The REST API server that handles all business logic, database operations, and core functionality.

**Key Files:**
- **`src/server.ts`** - Express app initialization, middleware setup, route mounting
- **`prisma/schema.prisma`** - Database schema definition (243 lines)
- **`.env`** - Database URL, JWT secret, other configuration

**Folder Structure:**
```
backend/src/
├── config/          # Database & environment configuration
├── controllers/     # Route handlers (auth, will, memorial, fundraiser, user)
├── middleware/      # Auth, error handling, validation, 404
├── models/         # Data models (if using model pattern)
├── routes/         # API endpoints organization
│   ├── authRoutes.ts          # /api/v1/auth
│   ├── userRoutes.ts          # /api/v1/users
│   ├── willRoutes.ts          # /api/v1/wills
│   ├── memorialRoutes.ts      # /api/v1/memorials
│   ├── beneficiaryRoutes.ts   # /api/v1/beneficiaries
│   ├── fundraiserRoutes.ts    # /api/v1/fundraisers
│   ├── productRoutes.ts       # /api/v1/products
│   └── index.ts               # Route aggregator
├── services/       # Business logic & external services
├── types/         # TypeScript type definitions
└── utils/         # Helpers (logger, etc.)
```

**API Endpoints:**
- `GET /` - Health check (version, status, endpoints)
- `GET /health` - Simple health status
- `/api/v1/auth` - Login, register, token refresh
- `/api/v1/users` - User profile management
- `/api/v1/wills` - Will CRUD operations
- `/api/v1/memorials` - Memorial CRUD operations
- `/api/v1/beneficiaries` - Beneficiary management
- `/api/v1/fundraisers` - Fundraiser campaigns
- `/api/v1/products` - Marketplace products

**Features:**
- JWT-based authentication
- Role-based access control (USER, VENDOR, ADMIN)
- CORS enabled for frontend apps
- Helmet for security headers
- Morgan for request logging
- Rate limiting for API protection
- Express validator for input validation

---

### 2. **Frontend** (`/frontend`)

The main user-facing React application for individuals creating wills, memorials, and fundraisers.

**Key Files:**
- **`src/main.tsx`** - React app entry point
- **`src/App.tsx`** - Route configuration, layout setup
- **`src/services/api.ts`** - Axios instance with API configuration
- **`src/config.tsx`** - Environment & configuration setup
- **`.env`** - `VITE_API_URL=http://localhost:5000/api/v1`

**Folder Structure:**
```
frontend/src/
├── pages/           # Page components (full pages)
│   ├── Home.tsx
│   ├── Landing.tsx
│   ├── Features.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── CreateAccount.tsx
│   ├── Dashboard.tsx
│   ├── Memorials.tsx
│   ├── Wills.tsx
│   ├── WillCreation.tsx
│   ├── Beneficiaries.tsx
│   ├── Fundraiser.tsx
│   ├── Marketplace.tsx
│   ├── Profile.tsx
│   └── Settings.tsx
├── components/      # Reusable UI components
│   ├── Layout.tsx           # Protected dashboard layout
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── WhatsAppFloat.tsx    # WhatsApp chat widget
├── services/        # API call functions (api.ts)
├── hooks/          # Custom React hooks
├── types/          # TypeScript interfaces
├── assets/         # Images, icons, static files
└── utils/          # Helper functions
```

**Routes:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /dashboard` - Protected dashboard (requires auth)
- `GET /dashboard/memorials` - User's memorials
- `GET /dashboard/wills` - User's wills
- `GET /dashboard/beneficiaries` - Beneficiary management
- `GET /dashboard/fundraiser` - Fundraising campaigns
- `GET /dashboard/marketplace` - Product marketplace

**Features:**
- Password-based authentication (changed from PIN)
- Protected routes with Layout wrapper
- Toast notifications for user feedback
- WhatsApp floating widget
- Mobile-first responsive design
- Local storage for token & user data

---

### 3. **Admin Portal** (`/admin`)

Centralized dashboard for KENFUSE administrators to manage users, vendors, and content.

**Key Files:**
- **`src/App.tsx`** - Route configuration with admin protection
- **`src/pages/AdminLogin.tsx`** - Admin authentication
- **`src/components/AdminLayout.tsx`** - Protected admin layout
- Uses separate `admin_token` in localStorage

**Pages:**
```
admin/src/pages/
├── AdminLogin.tsx                  # Admin login page
├── AdminDashboard.tsx              # Main admin dashboard
├── AdminUsers.tsx                  # User management
├── AdminVendorApplications.tsx     # Vendor application approvals
├── AdminCategories.tsx             # Product category management
└── AdminContributions.tsx          # Fundraiser contributions tracking
```

**Features:**
- Separate authentication from main frontend
- Protected routes with `ProtectedRoute` component
- User management interface
- Vendor application review & approval system
- Product category administration
- Fundraiser contributions tracking
- Dark theme for admin interface

---

### 4. **Vendor Portal** (`/vendor`)

Standalone application for marketplace vendors to manage their products and services.

**Key Files:**
- **`src/App.tsx`** - Vendor routing & protection
- **`src/pages/VendorLogin.tsx`** - Vendor authentication
- Uses separate `vendor_token` in localStorage

**Pages:**
```
vendor/src/pages/
├── VendorLogin.tsx              # Vendor login page
├── VendorOnboarding.tsx         # Vendor registration/setup
└── VendorDashboard.tsx          # Vendor products & orders
```

**Features:**
- Separate vendor authentication system
- Onboarding process for new vendors
- Product/service management dashboard
- Order management
- Performance analytics (implied)

---

## 🗄️ Database Schema

**Key Models:**

### User
```
- id (UUID)
- email, password, name, phone, avatar
- role (USER, VENDOR, ADMIN)
- isVerified
- Relations: wills, memorials, beneficiaries, fundraisers, donations, orders
```

### Will
```
- id, userId, title, executor
- status (DRAFT, COMPLETED, EXECUTED)
- Relations: beneficiaries[], assets[], witnesses[]
```

### Beneficiary
```
- id, willId, userId, name, email, phone
- relationship, address, percentage
- idNumber, dateOfBirth
```

### Asset
```
- id, willId, name, type (PROPERTY, VEHICLE, BANK_ACCOUNT, INVESTMENT, OTHER)
- value, location, description
```

### Witness
```
- id, willId, name, idNumber, email, phone, address
```

### Memorial
```
- id, userId, title, name
- birthDate, deathDate, biography
- photos (array), createdAt, updatedAt
```

### Fundraiser
```
- id, userId, title, description, goal, raised
- image, status (ACTIVE, COMPLETED, CANCELLED)
- endDate
- Relations: donations[]
```

### Donation
```
- id, fundraiserId, userId, donorName, amount, message
- isAnonymous, paymentMethod (MPESA), transactionId
```

### Product
```
- id, vendorId, name, description, price
- category (FLOWERS, URNS, STATIONERY, GIFTS, SERVICES)
- images[], inStock, rating, reviews
- Relations: orderItems[]
```

### Order
```
- id, userId, total
- status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- shippingAddress
- Relations: items (OrderItem[])
```

### OrderItem
```
- id, orderId, productId, quantity, price
```

---

## 🔐 Authentication & Security

### Authentication Flow
1. User registers with email & password
2. Password hashed with **bcrypt** before storage
3. Upon login, credentials verified, **JWT token** issued
4. Token stored in localStorage
5. Protected routes check token validity
6. Backend validates JWT on protected endpoints

### Security Features
- **Helmet** - HTTP security headers
- **Express Validator** - Input validation
- **Rate Limiting** - Prevent brute force attacks
- **CORS** - Cross-Origin Resource Sharing controlled
- **bcrypt** - Secure password hashing
- **JWT** - Stateless authentication tokens
- **3 separate authentication contexts** (User, Admin, Vendor)

---

## 🚀 Key Features

### 1. **Digital Will Creation**
- Multi-step wizard interface
- Asset allocation & management
- Beneficiary designation system
- Witness verification
- PDF generation for legal documentation
- Secure storage

### 2. **Memorial Management**
- Comprehensive life story documentation
- Photo galleries & achievement tracking
- Funeral service details
- Shareable memorial pages
- PDF memorial booklets

### 3. **Community Fundraising**
- M-Pesa integration for donations
- Real-time progress tracking
- Transparent fund management
- Social sharing capabilities
- Donor recognition system
- Anonymous donations supported

### 4. **Marketplace**
- Product catalog (Flowers, Urns, Stationery, Gifts, Services)
- Vendor management system
- Order tracking & fulfillment
- Vendor rating system
- Product categories & inventory

### 5. **User Management**
- Individual user accounts
- Vendor accounts for service providers
- Admin accounts for platform management
- Profile customization
- Settings management

---

## 💾 Data Flow

### Reading Data (Example: Get Memorials)
```
Frontend (Memorials.tsx)
  → API Call: GET /api/v1/memorials
    → Backend Route Handler
      → Prisma Query: memorialController
        → PostgreSQL Database
          → Return Memorial[] with JSON
    → Frontend receives data
      → Parse & display in UI
      → Toast notification on error
```

### Creating Data (Example: Create Will)
```
Frontend (WillCreation.tsx)
  → Form Input
    → Validation
      → API Call: POST /api/v1/wills
        → Backend Route Handler
          → Prisma Insert: willController
            → PostgreSQL Database
              → Return Created Will object
        → Frontend receives confirmation
          → Update UI
          → Show success toast
          → Redirect to wills list
```

---

## 📦 Dependencies & Versions

### Backend
- Express 4.18.2
- Prisma 5.7.0
- PostgreSQL driver
- JWT & bcryptjs
- Nodemailer, PDFKit
- Winston logging
- Rate limiter

### Frontend/Admin/Vendor
- React 18.2.0 (React 19 in vendor)
- Vite 5+ (latest in vendor)
- React Router 6+ (v7 in vendor)
- Tailwind CSS 3.4+
- Axios, React Toastify
- TypeScript 5.3+

---

## 🔧 Environment Setup

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 📊 Key Observations

### Strengths
✅ **Well-structured monorepo** - Organized separation of concerns
✅ **Type-safe** - Full TypeScript implementation
✅ **Scalable architecture** - Clear API separation, modular components
✅ **Modern stack** - Latest React, Vite, TypeScript versions
✅ **Security-focused** - Multiple auth contexts, Helmet, validation
✅ **Responsive design** - Mobile-first Tailwind CSS approach
✅ **Comprehensive features** - Multiple legacy management services
✅ **Payment-ready** - M-Pesa integration support
✅ **Logging** - Winston for application monitoring
✅ **Documentation** - Multiple README & guide files

### Areas for Consideration
⚠️ **Four separate apps** to maintain
⚠️ **Token management** across 3 auth systems (User, Admin, Vendor)
⚠️ **Error handling** - Ensure consistency across frontends
⚠️ **Testing** - No visible test files (jest configured but no specs)
⚠️ **API versioning** - Currently v1, ensure backward compatibility
⚠️ **Rate limiting** - Configured but thresholds should be verified
⚠️ **M-Pesa integration** - Not visible in current files (service to be implemented)

---

## 🎯 Next Steps / Implementation Priorities

1. **Backend Implementation** - Complete all controllers and services
2. **Database Migrations** - Run Prisma migrations to create tables
3. **Frontend Integration** - All API calls connected to backend
4. **Admin Features** - Complete admin dashboard features
5. **Vendor Portal** - Marketplace vendor management
6. **Testing** - Comprehensive unit & integration tests
7. **Deployment** - Configure Vercel/Render deployment
8. **M-Pesa Integration** - Implement payment processing
9. **Email Service** - Configure Nodemailer for notifications
10. **Performance Optimization** - Caching, image optimization

---

## 📋 Checklist for Development

- [ ] Backend server running on port 5000
- [ ] PostgreSQL database connected
- [ ] Prisma migrations applied
- [ ] Frontend connected to backend API
- [ ] All auth flows tested (User, Admin, Vendor)
- [ ] API rate limiting configured
- [ ] CORS properly set for all frontends
- [ ] JWT token refresh mechanism working
- [ ] Error handling consistent across apps
- [ ] Logging setup verified
- [ ] Environment variables configured
- [ ] Build scripts verified for all apps

---

## 📚 Documentation Files Available

- `README.md` - Main project overview
- `QUICKSTART.md` - Quick setup guide
- `BACKEND_SETUP.md` - Backend initialization
- `DEPLOYMENT.md` - Deployment instructions
- `INTEGRATION_GUIDE.md` - Frontend-backend integration
- `CHANGES_SUMMARY.md` - Recent modifications
- `DATABASE_FIX.md` - Database troubleshooting
- `REDESIGN_DOCUMENTATION.md` - UI/UX changes

---

**Last Updated:** February 19, 2026
**Version:** 1.0.0
**License:** MIT
