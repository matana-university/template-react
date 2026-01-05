# DAY 2 - Session 1: Form State Management
## FE React Form & Data Integration

**Durasi: 50 menit**

---

## 🎯 Learning Objectives

Di sesi ini, peserta akan:
1. ✅ Memahami React state dengan useState
2. ✅ Mengelola form data state
3. ✅ Handle input change events
4. ✅ Update form data dynamically
5. ✅ Reset form setelah submit

---

## 📋 Agenda

| Waktu | Aktivitas | Durasi |
|-------|-----------|--------|
| 00:00 - 05:00 | State Concept | 5 menit |
| 05:00 - 15:00 | useState Hook | 10 menit |
| 15:00 - 25:00 | Form State Management | 10 menit |
| 25:00 - 35:00 | Handling Input Changes | 10 menit |
| 35:00 - 50:00 | Live Coding Demo | 15 menit |

---

## 1️⃣ State Concept

### What is State?

State adalah **data yang dapat berubah** dalam component selama application running.

```
Props (dari parent)     State (dari component)
     ↓                        ↓
  Read-Only            Can berubah & cause re-render
  Cannot modify        Component bisa trigger update
  Dari parent          Internal ke component

Analogi:
Props = Function parameters (input)
State = Local variables (internal data)
```

### State Flow Diagram

```
┌─────────────────────────────────┐
│ Component Render dengan State   │
│ (state = "John")                │
└─────────────────┬───────────────┘
                  │
          User interact
          (Input change)
                  │
                  ↓
    ┌────────────────────────────┐
    │ setState("Jane")           │
    │ Trigger state update       │
    └────────────┬───────────────┘
                 │
                 ↓
    ┌────────────────────────────┐
    │ Component Re-render dengan │
    │ state baru ("Jane")        │
    └────────────────────────────┘
```

### State vs Props

| Aspect | Props | State |
|--------|-------|-------|
| Source | Parent component | Component itself |
| Mutability | Read-only | Can change |
| Purpose | Pass data down | Internal data |
| Trigger re-render | Yes | Yes |
| When to use | Share data | Track changes |

---

## 2️⃣ useState Hook

### Import & Basic Usage

```typescript
import { useState } from 'react'

function Counter() {
  // Declare state
  const [count, setCount] = useState(0)
  
  // count = current value
  // setCount = function to update state
  // 0 = initial value

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### Rules of Hooks

```
1. Only call hooks at top level of component
   ❌ WRONG: if (condition) { useState(...) }
   ✅ RIGHT: const [state] = useState(...)

2. Only call hooks from React components
   ❌ WRONG: call useState in regular JS function
   ✅ RIGHT: call useState in component function

3. Use ESLint plugin untuk enforce rules
   npm install --save-dev eslint-plugin-react-hooks
```

### Multiple State Variables

```typescript
function LoginForm() {
  // Track multiple values
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <form>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <input 
        type="checkbox" 
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />
    </form>
  )
}
```

### State with Object

```typescript
// Less flexible approach
const [name, setName] = useState('')
const [age, setAge] = useState(0)
const [email, setEmail] = useState('')

// Better approach - Object
const [user, setUser] = useState({
  name: '',
  age: 0,
  email: '',
})

// Update:
setUser({
  ...user,           // Keep existing properties
  name: 'John',      // Update only name
})
```

### State with TypeScript

```typescript
// Simple type
const [count, setCount] = useState<number>(0)

// Object type
interface User {
  name: string
  age: number
  email: string
}

const [user, setUser] = useState<User>({
  name: '',
  age: 0,
  email: '',
})

// Array type
const [items, setItems] = useState<string[]>([])
```

---

## 3️⃣ Form State Management

### Form Data Type Definition

Pertama, define TypeScript interface untuk form data:

```typescript
// src/lib/types.ts
export interface FormData {
  nama: string
  email: string
  whatsapp: string
  kota: string
  pekerjaan: string
  institusi: string
}
```

### Initialize Form State

```typescript
import { useState } from 'react'
import type { FormData } from '@/lib/types'

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    email: '',
    whatsapp: '',
    kota: '',
    pekerjaan: '',
    institusi: '',
  })

  return (
    <form>
      {/* Form fields */}
    </form>
  )
}
```

### Form State Handling Pattern

```typescript
// Pattern untuk update form state
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  
  setFormData({
    ...formData,        // Keep all existing values
    [name]: value,      // Update only changed field
  })
}

// Usage dalam input:
<input
  type="text"
  name="nama"
  value={formData.nama}
  onChange={handleChange}
/>
```

### Full Form Example

```typescript
import { useState } from 'react'
import type { FormData } from '@/lib/types'

export default function AdmissionForm() {
  // Initialize state
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    email: '',
    whatsapp: '',
    kota: '',
    pekerjaan: '',
    institusi: '',
  })

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form (will do next session)
    // Submit data (will do session 3)
    
    console.log('Form submitted:', formData)
  }

  // Handle form reset
  const handleReset = () => {
    setFormData({
      nama: '',
      email: '',
      whatsapp: '',
      kota: '',
      pekerjaan: '',
      institusi: '',
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Nama */}
      <input
        type="text"
        name="nama"
        placeholder="Nama Lengkap"
        value={formData.nama}
        onChange={handleChange}
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      {/* WhatsApp */}
      <input
        type="text"
        name="whatsapp"
        placeholder="WhatsApp"
        value={formData.whatsapp}
        onChange={handleChange}
      />

      {/* Kota */}
      <input
        type="text"
        name="kota"
        placeholder="Kota Domisili"
        value={formData.kota}
        onChange={handleChange}
      />

      {/* Pekerjaan */}
      <input
        type="text"
        name="pekerjaan"
        placeholder="Pekerjaan"
        value={formData.pekerjaan}
        onChange={handleChange}
      />

      {/* Institusi */}
      <input
        type="text"
        name="institusi"
        placeholder="Institusi/Perusahaan"
        value={formData.institusi}
        onChange={handleChange}
      />

      {/* Buttons */}
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  )
}
```

---

## 4️⃣ Handling Input Changes

### onChange Event

```typescript
// When user type di input, onChange event trigger
<input
  type="text"
  onChange={(e) => {
    console.log('New value:', e.target.value)
  }}
/>
```

### Input Event Types

```typescript
// Text input
const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value)
}

// Checkbox
const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.checked)
}

// Select/Textarea
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(e.target.value)
}
```

### Formatting Input Values

Project ini punya special formatting untuk WhatsApp number:

```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value

  // Format WhatsApp dengan separator
  if (e.target.name === 'whatsapp') {
    // Hanya terima angka
    value = value.replace(/\D/g, '')

    // Format: +62 812-3456-7890
    if (value.length > 0) {
      if (value.length <= 2) {
        value = '+62 ' + value
      } else if (value.length <= 5) {
        value = '+62 ' + value.slice(2)
      } else if (value.length <= 8) {
        value = '+62 ' + value.slice(2, 5) + '-' + value.slice(5)
      } else {
        value =
          '+62 ' +
          value.slice(2, 5) +
          '-' +
          value.slice(5, 8) +
          '-' +
          value.slice(8, 12)
      }
    }
  }

  setFormData({
    ...formData,
    [e.target.name]: value,
  })
}
```

---

## 5️⃣ Live Coding Demo (15 menit)

Mari buat simple form dari nol!

### Demo: Create Simple Newsletter Form

```typescript
// src/components/newsletter-form.tsx
import { useState } from 'react'

interface NewsletterData {
  email: string
  name: string
}

export default function NewsletterForm() {
  // Step 1: Initialize state
  const [formData, setFormData] = useState<NewsletterData>({
    email: '',
    name: '',
  })

  const [subscribed, setSubscribed] = useState(false)

  // Step 2: Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Step 3: Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In real app, send to server
    console.log('Subscribed:', formData)
    
    setSubscribed(true)
    
    // Reset after 2 seconds
    setTimeout(() => {
      setFormData({ email: '', name: '' })
      setSubscribed(false)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <button
        type="submit"
        disabled={!formData.email || !formData.name}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        Subscribe
      </button>

      {subscribed && (
        <p className="text-green-600 font-semibold">
          Thanks for subscribing!
        </p>
      )}
    </form>
  )
}
```

---

## ✅ Checklist: Session 1 Complete

- [ ] Understand what state is
- [ ] Know how useState hook works
- [ ] Can declare state variables
- [ ] Can update state with setState
- [ ] Understand form data structure
- [ ] Can handle input change events
- [ ] Can manage multiple form fields
- [ ] Can reset form

---

## 🤔 Common Questions

**Q: Mengapa harus spread operator (...) ketika update state?**
A: Karena state harus immutable. Buat object baru instead of mutating existing.

**Q: Apa bedanya `const [x, setX]` dengan `var x`?**
A: State (useState) trigger re-render. Regular variables tidak. State persists across renders.

**Q: Bisakah update multiple state sekaligus?**
A: Yes, call setters sequentially atau gunakan useReducer hook (advanced).

---

## 🎬 Next Session

Session 2 akan bahas **Form Validation** untuk memastikan data valid sebelum submit.

---

## 📚 Resources Sesi Ini

- [useState Hook](https://react.dev/reference/react/useState)
- [Managing State](https://react.dev/learn/state-a-components-memory)
- [React Event Handling](https://react.dev/learn/responding-to-events)
- [Form Handling in React](https://react.dev/learn/adding-interactivity)

---

*Session 1 Complete! ✅*
