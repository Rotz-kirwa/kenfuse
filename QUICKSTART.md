# 🚀 KENFUSE Quick Start Guide

## Start Development Servers

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
✅ Backend runs on: http://localhost:5000

### Terminal 2 - Frontend  
```bash
cd frontend
npm run dev
```
✅ Frontend runs on: http://localhost:5173

## Test the Integration

### Option 1: Automated Test
```bash
./test-backend.sh
```

### Option 2: Manual Test
1. Open http://localhost:5173
2. Click "Create Account"
3. Fill in the form and submit
4. You should be redirected to dashboard with your name displayed

## Environment Setup

### Backend `.env`
```env
DATABASE_URL="postgresql://user:password@localhost:5432/kenfuse_db"
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api/v1
```

## Database Setup (First Time Only)

```bash
cd backend

# Create database
createdb kenfuse_db

# Run migrations
npm run migrate

# Generate Prisma Client
npm run prisma:generate
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/auth/register` | POST | Create account |
| `/api/v1/auth/login` | POST | Login |
| `/api/v1/auth/me` | GET | Get current user |
| `/api/v1/memorials` | GET | List memorials |
| `/api/v1/memorials/:id` | GET | Get memorial |
| `/api/v1/memorials/:id/pdf` | GET | Download PDF |
| `/api/v1/wills` | GET | List wills |
| `/api/v1/fundraisers` | GET | List fundraisers |
| `/api/v1/products` | GET | List products |

## Common Issues

### Backend won't start
```bash
# Check PostgreSQL is running
pg_isready

# If not, start it
brew services start postgresql  # macOS
sudo service postgresql start   # Linux
```

### CORS Error
- Restart backend after changing `.env`
- Verify `CORS_ORIGIN=http://localhost:5173`

### 401 Unauthorized
- Clear localStorage and login again
- Check JWT_SECRET is set in backend `.env`

## Project Structure

```
KENFUSE/
├── backend/              # Node.js + Express + Prisma
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation
│   │   └── server.ts     # Entry point
│   └── prisma/
│       └── schema.prisma # Database schema
│
└── frontend/             # React + TypeScript + Vite
    ├── src/
    │   ├── pages/        # Page components
    │   ├── services/     # API calls
    │   └── components/   # Reusable components
    └── .env              # Frontend config
```

## Key Files Modified

✅ `frontend/src/services/api.ts` - API client
✅ `frontend/src/pages/Login.tsx` - Login page
✅ `frontend/src/pages/CreateAccount.tsx` - Registration
✅ `frontend/src/pages/Register.tsx` - Alt registration
✅ `frontend/src/pages/Dashboard.tsx` - Dashboard
✅ `frontend/src/pages/Memorials.tsx` - Memorials
✅ `frontend/.env` - API URL config

## Documentation

- 📖 [Integration Guide](./INTEGRATION_GUIDE.md) - Detailed setup
- 📝 [Changes Summary](./CHANGES_SUMMARY.md) - What was changed
- 📚 [Backend README](./backend/README.md) - Backend docs
- 📚 [Frontend README](./frontend/README.md) - Frontend docs

## Status

✅ Authentication working (register, login)
✅ Dashboard showing user data
✅ Memorials connected to backend
✅ API client configured
✅ Error handling implemented
✅ JWT token management working

⏳ TODO: Connect Wills, Fundraisers, Marketplace pages

---

**Need help?** Check the troubleshooting section in INTEGRATION_GUIDE.md
