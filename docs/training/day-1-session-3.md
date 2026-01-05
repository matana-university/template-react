# DAY 1 - Session 3: Routing & Navigation
## FE React Fundamental

**Durasi: 45 menit**

---

## 🎯 Learning Objectives

Di sesi ini, peserta akan:
1. ✅ Memahami client-side routing
2. ✅ Setup React Router di project
3. ✅ Membuat routes untuk multiple pages
4. ✅ Navigasi antar pages dengan Link & useNavigate
5. ✅ Membuat nested routes dan layouts

---

## 📋 Agenda

| Waktu | Aktivitas | Durasi |
|-------|-----------|--------|
| 00:00 - 05:00 | Client vs Server-Side Routing | 5 menit |
| 05:00 - 15:00 | React Router Basics | 10 menit |
| 15:00 - 25:00 | Creating Routes & Navigation | 10 menit |
| 25:00 - 35:00 | Nested Routes & Layouts | 10 menit |
| 35:00 - 45:00 | Q&A & Practice | 5 menit |

---

## 1️⃣ Client-Side vs Server-Side Routing

### Traditional (Server-Side) Routing

```
User request: /about
    ↓
Browser send request ke server
    ↓
Server process request
    ↓
Server return HTML page
    ↓
Browser render full page (Page reload!)
```

**Cons:**
❌ Full page reload setiap kali navigasi
❌ Slower user experience
❌ More server load
❌ Loading screen terlihat

### Modern (Client-Side) Routing

```
User click link: /about
    ↓
JavaScript intercept click
    ↓
Update URL bar (tanpa reload)
    ↓
Update DOM locally
    ↓
Show new page instantly!
```

**Pros:**
✅ No page reload (super fast!)
✅ Smooth transitions
✅ Less server load
✅ Better UX (feels like desktop app)
✅ Can show loading states

### React Router Analogi

Bayangkan Anda membuat aplikasi dengan multiple pages, semua di-load sekali:

```
┌─────────────────────────────────┐
│ React Application (loaded once) │
├─────────────────────────────────┤
│                                 │
│  URL: /  → Show Home Page       │
│  URL: /about → Show About Page  │
│  URL: /contact → Show Contact   │
│                                 │
│ (Switching pages tanpa reload!) │
└─────────────────────────────────┘
```

---

## 2️⃣ React Router Basics

### Setup (sudah ada di project!)

Project ini sudah punya React Router setup:

**`src/App.tsx`**
```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import HeroSection from './components/hero-section'
import ProgramStudi from './pages/program-studi'
import Footer from './components/footer'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/program-studi" element={<ProgramStudi />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}
```

### Key Components

#### 1. `<BrowserRouter>` (Router Wrapper)

```typescript
<Router>
  {/* Wrap entire app */}
  <Navbar />
  <Routes>
    {/* Define routes here */}
  </Routes>
  <Footer />
</Router>
```

**Fungsi:**
- Provides routing context untuk whole app
- Listens to URL changes
- Triggers component re-render when URL changes

#### 2. `<Routes>` (Route Container)

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/contact" element={<ContactPage />} />
</Routes>
```

**Fungsi:**
- Container untuk define semua routes
- Match current URL dengan route path
- Render matching element

#### 3. `<Route>` (Single Route)

```typescript
<Route path="/about" element={<AboutPage />} />
     ↑              ↑
    URL path    Component to show
```

### Route Matching

```typescript
// Path definitions
<Route path="/" />              // Match: http://localhost:5173/
<Route path="/about" />         // Match: http://localhost:5173/about
<Route path="/users/:id" />     // Match: http://localhost:5173/users/123

// Dynamic segments (bisa extract di component)
<Route path="/users/:id" element={<UserDetail />} />
// Access param: const { id } = useParams()
```

---

## 3️⃣ Creating Routes & Navigation

### Current Routes di Project

```typescript
<Routes>
  <Route path="/" element={<HeroSection />} />           // Landing
  <Route path="/program-studi" element={<ProgramStudi />} /> // Admission Info
</Routes>
```

### Adding New Route

Misalnya ingin add `/contact` page:

**Step 1: Create Component**

```typescript
// src/pages/contact.tsx
export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Hubungi Kami
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Silakan hubungi kami untuk informasi lebih lanjut
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">info@matana.ac.id</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+62 21 2923 2999</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Add to Routes**

```typescript
// src/App.tsx
import { ContactPage } from '@/pages'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/program-studi" element={<ProgramStudi />} />
          <Route path="/contact" element={<ContactPage />} />  {/* NEW */}
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}
```

**Step 3: Add Navigation Link**

```typescript
// src/lib/constants.ts
export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    internal: true,
  },
  {
    label: "Penerimaan Mahasiswa",
    href: "/program-studi",
    internal: true,
  },
  {
    label: "Hubungi Kami",      // NEW
    href: "/contact",            // NEW
    internal: true,              // NEW
  },
  {
    label: "Matana University",
    href: "https://www.matanauniversity.ac.id",
    internal: false,
  },
]
```

### Navigation Methods

#### 1. Using `<Link>` Component

```typescript
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}
```

**Pros:**
- Prefetching support
- Styling support
- Best for internal navigation

#### 2. Using `useNavigate()` Hook

```typescript
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    // Validate form...
    // Submit data...
    // Then navigate
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Login</button>
    </form>
  )
}
```

**Pros:**
- Programmatic navigation
- Can navigate after action complete
- Can pass state

#### 3. Using `<a>` Tag (External Links)

```typescript
// External link (reload page)
<a href="https://google.com" target="_blank">
  Google
</a>

// Internal link dengan <a> (NOT RECOMMENDED!)
<a href="/about">About</a> {/* Full page reload! */}
```

**⚠️ WARNING:** Jangan gunakan `<a>` untuk internal links! Gunakan `<Link>`!

### Current Navbar Navigation

Lihat di `src/components/navbar.tsx`:

```typescript
export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href
            
            return link.internal ? (
              <Link
                key={link.href}
                to={link.href}
                className={isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                className="text-gray-700 hover:text-blue-600"
              >
                {link.label}
              </a>
            )
          })}
        </div>
        
      </div>
    </nav>
  )
}
```

**Highlights:**
- `useLocation()` hook untuk get current URL
- Conditional rendering untuk internal vs external links
- `isActive` highlighting untuk current page

---

## 4️⃣ Nested Routes & Layouts

### Problem: Repeating Layout

```typescript
// Pages berulang kali punya navbar, footer, layout sama
function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="pt-16">
        {/* Konten home */}
      </main>
      <Footer />
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      <Navbar />  {/* Repeating! */}
      <main className="pt-16">
        {/* Konten about */}
      </main>
      <Footer />  {/* Repeating! */}
    </div>
  )
}
```

### Solution: Layout Component

```typescript
// src/layouts/main-layout.tsx
interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}

// Sekarang di App.tsx:
<BrowserRouter>
  <MainLayout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </MainLayout>
</BrowserRouter>
```

### Advanced: Nested Routes

```typescript
<Routes>
  <Route element={<MainLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Route>
</Routes>
```

### Current App Setup (sudah optimal!)

Project ini menggunakan simple setup tanpa nested routes:

```typescript
<Router>
  <Navbar />
  <main className="pt-16">
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/program-studi" element={<ProgramStudi />} />
    </Routes>
  </main>
  <Footer />
</Router>
```

**Kenapa ini bagus?**
✅ Simple dan easy to understand
✅ Navbar dan Footer always visible
✅ No unnecessary complexity
✅ Perfect untuk project size ini

---

## 5️⃣ URL Parameters & Query Strings

### Dynamic Routes dengan Params

```typescript
// Define route dengan parameter
<Route path="/users/:userId" element={<UserDetail />} />

// Access parameter di component
import { useParams } from 'react-router-dom'

function UserDetail() {
  const { userId } = useParams<{ userId: string }>()
  return <h1>User: {userId}</h1>
}

// Usage:
// http://localhost:5173/users/123 → userId = "123"
// http://localhost:5173/users/john → userId = "john"
```

### Query Strings

```typescript
// Define normal route
<Route path="/search" element={<SearchPage />} />

// Access query string
import { useSearchParams } from 'react-router-dom'

function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  
  return <h1>Search Results for: {query}</h1>
}

// Usage:
// http://localhost:5173/search?q=react
// http://localhost:5173/search?q=javascript&sort=newest
```

---

## 🎬 Live Demo: Adding Contact Page

Mari buat Contact page bersama!

**Step 1:** Create `src/pages/contact.tsx` dengan form
**Step 2:** Add export di `src/pages/index.ts`
**Step 3:** Add route di `App.tsx`
**Step 4:** Add nav link di `constants.ts`
**Step 5:** Test di browser!

---

## ✅ Checklist: Session 3 Complete

- [ ] Understand client-side routing benefits
- [ ] Know React Router components (Router, Routes, Route)
- [ ] Can create new routes
- [ ] Understand Link vs useNavigate
- [ ] Know how to handle active links
- [ ] Understand nested routes concept
- [ ] Can access URL parameters (optional)
- [ ] Can navigate programmatically (optional)

---

## 🤔 Common Questions

**Q: Kenapa tidak pakai `<a href>` untuk internal links?**
A: Karena akan full page reload. `<Link>` lebih cepat dan smooth.

**Q: Apa bedanya Link dengan useNavigate?**
A: Link untuk user clicks links. useNavigate untuk programmatic navigation after some action.

**Q: Bagaimana cara pass data antar pages?**
A: Bisa via URL params, query strings, atau state management (akan di DAY 2).

---

## 🎬 Next Session

Session 4 akan bahas **Styling & Animations** dengan Tailwind CSS dan Framer Motion!

---

## 📚 Resources Sesi Ini

- [React Router Documentation](https://reactrouter.com)
- [Client-Side Routing](https://reactrouter.com/docs/en/v6/start/concepts)
- [useNavigate Hook](https://reactrouter.com/docs/en/v6/hooks/use-navigate)
- [useParams Hook](https://reactrouter.com/docs/en/v6/hooks/use-params)

---

*Session 3 Complete! ✅*
