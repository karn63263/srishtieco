# Design System - Component Examples & Patterns

## 🎨 Complete Color Palette with Hex & HSL

### Background Colors
```
Primary Dark Background: #021C18
  HSL: 170 87% 5%
  Usage: Main page background, base color
  Tailwind: bg-[#021C18]

Card Background: #044036
  HSL: 170 87% 14%
  Usage: Card containers, hover states
  Tailwind: bg-[#044036] or bg-[#044036]/30 with opacity

Secondary Background: #033230
  HSL: 170 87% 8%
  Usage: Popovers, alternative sections
  Tailwind: bg-[#033230]

Lighter Teal: #023F39
  HSL: 170 87% 10%
  Usage: Card variant backgrounds
  Tailwind: bg-[#023F39]
```

### Text Colors
```
Light Cream (Primary Text): #E0F2E9
  HSL: 145 50% 91%
  Usage: Headings, primary body text
  Tailwind: text-[#E0F2E9]

Medium Green: #81C784
  HSL: 140 30% 60%
  Usage: Secondary text, descriptions, muted-foreground
  Tailwind: text-[#81C784]

Muted Green (30% opacity): #81C784/60
  HSL: (same, with 60% opacity)
  Usage: Very subtle text, captions
  Tailwind: text-[#81C784]/60
```

### Primary Brand Colors
```
Neon Green: #00E676
  HSL: 145 100% 45%
  Usage: Primary CTA, highlights, focus states, active states
  Tailwind: text-[#00E676], bg-[#00E676], border-[#00E676]
  With opacity: bg-[#00E676]/10 (very light), bg-[#00E676]/20 (light)

Cyan/Turquoise: #00BFA5
  HSL: 174 100% 37%
  Usage: Secondary accents, gradients paired with green
  Tailwind: text-[#00BFA5], bg-[#00BFA5], from-[#00E676] to-[#00BFA5]
```

### Border & Input Colors
```
Border Color: #0F3D38
  HSL: 170 40% 18%
  Usage: Input borders, subtle dividers
  Tailwind: border-[#0F3D38]

Border with Opacity: rgba(0, 0, 0, 0.5)
  Usage: Subtle borders over semi-transparent #044036
  Tailwind: border-[#044036]/50
```

### Error/Destructive Color
```
Red: #FF6B6B
  HSL: 0 72% 51%
  Usage: Error states, destructive buttons, "Get Consultation" CTA
  Tailwind: bg-[#FF6B6B], text-[#FF6B6B]
  Hover: hover:bg-[#FF6B6B]/90
```

---

## 📦 Pre-Built Component Examples

### ❌ NOT Recommended (Don't Use These)
```css
/* ❌ Random colors not in palette */
bg-blue-500
text-purple-300
border-yellow-600

/* ❌ Too much opacity variation */
bg-opacity-40  /* Use explicit hex opacity like /30 instead */

/* ❌ Non-matching gradients */
from-red-500 to-blue-500  /* Use palette colors */

/* ❌ Inconsistent rounded corners */
rounded-3xl or rounded-none  /* Use rounded-lg, rounded-xl, rounded-2xl */
```

### ✅ Recommended Patterns

#### Pattern 1: Hero Section
```jsx
<section className="relative pt-32 pb-20 bg-[#021C18]">
  {/* Gradient overlay for depth */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#044036]/20 to-transparent" />
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Small uppercase label */}
    <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">
      Page Section Label
    </span>
    
    {/* Main heading with gradient highlight */}
    <h1 className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
      Main Heading 
      <span className="text-gradient"> with Green-to-Cyan Highlight</span>
    </h1>
    
    {/* Description paragraph */}
    <p className="text-[#81C784] text-lg leading-relaxed max-w-3xl">
      Main description of the section goes here with muted green text.
    </p>
  </div>
</section>
```

#### Pattern 2: Card Grid Container
```jsx
<section className="py-20 bg-[#021C18]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Grid with responsive columns */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card Item */}
      <div className="group p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
        {/* Icon Container */}
        <div className="w-14 h-14 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-5 group-hover:bg-[#00E676]/20 transition-colors">
          <Icon className="w-7 h-7 text-[#00E676]" />
        </div>
        
        {/* Heading */}
        <h3 className="text-lg font-semibold text-[#E0F2E9] font-['Poppins'] mb-3">
          Card Title
        </h3>
        
        {/* Description */}
        <p className="text-[#81C784] text-sm leading-relaxed">
          Card description goes here explaining the feature or service.
        </p>
      </div>
    </div>
  </div>
</section>
```

#### Pattern 3: Two-Column Layout (Text + Image)
```jsx
<section className="py-20 bg-[#021C18]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Text Column */}
      <div>
        <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">
          Section Label
        </span>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
          Section Title
        </h2>
        
        <p className="text-[#81C784] text-lg leading-relaxed mb-6">
          First paragraph of description...
        </p>
        
        <p className="text-[#81C784] leading-relaxed mb-6">
          Additional supporting text...
        </p>
        
        {/* Feature List */}
        <ul className="space-y-3 mb-8">
          {['Feature 1', 'Feature 2', 'Feature 3'].map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00E676] shrink-0" />
              <span className="text-[#E0F2E9]">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <Button className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold rounded-full px-8 hover:shadow-glow">
          Call to Action
        </Button>
      </div>
      
      {/* Image Column */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#00E676]/10 to-[#00BFA5]/10 rounded-3xl blur-xl" />
        <img 
          src="/image.jpg" 
          alt="Alt text" 
          className="relative rounded-2xl border border-[#044036]/50 shadow-card" 
        />
      </div>
    </div>
  </div>
</section>
```

#### Pattern 4: Alternate Background Section
```jsx
<section className="py-20 bg-[#044036]/20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">
      Section Title
    </h2>
    
    <p className="text-[#81C784] text-lg mb-8 max-w-2xl mx-auto">
      Section description with muted green text.
    </p>
    
    {/* CTA Button */}
    <Button className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-semibold px-8 rounded-full">
      Secondary CTA
    </Button>
  </div>
</section>
```

#### Pattern 5: Contact Info Card
```jsx
<a 
  href="tel:+919876543210" 
  className="flex items-start gap-4 p-4 rounded-xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/20 transition-all group"
>
  {/* Icon Container */}
  <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00E676]/20 transition-colors">
    <Phone className="w-5 h-5 text-[#00E676]" />
  </div>
  
  {/* Text Container */}
  <div>
    <p className="text-[#81C784] text-sm">Phone</p>
    <p className="text-[#E0F2E9] font-medium">+91 98765 43210</p>
  </div>
</a>
```

#### Pattern 6: Breadcrumb / Quick Links
```jsx
<Link 
  to="/services" 
  className="text-[#81C784] hover:text-[#00E676] transition-colors text-sm flex items-center gap-1"
>
  <ChevronRight className="w-3 h-3" />
  Link Text
</Link>
```

#### Pattern 7: Feature Checklist
```jsx
<div className="grid grid-cols-2 gap-3">
  {service.features.map((feature) => (
    <div key={feature} className="flex items-center gap-2">
      <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
      <span className="text-[#E0F2E9] text-sm">{feature}</span>
    </div>
  ))}
</div>
```

#### Pattern 8: Navigation with Active State
```jsx
<nav className="flex items-center gap-1">
  {navItems.map((item) => (
    <Link
      key={item.href}
      to={item.href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
        isActive(item.href)
          ? 'text-[#00E676] bg-[#044036]/50'
          : 'text-[#81C784] hover:text-[#E0F2E9] hover:bg-[#044036]/30'
      }`}
    >
      {item.label}
    </Link>
  ))}
</nav>
```

#### Pattern 9: Footer Social Icons
```jsx
<div className="flex gap-3">
  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
    <a 
      key={i} 
      href="#" 
      className="w-9 h-9 rounded-lg bg-[#044036]/50 flex items-center justify-center text-[#81C784] hover:text-[#00E676] hover:bg-[#044036] transition-all"
    >
      <Icon className="w-4 h-4" />
    </a>
  ))}
</div>
```

#### Pattern 10: Loading State
```jsx
<div className="min-h-screen bg-[#021C18] flex items-center justify-center">
  <div className="w-8 h-8 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin" />
</div>
```

---

## 🎨 Color Application Examples

### When to Use Each Color

| Color | When to Use | Example |
|-------|------------|---------|
| `#00E676` (Neon Green) | Primary CTAs, focus states, accents, icons | CTA buttons, icon containers, active nav items |
| `#00BFA5` (Cyan) | Secondary accents, gradient pairs | Paired in gradients `from-[#00E676] to-[#00BFA5]` |
| `#E0F2E9` (Light Cream) | All headings, primary body text | h1, h2, h3, card titles, important text |
| `#81C784` (Medium Green) | Secondary text, descriptions, muted content | Paragraph text, subheadings, labels |
| `#044036` (Dark Teal) | Card backgrounds, hover states, borders | Card containers, navigation hover, dividers |
| `#021C18` (Deep Teal) | Main background, body background | Page background, full sections |
| `#FF6B6B` (Red) | Destructive actions, alerts, secondary CTA | Error states, "Get Consultation" buttons |

---

## 🔄 Responsive Breakpoints in Action

```jsx
{/* Text scales from 2xl → 5xl */}
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

{/* Padding increases on larger screens */}
<div className="px-4 sm:px-6 md:px-8 lg:px-8">
  Content with responsive padding
</div>

{/* Grid columns adapt */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop, 4 on large */}
</div>

{/* Hidden on mobile, shown on larger screens */}
<nav className="hidden lg:flex items-center gap-4">
  {/* Desktop navigation */}
</nav>
```

---

## 🌈 Gradient Combinations

```jsx
{/* Green to Cyan - Primary Gradient */}
className="bg-gradient-to-r from-[#00E676] to-[#00BFA5]"

{/* Green to Cyan - Text Gradient */}
<span className="text-gradient">Gradient Text</span>

{/* Teal fade from top (hero overlay) */}
className="bg-gradient-to-b from-[#044036]/20 to-transparent"

{/* Dark fade from bottom (image overlay) */}
className="bg-gradient-to-t from-[#021C18]/60 to-transparent"

{/* Fade from left to transparent */}
className="bg-gradient-to-r from-[#044036]/20 to-transparent"

{/* Circular glow around element */}
className="absolute -inset-4 bg-gradient-to-r from-[#00E676]/10 to-[#00BFA5]/10 rounded-3xl blur-xl"
```

---

## ⚡ Transition & Animation Patterns

```jsx
{/* Smooth transition on all properties */}
className="transition-all duration-300"

{/* Color-only transition */}
className="transition-colors duration-300"

{/* Custom properties transition */}
className="transition-[color,box-shadow] duration-300"

{/* Hover lift effect */}
className="hover:-translate-y-1"

{/* Hover scale effect */}
className="hover:scale-105"

{/* Loading spinner */}
<div className="w-8 h-8 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin" />
```

---

## 📐 Spacing Grid System

The project uses Tailwind's default spacing scale:

```
0.5    → 2px
1      → 4px
2      → 8px
3      → 12px
4      → 16px
6      → 24px
8      → 32px
12     → 48px
16     → 64px
20     → 80px
32     → 128px
```

**Common Section Padding Patterns:**
- `p-6` → 24px all around (card padding)
- `px-4 py-2` → 16px horizontal, 8px vertical (button padding)
- `py-20` → 80px vertical (standard section)
- `pt-32 pb-20` → 128px top, 80px bottom (hero section)

---

## 🖼️ Image & Media Patterns

```jsx
{/* Image with border and shadow */}
<img 
  src="/image.jpg"
  alt="Description"
  className="rounded-2xl border border-[#044036]/50 shadow-card"
/>

{/* Image with overlay gradient */}
<div className="relative rounded-2xl overflow-hidden border border-[#044036]/50">
  <img src="/image.jpg" alt="Alt" className="w-full h-72 object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-[#021C18]/60 to-transparent" />
</div>

{/* Image container with glow background */}
<div className="relative">
  <div className="absolute -inset-4 bg-gradient-to-r from-[#00E676]/10 to-[#00BFA5]/10 rounded-3xl blur-xl" />
  <img src="/image.jpg" alt="Alt" className="relative rounded-2xl" />
</div>
```

---

## 🔐 Lock-In These Practices

✨ **DO THESE:**
- Use hex colors from the palette (`#021C18`, `#00E676`, etc.)
- Apply opacity with `/20`, `/30`, `/50`, `/60` notation
- Wrap text in `font-['Poppins']` for headings
- Use `transition-all duration-300` on interactive elements
- Apply hover states: color change, background tint, elevation
- Keep borders consistent: `rounded-lg`, `rounded-xl`, `rounded-2xl`
- Use CSS custom properties from index.css when available

❌ **AVOID THESE:**
- Using Tailwind preset colors (blue-500, purple-300, etc.)
- Applying random hex colors not in palette
- Inconsistent border radius values
- Missing transition classes
- Hover effects without visual feedback
- Mixing serif and sans-serif fonts inappropriately
- Using both light and dark modes simultaneously

---

## 📝 Final Verification Checklist

Before submitting a new page:

- [ ] All backgrounds are `#021C18`, `#044036/30`, or `#044036/20`
- [ ] All text is `#E0F2E9` (headings) or `#81C784` (body)
- [ ] Primary accent is `#00E676` (green)
- [ ] All buttons have hover states
- [ ] All cards have lift + glow on hover
- [ ] All forms have green focus rings
- [ ] Responsive grids work (1 → 2 → 3+ columns)
- [ ] Typography: Poppins for headings, Inter for body
- [ ] Transitions smooth: `transition-all duration-300`
- [ ] No jarring color jumps - gradients where appropriate

---

**Reference built from production codebase - Use with confidence! 🚀**
