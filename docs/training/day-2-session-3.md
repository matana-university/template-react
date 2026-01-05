# DAY 2 - Session 3: Google Apps Script Integration
## FE React Form & Data Integration

**Durasi: 50 menit**

---

## 🎯 Learning Objectives

Di sesi ini, peserta akan:
1. ✅ Memahami Google Apps Script (GAS)
2. ✅ Membuat GAS untuk terima form data
3. ✅ Setup Google Sheets
4. ✅ Integrate React form dengan GAS
5. ✅ Handle async submission

---

## 📋 Agenda

| Waktu | Aktivitas | Durasi |
|-------|-----------|--------|
| 00:00 - 05:00 | GAS Concept | 5 menit |
| 05:00 - 15:00 | Creating GAS Web App | 10 menit |
| 15:00 - 25:00 | Google Sheets Integration | 10 menit |
| 25:00 - 35:00 | React to GAS Communication | 10 menit |
| 35:00 - 50:00 | Testing & Demo | 15 menit |

---

## 1️⃣ Google Apps Script Concept

### What is Google Apps Script?

Google Apps Script (GAS) adalah **JavaScript runtime** yang berjalan di Google cloud, integrated dengan Google services.

```
React Form (Frontend)
    ↓
Submit via fetch()
    ↓
Google Apps Script (Backend)
    ↓
Process & Save ke Google Sheets
    ↓
Return response ke Frontend
```

### Why Use Google Apps Script?

✅ Free (included dengan Google account)
✅ No server setup needed
✅ Integrated dengan Google Sheets
✅ Easy to use
✅ Automatic CORS handling
✅ Good untuk MVP/demo

❌ Limited to Google services
❌ Cold start delay
❌ Not suitable untuk large-scale

---

## 2️⃣ Creating Google Apps Script Web App

### Step 1: Open Google Apps Script Editor

```
1. Open Google Drive (drive.google.com)
2. Click "New" → "More" → "Google Apps Script"
3. New project akan terbuka
```

### Step 2: Create Google Sheet

```
1. Di Google Apps Script editor
2. Click "+" icon → Sheet
3. Atau manual create di Google Drive
4. Copy Sheet ID untuk digunakan di script
```

### Step 3: Write GAS Code

File: `Code.gs` (atau nama lain)

```javascript
// Define spreadsheet and sheet
const SPREADSHEET_ID = "YOUR_SHEET_ID_HERE"
const SHEET_NAME = "Responses"

// doPost function - called when form submitted
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
    
    // Parse form data
    const data = e.parameter
    
    // Add header row if first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Nama",
        "Email",
        "WhatsApp",
        "Kota",
        "Pekerjaan",
        "Institusi"
      ])
    }
    
    // Append data row
    sheet.appendRow([
      new Date(),
      data.nama,
      data.email,
      data.whatsapp,
      data.kota,
      data.pekerjaan,
      data.institusi
    ])
    
    // Return success
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Data berhasil disimpan"
    })).setMimeType(ContentService.MimeType.JSON)
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
  }
}
```

### Step 4: Deploy sebagai Web App

```
1. Click "Deploy" button (di atas)
2. Select type: "New deployment"
3. Select type: "Web app"
4. Execute as: "Me" (your account)
5. Who has access: "Anyone"
6. Deploy!
7. Copy deployment URL
```

**Output:**
```
https://script.google.com/macros/d/{DEPLOYMENT_ID}/userwithscripturi
```

---

## 3️⃣ Google Sheets Setup

### Sheet Structure

```
┌──────┬───────┬────────┬─────────┬───────┬──────────┬───────────┐
│ TS   │ Nama  │ Email  │ WhatsApp│ Kota  │Pekerjaan │ Institusi │
├──────┼───────┼────────┼─────────┼───────┼──────────┼───────────┤
│ 1/5  │ John  │ j@x.com│ 62812.. │ Jkt   │ Manager  │ PT ABC    │
│ 1/5  │ Jane  │ j@y.com│ 62813.. │ Bdg   │ Dev      │ Startup   │
└──────┴───────┴────────┴─────────┴───────┴──────────┴───────────┘
```

### Column Setup (A1:G1)

```
A1: Timestamp
B1: Nama
C1: Email
D1: WhatsApp
E1: Kota
F1: Pekerjaan
G1: Institusi
```

### Sheet Permissions

```
1. Open Google Sheet
2. Click "Share"
3. Add GAS Apps Script dengan Editor access
4. Make public atau add specific users
```

---

## 4️⃣ React to GAS Communication

### Setup Environment Variable

File: `.env` atau `.env.local`

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/{ID}/userwithscripturi
```

**Never commit .env file dengan secrets!**

### React Form Submission

```typescript
import { useState } from 'react'

interface FormData {
  nama: string
  email: string
  whatsapp: string
  kota: string
  pekerjaan: string
  institusi: string
}

export default function AdmissionForm() {
  const [formData, setFormData] = useState<FormData>({...})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Validate
    const { valid, errors } = validateForm()
    if (!valid) {
      setMessage(`Error: ${errors.join(', ')}`)
      return
    }

    // 2. Set loading
    setIsSubmitting(true)

    try {
      // 3. Get GAS URL dari environment
      const GAS_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL
      if (!GAS_URL) {
        throw new Error('Server configuration error')
      }

      // 4. Create URLSearchParams
      const formDataParams = new URLSearchParams()
      formDataParams.append('nama', formData.nama)
      formDataParams.append('email', formData.email)
      formDataParams.append('whatsapp', formData.whatsapp)
      formDataParams.append('kota', formData.kota)
      formDataParams.append('pekerjaan', formData.pekerjaan)
      formDataParams.append('institusi', formData.institusi)

      // 5. Submit ke GAS
      const response = await fetch(GAS_URL, {
        method: 'POST',
        body: formDataParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      // 6. Parse response
      const result = await response.json()

      if (result.success) {
        // 7. Success handling
        setMessage('Terima kasih! Data Anda telah dikirim.')
        
        // Reset form
        setFormData({
          nama: '',
          email: '',
          whatsapp: '',
          kota: '',
          pekerjaan: '',
          institusi: '',
        })

        // Clear message after 5 seconds
        setTimeout(() => setMessage(''), 5000)
      } else {
        throw new Error(result.message || 'Submission failed')
      }

    } catch (error) {
      console.error('Submission error:', error)
      setMessage('Gagal mengirim data. Coba lagi!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Mengirim...' : 'Submit'}
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}
```

### Key Points

```
1. Environment variable untuk URL
2. URLSearchParams untuk form data encoding
3. fetch() untuk POST request
4. await untuk handle async
5. Error handling dengan try-catch
6. Loading state management
7. Reset form setelah success
```

---

## 5️⃣ Testing & Debugging

### Test di Browser

```
1. Open application di http://localhost:5173
2. Fill form dengan test data
3. Click submit
4. Check Google Sheets - data should appear!
5. Check browser console untuk errors
```

### Common Issues & Solutions

**Issue 1: CORS Error**
```
❌ Error: Access to XMLHttpRequest blocked by CORS policy
✅ Solution: GAS automatically handles CORS for
```

**Issue 2: URL Not Found**
```
❌ Error: 404 script not found
✅ Solution: Check VITE_GOOGLE_SCRIPT_URL variable
```

**Issue 3: Sheet Not Found**
```
❌ Error: Sheet "Responses" not found
✅ Solution: Create sheet dengan nama exact "Responses"
```

**Issue 4: Data Not Appearing**
```
❌ No data di sheet setelah submit
✅ Solutions:
   - Check GAS logs (View > Logs)
   - Verify sheet ID benar
   - Check if user punya akses ke sheet
   - Check form validation (might be blocking)
```

### Debugging dengan Logs

Di Google Apps Script:

```javascript
function doPost(e) {
  try {
    const data = e.parameter
    Logger.log("Received data: " + JSON.stringify(data))
    
    // ... rest of code
    
    Logger.log("Row appended successfully")
    
  } catch (error) {
    Logger.log("Error: " + error.toString())
    throw error
  }
}
```

View logs:
```
1. Click "Execution log" icon
2. See all logs real-time
```

---

## 6️⃣ Current Project Implementation

Project ini sudah fully implemented!

**Check in `src/components/hero-section.tsx`:**

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const { valid, errors } = validateForm()
  if (!valid) {
    setNotification({
      type: 'error',
      message: errors.join(', '),
    })
    return
  }

  setIsSubmitting(true)
  setNotification({ type: 'loading', message: 'Mengirim data...' })

  try {
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL

    if (!GOOGLE_SCRIPT_URL) {
      throw new Error('Server configuration error')
    }

    const formDataParams = new URLSearchParams()
    formDataParams.append('nama', formData.nama)
    formDataParams.append('email', formData.email)
    formDataParams.append('whatsapp', formData.whatsapp)
    formDataParams.append('kota', formData.kota)
    formDataParams.append('pekerjaan', formData.pekerjaan)
    formDataParams.append('institusi', formData.institusi)

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formDataParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const result = await response.json()

    if (result.success) {
      setNotification({
        type: 'success',
        message: 'Terima kasih! Data Anda telah berhasil dikirim.',
      })

      setFormData({
        nama: '',
        email: '',
        whatsapp: '',
        kota: '',
        pekerjaan: '',
        institusi: '',
      })

      setTimeout(() => {
        setNotification({ type: null, message: '' })
      }, 5000)
    } else {
      throw new Error(result.message || 'Submission failed')
    }
  } catch (error) {
    console.error('Error:', error)
    setNotification({
      type: 'error',
      message: 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
    })
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## ✅ Checklist: Session 3 Complete

- [ ] Understand Google Apps Script concept
- [ ] Can create GAS Web App
- [ ] Can setup Google Sheet
- [ ] Understand form data encoding
- [ ] Can submit form via fetch()
- [ ] Can handle async operations
- [ ] Can show loading/success/error states
- [ ] Can test submission end-to-end

---

## 🤔 Common Questions

**Q: Apakah harus pakai GAS atau bisa pakai backend lain?**
A: GAS untuk MVP/demo. Production: pakai proper backend (Node.js, Python, Django, dll)

**Q: Bagaimana cara secure GAS?**
A: Validate data di server, use authentication, limit rate, sanitize inputs

**Q: Apa yang terjadi dengan data di Google Sheets?**
A: Disimpan permanen. Bisa export CSV, use untuk analytics, dll

---

## 🎬 Next Session

Session 4: **Deployment & Best Practice** - siap-siapkan aplikasi untuk production!

---

## 📚 Resources Sesi Ini

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

*Session 3 Complete! ✅*
