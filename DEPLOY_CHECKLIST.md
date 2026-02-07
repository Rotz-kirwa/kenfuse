# 🚀 Quick Deployment Checklist

## ✅ Completed
- [x] Git repository initialized
- [x] Code pushed to GitHub: `git@github.com:Rotz-kirwa/kenfuse.git`
- [x] Vercel configuration created (`frontend/vercel.json`)
- [x] Render build script created (`backend/render-build.sh`)
- [x] CORS updated for production
- [x] Environment examples created
- [x] Mobile-responsive design implemented

## 📋 Next Steps

### 1. Deploy Backend to Render (Do This First!)

1. Go to https://render.com
2. Create PostgreSQL Database:
   - Click "New +" → "PostgreSQL"
   - Name: `kenfuse-db`
   - Copy "Internal Database URL"

3. Deploy Web Service:
   - Click "New +" → "Web Service"
   - Connect GitHub: `Rotz-kirwa/kenfuse`
   - Settings:
     - Name: `kenfuse-backend`
     - Root Directory: `backend`
     - Build Command: `./render-build.sh`
     - Start Command: `npm start`
   - Environment Variables:
     ```
     DATABASE_URL=<paste-internal-database-url>
     JWT_SECRET=<generate-random-string>
     NODE_ENV=production
     PORT=5000
     FRONTEND_URL=https://kenfuse.vercel.app
     ```
   - Deploy!

4. Copy your backend URL (e.g., `https://kenfuse-backend.onrender.com`)

### 2. Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Import Project:
   - Click "New Project"
   - Import `Rotz-kirwa/kenfuse`
   - Settings:
     - Framework: Vite
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Environment Variable:
     ```
     VITE_API_URL=https://kenfuse-backend.onrender.com/api/v1
     ```
   - Deploy!

### 3. Test Production

- [ ] Visit your Vercel URL
- [ ] Create account
- [ ] Login with 4-digit PIN
- [ ] Create will
- [ ] Create memorial
- [ ] Create fundraiser
- [ ] Test M-Pesa donation
- [ ] Test mobile responsiveness

## 🔧 Generate JWT Secret

Run this command to generate a secure JWT secret:
```bash
openssl rand -base64 32
```

## 📱 Features Deployed

✅ Authentication (Email + 4-digit PIN)
✅ Will Creation with PDF generation
✅ Memorial Management with PDF
✅ Fundraiser with M-Pesa donations
✅ Marketplace
✅ Mobile-responsive design (all screen sizes)
✅ Dashboard with real-time stats
✅ Profile management

## 🌐 URLs

- **GitHub**: https://github.com/Rotz-kirwa/kenfuse
- **Frontend**: Will be at `https://kenfuse.vercel.app` (or your custom domain)
- **Backend**: Will be at `https://kenfuse-backend.onrender.com`

## 📚 Documentation

- Full deployment guide: `DEPLOYMENT.md`
- Backend setup: `BACKEND_SETUP.md`
- Quick start: `QUICKSTART.md`

## 🆘 Need Help?

Check `DEPLOYMENT.md` for detailed troubleshooting steps.
