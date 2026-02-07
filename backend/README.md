# KENFUSE Backend API

Production-ready Node.js/Express backend with TypeScript, PostgreSQL, and Prisma ORM.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# 3. Setup database
createdb kenfuse_db

# 4. Run migrations
npm run migrate

# 5. Generate Prisma Client
npm run prisma:generate

# 6. Start development server
npm run dev
```

## 📁 Project Structure

```
src/
├── config/          # Configuration files
│   └── database.ts  # Prisma client
├── controllers/     # Route controllers
│   ├── authController.ts
│   ├── willController.ts
│   ├── memorialController.ts
│   └── fundraiserController.ts
├── middleware/      # Express middleware
│   ├── auth.ts
│   ├── errorHandler.ts
│   ├── notFound.ts
│   └── validate.ts
├── routes/          # API routes
│   ├── index.ts
│   ├── authRoutes.ts
│   ├── willRoutes.ts
│   └── ...
├── utils/           # Utility functions
│   └── logger.ts
└── server.ts        # Entry point
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
```

### Wills
```
GET    /api/v1/wills
GET    /api/v1/wills/:id
POST   /api/v1/wills
PUT    /api/v1/wills/:id
DELETE /api/v1/wills/:id
```

### Memorials
```
GET    /api/v1/memorials
GET    /api/v1/memorials/:id
POST   /api/v1/memorials
PUT    /api/v1/memorials/:id
DELETE /api/v1/memorials/:id
```

### Fundraisers
```
GET    /api/v1/fundraisers
GET    /api/v1/fundraisers/:id
POST   /api/v1/fundraisers
POST   /api/v1/fundraisers/:id/donate
PUT    /api/v1/fundraisers/:id
DELETE /api/v1/fundraisers/:id
```

### Beneficiaries
```
GET    /api/v1/beneficiaries
POST   /api/v1/beneficiaries
PUT    /api/v1/beneficiaries/:id
DELETE /api/v1/beneficiaries/:id
```

### Products
```
GET    /api/v1/products
GET    /api/v1/products/:id
```

## 🔐 Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run migrate      # Run database migrations
npm run seed         # Seed database
npm run prisma:studio # Open Prisma Studio
```

## 🗄️ Database Schema

- **Users**: User accounts
- **Wills**: Will documents
- **Beneficiaries**: Will beneficiaries
- **Assets**: Will assets
- **Witnesses**: Will witnesses
- **Memorials**: Memorial profiles
- **Fundraisers**: Fundraising campaigns
- **Donations**: Fundraiser donations
- **Products**: Marketplace products
- **Orders**: Product orders

## 🔧 Environment Variables

See `.env.example` for all required variables.

## 📦 Deployment

### Heroku
```bash
heroku create kenfuse-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
heroku run npm run migrate:prod
```

### Railway
```bash
railway init
railway add postgresql
railway up
```

## 🧪 Testing

```bash
npm test
npm run test:watch
npm run test:coverage
```

## 📄 License

MIT

---

Built with ❤️ by KENFUSE Team
