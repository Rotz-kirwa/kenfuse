# KENFUSE Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository

### Steps

1. **Push code to GitHub** (see instructions below)

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add Environment Variable:
     - `VITE_API_URL`: Your Render backend URL (e.g., `https://kenfuse-backend.onrender.com/api/v1`)
   - Click "Deploy"

3. **Update API URL**
   - After backend is deployed, update `VITE_API_URL` in Vercel dashboard
   - Redeploy if needed

---

## Backend Deployment (Render)

### Prerequisites
- Render account
- PostgreSQL database (Render provides free tier)

### Steps

1. **Create PostgreSQL Database**
   - Go to [render.com](https://render.com)
   - Click "New +" → "PostgreSQL"
   - Name: `kenfuse-db`
   - Plan: Free
   - Create Database
   - Copy the "Internal Database URL"

2. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `kenfuse-backend`
     - Root Directory: `backend`
     - Environment: Node
     - Build Command: `./render-build.sh`
     - Start Command: `npm start`
   - Add Environment Variables:
     - `DATABASE_URL`: Paste the Internal Database URL from step 1
     - `JWT_SECRET`: Generate a secure random string (e.g., use `openssl rand -base64 32`)
     - `NODE_ENV`: `production`
     - `PORT`: `5000`
   - Click "Create Web Service"

3. **Copy Backend URL**
   - After deployment, copy your backend URL (e.g., `https://kenfuse-backend.onrender.com`)
   - Use this URL + `/api/v1` for frontend `VITE_API_URL`

---

## GitHub Push Instructions

```bash
cd /home/user/Public/KENFUSE

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - KENFUSE Digital Legacy Platform"

# Set main branch
git branch -M main

# Add remote
git remote add origin git@github.com:Rotz-kirwa/kenfuse.git

# Push to GitHub
git push -u origin main
```

---

## Post-Deployment Checklist

### Frontend (Vercel)
- ✅ Verify `VITE_API_URL` points to Render backend
- ✅ Test login/registration
- ✅ Check all pages load correctly
- ✅ Verify mobile responsiveness

### Backend (Render)
- ✅ Database migrations ran successfully
- ✅ API endpoints responding
- ✅ CORS configured for Vercel domain
- ✅ JWT authentication working

### Testing
- ✅ Create account
- ✅ Login with PIN
- ✅ Create will
- ✅ Create memorial
- ✅ Create fundraiser
- ✅ M-Pesa donation flow
- ✅ PDF generation

---

## Environment Variables Summary

### Frontend (.env)
```
VITE_API_URL=https://kenfuse-backend.onrender.com/api/v1
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:5432/kenfuse_db
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=production
```

---

## Troubleshooting

### Frontend Issues
- **API calls failing**: Check `VITE_API_URL` is correct
- **404 on refresh**: Ensure `vercel.json` is present
- **Build fails**: Check Node version (18+)

### Backend Issues
- **Database connection**: Verify `DATABASE_URL` is correct
- **Migrations fail**: Check database permissions
- **500 errors**: Check Render logs for details

### CORS Issues
- Add Vercel domain to backend CORS whitelist
- Update `src/index.ts` CORS configuration

---

## Monitoring

### Vercel
- Dashboard: https://vercel.com/dashboard
- View deployments, logs, and analytics

### Render
- Dashboard: https://dashboard.render.com
- View logs, metrics, and database

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/Rotz-kirwa/kenfuse/issues
- Email: support@kenfuse.com

---

**Version:** 1.0.0  
**Last Updated:** January 2026
