# Magister Manajemen Landing Page

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Headless UI](https://img.shields.io/badge/Headless%20UI-2.1-black?style=for-the-badge)](https://headlessui.com)
[![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?style=for-the-badge)](https://reactrouter.com)

## 📖 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Component Documentation](#component-documentation)
- [Routing Guide](#routing-guide)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

A modern, fully-responsive **multi-page landing page** for the Magister Manajemen program at Matana University. Built with **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Headless UI**, and **React Router**. Features smooth animations, interactive components, program information, and comprehensive curriculum details.

### What's New in v2.0

- ✨ **Multi-page routing** with React Router DOM
- ✨ **Program Studi page** with Headless UI components
- ✨ **Interactive tabs** for curriculum, requirements, and FAQ
- ✨ **Disclosure dropdowns** for expandable FAQ content
- ✨ **Active link indicators** in navigation
- ✨ **Full curriculum data** with semester breakdown
- ✨ **Professional requirements section** with learning outcomes

---

## ✨ Key Features

| Feature | Details |
|---------|---------|
| 🎨 **Modern Design** | Clean, professional UI with smooth animations and gradients |
| 📱 **Fully Responsive** | Mobile-first design; perfect adaptation across all devices |
| 🔀 **Multi-Page Routing** | React Router for seamless client-side navigation |
| ✨ **Interactive Components** | Headless UI Disclosure, custom Tabs, smooth transitions |
| 🌙 **Dark Mode Support** | Dark mode support with next-themes; can be extended with theme toggle |
| 📝 **Form Validation** | Client-side validation with detailed error messages |
| 📊 **Program Details** | Comprehensive curriculum, requirements, and FAQ sections |
| 🔗 **Google Sheets Integration** | Direct form submission to Google Apps Script |
| ♿ **Accessible** | WCAG compliant, keyboard navigable, semantic HTML |
| ⚡ **High Performance** | Optimized bundle (125.20 KB gzipped), fast builds (3.64s) |

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Modern UI library with server components
- **React DOM 19** - DOM rendering
- **React Router DOM 6** - Client-side routing (NEW)
- **TypeScript 5** - Type-safe development

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 11** - Smooth animations and transitions
- **Headless UI 2.2** - Unstyled, accessible components (NEW)
- **Lucide React** - Beautiful SVG icon library
- **next-themes** - Dark/light mode support

### Build & Development
- **Vite 7** - Lightning-fast build tool
- **PostCSS 8** - CSS processing with Tailwind
- **ESLint 9** - Code quality linting
- **TypeScript Compiler** - Type checking

### Deployment
- **Node.js 18+** - Runtime environment
- **pnpm** - Fast package manager

---

## 📁 Project Structure

### Understanding the Architecture

This project follows a **modular, scalable architecture** with clear separation of concerns:

```
src/                           # Source code directory
├── components/                # React components (UI building blocks)
│   ├── navbar.tsx             # Navigation with React Router + scroll effects
│   ├── hero-section.tsx       # Home page with registration form
│   ├── program-studi.tsx      # Program details with tabs & accordion
│   ├── footer.tsx             # Footer with contact info
│   ├── theme-provider.tsx     # Next-themes configuration for dark mode
│   └── index.ts               # Barrel exports (clean imports: import { Navbar } from '@/components')
│
├── lib/                       # Shared utilities & configuration
│   ├── constants.ts           # App constants (nav links, regex, contact info, etc.)
│   ├── types.ts               # TypeScript type definitions (FormData, etc.)
│   └── validation.ts          # Form validation utilities (validateEmail, etc.)
│
├── styles/
│   └── globals.css            # Global styles & Tailwind directives
│
├── App.tsx                    # Root component with BrowserRouter & Routes
├── main.tsx                   # Vite entry point (bootstraps React)
└── vite-env.d.ts              # Vite type definitions

Configuration Files (Root):
├── vite.config.ts             # Vite config (path alias: @/ → ./src)
├── tsconfig.json              # TypeScript options (strict mode, ES2020 target)
├── tsconfig.node.json         # TypeScript for build tools (Vite type-checking)
├── tailwind.config.js         # Tailwind CSS theme & utilities
├── postcss.config.mjs         # PostCSS plugins (autoprefixer, tailwindcss)
├── eslint.config.js           # ESLint rules (React, React Hooks, TypeScript)
├── package.json               # Dependencies & scripts
├── pnpm-lock.yaml             # Lock file (ensures consistent versions)
├── .env.example               # Environment variables template
└── GOOGLE_APPS_SCRIPT.gs      # Google Apps Script code
```

### Architecture & Design Patterns

**Separation of Concerns**:
| Layer | Location | Purpose |
|-------|----------|---------|
| **Components** | `src/components/` | Visual UI elements, page layouts |
| **Business Logic** | `src/lib/` | Validation, constants, utilities |
| **Styling** | `src/styles/` | Global CSS, Tailwind configuration |
| **Routing** | `src/App.tsx` | Navigation, page structure, routes |

**Why This Structure?**
1. **Scalability** - Easy to add features without affecting others
2. **Reusability** - Constants and validators used across components
3. **Maintainability** - Clear organization helps locate code quickly
4. **Testability** - Each concern can be tested independently
5. **Type Safety** - Centralized types prevent inconsistencies

**Component Composition Hierarchy**:
```
App.tsx (Root with BrowserRouter)
├── Navbar (fixed header, all routes)
├── <Routes>
│   ├── / → HeroSection (landing page)
│   └── /program-studi → ProgramStudi (details page)
├── Footer (all routes)
└── ThemeProvider (dark mode wrapper)
```

**Data Flow Pattern**:
```
lib/constants.ts (NAV_LINKS, CONTACT_INFO, etc.)
     ↓
components/* (use constants via import)
     ↓
lib/validation.ts (validateEmail, etc.)
     ↓
Google Apps Script (form submission)
```

### Key Concepts Explained

**Barrel Exports** (`src/components/index.ts`):
```typescript
// Instead of: import Navbar from './components/navbar'
// Use clean import: import { Navbar } from '@/components'
export { default as Navbar } from './navbar'
export { default as HeroSection } from './hero-section'
```

**Path Alias** (`@` = `./src`):
```typescript
// Instead of: import { constants } from '../../../lib/constants'
// Use: import { constants } from '@/lib/constants'
```

**TypeScript Types** (`lib/types.ts`):
```typescript
// Central location for type definitions
export type FormData = { name: string; email: string }
// Used across multiple components
```

---

## 🚀 Getting Started

### Why pnpm?

This project uses **pnpm** instead of npm or yarn for several reasons:

1. **Speed**: pnpm is significantly faster due to its intelligent caching and parallel installation
2. **Disk Space**: Uses a global content-addressable storage, saving 50-70% disk space
3. **Strict Dependencies**: Prevents phantom dependencies - only explicitly installed packages are accessible
4. **Monorepo Support**: Better handling of complex project structures
5. **Reliability**: Atomic installations prevent corrupted node_modules

You can install pnpm globally:
```bash
npm install -g pnpm
```

Or use npm/yarn if you prefer (commands remain similar).

### Prerequisites

- **Node.js** 18.0.0 or higher
- **pnpm** 8.0.0+ (recommended) or npm/yarn as alternatives

### 1. Installation

```bash
# Navigate to project directory
cd template-react

# Install all dependencies
pnpm install

# Create environment configuration
cp .env.example .env
```

### 2. Environment Setup

Edit `.env` with your configuration:

```env
# Google Apps Script ID for form submissions
VITE_GOOGLE_APPS_SCRIPT_ID=your_deployment_id_here

# Optional: API endpoints
# VITE_API_BASE_URL=https://api.example.com
```

**Getting Google Apps Script ID:**
1. Create Google Sheet for form data
2. Create Google Apps Script project
3. Deploy the script and copy deployment ID
4. Add to `.env` file

### 3. Development Server

```bash
pnpm dev
```

Server will start at **http://localhost:5173** with hot reload enabled.

**Available Routes:**
- `/` - Landing page (home) with registration form
- `/program-studi` - Program details with curriculum, requirements, FAQ

### 4. Production Build

```bash
# Build optimized version
pnpm build

# Test production build locally
pnpm preview

# Start production server (port 3000)
pnpm start
```

---

## 📋 Available Scripts

```bash
# Development
pnpm dev              # Start dev server with hot reload

# Building
pnpm build            # Create optimized production build
pnpm preview          # Preview production build locally

# Code Quality
pnpm lint             # Run ESLint checks
pnpm lint --fix       # Auto-fix ESLint issues

# Deployment
pnpm start            # Serve production build (requires build first)
```

### Build Output

When running `pnpm build`, you'll see:

```
vite v7.3.0 building client environment for production...
✓ 2149 modules transformed

dist/index.html                          0.78 kB (gzip: 0.42 kB)
dist/assets/index-BzceDlBc.css          30.68 kB (gzip: 6.14 kB)
dist/assets/index-CXpzIm3U.js          385.23 kB (gzip: 124.86 kB)

built in 2.94s ✅
```

---

## 📚 Component Documentation

### 🧭 Navbar Component

**File**: [src/components/navbar.tsx](src/components/navbar.tsx)

**Purpose**: Main navigation with multi-page routing support

**Features**:
- Clean white background (light theme only - consistent and professional)
- Subtle shadow that enhances on scroll for better depth perception
- Desktop and mobile responsive menus
- Active link indicators using `useLocation()` hook
- Internal routes via React Router `<Link>`
- External links with `target="_blank"`
- Animated hamburger menu for mobile
- Smooth transitions on mobile menu open/close

**Color Scheme**:
- Background: Pure white (#FFFFFF) - always light
- Text: Gray-700 for menu items
- Active text: Blue-600 with bottom border
- Hover state: Blue-600 text color
- Shadow: Light, increases on scroll

**Key Implementation**:
```typescript
const location = useLocation();
const isActive = location.pathname === link.href;

// Fixed light theme navbar
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
  isScrolled ? "shadow-lg" : "shadow-sm"
}`}

// Consistent gray/blue text colors for light theme
className={`transition-colors text-sm font-medium ${
  isActive
    ? "text-blue-600 border-b-2 border-blue-600"
    : "text-gray-700 hover:text-blue-600"
}`}
```

---

### 🏠 Hero Section Component

**File**: [src/components/hero-section.tsx](src/components/hero-section.tsx)

**Purpose**: Landing page with registration form

**Features**:
- Eye-catching gradient background (blue tones)
- Client-side form validation
- Toast notifications (success/error/loading states)
- Google Sheets integration via Apps Script
- Responsive grid layout (mobile optimized)
- Animated elements with Framer Motion

**Form Fields**:
| Field | Type | Validation |
|-------|------|-----------|
| Full Name | text | Required |
| Email | email | RFC 5322 format |
| WhatsApp | number | 12-13 digits (spaces/dashes/+ removed) |
| City | text | Required |
| Occupation | text | Required |
| Institution/Company | text | Required |

**Validation Rules** (from `lib/constants.ts`):
```typescript
EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
WHATSAPP_MIN = 12
WHATSAPP_MAX = 13
```

---

### 📚 Program Studi Page

**File**: [src/components/program-studi.tsx](src/components/program-studi.tsx)

**Status**: NEW in v2.0

**Purpose**: Comprehensive program information with Headless UI components

**Structure**:

#### 1. Hero Section
- Title: "Magister Manajemen"
- Gradient background (blue-600 to blue-800)
- Program overview with animations

#### 2. Three-Tab Navigation

**Tab 1: Kurikulum (Curriculum)**
- Organized by semester
- Each course includes:
  - Course code (e.g., MGT101)
  - Course name
  - Credits (SKS - Satuan Kredit Semester)
  - Description
- Visual cards with hover effects
- Responsive grid (1 column mobile, 3 columns desktop)

**Example Course Data**:
```typescript
{
  semester: 1,
  courses: [
    {
      code: "MGT101",
      name: "Strategic Management",
      credits: 3,
      description: "Fundamentals of strategic planning..."
    },
    // ...
  ]
}
```

**Tab 2: Persyaratan (Requirements)**
- Two sections in 2-column layout
- **Entry Requirements**: 6 items (e.g., Bachelor's degree, GPA, etc.)
- **Learning Outcomes**: 6 items (what students will achieve)
- Icon indicators for each item
- Animated list items with stagger effect

**Tab 3: FAQ (Frequently Asked Questions)**
- 6 Common questions
- Uses **Headless UI Disclosure** component for expandable answers
- Smooth animations
- Chevron icon rotates on open/close
- Built-in accessibility features

**Headless UI Components Used**:
```typescript
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

<Disclosure>
  <DisclosureButton>Question text</DisclosureButton>
  <DisclosurePanel>Answer text</DisclosurePanel>
</Disclosure>
```

#### 4. Call-to-Action Section
- Dual buttons: "Daftar Sekarang" (Register Now) & "Hubungi Kami" (Contact Us)
- Links to registration or contact
- Prominent placement at bottom

**Data Structure**:
```typescript
const programData = {
  overview: {
    title: "Magister Manajemen",
    description: "Program description..."
  },
  curriculum: [
    { semester: 1, courses: [...] },
    { semester: 2, courses: [...] }
  ],
  requirements: [
    { title: "Syarat Masuk", items: [...] },
    { title: "Outcome Pembelajaran", items: [...] }
  ],
  faq: [
    { question: "...", answer: "..." },
    // ... 6 total items
  ]
}
```

---

### 🔗 Footer Component

**File**: [src/components/footer.tsx](src/components/footer.tsx)

**Features**:
- Contact information display
- Social media links
- Responsive grid layout
- Dark theme optimized
- Version number from package.json

---

### 🎨 Theme Provider Component

**File**: [src/components/theme-provider.tsx](src/components/theme-provider.tsx)

**Purpose**: Dark/light mode configuration

**Features**:
- next-themes integration
- System preference detection
- Persistent storage (localStorage)
- No flash on page reload

**Usage**:
```typescript
<ThemeProvider attribute="class" defaultTheme="system">
  <YourApp />
</ThemeProvider>
```

---

## 🔀 Routing Guide

### Router Setup

**File**: [src/App.tsx](src/App.tsx)

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HeroSection, ProgramStudi } from '@/components'

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="w-full pt-16">
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

### Navigation Usage

#### Using Link Component
```typescript
import { Link } from 'react-router-dom'

<Link to="/program-studi">View Program</Link>
```

#### Using useNavigate Hook
```typescript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/program-studi')
```

#### Detecting Active Route
```typescript
import { useLocation } from 'react-router-dom'

const location = useLocation()
const isHome = location.pathname === '/'
```

### Navigation Links Configuration

**File**: [src/lib/constants.ts](src/lib/constants.ts)

```typescript
export const NAV_LINKS = [
  {
    label: 'Home',
    href: '/',
    internal: true,  // Uses React Router <Link>
  },
  {
    label: 'Program Studi',
    href: '/program-studi',
    internal: true,  // Uses React Router <Link>
  },
  {
    label: 'External Site',
    href: 'https://matanauniversity.ac.id',
    internal: false, // Uses HTML <a> tag
  },
]
```

**Navbar Implementation**:
```typescript
{link.internal ? (
  <Link to={link.href} className={isActive ? 'text-blue-600' : 'text-gray-700'}>
    {link.label}
  </Link>
) : (
  <a href={link.href} target="_blank" rel="noopener noreferrer">
    {link.label}
  </a>
)}
```

---

## ⚙️ Configuration

### Understanding Build & Development

**Development Mode** (`pnpm dev`):
- **Hot Module Replacement (HMR)** - Changes appear instantly without full reload
- Source maps available for debugging browser and IDE
- Unminified code for readability and error clarity
- First load slower, but updates are very fast
- Runs on http://localhost:5173
- Use for active development

**Production Build** (`pnpm build`):
- Code minification - removes unnecessary characters
- Tree shaking - eliminates unused code
- Code splitting - creates smaller chunks for faster loading
- Asset optimization - compresses images and CSS
- Source maps hidden for security
- Output in `dist/` folder ready for deployment
- Use for deployment to production

**Why TypeScript + Vite?**
- **TypeScript**: Catches type errors before runtime, provides autocomplete, improves code clarity
- **Vite**: 10-100x faster than webpack, extremely fast HMR, optimal build output
- **Together**: Best development experience + fast production builds

**Development Workflow**:
```
pnpm dev → Edit file → HMR updates browser → See changes instantly
↓
Ready to deploy?
↓
pnpm build → Creates optimized dist/ folder
↓
pnpm preview → Test production build locally
↓
pnpm start → Deploy to production
```

### Environment Variables

Create `.env` file (copy from `.env.example`):

```env
# Required: Google Apps Script Deployment ID
VITE_GOOGLE_APPS_SCRIPT_ID=AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: API endpoints
# VITE_API_BASE_URL=https://api.example.com
# VITE_API_TIMEOUT=5000
```

**Note**: Variables prefixed with `VITE_` are exposed to client-side code

### Vite Configuration

**File**: [vite.config.ts](vite.config.ts)

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

**Usage**: Import from `@` alias
```typescript
import { NAV_LINKS } from '@/lib/constants'
import { Navbar } from '@/components'
```

### TypeScript Configuration

**File**: [tsconfig.json](tsconfig.json)

Key settings:
- **Target**: ES2020
- **Module**: ESNext
- **Strict Mode**: Enabled
- **JSX**: react-jsx
- **Path Alias**: `@` → `./src`

### Tailwind CSS Configuration

**File**: [tailwind.config.js](tailwind.config.js)

Customize theme colors, spacing, and more:

```javascript
export default {
  theme: {
    colors: {
      blue: { /* custom blue palette */ },
      // Override default colors
    },
    extend: {
      // Add custom utilities
    },
  },
}
```

---

## 📦 Dependencies

### Production (9 Packages)

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI framework |
| react-dom | ^19.2.0 | DOM rendering |
| **react-router-dom** | **6.30.2** | **Client-side routing (NEW)** |
| framer-motion | ^11.0.0 | Animations and transitions |
| **@headlessui/react** | **2.2.9** | **Accessible UI components (NEW)** |
| lucide-react | ^0.454.0 | SVG icons |
| next-themes | ^0.4.6 | Dark/light mode provider |

### Development (17+ Packages)

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^7.3.0 | Build tool |
| @vitejs/plugin-react | ^4.2.0 | React plugin for Vite |
| typescript | ^5.9.3 | Type checking |
| @typescript-eslint/eslint-plugin | ^9.0.0 | TS linting |
| tailwindcss | ^4.1.9 | CSS framework |
| postcss | ^8.4.35 | CSS processing |
| eslint | ^9.39.2 | Code quality |
| autoprefixer | ^10.4.17 | CSS vendor prefixes |

---

## 🎓 Learning Resources

### Common Imports

```typescript
// Components
import { Navbar, HeroSection, ProgramStudi, Footer } from '@/components'

// Constants & Config
import { NAV_LINKS, CONTACT_INFO, EMAIL_REGEX, WHATSAPP_MIN } from '@/lib/constants'

// Types
import type { FormData, Notification, NavLink } from '@/lib/types'

// Utilities
import { validateEmail, validateFormData, validateWhatsApp } from '@/lib/validation'

// Routing
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'

// Headless UI Components
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

// Animations
import { motion } from 'framer-motion'

// Icons
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react'
```

### Styling Patterns

```typescript
// Responsive classes
className="w-full md:w-1/2 lg:w-1/3"

// Hover and active states
className="hover:bg-blue-100 hover:scale-105 transition-all duration-200"

// Dark mode
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"

// Conditional styling
className={selectedTab === 0 ? 'text-blue-600 border-b-2' : 'text-gray-600'}

// Tailwind gradient
className="bg-gradient-to-r from-blue-600 to-blue-800"
```

### File Organization Guide

```
Purpose → File Location
──────────────────────────────────────
Add Component → src/components/
Global Styles → src/styles/globals.css
App Constants → src/lib/constants.ts
Type Definitions → src/lib/types.ts
Form Validation → src/lib/validation.ts
Routes/Navigation → src/App.tsx
Component Exports → src/components/index.ts
Environment Config → .env (copy from .env.example)
```

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Supported |
| Firefox | Latest | ✅ Supported |
| Safari | Latest | ✅ Supported |
| Edge | Latest | ✅ Supported |
| Chrome Mobile | Latest | ✅ Supported |
| Safari iOS | 13+ | ✅ Supported |

---

## 📈 Performance

### Bundle Metrics

```
Build Artifacts:
├── dist/index.html                0.78 kB (gzip: 0.42 kB)
├── dist/assets/index-*.css       31.92 kB (gzip: 6.30 kB)
└── dist/assets/index-*.js       386.76 kB (gzip: 125.20 kB)
                                  ──────────────────────────
                                  ~131 KB gzipped total
```

### Build Performance

- **Development**: ~2 seconds hot reload
- **Production Build**: ~3.64 seconds
- **Modules Transformed**: 2149

### Optimization Techniques

1. **Code Splitting** - Automatic with Vite
2. **Tree Shaking** - Removes unused code
3. **CSS Minification** - Tailwind purges unused styles
4. **Image Optimization** - Lazy loading support
5. **Module Caching** - Efficient cache busting

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

**Easiest deployment for React apps**

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com and connect repo
# 3. Auto-deploys on every push
```

**Vercel Settings**:
```
Framework: Vite
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install
```

### Option 2: Docker

**For containerized deployment**

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
```

**Build and run**:
```bash
docker build -t mm-microsite .
docker run -p 3000:3000 mm-microsite
```

### Option 3: Traditional Server (Ubuntu/Nginx)

**Manual deployment**

```bash
# 1. Build on local machine
pnpm build

# 2. Upload dist/ folder to server via SCP/FTP
scp -r dist/ user@server.com:/var/www/mm-microsite

# 3. Configure Nginx reverse proxy
# 4. Setup PM2 for process management
pm2 start "pnpm start" --name "mm-microsite"
```

**Nginx config example**:
```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### Option 4: Netlify

**Via CLI or Git**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## 🔧 Customization

### Adding New Pages

1. **Create component** in `src/components/`:
```typescript
// src/components/about.tsx
export default function About() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold">About Us</h1>
      {/* Page content */}
    </div>
  )
}
```

2. **Add route** in [src/App.tsx](src/App.tsx):
```typescript
<Route path="/about" element={<About />} />
```

3. **Update exports** in [src/components/index.ts](src/components/index.ts):
```typescript
export { default as About } from './about'
```

4. **Add navigation link** in [src/lib/constants.ts](src/lib/constants.ts):
```typescript
NAV_LINKS.push({
  label: 'About',
  href: '/about',
  internal: true,
})
```

### Customizing Program Info

Edit [src/components/program-studi.tsx](src/components/program-studi.tsx):

```typescript
const programData = {
  overview: {
    title: "Your Program Name",
    description: "Your program description...",
  },
  curriculum: [
    {
      semester: 1,
      courses: [
        {
          code: "CODE101",
          name: "Course Name",
          credits: 3,
          description: "Course description..."
        },
        // Add more courses
      ]
    },
    // Add semester 2, 3, etc.
  ],
  requirements: [
    {
      title: "Syarat Masuk",
      items: ["Requirement 1", "Requirement 2", ...]
    },
    {
      title: "Outcome Pembelajaran",
      items: ["Outcome 1", "Outcome 2", ...]
    }
  ],
  faq: [
    {
      question: "Your question?",
      answer: "Your answer..."
    },
    // Add more FAQs
  ]
}
```

### Changing Color Scheme

Edit [tailwind.config.js](tailwind.config.js):

```javascript
export default {
  theme: {
    colors: {
      primary: '#007BFF',    // Blue
      secondary: '#6C757D',  // Gray
      success: '#28A745',    // Green
      // Custom palette
    },
  },
}
```

Then use in components:
```typescript
className="bg-primary-600 hover:bg-primary-700"
```

---

## 🐛 Troubleshooting

### Issue: Dev Server Won't Start

```bash
# Clear dependencies and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Restart dev server
pnpm dev
```

### Issue: Build Errors with TypeScript

```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix issues and rebuild
pnpm build
```

### Issue: Routes Not Working

**Checklist**:
- ✅ Routes wrapped in `<BrowserRouter>` in App.tsx
- ✅ Component imports are correct
- ✅ Route paths match nav link hrefs (case-sensitive)
- ✅ Components exported from `src/components/index.ts`

### Issue: Styles Not Applying

```bash
# Restart dev server
pnpm dev

# Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

# Check Tailwind class names are spelled correctly
# Tailwind requires exact class names (no interpolation)
```

### Issue: Google Sheets Form Not Working

**Checklist**:
1. ✅ Google Apps Script deployed and working
2. ✅ `VITE_GOOGLE_APPS_SCRIPT_ID` set in `.env`
3. ✅ Google Sheet is accessible
4. ✅ Apps Script returns proper response
5. ✅ Check browser console for errors

**Test endpoint**:
```bash
curl -X POST https://script.google.com/macros/d/{ID}/usercallback \
  -d "data=test"
```

---

## 📞 Support & Contact

### University Contact

- **Email**: info@matanauniversity.ac.id
- **WhatsApp**: +62 812-8777-5999
- **Phone**: (021) 2923-2999
- **Website**: [matanauniversity.ac.id](https://matanauniversity.ac.id)

### Documentation & Resources

- [React Documentation](https://react.dev) - Official React docs
- [Vite Documentation](https://vitejs.dev) - Build tool docs
- [React Router](https://reactrouter.com) - Routing library
- [Tailwind CSS](https://tailwindcss.com) - CSS utility framework
- [Headless UI](https://headlessui.com) - Accessible component library
- [Framer Motion](https://www.framer.com/motion) - Animation library

---

## 📄 License

Private project for Matana University.

---

## 📝 Version History

### v2.2.0 (January 5, 2026)
- 🔄 Removed theme toggle button feature
- ✨ Simplified navbar with light theme only
- 🎨 Clean white navbar with minimal shadow
- 📱 Mobile responsive hamburger menu

### v2.1.0 (January 5, 2026)
- ✨ Fixed navbar background: now light/white always (never transparent)
- ✨ Added theme toggle button with Moon/Sun icons (lucide-react)
- ✨ Integrated next-themes for persistent dark mode storage
- 🎨 Enhanced navbar with smooth shadow on scroll
- 📱 Theme toggle available on both desktop and mobile
- 🔧 Proper hydration-safe theme switching

### v2.0.0 (January 5, 2026)
- ✨ Added multi-page routing with React Router DOM
- ✨ Created Program Studi page with comprehensive curriculum data
- ✨ Integrated Headless UI Disclosure component for FAQ section
- ✨ Implemented custom tab system for curriculum/requirements/FAQ
- ✨ Added active link indicators in navigation
- ✨ Enhanced navbar with useLocation hook for route detection
- ✨ Updated navigation structure with internal/external link support
- ✨ Comprehensive README with detailed documentation
- 📦 Added react-router-dom v6.30.2
- 📦 Added @headlessui/react v2.2.9

### v1.0.0 (December 2025)
- Initial release
- Landing page with registration form
- Dark/light mode support
- Responsive design for all devices
- Google Sheets integration
- Form validation with error messages
- Footer with contact information

---

## 🎉 Quick Start

```bash
# 1. Setup
cd template-react
pnpm install

# 2. Configure (optional but recommended)
cp .env.example .env
# Edit .env with your Google Apps Script ID

# 3. Develop
pnpm dev
# Visit http://localhost:5173

# 4. Test navigation
# Click "Home" → "/" landing page
# Click "Program Studi" → "/program-studi" details page

# 5. Build for production
pnpm build
pnpm preview

# 6. Deploy
pnpm start
# Server runs at http://localhost:3000
```

---

**Happy Coding! 🚀**

*Last Updated: January 5, 2026*  
*Built for Magister Manajemen Program*  
*Matana University - Jakarta, Indonesia*

---

## Key Improvements Over v1.0

| Feature | v1.0 | v2.0 | v2.1 | v2.2 |
|---------|------|------|------|------|
| Pages | 1 (landing) | 2 (home + program) | 2 | 2 |
| Routing | None | React Router | React Router | React Router |
| UI Components | Basic | Headless UI | Headless UI | Headless UI |
| Navigation | Static links | Dynamic with active state | Dynamic | Dynamic |
| Program Info | Minimal | Comprehensive | Comprehensive | Comprehensive |
| Expandable Content | None | Disclosure accordion | Disclosure | Disclosure |
| Tab System | None | Custom tabs | Custom tabs | Custom tabs |
| Navbar Style | - | - | Light/white | ✨ **Light/white (clean)** |
| Theme Toggle | None | None | ✨ Icon button | ❌ Removed |
| Bundle Size | ~120 KB | ~131 KB | ~131 KB | ~131 KB |
| Development Speed | Good | Excellent (vite + HMR) | Excellent | Excellent |

