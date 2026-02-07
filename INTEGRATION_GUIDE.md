# Backend Integration Guide

## Changes Made

### 1. Frontend API Configuration
- Updated API base URL to `http://localhost:5000/api/v1`
- Fixed `.env` file to use correct API endpoint

### 2. Authentication Pages
- **CreateAccount.tsx**: Now connects to `/api/v1/auth/register`
- **Login.tsx**: Changed from PIN-based to password-based login, connects to `/api/v1/auth/login`

### 3. Dashboard
- Displays logged-in user's name from localStorage

### 4. Memorials Page
- Fetches memorials from backend API
- Downloads PDF from backend
- Deletes memorials via API

## Testing the Integration

### Step 1: Start Backend Server

```bash
cd backend

# Make sure database is running
# If not created yet:
createdb kenfuse_db

# Run migrations
npm run migrate

# Start server
npm run dev
```

Backend should be running on `http://localhost:5000`

### Step 2: Start Frontend

```bash
cd frontend

# Start development server
npm run dev
```

Frontend should be running on `http://localhost:5173`

### Step 3: Test Registration

1. Go to `http://localhost:5173/register`
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: 0712345678
   - Password: password123
   - Confirm Password: password123
   - Agree to terms
3. Click "Create Account"
4. Should redirect to dashboard with success message

### Step 4: Test Login

1. Go to `http://localhost:5173/login`
2. Enter credentials:
   - Email: john@example.com
   - Password: password123
3. Click "Sign In"
4. Should redirect to dashboard

### Step 5: Test API Endpoints

You can test the backend directly using curl:

```bash
# Register a user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "0712345678"
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get user profile (replace TOKEN with actual token from login)
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## Common Issues

### Issue 1: CORS Error
**Solution**: Make sure backend `.env` has:
```
CORS_ORIGIN=http://localhost:5173
```

### Issue 2: Database Connection Error
**Solution**: Check `DATABASE_URL` in backend `.env`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/kenfuse_db"
```

### Issue 3: JWT Secret Error
**Solution**: Make sure backend `.env` has:
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Issue 4: 404 on API Calls
**Solution**: Verify API URL in frontend `.env`:
```
VITE_API_URL=http://localhost:5000/api/v1
```

## API Endpoints Available

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (requires auth)

### Wills
- `GET /api/v1/wills` - Get all wills
- `POST /api/v1/wills` - Create will
- `GET /api/v1/wills/:id` - Get will by ID
- `PUT /api/v1/wills/:id` - Update will
- `DELETE /api/v1/wills/:id` - Delete will
- `GET /api/v1/wills/:id/pdf` - Download will PDF

### Memorials
- `GET /api/v1/memorials` - Get all memorials
- `POST /api/v1/memorials` - Create memorial
- `GET /api/v1/memorials/:id` - Get memorial by ID
- `PUT /api/v1/memorials/:id` - Update memorial
- `DELETE /api/v1/memorials/:id` - Delete memorial
- `GET /api/v1/memorials/:id/pdf` - Download memorial PDF

### Fundraisers
- `GET /api/v1/fundraisers` - Get all fundraisers
- `POST /api/v1/fundraisers` - Create fundraiser
- `GET /api/v1/fundraisers/:id` - Get fundraiser by ID
- `PUT /api/v1/fundraisers/:id` - Update fundraiser
- `DELETE /api/v1/fundraisers/:id` - Delete fundraiser
- `POST /api/v1/fundraisers/:id/donate` - Make donation

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `GET /api/v1/products/category/:category` - Get products by category

## Next Steps

1. Test all authentication flows
2. Create test data for memorials, wills, fundraisers
3. Test PDF generation endpoints
4. Implement remaining pages (Wills, Fundraisers, Marketplace)
5. Add error handling and loading states
6. Implement protected routes
7. Add form validation
