# Training Module: Build Admission Website dengan React & TypeScript
## Matana University PMB (Penerimaan Mahasiswa Baru) Portal

---

## 📚 Overview Training

Modul training ini dirancang untuk mengajarkan cara membangun aplikasi web modern menggunakan **React 19**, **TypeScript**, dan **Tailwind CSS** dari nol hingga siap produksi.

### 🎯 Target Audience
- Developer frontend pemula - menengah
- Peserta yang ingin belajar React ecosystem modern
- Tim yang ingin memahami best practice development modern

### ⏱️ Durasi Total
**2 Hari × 4 Jam = 8 Jam Total**
- DAY 1: React Fundamentals (4 jam)
- DAY 2: Form Handling & Data Integration (4 jam)

---

## 📋 Struktur Training

### DAY 1: FE React Fundamental
**Durasi: 4 Jam**

| Sesi | Topik | Durasi | File |
|------|-------|--------|------|
| 1 | Project Setup & Environment | 30 menit | `day-1-session-1.md` |
| 2 | React Components & Props | 50 menit | `day-1-session-2.md` |
| 3 | Break | 15 menit | - |
| 4 | Routing & Navigation | 45 menit | `day-1-session-3.md` |
| 5 | Styling & Animations | 60 menit | `day-1-session-4.md` |

### DAY 2: Form & Data Integration
**Durasi: 4 Jam**

| Sesi | Topik | Durasi | File |
|------|-------|--------|------|
| 1 | Form State Management | 50 menit | `day-2-session-1.md` |
| 2 | Form Validation | 45 menit | `day-2-session-2.md` |
| 3 | Break | 15 menit | - |
| 4 | Google Apps Script Integration | 50 menit | `day-2-session-3.md` |
| 5 | Deployment & Best Practice | 40 menit | `day-2-session-4.md` |

---

## 🚀 Tech Stack yang Digunakan

### Frontend Framework
- **React** 19.2.0 - UI Library
- **TypeScript** 5.9.3 - Type Safety
- **Vite** 7.3.0 - Build Tool (Lightning Fast ⚡)

### Styling
- **Tailwind CSS** 4.1.9 - Utility-first CSS
- **Framer Motion** 11 - Animation Library

### UI Components & Routing
- **Headless UI** 2.2.9 - Unstyled, accessible components
- **React Router DOM** 6.30.2 - Client-side routing
- **Lucide React** - Icon library

### Development Tools
- **pnpm** - Package manager (faster than npm/yarn)
- **ESLint** - Code linting
- **PostCSS** - CSS processing

### Integration
- **Google Apps Script** - Backend for form submission

---

## 🏗️ Project Structure

```
template-react/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── navbar.tsx       # Navigation bar
│   │   ├── hero-section.tsx # Landing page with form
│   │   ├── footer.tsx       # Footer component
│   │   ├── theme-provider.tsx # Theme context
│   │   └── index.ts         # Barrel export
│   │
│   ├── pages/               # Route/Page components
│   │   ├── program-studi.tsx # Admission info page
│   │   └── index.ts         # Barrel export
│   │
│   ├── lib/
│   │   ├── constants.ts     # App constants
│   │   └── types.ts         # TypeScript types
│   │
│   ├── styles/
│   │   └── globals.css      # Global styles
│   │
│   ├── App.tsx              # Root component with routing
│   └── main.tsx             # Entry point
│
├── public/                  # Static assets
│   └── matana-logo-removebg-preview.png
│
├── docs/
│   └── training/            # Training modules
│
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
└── README.md                # Project documentation
```

---

## 🛠️ Teknologi yang Dipelajari

### Fundamental React
✅ Component-based architecture
✅ Props dan State management
✅ Hooks (useState, useEffect, useContext)
✅ Conditional rendering
✅ Lists dan Keys

### Advanced Concepts
✅ React Router untuk multi-page application
✅ Form handling dan validation
✅ Async operations (form submission)
✅ Animation dengan Framer Motion
✅ TypeScript for type safety

### Development Skills
✅ Project setup dari nol
✅ Component composition
✅ Code organization & best practices
✅ Responsive design
✅ Performance optimization
✅ Deployment preparation

---

## 📦 Apa yang Akan Dibangun

Peserta akan membangun aplikasi **PMB (Penerimaan Mahasiswa Baru) Portal** dengan features:

### Features
- **Landing Page** dengan hero section dan form pendaftaran
- **Admission Info Page** dengan tab system (Program Studi, Info, FAQ)
- **Form Submission** ke Google Sheets via Google Apps Script
- **Responsive Design** untuk mobile, tablet, desktop
- **Form Validation** client-side
- **Animations** dengan Framer Motion
- **Navigation** dengan React Router
- **Type Safety** menggunakan TypeScript

### User Flow
```
User visits website
    ↓
Melihat landing page dengan form
    ↓
Submit form (dengan validasi)
    ↓
Data disimpan ke Google Sheets
    ↓
User melihat success message
    ↓
User bisa explore Admission Info Page
```

---

## ✅ Learning Outcomes

Setelah menyelesaikan training ini, peserta dapat:

### DAY 1 Outcomes
1. ✅ Setup React project dengan Vite dari nol
2. ✅ Membuat dan menggunakan components dengan props
3. ✅ Mengimplementasikan React Router untuk multi-page
4. ✅ Styling dengan Tailwind CSS
5. ✅ Menambahkan animations dengan Framer Motion

### DAY 2 Outcomes
1. ✅ Mengelola form state dengan useState
2. ✅ Membuat form validation logic
3. ✅ Mengintegrasikan Google Apps Script
4. ✅ Handling async operations
5. ✅ Deploy aplikasi ke production

---

## 🎓 Prerequisites

Peserta harus memiliki:
- ✅ Node.js 18+ (install dari nodejs.org)
- ✅ Code editor (VS Code recommended)
- ✅ Basic JavaScript knowledge (ES6+)
- ✅ HTML & CSS basics
- ✅ Terminal/Command line familiarity

---

## 🔗 Resource Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion)
- [Headless UI](https://headlessui.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 📝 Catatan Instruktur

### Persiapan Sebelum Training
1. Pastikan semua peserta sudah install Node.js & VS Code
2. Download project template atau clone dari repository
3. Run `pnpm install` untuk setup dependencies
4. Test run `pnpm dev` untuk pastikan environment working
5. Siapkan Google Apps Script untuk form submission (lihat Day 2)

### Tips Teaching
- Demonstrate langsung setiap konsep dengan live coding
- Beri kesempatan peserta untuk hands-on practice
- Gunakan breakpoints untuk debugging demonstration
- Encourage questions dan discussion
- Provide code snippets di setiap session
- Record session untuk peserta yang miss atau ingin review

### Troubleshooting Common Issues
- **Node.js error**: Pastikan versi >= 18
- **pnpm not found**: Install dengan `npm install -g pnpm`
- **Port 5173 already in use**: Ganti port dengan `pnpm dev -- --port 3000`
- **Module not found**: Run `pnpm install` again
- **Build error**: Clear `node_modules` dan `pnpm-lock.yaml`, reinstall

---

## 📞 Support & Questions

Jika peserta memiliki pertanyaan:
- Gunakan Discord/Slack channel untuk kolaborasi
- Share session recording untuk review
- Provide additional resources untuk deep dive topics
- Follow-up session untuk clarification

---

**Ready to start? Buka `day-1-session-1.md` untuk memulai!**

---

*Last Updated: January 2026*
*Version: 2.2.0*
