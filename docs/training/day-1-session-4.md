# DAY 1 - Session 4: Styling & Animations
## FE React Fundamental

**Durasi: 60 menit**

---

## 🎯 Learning Objectives

Di sesi ini, peserta akan:
1. ✅ Memahami Tailwind CSS utility-first approach
2. ✅ Menggunakan Tailwind untuk styling components
3. ✅ Memahami responsive design dengan Tailwind
4. ✅ Menambahkan animations dengan Framer Motion
5. ✅ Membuat smooth, interactive UX

---

## 📋 Agenda

| Waktu | Aktivitas | Durasi |
|-------|-----------|--------|
| 00:00 - 10:00 | Tailwind CSS Basics | 10 menit |
| 10:00 - 20:00 | Tailwind Patterns | 10 menit |
| 20:00 - 30:00 | Responsive Design | 10 menit |
| 30:00 - 40:00 | Framer Motion Basics | 10 menit |
| 40:00 - 50:00 | Animation Examples | 10 menit |
| 50:00 - 60:00 | Live Demo & Q&A | 10 menit |

---

## 1️⃣ Tailwind CSS Basics

### What is Tailwind CSS?

Tailwind adalah **utility-first CSS framework** - apply pre-made classes untuk styling.

**Traditional CSS:**
```css
/* Define class */
.button {
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #2563eb;
}
```

**Tailwind CSS (Utility Classes):**
```html
<!-- Apply classes directly -->
<button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Click me
</button>
```

### Utility Classes vs Custom CSS

| Aspect | Custom CSS | Tailwind |
|--------|-----------|----------|
| File size | Grows with project | Minified & optimized |
| Learning curve | Define own styles | Learn class names |
| Consistency | Easy to be inconsistent | Built-in design tokens |
| Speed | Slower iteration | Faster development |
| Maintainability | Hard to refactor | Easy with consistent classes |

### Tailwind Class Structure

```
className="[responsive:][state:]property-value"

Examples:
padding: px-4 py-2 (padding-x: 1rem, padding-y: 0.5rem)
background: bg-blue-600 (blue at intensity 600)
text color: text-white
border radius: rounded-lg
flex: flex justify-center items-center
grid: grid grid-cols-3 gap-4
margin: m-4 mt-6 mb-2
font: font-bold text-xl
responsive: md:text-2xl lg:grid-cols-4
state: hover:bg-blue-700 focus:ring-2 active:scale-95
```

---

## 2️⃣ Tailwind Patterns (Practical Examples)

### Pattern 1: Responsive Button

```typescript
<button className="
  px-6 py-3                          // Padding
  bg-blue-600 text-white             // Colors
  font-semibold                      // Typography
  rounded-lg                         // Border radius
  shadow-md                          // Shadow
  hover:bg-blue-700                  // Hover state
  active:scale-95                    // Click state
  disabled:opacity-50 disabled:cursor-not-allowed // Disabled
  transition-all duration-200        // Smooth animation
  w-full md:w-auto                   // Responsive width
">
  Click Me
</button>
```

### Pattern 2: Card with Hover Effect

```typescript
<div className="
  bg-white                           // Background
  rounded-lg shadow-md               // Border & shadow
  p-6                                // Padding
  hover:shadow-lg                    // Hover effect
  transition-shadow duration-300     // Smooth transition
  border border-gray-200             // Border
">
  <h3 className="text-xl font-bold text-gray-900 mb-2">
    Card Title
  </h3>
  <p className="text-gray-600">
    Card description goes here
  </p>
</div>
```

### Pattern 3: Responsive Grid Layout

```typescript
<div className="
  grid
  grid-cols-1                 // Mobile: 1 column
  md:grid-cols-2              // Tablet: 2 columns
  lg:grid-cols-3              // Desktop: 3 columns
  xl:grid-cols-4              // Large desktop: 4 columns
  gap-6                       // Space between items
">
  {items.map((item) => (
    <div key={item.id} className="bg-white p-6 rounded-lg">
      {item.name}
    </div>
  ))}
</div>
```

### Pattern 4: Flexbox Layout

```typescript
{/* Row layout with space between */}
<div className="flex justify-between items-center gap-4">
  <div>Left item</div>
  <div>Center item</div>
  <div>Right item</div>
</div>

{/* Column layout centered */}
<div className="flex flex-col items-center justify-center min-h-screen">
  <h1>Centered content</h1>
</div>

{/* Wrap items */}
<div className="flex flex-wrap gap-2">
  {items.map((item) => (
    <span key={item} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
      {item}
    </span>
  ))}
</div>
```

### Pattern 5: Form Input

```typescript
<input
  type="text"
  placeholder="Enter your name"
  className="
    w-full                          // Full width
    px-4 py-3                       // Padding
    border border-gray-300          // Border
    rounded-lg                      // Border radius
    focus:outline-none              // Remove default outline
    focus:ring-2 focus:ring-blue-500 // Custom focus ring
    focus:border-transparent        // Hide border on focus
    transition-all duration-200     // Smooth animation
    placeholder-gray-500            // Placeholder color
    disabled:bg-gray-100            // Disabled state
  "
/>
```

### Pattern 6: Navigation Bar

```typescript
<nav className="
  fixed top-0 left-0 right-0 z-50   // Fixed positioning
  bg-white                          // Background
  shadow-sm hover:shadow-lg          // Shadow with hover
  transition-shadow duration-300    // Smooth shadow transition
">
  <div className="
    max-w-7xl mx-auto                // Container
    px-6 py-4                        // Padding
    flex justify-between items-center // Flexbox
  ">
    <div className="text-2xl font-bold">Logo</div>
    
    <div className="
      hidden md:flex              // Hide on mobile, show on md+
      items-center gap-8
    ">
      <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
      <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
    </div>
  </div>
</nav>
```

---

## 3️⃣ Responsive Design Breakpoints

Tailwind punya built-in breakpoints untuk responsive design:

```
xs    → Extra small screens (default, no prefix)
sm    → Small devices (640px)
md    → Medium devices (768px) - Tablets
lg    → Large devices (1024px) - Desktops
xl    → Extra large (1280px) - Large desktops
2xl   → 2X Large (1536px)
```

### Examples

```typescript
{/* Text size responsive */}
<h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
  Responsive Heading
</h1>

{/* Display responsive */}
<div className="hidden md:flex lg:hidden">
  This shows on tablets only!
</div>

{/* Grid responsive */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {/* Responsive grid */}
</div>

{/* Padding responsive */}
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>

{/* Width responsive */}
<div className="w-full md:w-3/4 lg:w-1/2">
  Responsive width
</div>
```

### Mobile-First Approach

Tailwind follows **mobile-first** - default styles for mobile, then override for larger screens:

```typescript
{/* Bad - Desktop first */}
<div className="text-4xl sm:text-2xl md:text-xl">
  Don't do this!
</div>

{/* Good - Mobile first */}
<div className="text-xl md:text-2xl lg:text-4xl">
  Do this instead!
</div>
```

---

## 4️⃣ Framer Motion Basics

### What is Framer Motion?

Framer Motion adalah **animation library** untuk React - membuat smooth, interactive animations.

**Installation (sudah ada):**
```bash
pnpm add framer-motion
```

### Framer Motion Components

#### 1. `<motion>` Element

```typescript
import { motion } from 'framer-motion'

// Use `motion` instead of normal HTML elements
<motion.div>Animated div</motion.div>
<motion.button>Animated button</motion.button>
<motion.p>Animated paragraph</motion.p>
```

#### 2. Basic Animation Properties

```typescript
<motion.div
  initial={{ opacity: 0 }}              // Start state
  animate={{ opacity: 1 }}              // End state
  transition={{ duration: 1 }}          // Duration in seconds
>
  I fade in!
</motion.div>
```

#### 3. Enter/Exit Animation

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}       // Hidden + 20px down
  animate={{ opacity: 1, y: 0 }}        // Visible + normal position
  exit={{ opacity: 0, y: -20 }}         // Exit animation
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

#### 4. Hover Animation

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}          // Grow on hover
  whileTap={{ scale: 0.95 }}            // Shrink on click
  transition={{ duration: 0.2 }}
>
  Click me!
</motion.button>
```

#### 5. Draggable Element

```typescript
<motion.div
  drag                                  // Enable dragging
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.2}
>
  Drag me!
</motion.div>
```

---

## 5️⃣ Animation Examples from Project

### Example 1: Fade In on Load

```typescript
import { motion } from 'framer-motion'

function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Content */}
    </motion.section>
  )
}
```

### Example 2: Staggered Children Animation

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,        // Delay between children
      delayChildren: 0.2,          // Initial delay
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

function CardList() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => (
        <motion.div key={card.id} variants={itemVariants}>
          {card.content}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Example 3: Hover Lift Effect

```typescript
<motion.div
  whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
  transition={{ duration: 0.2 }}
  className="bg-white p-6 rounded-lg shadow-md"
>
  Card that lifts on hover
</motion.div>
```

### Example 4: Floating Animation

```typescript
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
>
  Floating element
</motion.div>
```

### Example 5: Button Press Animation

```typescript
<motion.button
  onClick={handleClick}
  whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
>
  Click Me!
</motion.button>
```

---

## 6️⃣ Combining Tailwind + Framer Motion

Best practice adalah combine Tailwind untuk styling + Framer Motion untuk animations!

```typescript
<motion.div
  // Tailwind for styling
  className="
    bg-white rounded-lg shadow-md p-6
    border border-gray-200
    hover:shadow-lg transition-shadow
  "
  // Framer Motion for animations
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ y: -5 }}
  transition={{ duration: 0.3 }}
>
  Beautiful animated card!
</motion.div>
```

---

## 7️⃣ Live Demo: Create Animated Button

Mari buat button yang animated bersama!

```typescript
import { motion } from 'framer-motion'

function AnimatedButton() {
  return (
    <motion.button
      className="
        px-8 py-3
        bg-gradient-to-r from-blue-600 to-blue-800
        text-white font-bold
        rounded-lg
        shadow-lg
        active:shadow-xl
      "
      whileHover={{
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }}
    >
      Click Me!
    </motion.button>
  )
}
```

---

## ✅ Checklist: Session 4 Complete

- [ ] Understand Tailwind CSS utility-first approach
- [ ] Know common Tailwind classes (px, py, bg, text, etc)
- [ ] Can create responsive layouts with Tailwind
- [ ] Know Tailwind breakpoints (md, lg, xl)
- [ ] Know how to use motion component
- [ ] Can create basic animations (fade, slide, scale)
- [ ] Can use variants untuk staggered animations
- [ ] Can combine Tailwind + Framer Motion

---

## 🤔 Common Questions

**Q: Apakah Tailwind membuat file besar?**
A: No! Tailwind automatically removes unused CSS di production. Hanya include classes yang dipakai.

**Q: Bagaimana cara membuat custom Tailwind class?**
A: Edit `tailwind.config.ts` untuk extend theme, atau gunakan `@apply` di CSS.

**Q: Apakah Framer Motion mengakibatkan performance issue?**
A: No! Framer Motion sangat optimized. Performance issue biasanya dari terlalu banyak animations, bukan dari library.

**Q: Bagaimana cara optimize animations untuk mobile?**
A: Gunakan `prefers-reduced-motion` untuk respect user preferences:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
<motion.div animate={prefersReducedMotion ? {} : { y: -10 }} />
```

---

## 🎬 Next: DAY 2

DAY 2 akan fokus pada:
- Form State Management dengan useState
- Form Validation
- Google Apps Script Integration
- Async Data Handling

---

## 📚 Resources Sesi Ini

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Components Gallery](https://tailwindui.com)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Animation Best Practices](https://www.framer.com/blog/posts/animation-best-practices)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)

---

*Session 4 Complete! ✅*

**DAY 1 COMPLETE! 🎉**

Anda sudah belajar React fundamentals! Besok DAY 2 akan fokus pada form handling dan data integration. Great job! 🚀
