# DAY 2 - Session 2: Form Validation
## FE React Form & Data Integration

**Durasi: 45 menit**

---

## 🎯 Learning Objectives

Di sesi ini, peserta akan:
1. ✅ Membuat validation logic
2. ✅ Validate email format
3. ✅ Validate required fields
4. ✅ Validate field length
5. ✅ Show validation errors
6. ✅ Prevent submission dengan errors

---

## 📋 Agenda

| Waktu | Aktivitas | Durasi |
|-------|-----------|--------|
| 00:00 - 05:00 | Validation Concept | 5 menit |
| 05:00 - 15:00 | Common Validation Patterns | 10 menit |
| 15:00 - 25:00 | Regex for Email | 10 menit |
| 25:00 - 35:00 | Building Validator | 10 menit |
| 35:00 - 45:00 | Live Demo & Q&A | 10 menit |

---

## 1️⃣ Validation Concept

### Why Validate?

```
User Input Form
    ↓
Validate (Client-side)
    ↓
Valid?
├─ Yes → Send to server
└─ No  → Show error message

Server (Backend)
    ↓
Validate again (Server-side)
    ↓
Valid?
├─ Yes → Process & save
└─ No  → Return error
```

### Client-Side vs Server-Side

| Aspect | Client-Side | Server-Side |
|--------|------------|------------|
| When | Before submit | After receive |
| UX | Fast feedback | Slower |
| Security | Can be bypassed | Always safe |
| Use | Always | Always |

**IMPORTANT:** Always validate di server juga! Client-side hanya untuk UX.

### Common Validations

```
1. Required field: tidak kosong
2. Email format: matches email pattern
3. Length: minimum/maximum characters
4. Pattern: matches specific format (phone, ZIP code)
5. Numeric: hanya angka
6. Unique: tidak duplicate (server-side)
7. Date: valid date format
8. Custom: business logic validation
```

---

## 2️⃣ Common Validation Patterns

### Project Constants

File `src/lib/constants.ts` sudah define regex patterns:

```typescript
// Form validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const WHATSAPP_MIN_DIGITS = 12
export const WHATSAPP_MAX_DIGITS = 13
```

### Pattern 1: Required Field

```typescript
function validateRequired(value: string): boolean {
  return value.trim().length > 0
}

// Usage
if (!validateRequired(formData.nama)) {
  errors.push('Nama lengkap harus diisi')
}
```

### Pattern 2: Email Format

```typescript
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

// Usage
if (!validateEmail(formData.email)) {
  errors.push('Format email tidak valid')
}
```

### Pattern 3: Length Validation

```typescript
function validateMinLength(value: string, min: number): boolean {
  return value.length >= min
}

function validateMaxLength(value: string, max: number): boolean {
  return value.length <= max
}

// Usage
if (!validateMinLength(password, 8)) {
  errors.push('Password minimal 8 karakter')
}
```

### Pattern 4: Numeric Only

```typescript
function validateNumeric(value: string): boolean {
  return /^\d+$/.test(value)
}

// Usage
if (!validateNumeric(cleanedWhatsapp)) {
  errors.push('WhatsApp hanya boleh angka')
}
```

### Pattern 5: Phone Number (WhatsApp)

```typescript
const WHATSAPP_MIN_DIGITS = 12
const WHATSAPP_MAX_DIGITS = 13

function validateWhatsApp(value: string): boolean {
  const cleaned = value.replace(/[\s\-+]/g, '')
  return cleaned.length >= WHATSAPP_MIN_DIGITS && 
         cleaned.length <= WHATSAPP_MAX_DIGITS
}

// Usage
if (!validateWhatsApp(formData.whatsapp)) {
  errors.push(`Format nomor WhatsApp tidak valid (harus ${WHATSAPP_MIN_DIGITS}-${WHATSAPP_MAX_DIGITS} digit)`)
}
```

---

## 3️⃣ Regex Explanation (Email Example)

### Email Regex Pattern

```
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

**Breakdown:**

```
^              = Start of string
[^\s@]+        = One or more characters that are NOT whitespace or @
@              = Literal @ symbol
[^\s@]+        = One or more characters that are NOT whitespace or @
\.             = Literal dot (.) character
[^\s@]+        = One or more characters that are NOT whitespace or @
$              = End of string
```

**Examples:**
```
✅ Valid:
john@example.com
user.name@domain.co.uk
test+tag@test.com

❌ Invalid:
john@        (missing domain)
@example.com (missing user)
john example.com (missing @)
john@@example.com (double @)
```

### Better Email Regex (Optional)

HTML5 punya built-in email validation:

```html
<input type="email" />
<!-- Browser will validate automatically -->
```

Atau gunakan library untuk robust validation:

```bash
npm install email-validator
```

```typescript
import { validate as validateEmail } from 'email-validator'

const isValid = validateEmail('test@example.com')
```

---

## 4️⃣ Building Validator Function

### Project's Validation Logic

Look at `src/components/hero-section.tsx`:

```typescript
const validateForm = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Validate nama
  if (!formData.nama.trim()) {
    errors.push('Nama lengkap harus diisi')
  }

  // Validate email
  if (!formData.email.trim()) {
    errors.push('Email harus diisi')
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.push('Format email tidak valid')
  }

  // Validate whatsapp
  if (!formData.whatsapp.trim()) {
    errors.push('Nomor WhatsApp harus diisi')
  } else {
    const cleaned = formData.whatsapp.replace(/[\s\-+]/g, '')
    if (cleaned.length < WHATSAPP_MIN_DIGITS || cleaned.length > WHATSAPP_MAX_DIGITS) {
      errors.push(
        `Format nomor WhatsApp tidak valid (harus ${WHATSAPP_MIN_DIGITS}-${WHATSAPP_MAX_DIGITS} digit)`
      )
    }
  }

  // Validate kota
  if (!formData.kota.trim()) {
    errors.push('Kota domisili harus diisi')
  }

  // Validate pekerjaan
  if (!formData.pekerjaan.trim()) {
    errors.push('Pekerjaan harus diisi')
  }

  // Validate institusi
  if (!formData.institusi.trim()) {
    errors.push('Institusi/Perusahaan harus diisi')
  }

  return { valid: errors.length === 0, errors }
}
```

### Usage dalam handleSubmit

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // Validate form
  const { valid, errors } = validateForm()

  if (!valid) {
    // Show errors to user
    setNotification({
      type: 'error',
      message: errors.join(', '),
    })
    return  // Stop submission
  }

  // Form is valid, proceed with submission
  await submitForm()
}
```

---

## 5️⃣ Displaying Validation Errors

### Show All Errors as Alert

```typescript
if (!valid) {
  setNotification({
    type: 'error',
    message: errors.join(', '),  // Join all errors
  })
  return
}
```

### Show Field-Level Errors

```typescript
interface FormErrors {
  nama?: string
  email?: string
  whatsapp?: string
  kota?: string
  pekerjaan?: string
  institusi?: string
}

const [errors, setErrors] = useState<FormErrors>({})

const validateForm = (): FormErrors => {
  const errors: FormErrors = {}

  if (!formData.nama.trim()) {
    errors.nama = 'Nama lengkap harus diisi'
  }

  if (!formData.email.trim()) {
    errors.email = 'Email harus diisi'
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Format email tidak valid'
  }

  return errors
}

// Render dengan error
<input
  type="text"
  name="nama"
  value={formData.nama}
  onChange={handleChange}
  className={errors.nama ? 'border-red-500' : 'border-gray-300'}
/>
{errors.nama && <p className="text-red-600">{errors.nama}</p>}
```

---

## 6️⃣ Real-Time Validation (Optional)

Validate saat user type (tidak required, tapi bagus untuk UX):

```typescript
const [touched, setTouched] = useState<Record<string, boolean>>({})
const [errors, setErrors] = useState<FormErrors>({})

const validateField = (name: string, value: string) => {
  const newErrors = { ...errors }

  if (name === 'email') {
    if (!value.trim()) {
      newErrors.email = 'Email harus diisi'
    } else if (!EMAIL_REGEX.test(value)) {
      newErrors.email = 'Format email tidak valid'
    } else {
      delete newErrors.email
    }
  }

  setErrors(newErrors)
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  setFormData({ ...formData, [name]: value })
  
  // Validate real-time
  if (touched[name]) {
    validateField(name, value)
  }
}

const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name } = e.target
  setTouched({ ...touched, [name]: true })
}

// Render
<input
  onBlur={handleBlur}
  onChange={handleChange}
/>
{touched.email && errors.email && (
  <p className="text-red-600">{errors.email}</p>
)}
```

---

## 7️⃣ Live Demo: Create Custom Validator

```typescript
// src/lib/validators.ts
import { EMAIL_REGEX, WHATSAPP_MIN_DIGITS, WHATSAPP_MAX_DIGITS } from './constants'

export interface ValidationError {
  field: string
  message: string
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Email harus diisi'
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Format email tidak valid'
  }
  return null
}

export function validateWhatsApp(whatsapp: string): string | null {
  if (!whatsapp.trim()) {
    return 'Nomor WhatsApp harus diisi'
  }
  const cleaned = whatsapp.replace(/[\s\-+]/g, '')
  if (cleaned.length < WHATSAPP_MIN_DIGITS || cleaned.length > WHATSAPP_MAX_DIGITS) {
    return `Format nomor WhatsApp tidak valid (harus ${WHATSAPP_MIN_DIGITS}-${WHATSAPP_MAX_DIGITS} digit)`
  }
  return null
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) {
    return `${fieldName} harus diisi`
  }
  return null
}

// Usage
const emailError = validateEmail(formData.email)
const whatsappError = validateWhatsApp(formData.whatsapp)
const namaError = validateRequired(formData.nama, 'Nama lengkap')
```

---

## ✅ Checklist: Session 2 Complete

- [ ] Understand form validation concept
- [ ] Know common validation patterns
- [ ] Can use regex untuk validation
- [ ] Can create validation functions
- [ ] Can show validation errors
- [ ] Can prevent form submission dengan errors
- [ ] Understand client-side vs server-side validation
- [ ] Can validate all project form fields

---

## 🤔 Common Questions

**Q: Apakah perlu validate di client saja atau server juga?**
A: **SELALU BOTH!** Client-side untuk UX, server-side untuk security. Jangan hanya rely on client!

**Q: Bagaimana cara buat custom regex validator?**
A: Gunakan `new RegExp()` atau `/pattern/`. Test dengan `regex.test(string)`.

**Q: Apa yang terjadi jika user submit dengan error?**
A: We preventDefault() dan show error message, tidak akan submit.

---

## 🎬 Next Session

Session 3 akan integrate dengan **Google Apps Script** untuk submit data ke Google Sheets!

---

## 📚 Resources Sesi Ini

- [Form Validation](https://react.dev/learn/adding-interactivity)
- [Regex Patterns](https://regexr.com/)
- [Email Validation](https://emailregex.com/)
- [HTML Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

---

*Session 2 Complete! ✅*
