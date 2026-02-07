# KENFUSE - Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/kenfuse-frontend.git
cd kenfuse-frontend

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Start development server
npm run dev

# 5. Open browser
# Navigate to http://localhost:5173
```

## 📦 Project Structure

```
KENFUSE-FRONTEND/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Shared components (Modal, Loading, etc.)
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── Header.tsx      # Top header
│   │
│   ├── pages/              # Route pages
│   │   ├── Dashboard.tsx
│   │   ├── Wills.tsx
│   │   ├── Memorials.tsx
│   │   ├── Beneficiaries.tsx
│   │   ├── Fundraiser.tsx
│   │   └── Marketplace.tsx
│   │
│   ├── services/           # API integration
│   │   └── api.ts         # Axios configuration & endpoints
│   │
│   ├── hooks/              # Custom React hooks
│   │   └── useApi.ts      # API data fetching hook
│   │
│   ├── types/              # TypeScript definitions
│   │   └── index.ts       # Global interfaces
│   │
│   ├── utils/              # Helper functions
│   │   └── downloadPDF.ts
│   │
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
│
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Design System

### Color Palette

**Primary (Sky Blue)** - Trust, professionalism
- `primary-500`: #0ea5e9
- `primary-600`: #0284c7

**Secondary (Purple)** - Dignity, remembrance
- `secondary-500`: #d946ef
- `secondary-600`: #c026d3

**Accent (Green)** - Growth, hope
- `accent-500`: #10b981
- `accent-600`: #059669

**Memorial (Violet)** - Spirituality, legacy
- `memorial-500`: #a855f7
- `memorial-600`: #9333ea

### Typography
- **Display**: Poppins (headings)
- **Body**: Inter (content)

### Components
- `btn-primary`: Gradient primary button
- `btn-secondary`: Gradient secondary button
- `btn-outline`: Outlined button
- `card`: White card with shadow
- `card-gradient`: Gradient card
- `input-field`: Form input
- `badge-*`: Status badges

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# M-Pesa (Production)
VITE_MPESA_CONSUMER_KEY=your_consumer_key
VITE_MPESA_CONSUMER_SECRET=your_consumer_secret
VITE_MPESA_SHORTCODE=your_shortcode
VITE_MPESA_PASSKEY=your_passkey

# AWS S3 (for file uploads)
VITE_AWS_REGION=us-east-1
VITE_AWS_BUCKET=kenfuse-uploads
VITE_AWS_ACCESS_KEY=your_access_key
VITE_AWS_SECRET_KEY=your_secret_key

# OpenAI (for AI assistant)
VITE_OPENAI_API_KEY=your_openai_key

# Analytics
VITE_GA_TRACKING_ID=your_ga_id
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 5173)
npm run dev -- --host    # Expose to network

# Building
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # TypeScript type checking

# Testing (when implemented)
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

### Manual Build

```bash
# Build for production
npm run build

# Output in dist/ folder
# Upload dist/ to your hosting provider
```

## 🔐 Security Best Practices

### Frontend Security

1. **Never expose sensitive keys**
   - Use environment variables
   - Add `.env` to `.gitignore`
   - Use different keys for dev/prod

2. **Input Validation**
   - Validate all user inputs
   - Sanitize before rendering
   - Use TypeScript for type safety

3. **Authentication**
   - Store tokens securely
   - Implement token refresh
   - Clear tokens on logout

4. **HTTPS Only**
   - Force HTTPS in production
   - Use secure cookies
   - Enable HSTS headers

### Code Example

```typescript
// ✅ Good - Secure token handling
const token = localStorage.getItem('kenfuse_token')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// ❌ Bad - Exposing sensitive data
const API_KEY = 'sk-1234567890' // Never hardcode!
```

## 🧪 Testing Strategy

### Unit Tests (Jest + React Testing Library)

```typescript
// Example test
import { render, screen } from '@testing-library/react'
import Dashboard from './Dashboard'

test('renders dashboard title', () => {
  render(<Dashboard />)
  expect(screen.getByText('Welcome back')).toBeInTheDocument()
})
```

### E2E Tests (Playwright)

```typescript
// Example E2E test
test('user can create a will', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.click('text=Create Will')
  await page.fill('input[name="title"]', 'My Will')
  await page.click('button:has-text("Next")')
  // ... more steps
})
```

## 📊 Performance Optimization

### Current Optimizations

1. **Code Splitting**
   - Route-based splitting
   - Lazy loading components
   - Dynamic imports

2. **Asset Optimization**
   - Image compression
   - WebP format
   - Lazy loading images

3. **Caching**
   - API response caching
   - Service worker (PWA)
   - Browser caching

### Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

## 🐛 Troubleshooting

### Common Issues

**Issue**: `npm install` fails
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Issue**: Port 5173 already in use
```bash
# Solution: Use different port
npm run dev -- --port 3000
```

**Issue**: TypeScript errors
```bash
# Solution: Rebuild TypeScript
npm run type-check
```

**Issue**: Tailwind classes not working
```bash
# Solution: Rebuild Tailwind
npm run build
```

## 🔄 Git Workflow

### Branch Strategy

```
main (production)
  ├── develop (staging)
  │   ├── feature/will-creation
  │   ├── feature/marketplace
  │   └── bugfix/memorial-pdf
```

### Commit Convention

```bash
feat: add new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructuring
test: add tests
chore: maintenance
```

### Example Workflow

```bash
# Create feature branch
git checkout -b feature/digital-signature

# Make changes and commit
git add .
git commit -m "feat: add digital signature to wills"

# Push and create PR
git push origin feature/digital-signature

# After review, merge to develop
# Then deploy to staging for testing
# Finally merge to main for production
```

## 📱 Progressive Web App (PWA)

### Enable PWA

1. Install Vite PWA plugin:
```bash
npm install -D vite-plugin-pwa
```

2. Update `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'KENFUSE',
        short_name: 'KENFUSE',
        description: 'Digital Legacy Management',
        theme_color: '#0ea5e9',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

## 🌍 Internationalization (i18n)

### Setup (Future Enhancement)

```bash
npm install react-i18next i18next
```

```typescript
// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('./locales/en.json') },
      sw: { translation: require('./locales/sw.json') }
    },
    lng: 'en',
    fallbackLng: 'en'
  })
```

## 📈 Analytics Integration

### Google Analytics

```typescript
// utils/analytics.ts
export const trackEvent = (
  category: string,
  action: string,
  label?: string
) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label
    })
  }
}

// Usage
trackEvent('Will', 'Create', 'Step 1 Complete')
```

## 🎯 Next Steps

### Phase 1: Core Features (Week 1-2)
- [ ] Complete backend integration
- [ ] Implement authentication
- [ ] Add form validation
- [ ] Setup error boundaries

### Phase 2: Enhanced UX (Week 3-4)
- [ ] Add loading states
- [ ] Implement optimistic updates
- [ ] Add toast notifications
- [ ] Improve mobile responsiveness

### Phase 3: Advanced Features (Week 5-6)
- [ ] PDF generation
- [ ] M-Pesa integration
- [ ] File uploads (S3)
- [ ] Email notifications

### Phase 4: Polish (Week 7-8)
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Accessibility audit
- [ ] Security hardening

## 📞 Support

- **Documentation**: [docs.kenfuse.com](https://docs.kenfuse.com)
- **Email**: support@kenfuse.com
- **Slack**: kenfuse-dev.slack.com
- **Issues**: GitHub Issues

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ by the KENFUSE Team**

Last Updated: January 2024
Version: 1.0.0
