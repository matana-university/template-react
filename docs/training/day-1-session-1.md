# DAY 1 - Session 1: Project Setup & Environment
## FE React Fundamental

**Durasi: 30 menit**

---

## 🎯 Learning Objectives

Di sesi ini, peserta akan:
1. ✅ Memahami struktur project React modern
2. ✅ Setup environment untuk development
3. ✅ Menjalankan development server
4. ✅ Memahami project configuration files
5. ✅ Siap untuk mulai coding

---

## 📋 Agenda

| Waktu | Aktivitas | Durasi |
|-------|-----------|--------|
| 00:00 - 05:00 | Overview & Architecture | 5 menit |
| 05:00 - 15:00 | Project Setup | 10 menit |
| 15:00 - 25:00 | Run Dev Server & Explore | 10 menit |
| 25:00 - 30:00 | Q&A | 5 menit |

---

## 1️⃣ Overview: Apa itu Vite & React?

### React adalah...
React adalah **JavaScript library** untuk membuat UI dengan component-based architecture.

**Key Concepts:**
```
Component = Function yang return JSX
JSX = JavaScript + HTML syntax
Props = Input ke component (seperti function arguments)
State = Data yang bisa berubah dalam component
```

### Vite adalah...
Vite adalah **modern build tool** yang super cepat untuk development React apps.

**Vite vs Create React App:**
| Aspek | Vite | CRA |
|-------|------|-----|
| Dev Server Speed | ⚡ Lightning (< 500ms) | 🐢 Slower (beberapa detik) |
| Build Time | ✅ Fast | ❌ Slow |
| Dependency Size | 📦 Smaller | 📦📦 Larger |
| Configuration | 🎯 Simple | 🔧 Complex |
| Modern Tooling | ✅ ESM-native | ❌ Legacy approach |

### Project Tech Stack

```
┌─────────────────────────────────────┐
│   React 19 + TypeScript 5          │ ← UI Library & Type Safety
├─────────────────────────────────────┤
│   Vite 7 (Build Tool)              │ ← Fast bundling & dev server
├─────────────────────────────────────┤
│   Tailwind CSS 4 (Styling)         │ ← Utility-first CSS
├─────────────────────────────────────┤
│   Framer Motion (Animation)        │ ← Smooth animations
├─────────────────────────────────────┤
│   React Router 6 (Routing)         │ ← Multi-page navigation
├─────────────────────────────────────┤
│   Headless UI (Components)         │ ← Unstyled, accessible UI
└─────────────────────────────────────┘
```

---

## 2️⃣ Project Setup (10 menit)

### Step 1: Clone/Download Project

```bash
# Option 1: Jika punya git repository
git clone <repository-url>
cd template-react

# Option 2: Jika sudah ada folder
cd c:\project\template-react
```

### Step 2: Install Dependencies

Kami menggunakan **pnpm** (lebih cepat dari npm):

```bash
# Install pnpm globally (jika belum punya)
npm install -g pnpm

# Install project dependencies
pnpm install

# Atau jika prefer npm/yarn
npm install
# atau
yarn install
```

**Apa yang di-install?**
```json
{
  "dependencies": {
    "react": "19.2.0",                    // Core React
    "react-dom": "19.2.0",                // React DOM rendering
    "react-router-dom": "6.30.2",         // Routing
    "framer-motion": "11",                // Animations
    "@headlessui/react": "2.2.9",         // UI Components
    "next-themes": "latest",              // Theme management
    "lucide-react": "latest"              // Icons
  },
  "devDependencies": {
    "typescript": "5.9.3",                // Type safety
    "tailwindcss": "4.1.9",               // CSS framework
    "vite": "7.3.0"                       // Build tool
  }
}
```

### Step 3: Verify Installation

```bash
# Check if pnpm is installed
pnpm --version
# Expected output: 9.x.x (or higher)

# Check Node.js version
node --version
# Expected output: v18.x.x (or higher)

# List installed packages
pnpm list
```

---

## 3️⃣ Run Development Server (10 menit)

### Start Dev Server

```bash
# Development server dengan hot reload
pnpm dev

# Output akan terlihat seperti ini:
# ✔ Console Ninja extension is connected to Vite
# VITE v7.3.0 ready in 476 ms
# ➜ Local:   http://localhost:5173/
# ➜ Network: use --host to expose
# ➜ press h + enter to show help
```

### Open di Browser

```
http://localhost:5173
```

### Apa yang Anda lihat?
- ✅ Matana University logo di navbar
- ✅ Landing page dengan form pendaftaran
- ✅ Beautiful hero section dengan animations
- ✅ Link ke "Penerimaan Mahasiswa" page

### Hot Module Replacement (HMR)

Salah satu keunggulan Vite adalah **HMR** - ketika Anda edit file dan save, browser akan auto-refresh tanpa reload penuh!

**Coba:**
1. Open `src/components/navbar.tsx`
2. Change text "Matana University" menjadi "Test University"
3. Save file (Ctrl+S)
4. Lihat browser auto-update tanpa page reload ✨

---

## 4️⃣ Explore Project Structure

### File & Folder Penting

```
src/
├── components/
│   ├── navbar.tsx        ← Navigation bar component
│   ├── hero-section.tsx  ← Landing page dengan form
│   ├── footer.tsx        ← Footer component
│   └── index.ts          ← Barrel export (untuk clean imports)
│
├── pages/
│   ├── program-studi.tsx ← Admission info page
│   └── index.ts          ← Barrel export
│
├── lib/
│   ├── constants.ts      ← App constants & config
│   └── types.ts          ← TypeScript types definitions
│
├── styles/
│   └── globals.css       ← Global styles
│
├── App.tsx               ← Root component dengan routing
└── main.tsx              ← Entry point

public/
└── matana-logo-removebg-preview.png ← Static assets
```

### Configuration Files

#### `vite.config.ts` - Vite Configuration
```typescript
import react from '@vitejs/plugin-react'
import path from 'path'

export default {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}
```

**Penjelasan:**
- `plugins: [react()]` - Enable React support
- `alias: { '@': './src' }` - Allows import dari `@/components` instead of `../../../components`

#### `tsconfig.json` - TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "module": "ESNext",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Penjelasan:**
- `strict: true` - Enable strict type checking (recommended!)
- `paths` - Configure module aliases
- `jsx: "react-jsx"` - Use new JSX transform

#### `tailwind.config.ts` - Tailwind Configuration
```typescript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom theme overrides
    },
  },
  plugins: [],
}
```

#### `tsconfig.node.json` - Build Tools TypeScript Config
Digunakan untuk type-checking build tools (vite.config.ts, dll)

#### `package.json` - Project Metadata
```json
{
  "name": "s2-mm-microsite",
  "version": "0.1.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

---

## 5️⃣ NPM Scripts Explanation

Anda akan menggunakan command-line ini setiap hari:

### Development
```bash
# Start development server dengan hot reload
pnpm dev
# Server akan berjalan di http://localhost:5173
# Auto-refresh ketika Anda edit file
```

### Production Build
```bash
# Create optimized production build
pnpm build
# Output akan di folder `dist/`
# File sudah minified dan optimized
```

### Preview Build
```bash
# Preview production build locally
pnpm preview
# Lihat bagaimana aplikasi terlihat di production
```

### Linting
```bash
# Check code quality
pnpm lint
# Find code style issues
```

---

## 6️⃣ Understanding Entry Point

### `src/main.tsx` - Where Everything Starts

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Step by step:**
1. Import React dan ReactDOM
2. Import App component (root component)
3. Import global styles
4. Find HTML element dengan id `root` (dari `index.html`)
5. Render `<App />` ke dalam element tersebut

### `index.html` - HTML Entry Point

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Matana University PMB</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Key Point:**
- `<div id="root">` ← React akan render di sini
- `<script src="/src/main.tsx">` ← Load React app

---

## 7️⃣ Build Process Overview

```
┌──────────────────────────────────────────────────┐
│ Source Code (src/*.tsx, src/**/*.css)           │
├──────────────────────────────────────────────────┤
│ ↓ Vite Build Process                            │
├──────────────────────────────────────────────────┤
│ 1. TypeScript → JavaScript                     │
│ 2. JSX → React.createElement()                 │
│ 3. CSS Bundling (Tailwind processing)          │
│ 4. Asset optimization (images, fonts)          │
│ 5. Code splitting & minification               │
├──────────────────────────────────────────────────┤
│ ↓ Output                                        │
├──────────────────────────────────────────────────┤
│ dist/
│ ├── index.html (0.78 KB gzip)                  │
│ ├── assets/index-xxx.js (125 KB gzip)          │
│ └── assets/index-xxx.css (6.24 KB gzip)        │
└──────────────────────────────────────────────────┘
```

---

## 🧠 Key Concepts Recap

### 1. Component-Based Architecture
React adalah tentang membuat **reusable components**:
```
App (Root Component)
├── Navbar (Component)
├── HeroSection (Component)
│   └── Form (Sub-component)
├── Footer (Component)
└── Router
    ├── Home Page
    └── Admission Info Page
```

### 2. Props = Function Parameters
```typescript
// Component menerima props seperti function arguments
function Button(props: { label: string; onClick: () => void }) {
  return <button onClick={props.onClick}>{props.label}</button>
}

// Usage
<Button label="Click me" onClick={() => alert('Clicked!')} />
```

### 3. State = Dynamic Data
```typescript
// State bisa berubah dan trigger re-render
const [count, setCount] = useState(0)
return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
```

### 4. JSX = HTML in JavaScript
```typescript
// JSX is syntactic sugar for React.createElement()
const element = <h1 className="title">Hello World</h1>

// Compiled to:
const element = React.createElement('h1', { className: 'title' }, 'Hello World')
```

---

## ✅ Checklist: Session 1 Complete

- [ ] Node.js 18+ installed
- [ ] pnpm installed globally
- [ ] Project dependencies installed (`pnpm install`)
- [ ] Development server running (`pnpm dev`)
- [ ] Can see website di http://localhost:5173
- [ ] Understand project structure
- [ ] Understand configuration files
- [ ] Can identify main components
- [ ] Know npm scripts (dev, build, preview)

---

## 🤔 Common Questions

**Q: Apakah saya harus paham TypeScript sebelumnya?**
A: Tidak! Kita akan mulai basic dan naik level perlahan. TypeScript akan membantu catch errors lebih awal.

**Q: Kenapa Vite lebih cepat dari Create React App?**
A: Vite use ES modules native (modern JavaScript) untuk dev, sementara CRA bundle everything. Untuk production build, Vite juga lebih optimal.

**Q: Apakah saya bisa pakai npm di tempat pnpm?**
A: Ya! Tapi pnpm lebih cepat. Syntax-nya sama: `npm install` = `pnpm install`, `npm dev` = `pnpm dev`

**Q: Apa itu "Hot Module Replacement"?**
A: Ketika Anda edit code dan save, hanya file yang berubah yang di-reload ke browser (bukan full page reload). Ini bikin development super cepat!

---

## 🎬 Next Session

Sekarang environment sudah siap! Lanjut ke **Session 2: React Components & Props** untuk mulai membuat/memahami components.

---

## 📚 Resources Sesi Ini

- [Vite Official Guide](https://vitejs.dev/guide/)
- [Create React App vs Vite](https://www.builder.io/blog/vite-vs-cra)
- [React Main Concepts](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*Session 1 Complete! ✅*
