# Design System - Quick Reference & Code Snippets

## 🎨 Color Palette Cheat Sheet

```
DARK BACKGROUNDS:
#021C18 - Main dark background (--background)
#044036 - Card backgrounds, hover states (--secondary)
#033230 - Popovers, very dark teal

VIBRANT ACCENTS (Brand Colors):
#00E676 - Neon Green (Primary) - Use for CTAs, highlights, focus states
#00BFA5 - Cyan/Turquoise (Accent) - Use for gradients with green

TEXT COLORS:
#E0F2E9 - Light cream (default text, headings)
#81C784 - Medium green (secondary/muted text, descriptions)

UTILITY COLORS:
#FF6B6B - Red (for destructive/error states)
#0F3D38 - Medium teal (borders, inputs)

OPACITY MODIFIERS:
bg-[#044036]/20  → 20% opacity
bg-[#044036]/30  → 30% opacity
bg-[#044036]/50  → 50% opacity
```

---

## 📝 Common Component Patterns

### 1. Hero Section Template
```jsx
<section className="relative pt-32 pb-20 bg-[#021C18]">
  <div className="absolute inset-0 bg-gradient-to-b from-[#044036]/20 to-transparent" />
  <div className="relative max-w-7xl mx-auto px-4">
    <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">
      Label
    </span>
    <h1 className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
      Title <span className="text-gradient">Highlight</span>
    </h1>
    <p className="text-[#81C784] text-lg leading-relaxed mb-6">
      Description text...
    </p>
  </div>
</section>
```

### 2. Content Card with Hover Effects
```jsx
<div className="group p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
  {/* Icon Badge */}
  <div className="w-14 h-14 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-5 group-hover:bg-[#00E676]/20 transition-colors">
    <Icon className="w-7 h-7 text-[#00E676]" />
  </div>
  
  {/* Content */}
  <h3 className="text-lg font-semibold text-[#E0F2E9] font-['Poppins'] mb-3">
    Card Title
  </h3>
  <p className="text-[#81C784] text-sm leading-relaxed">
    Card description...
  </p>
</div>
```

### 3. Primary CTA Button (Gradient)
```jsx
<Button className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold rounded-full px-6 hover:shadow-glow">
  Call to Action
</Button>
```

### 4. Secondary CTA Button (Red)
```jsx
<Button className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-semibold px-8 rounded-full">
  Get Consultation
</Button>
```

### 5. Navigation Link (Active/Hover States)
```jsx
<Link
  to="/path"
  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
    isActive
      ? 'text-[#00E676] bg-[#044036]/50'
      : 'text-[#81C784] hover:text-[#E0F2E9] hover:bg-[#044036]/30'
  }`}
>
  Menu Item
</Link>
```

### 6. Image with Overlay Gradient
```jsx
<div className="relative rounded-2xl overflow-hidden border border-[#044036]/50">
  <img src="/image.jpg" alt="Alt text" className="w-full h-72 object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-[#021C18]/60 to-transparent" />
</div>
```

### 7. Feature List with Checkmarks
```jsx
{features.map((feature) => (
  <div key={feature} className="flex items-center gap-2">
    <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
    <span className="text-[#E0F2E9] text-sm">{feature}</span>
  </div>
))}
```

### 8. Contact Info Box
```jsx
<a href={href} className="flex items-start gap-4 p-4 rounded-xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/20 transition-all group">
  <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00E676]/20 transition-colors">
    <Icon className="w-5 h-5 text-[#00E676]" />
  </div>
  <div>
    <p className="text-[#81C784] text-sm">Label</p>
    <p className="text-[#E0F2E9] font-medium">Value</p>
  </div>
</a>
```

### 9. Two-Column Grid Layout
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
  <div>{/* Left content */}</div>
  <div className="relative">
    <img src="/image.jpg" alt="Alt" />
  </div>
</div>
```

### 10. Section Break with Different Background
```jsx
<section className="py-20 bg-[#044036]/20">
  <div className="max-w-7xl mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

---

## 🎯 Hover States Reference

| Element Type | Normal State | Hover State | Effect |
|--------------|-------------|------------|---------|
| Card | `bg-[#044036]/30 border-[#044036]/50` | `border-[#00E676]/30 shadow-glow -translate-y-1` | Lift + glow |
| Link | `text-[#81C784]` | `text-[#E0F2E9]` | Text brightens |
| Icon Badge | `bg-[#00E676]/10` | `bg-[#00E676]/20` | Background intensifies |
| Button Primary | `bg-primary` | `bg-primary/90` | Slightly darker |
| Social Icon | `text-[#81C784]` | `text-[#00E676] bg-[#044036]` | Color + bg change |

---

## 📐 Spacing Scale

```
px-4  → 16px  (horizontal padding)
px-6  → 24px
px-8  → 32px

py-4  → 16px  (vertical padding)
py-12 → 48px
py-16 → 64px
py-20 → 80px  (standard section padding)

pt-32 → 128px (hero section top padding)
pb-20 → 80px  (hero section bottom padding)

gap-6  → 24px (grid gap)
gap-8  → 32px
gap-12 → 48px
gap-16 → 64px

mt-3 → 12px  (margins)
mb-4 → 16px
mb-6 → 24px
```

---

## 🔤 Typography Quick Reference

### Headings

```jsx
// h1 - Main page title
<h1 className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins']">
  Heading 1
</h1>

// h2 - Section title
<h2 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins']">
  Heading 2
</h2>

// h3 - Card/subsection title
<h3 className="text-lg font-semibold text-[#E0F2E9] font-['Poppins']">
  Heading 3
</h3>

// h4 - Smaller heading
<h4 className="text-sm font-semibold text-[#E0F2E9]">
  Heading 4
</h4>
```

### Body Text

```jsx
// Large body text (intro)
<p className="text-lg leading-relaxed text-[#81C784]">
  Larger paragraph...
</p>

// Standard body (default)
<p className="text-[#81C784] leading-relaxed">
  Standard paragraph...
</p>

// Small text (descriptions, labels)
<p className="text-sm text-[#81C784]">
  Small text...
</p>

// Extra small (badges, tiny text)
<p className="text-xs text-[#81C784]">
  Tiny text...
</p>

// Muted/secondary text
<span className="text-[#81C784]/60">
  Very muted text...
</span>
```

### Font Families

```jsx
// Heading fonts
font-['Poppins']

// Body text
(default - uses 'Inter' from index.css)
```

---

## 🚀 Grid Layouts

```jsx
// Responsive 2-column to 4-column
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// 2-column (wraps to 1 on mobile)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

// 3-column (2 on tablet, 1 on mobile)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// 1-column to 2-column
<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
```

---

## ⚡ Animation & Motion

```jsx
// Loading spinner
<div className="w-8 h-8 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin" />

// Smooth transitions
className="transition-all duration-300"    // Everything
className="transition-colors duration-300"  // Only colors
className="transition-[color,box-shadow]"  // Specific

// With hover transform
className="hover:-translate-y-1"  // Moves up 4px
className="hover:scale-105"       // Grows 5%
```

---

## 🎨 Gradient Combinations

```jsx
// Primary gradient (Green to Cyan)
className="bg-gradient-to-r from-[#00E676] to-[#00BFA5]"

// Text gradient
<span className="text-gradient">Highlighted Text</span>
// Result: Green-to-cyan gradient text

// Background to transparent (bottom to top)
className="bg-gradient-to-t from-[#021C18]/60 to-transparent"

// Left to right overlay
className="bg-gradient-to-r from-[#044036]/20 to-transparent"
```

---

## 🎯 Form Elements

### Input Field
```jsx
<input 
  type="text"
  placeholder="Enter text..."
  className="border border-[#0F3D38] rounded-md px-3 py-2 bg-transparent text-[#E0F2E9] placeholder:text-[#81C784] focus-visible:border-[#00E676] focus-visible:ring-2 focus-visible:ring-[#00E676]/50"
/>
```

### Form Label
```jsx
<label className="text-sm font-medium text-[#E0F2E9]">
  Field Label
</label>
```

### Select Dropdown
```jsx
<select className="border border-[#0F3D38] rounded-md px-3 py-2 bg-[#021C18] text-[#E0F2E9]">
  <option value="">Select...</option>
  <option value="val1">Option 1</option>
</select>
```

---

## 📱 Responsive Classes Reference

```jsx
// Breakpoints
base (mobile)    0px+
sm:  640px+
md:  768px+
lg:  1024px+
xl:  1280px+

// Example - Text scales with screen size
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"

// Example - Grid changes columns
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Example - Padding changes
className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
```

---

## 🔧 Utility Classes (Custom)

From `src/index.css`:

```css
/* Glowing shadow (use on highlighted elements) */
.shadow-glow {
  box-shadow: 0 4px 24px rgba(0, 230, 118, 0.2);
}

/* Card shadow (use on elevated elements) */
.shadow-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Gradient text effect */
.text-gradient {
  background: linear-gradient(to right, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gradient background */
.bg-gradient-glow {
  background: linear-gradient(to right, #00E676, #00BFA5);
}

/* Hide scrollbars */
.scrollbar-hide { }
```

---

## ✅ Component Checklist for New Pages

When creating a new page, ensure:

- [ ] Wrapped in `<PublicLayout>` component
- [ ] Hero section with: label, title with gradient highlight, description
- [ ] Content section(s) with alternating backgrounds
- [ ] Cards use hover effects: `hover:border-[#00E676]/30 hover:shadow-glow hover:-translate-y-1`
- [ ] All text colors are from palette (`#E0F2E9`, `#81C784`, `#00E676`)
- [ ] All backgrounds use palette (`#021C18`, `#044036`)
- [ ] Buttons use gradient or red variants
- [ ] Forms have focus states with green ring
- [ ] Responsive grid layouts work on mobile/tablet/desktop
- [ ] Icons use Lucide React
- [ ] All transitions are smooth: `transition-all duration-300`
- [ ] Page has CTA section at bottom

---

## 🎬 Common Page Structure

```jsx
import { Icon1, Icon2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PublicLayout from '@/components/layout/PublicLayout'

export default function NewPage() {
  return (
    <PublicLayout>
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-[#021C18]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#044036]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">Label</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
            Title <span className="text-gradient">Highlight</span>
          </h1>
          <p className="text-[#81C784] text-lg max-w-3xl mx-auto">Description...</p>
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <section className="py-20 bg-[#021C18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card component */}
          </div>
        </div>
      </section>

      {/* 3. ALTERNATE SECTION */}
      <section className="py-20 bg-[#044036]/20">
        {/* Different content */}
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-20 bg-[#021C18]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">CTA Title</h2>
          <p className="text-[#81C784] mb-8">Description...</p>
          <Button className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold rounded-full px-8 hover:shadow-glow">
            Call to Action
          </Button>
        </div>
      </section>
    </PublicLayout>
  )
}
```

---

## 🎨 Icon Styling Reference

```jsx
// Icon badge on card
<div className="w-14 h-14 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center">
  <Icon className="w-7 h-7 text-[#00E676]" />
</div>

// Icon with slight transparency
<Icon className="w-5 h-5 text-[#00E676]" />

// Icon with hover color change
<Icon className="w-4 h-4 text-[#81C784] group-hover:text-[#00E676]" />

// Icon in button
<Button>
  Action <Icon className="w-4 h-4 ml-2" />
</Button>
```

---

**Use this file as your quick reference while developing new pages!**
