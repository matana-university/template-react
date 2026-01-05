# DAY 1 - Session 2: React Components & Props
## FE React Fundamental

**Durasi: 50 menit**

---

## 🎯 Learning Objectives

Di sesi ini, peserta akan:
1. ✅ Memahami apa itu components
2. ✅ Membuat functional components
3. ✅ Menggunakan props untuk pass data
4. ✅ Memahami component lifecycle
5. ✅ Menggunakan TypeScript untuk type safety
6. ✅ Membuat barrel exports untuk clean imports

---

## 📋 Agenda

| Waktu | Aktivitas | Durasi |
|-------|-----------|--------|
| 00:00 - 05:00 | React Components Concept | 5 menit |
| 05:00 - 15:00 | Creating Components | 10 menit |
| 15:00 - 25:00 | Props & Type Safety | 10 menit |
| 25:00 - 35:00 | Component Composition | 10 menit |
| 35:00 - 45:00 | Live Coding Demo | 10 menit |
| 45:00 - 50:00 | Q&A & Practice | 5 menit |

---

## 1️⃣ React Components Concept

### Apa itu Component?

Component adalah **reusable piece of UI** yang return JSX.

```
Component = Function yang return JSX Element

Visual:
┌─────────────────────────┐
│   COMPONENT             │
│  ┌─────────────────┐    │
│  │  JSX (UI Code)  │    │
│  ├─────────────────┤    │
│  │  Logic (JS)     │    │
│  ├─────────────────┤    │
│  │  State (Data)   │    │
│  └─────────────────┘    │
└─────────────────────────┘
```

### Analogi Dunia Nyata

Bayangkan Anda sedang membuat **LEGO building**:

```
Entire Building = Application
    ↓
Different Sections = Pages
    ↓
LEGO Blocks = Components
    ↓
Each block can be:
├── Reused multiple times
├── Modified dengan props
└── Contain inner logic
```

### Component Types (We Use Functional)

```typescript
// ❌ OLD: Class Component (tidak akan kita gunakan)
class Greeting extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>
  }
}

// ✅ NEW: Functional Component (yang kita pakai)
function Greeting(props: { name: string }) {
  return <h1>Hello {props.name}</h1>
}

// ✅ MODERN: Arrow Function + Destructuring (best practice)
const Greeting = ({ name }: { name: string }) => {
  return <h1>Hello {name}</h1>
}
```

**Mengapa functional components lebih baik?**
- Lebih simple dan readable
- Hooks tersedia (useState, useEffect, dll)
- Lebih mudah untuk testing
- Modern approach yang direkomendasikan

---

## 2️⃣ Creating Components (Live Demo)

Mari membuat beberapa components dari nol.

### Component 1: Simple Button Component

**File: `src/components/simple-button.tsx`**

```typescript
// Step 1: Define props type
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' // optional prop
}

// Step 2: Create component function
export default function SimpleButton({ label, onClick, variant = 'primary' }: ButtonProps) {
  // Style based on variant
  const baseStyle = 'px-4 py-2 rounded font-semibold transition-colors'
  const variantStyle = variant === 'primary' 
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'

  // Render
  return (
    <button 
      className={`${baseStyle} ${variantStyle}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
```

**Breakdown:**
```typescript
1. interface ButtonProps {
     // Define tipe-tipe yang button terima
   }
   
2. export default function SimpleButton({ ... }: ButtonProps)
   // Declare component
   // Destructure props langsung di parameter
   
3. const variantStyle = ...
   // Conditional styling logic
   
4. return <button>...</button>
   // JSX return statement
```

**Usage:**
```typescript
// Import component
import SimpleButton from '@/components/simple-button'

// Use dalam component lain
export default function App() {
  return (
    <div>
      <SimpleButton 
        label="Click Me" 
        onClick={() => alert('Clicked!')}
        variant="primary"
      />
    </div>
  )
}
```

### Component 2: Card Component

**File: `src/components/card.tsx`**

```typescript
interface CardProps {
  title: string
  description?: string
  children?: React.ReactNode // Content inside component
  className?: string
}

export default function Card({ 
  title, 
  description, 
  children,
  className = ''
}: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 mb-4">
          {description}
        </p>
      )}
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  )
}
```

**Key Points:**
- `children?: React.ReactNode` = Accept content passed inside component
- `{description && ...}` = Conditional rendering (only render if description exists)
- `className?` = Optional prop untuk custom styling

**Usage:**
```typescript
<Card 
  title="Welcome" 
  description="This is a card component"
>
  <p>Content inside card</p>
</Card>
```

### Component 3: Input Field Component

**File: `src/components/input-field.tsx`**

```typescript
interface InputFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'number'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
}

export default function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error
}: InputFieldProps) {
  return (
    <div className="mb-4">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-blue-500'
        }`}
      />

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
```

**Breakdown:**
```
┌─────────────────────────────┐
│ Label (dengan required icon) │
├─────────────────────────────┤
│ Input Field (conditional     │
│ styling based on error)      │
├─────────────────────────────┤
│ Error Message (if any)       │
└─────────────────────────────┘
```

---

## 3️⃣ Props & Type Safety

### Apa itu Props?

Props adalah cara untuk **pass data dari parent component ke child component**.

```
Parent Component
    ↓
    {Pass data sebagai props}
    ↓
Child Component
    ↓
    {Menerima via function parameter}
```

**Analogi:**
```
Function parameters dalam JavaScript:
function greet(name) {
  console.log(`Hello ${name}`)
}
greet('John') // Pass value

React Props:
function Greeting(props: { name: string }) {
  return <h1>Hello {props.name}</h1>
}
<Greeting name="John" /> {/* Pass value */}
```

### Props are Read-Only

**PENTING:** Props tidak bisa diubah dari child component!

```typescript
// ❌ WRONG: Trying to modify props
function MyComponent(props: { count: number }) {
  props.count = 5 // ERROR! Props is read-only
  return <p>{props.count}</p>
}

// ✅ RIGHT: Use state if you want to modify data
function MyComponent({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </>
  )
}
```

### Type Safety dengan TypeScript

TypeScript memastikan props yang benar di-pass:

```typescript
interface PersonProps {
  name: string        // Required string
  age: number         // Required number
  email?: string      // Optional string
  callback?: () => void // Optional function
}

function PersonCard(props: PersonProps) {
  return <div>{props.name}, {props.age}</div>
}

// ✅ CORRECT
<PersonCard name="John" age={30} />
<PersonCard name="John" age={30} email="john@example.com" />

// ❌ WRONG (TypeScript akan error)
<PersonCard name="John" />                 // Missing age
<PersonCard name="John" age="thirty" />   // age should be number, not string
```

### Common Props Patterns

```typescript
// 1. React.ReactNode for children
interface BoxProps {
  children: React.ReactNode
}

// 2. Event handlers
interface ButtonProps {
  onClick: (e: React.MouseEvent) => void
}

// 3. Conditional props
interface StatusProps {
  status: 'success' | 'error' | 'loading'
}

// 4. Extending native props
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

// 5. Utility types
type Optional<T> = Partial<T> // Make all props optional
type Required<T> = Required<T> // Make all props required
```

---

## 4️⃣ Component Composition

### Composing Components Together

Satu component besar dibuat dari banyak component kecil.

```
┌─────────────────────────────────────────┐
│ App Component                           │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Navbar Component                    │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ MainContent                         │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ Card 1 (reusable component)   │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ Card 2 (reusable component)   │ │ │
│ │ └─────────────────────────────────┘ │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Footer Component                    │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Real Example: User Profile Page

```typescript
// Page Component (composition of smaller components)
function UserProfilePage({ userId }: { userId: string }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto p-6">
        {/* Compose multiple components */}
        <Card title="User Information">
          <UserHeader userId={userId} />
        </Card>
        
        <Card title="Statistics">
          <UserStats userId={userId} />
        </Card>
        
        <Card title="Recent Activity">
          <UserActivityList userId={userId} />
        </Card>
      </main>
      
      <Footer />
    </div>
  )
}
```

### Benefits of Composition

✅ **Reusability** - Use component multiple times
✅ **Maintainability** - Easy to update logic
✅ **Testability** - Easy to test small components
✅ **Scalability** - Build complex UIs from simple blocks
✅ **Readability** - Code is self-documenting

---

## 5️⃣ Barrel Exports (Clean Imports)

### Problem: Long Import Paths

```typescript
// ❌ Long and ugly
import Navbar from '../../../components/navbar'
import Button from '../../../components/button'
import Card from '../../../components/card'
```

### Solution: Barrel Export (`index.ts`)

**File: `src/components/index.ts`**
```typescript
// Export semua components dari satu file
export { default as Navbar } from './navbar'
export { default as Button } from './button'
export { default as Card } from './card'
export { default as Footer } from './footer'
export { ThemeProvider } from './theme-provider'
```

### Usage: Clean Imports

```typescript
// ✅ Clean and organized
import { Navbar, Button, Card, Footer } from '@/components'

// Atau import spesifik
import { Button } from '@/components'
```

### Same for Pages

**File: `src/pages/index.ts`**
```typescript
export { default as ProgramStudi } from './program-studi'
```

**Usage:**
```typescript
import { ProgramStudi } from '@/pages'
```

---

## 6️⃣ Live Coding Demo (10 menit)

Mari membuat component bersama secara real-time!

### Demo: Create a "Program Card" Component

**Step 1: Buat file `src/components/program-card.tsx`**

```typescript
interface ProgramCardProps {
  title: string
  description: string
  duration: string
  icon: React.ReactNode
}

export default function ProgramCard({ 
  title, 
  description, 
  duration, 
  icon 
}: ProgramCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{duration}</p>
        </div>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
```

**Step 2: Export from index.ts**

```typescript
export { default as ProgramCard } from './program-card'
```

**Step 3: Use dalam App atau component lain**

```typescript
import { ProgramCard } from '@/components'

export default function App() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <ProgramCard 
        title="Teknik Informatika"
        description="Program unggulan dengan fokus software development"
        duration="4 tahun"
        icon="💻"
      />
      <ProgramCard 
        title="Bisnis Manajemen"
        description="Mempersiapkan pemimpin bisnis era digital"
        duration="4 tahun"
        icon="📊"
      />
      <ProgramCard 
        title="Magister Manajemen"
        description="Program untuk professionals yang ingin naik level"
        duration="2 tahun"
        icon="🎓"
      />
    </div>
  )
}
```

**Output:**
```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ 💻 Teknik Info   │  │ 📊 Bisnis Mgmt   │  │ 🎓 Magister      │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ Program unggulan │  │ Mempersiapkan    │  │ Program untuk    │
│ dengan fokus     │  │ pemimpin bisnis  │  │ professionals    │
│ software dev...  │  │ era digital      │  │ yang ingin naik  │
│                  │  │                  │  │ level            │
│ 4 tahun          │  │ 4 tahun          │  │ 2 tahun          │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## 7️⃣ Looking at Existing Components

Mari lihat components yang sudah ada di project:

### Component 1: Navbar (`src/components/navbar.tsx`)

```typescript
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Component returns JSX
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Navbar content */}
    </nav>
  )
}
```

**Key Concepts:**
- Menggunakan `useState` untuk state management (akan dipelajari di session 3)
- Menggunakan `useLocation` dari React Router
- Return JSX untuk render UI

### Component 2: Hero Section (`src/components/hero-section.tsx`)

```typescript
export default function HeroSection() {
  // Form handling logic
  const [formData, setFormData] = useState({...})
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {...}
  
  return (
    <section className="min-h-screen">
      {/* Hero content dengan form */}
    </section>
  )
}
```

**Key Concepts:**
- Managing form state
- Form validation logic
- Async operations (akan details di DAY 2)

---

## ✅ Checklist: Session 2 Complete

- [ ] Understand what components are
- [ ] Know how to create functional components
- [ ] Understand props dan how to use them
- [ ] Can create TypeScript interfaces for props
- [ ] Know component composition
- [ ] Understand barrel exports
- [ ] Can look at existing code dan understand it
- [ ] Have created at least 1 simple component

---

## 🤔 Common Questions

**Q: Kapan harus split component vs inline?**
A: Split jika component akan di-reuse 2+ kali atau terlalu kompleks. Untuk simple UI bisa inline.

**Q: Apakah props bisa object yang complex?**
A: Ya! Asal define dengan interface/type untuk type safety.

**Q: Bagaimana cara pass function sebagai props?**
A: 
```typescript
interface MyProps {
  onButtonClick: (id: string) => void
}
<MyComponent onButtonClick={(id) => console.log(id)} />
```

**Q: Apa bedanya `useState` dengan props?**
A: Props untuk data dari parent (read-only). State untuk data yang bisa berubah di component. Akan detail di session berikutnya!

---

## 🎬 Next Session

Session 3 akan bahas **React Hooks** (useState, useEffect) dan **Routing dengan React Router**.

---

## 📚 Resources Sesi Ini

- [React Components & Props](https://react.dev/learn/your-first-component)
- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [Component Composition](https://react.dev/learn/passing-props-to-a-component)
- [React Best Practices](https://react.dev/learn/thinking-in-react)

---

*Session 2 Complete! ✅*
