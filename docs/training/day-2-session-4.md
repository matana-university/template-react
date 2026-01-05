# DAY 2 - Session 4: Deployment & Best Practice
## FE React Form & Data Integration

**Durasi: 40 menit**

---

## 🎯 Learning Objectives

Di sesi ini, peserta akan:
1. ✅ Memahami production build
2. ✅ Memilih deployment option
3. ✅ Deploy ke production
4. ✅ Optimize performance
5. ✅ Best practice development

---

## 📋 Agenda

| Waktu | Aktivitas | Durasi |
|-------|-----------|--------|
| 00:00 - 05:00 | Build untuk Production | 5 menit |
| 05:00 - 15:00 | Deployment Options | 10 menit |
| 15:00 - 25:00 | Step-by-Step Deployment | 10 menit |
| 25:00 - 35:00 | Performance & Best Practice | 10 menit |
| 35:00 - 40:00 | Q&A | 5 menit |

---

## 1️⃣ Production Build

### Development vs Production

```
Development Build:
  - Source maps untuk debugging
  - No optimization
  - Large file size
  - Fast to build
  - Hanya untuk local development

Production Build:
  - No source maps
  - Minified & optimized
  - Small file size
  - Slower to build (one time)
  - Ready untuk deployed
```

### Create Production Build

```bash
# Build untuk production
pnpm build

# Output:
# vite v7.3.0 building client environment for production...
# ✓ 2149 modules transformed.
# dist/index.html                   0.78 kB │ gzip:   0.42 kB
# dist/assets/index-BXFj2EOy.css   31.28 kB │ gzip:   6.24 kB
# dist/assets/index-DMR0TTjO.js   385.14 kB │ gzip: 124.83 kB
# ✓ built in 3.66s
```

### What Happens During Build

```
1. TypeScript Compilation
   TS → JavaScript
   
2. JSX Transform
   JSX → React.createElement()
   
3. Module Bundling
   Split into chunks untuk code splitting
   
4. Tree Shaking
   Remove unused code
   
5. Minification
   Reduce file size
   
6. CSS Optimization
   Remove unused Tailwind classes
   
7. Asset Optimization
   Compress images, fonts
   
Result:
dist/
├── index.html (small HTML entry point)
├── assets/
│   ├── index-xxx.js (minified & chunked)
│   └── index-xxx.css (minified, only used classes)
```

### Preview Build Locally

```bash
# Build
pnpm build

# Preview di local
pnpm preview

# Output:
# ➜  Local:   http://localhost:4173/
```

---

## 2️⃣ Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**
✅ Easiest setup
✅ Free tier generous
✅ Auto deployments dari git
✅ Built-in CI/CD
✅ Serverless functions
✅ Global CDN

**Cons:**
❌ Limited free tier
❌ Serverless can be slower cold start

**Cost:** Free tier available, then $ per usage

**Steps:**
```
1. Push code ke GitHub/GitLab
2. Go to vercel.com
3. Import project
4. Auto builds & deploys
5. Every push to main = auto deploy
```

### Option 2: Netlify

**Pros:**
✅ Easy setup
✅ Good free tier
✅ Form submissions
✅ Edge functions
✅ Great for static sites

**Cons:**
❌ Limited advanced features
❌ Form submissions not free

**Cost:** Free tier available

**Steps:**
```
1. Push ke Git
2. Go to netlify.com
3. Connect repo
4. Deploy!
```

### Option 3: Firebase Hosting

**Pros:**
✅ Google backed
✅ Good performance
✅ Integrated dengan Firebase services
✅ Good free tier

**Cons:**
❌ Learning curve
❌ Firebase costs can add up

**Cost:** Free tier, then $ for usage

### Option 4: GitHub Pages

**Pros:**
✅ Completely free
✅ Easy for static sites
✅ Built-in Git integration

**Cons:**
❌ No server-side logic
❌ Static sites only
❌ Limited features

**Cost:** Free

### Option 5: Self-Hosted (VPS)

**Pros:**
✅ Full control
✅ No vendor lock-in
✅ Good for learning

**Cons:**
❌ Need server knowledge
❌ Ongoing maintenance
❌ Cost untuk server

**Cost:** $5-50/month untuk server

**Providers:** DigitalOcean, AWS, Linode, Heroku

### Option 6: Traditional Web Host (cPanel)

**Pros:**
✅ Familiar if background web hosting
✅ Support available
✅ WordPress compatible

**Cons:**
❌ Less optimized untuk React
❌ Need build process
❌ Traditional setup

**Cost:** $5-20/month

---

## 3️⃣ Step-by-Step Deployment: Vercel

### Step 1: Prepare Repository

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create GitHub account & repository
# https://github.com/new
```

### Step 2: Setup Environment Variables

Create `.env.production`:
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/{ID}/userwithscripturi
```

### Step 3: Connect to Vercel

```
1. Go to vercel.com
2. Sign up dengan GitHub account
3. Click "Import Project"
4. Select repository
5. Configure:
   - Framework: Vite (auto-detected)
   - Root Directory: ./ (default)
   - Environment Variables: Add VITE_GOOGLE_SCRIPT_URL
6. Deploy!
```

### Step 4: Custom Domain (Optional)

```
1. Vercel Dashboard
2. Project Settings
3. Domains
4. Add custom domain
5. Update DNS records (dari domain provider)
6. DNS propagation (15-48 jam)
```

### Step 5: Auto Deployments

```
Every push to main branch:
1. GitHub trigger Vercel webhook
2. Vercel runs build
3. If success → auto deploy
4. Get live URL immediately
```

---

## 4️⃣ Performance & Best Practice

### Performance Optimization

#### 1. Code Splitting

Vite sudah auto code splitting. Monitor size:

```bash
# Check bundle size
pnpm build

# Use tools untuk analyze
npm install --save-dev @vitejs/plugin-visualize
```

#### 2. Lazy Loading

```typescript
import { lazy, Suspense } from 'react'

const ProgramStudi = lazy(() => import('./pages/program-studi'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProgramStudi />
    </Suspense>
  )
}
```

#### 3. Image Optimization

```html
<!-- ❌ Bad -->
<img src="/large-image.jpg" />

<!-- ✅ Good -->
<img 
  src="/image.jpg" 
  alt="Description"
  width="400"
  height="300"
  loading="lazy"
/>
```

#### 4. Remove Unused Dependencies

```bash
# Check unused packages
npm install --save-dev depcheck
npx depcheck
```

#### 5. TypeScript Strict Mode

Keep `"strict": true` di tsconfig.json untuk catch errors early.

### Security Best Practice

#### 1. Environment Variables

```bash
# ❌ BAD - Never commit secrets
VITE_GOOGLE_SCRIPT_URL=https://...

# ✅ GOOD - Use .env.local (gitignored)
# Add to .gitignore
*.env.local
```

#### 2. Server-Side Validation

```typescript
// ❌ Only client-side validation
if (validateForm()) {
  submit()
}

// ✅ Client + Server validation
if (validateForm()) {
  const response = await fetch('/api/submit', {
    method: 'POST',
    body: formData
  })
  // Server validates again!
}
```

#### 3. Sanitize User Input

```typescript
// ❌ Vulnerable
<div>{userInput}</div>

// ✅ Safe (React auto escapes)
<div>{userInput}</div>

// Only use dangerouslySetInnerHTML if you trust source
<div dangerouslySetInnerHTML={{ __html: trusted }} />
```

#### 4. HTTPS Only

All modern browsers require HTTPS for production. Vercel/Netlify provide free SSL.

### Code Quality

#### 1. ESLint

Project ini sudah setup. Run:

```bash
npm run lint
```

Fix automatically:

```bash
npm run lint -- --fix
```

#### 2. TypeScript Strict Checking

Pastikan no `any` types:

```typescript
// ❌ Bad
const [state, setState] = useState<any>({})

// ✅ Good
interface State {
  name: string
  age: number
}
const [state, setState] = useState<State>({
  name: '',
  age: 0
})
```

#### 3. Testing (Optional but Important)

Setup Jest & React Testing Library:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Write tests:

```typescript
// src/components/__tests__/button.test.tsx
import { render, screen } from '@testing-library/react'
import Button from '../button'

describe('Button', () => {
  it('should render', () => {
    render(<Button label="Click" onClick={() => {}} />)
    expect(screen.getByText('Click')).toBeInTheDocument()
  })
})
```

### Monitoring & Analytics

#### 1. Error Tracking

Consider Sentry atau Rollbar untuk track frontend errors.

#### 2. Analytics

Add Google Analytics:

```bash
npm install @react-ga/compat
```

```typescript
import ReactGA from '@react-ga/compat'

ReactGA.initialize('GA_MEASUREMENT_ID')

ReactGA.pageview(window.location.pathname)
```

#### 3. Performance Monitoring

Use Web Vitals:

```bash
npm install web-vitals
```

---

## 5️⃣ Maintenance & Updates

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update all
npm update

# Update specific
npm update react@latest
```

### Regular Maintenance

```
Monthly:
- Review dependencies untuk security updates
- Update outdated packages
- Check error logs

Quarterly:
- Performance review
- Security audit
- User feedback

Yearly:
- Major version upgrades
- Refactoring
- Architecture review
```

---

## 6️⃣ Checklist: Before Going Live

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] TypeScript strict mode enabled
- [ ] Environment variables configured
- [ ] Build completes successfully
- [ ] Production build tested locally
- [ ] HTTPS enabled
- [ ] Custom domain configured (if applicable)
- [ ] Form submission tested end-to-end
- [ ] Mobile responsive tested
- [ ] Performance metrics checked
- [ ] Analytics setup
- [ ] Error tracking setup
- [ ] Backup strategy planned
- [ ] Documentation updated

---

## 7️⃣ Project Structure for Scaling

Jika project grow besar:

```
src/
├── features/              # Feature folders
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   │
│   ├── admission/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   └── dashboard/
│       ├── components/
│       ├── pages/
│       └── services/
│
├── shared/                # Shared across features
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── services/
│
├── core/                  # Core app setup
│   ├── context/
│   ├── guards/
│   └── interceptors/
```

---

## ✅ Checklist: Session 4 Complete

- [ ] Understand production build process
- [ ] Know different deployment options
- [ ] Can deploy ke Vercel/Netlify
- [ ] Understand performance optimization
- [ ] Know security best practice
- [ ] Can setup error tracking
- [ ] Can monitor application
- [ ] Have deployment strategy planned

---

## 🤔 Common Questions

**Q: Mana deployment terbaik?**
A: Vercel atau Netlify untuk ease of use. Self-hosted jika need control.

**Q: Bagaimana kalau environment variable leak?**
A: Rotate immediately, regenerate secrets, monitor unauthorized access.

**Q: Berapa sering update dependencies?**
A: Monthly untuk security patches. Quarterly untuk feature updates.

**Q: Bagaimana testing di production?**
A: A/B testing, canary deployment, monitor errors real-time.

---

## 🎉 TRAINING COMPLETE!

Selamat! Anda sudah belajar:
- ✅ React fundamentals
- ✅ Component architecture
- ✅ Routing & navigation
- ✅ Styling & animations
- ✅ Form handling
- ✅ Data integration
- ✅ Deployment & best practice

Selanjutnya:
1. Build project sendiri dengan yang sudah dipelajari
2. Deep dive ke topic specific (TypeScript, Testing, etc)
3. Explore advanced React patterns
4. Learn backend untuk full-stack development

---

## 📚 Resources for Continued Learning

### React
- [React Official Docs](https://react.dev)
- [React Patterns](https://patterns.dev/posts/react-patterns/)

### Advanced Topics
- [React Query untuk data fetching](https://tanstack.com/query)
- [Zustand untuk state management](https://github.com/pmndrs/zustand)
- [Next.js untuk full-stack](https://nextjs.org)

### Testing
- [Testing Library Documentation](https://testing-library.com)
- [Vitest](https://vitest.dev)

### Performance
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Community
- [React Twitter](https://twitter.com/reactjs)
- [Dev.to React Tag](https://dev.to/t/react)
- [Stack Overflow React Tag](https://stackoverflow.com/questions/tagged/reactjs)

---

## 📝 Final Notes

**Keep Learning:**
- Follow React updates
- Read other people's code
- Contribute to open source
- Build more projects
- Join communities

**Network:**
- Attend meetups
- Join Discord communities
- Follow developers on Twitter
- Collaborate dengan others

**Stay Updated:**
- Follow React changelog
- Subscribe to newsletters
- Watch YT tutorials
- Read blogs

---

*Training Complete! 🎉*

**Great job finishing the entire training! Now go build amazing things with React!** 🚀

---

*Last Updated: January 2026*
*Version: 2.2.0*
