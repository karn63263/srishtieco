# Srishti Eco Tech - Design System & Brand Guidelines

## 📋 Project Overview

This is a **React + TypeScript + Tailwind CSS** web application for Srishti Eco Tech, an environmental compliance and sustainability consulting firm. The project uses a modern dark theme with vibrant green accents, focusing on sustainability and professional branding.

**Tech Stack:**
- React 19.2.0
- TypeScript
- Tailwind CSS 3.4.19
- Vite (build tool)
- React Router 7.6.1
- Radix UI components
- Lucide React icons
- Sonner for toast notifications

---

## 🎨 Color Palette

### Primary Colors (CSS Custom Properties)

```css
:root {
  /* DARK BACKGROUNDS */
  --background: 170 87% 5%;           /* #021C18 - Deep Teal/Dark Background */
  --foreground: 145 50% 91%;          /* #E0F2E9 - Light Cream/Text */
  
  /* PRIMARY ACCENT - Main Brand Color */
  --primary: 145 100% 45%;            /* #00E676 - Neon Green */
  --primary-foreground: 170 87% 5%;   /* #021C18 - Dark text on green */
  
  /* SECONDARY - Lighter Background */
  --secondary: 170 87% 14%;           /* #044036 - Darker Teal */
  --secondary-foreground: 145 50% 91%;/* #E0F2E9 - Light text */
  
  /* ACCENT - Cyan/Turquoise Alternative */
  --accent: 174 100% 37%;             /* #00BFA5 - Cyan/Turquoise */
  --accent-foreground: 145 50% 91%;   /* #E0F2E9 - Light text */
  
  /* BORDERS & INPUTS */
  --border: 170 40% 18%;              /* #0F3D38 - Medium Teal */
  --input: 170 40% 18%;               /* #0F3D38 - Same as border */
  --ring: 145 100% 45%;               /* #00E676 - Neon Green focus ring */
  
  /* CARD COMPONENTS */
  --card: 170 87% 10%;                /* #023F39 - Slightly lighter background */
  --card-foreground: 145 50% 91%;     /* #E0F2E9 - Light text */
  
  /* POPOVER */
  --popover: 170 87% 8%;              /* #033230 - Very dark teal */
  --popover-foreground: 145 50% 91%;  /* #E0F2E9 - Light text */
  
  /* MUTED COLORS */
  --muted: 170 40% 18%;               /* #0F3D38 - Medium Teal */
  --muted-foreground: 140 30% 60%;    /* #81C784 - Medium green text */
  
  /* DESTRUCTIVE (Error/Delete) */
  --destructive: 0 72% 51%;           /* #FF6B6B - Red */
  --destructive-foreground: 0 0% 100%;/* #FFFFFF - White text */
  
  /* SIDEBAR (if needed for future) */
  --sidebar-background: 170 87% 6%;   /* #021C18 - Same as background */
  --sidebar-foreground: 145 50% 91%;  /* #E0F2E9 - Light text */
  --sidebar-primary: 145 100% 45%;    /* #00E676 - Neon Green */
  --sidebar-primary-foreground: 170 87% 5%; /* #021C18 - Dark */
  --sidebar-accent: 170 87% 12%;      /* #033F38 - Dark Teal */
  --sidebar-accent-foreground: 145 50% 91%; /* #E0F2E9 - Light */
  --sidebar-border: 170 40% 18%;      /* #0F3D38 - Medium Teal */
  --sidebar-ring: 145 100% 45%;       /* #00E676 - Neon Green */
}
```

### Color Usage at a Glance

| Color | Hex | Usage | Variable |
|-------|-----|-------|----------|
| Deep Teal | `#021C18` | Main background across all pages | `--background` |
| Neon Green | `#00E676` | Primary CTAs, accents, highlights, active states | `--primary` |
| Cyan | `#00BFA5` | Secondary accents, gradients with green | `--accent` |
| Light Cream | `#E0F2E9` | Primary text color for headings and body | `--foreground` |
| Medium Green | `#81C784` | Secondary text, descriptions, muted text | `--muted-foreground` |
| Darker Teal | `#044036` | Card backgrounds, hover states, borders | `--secondary` |
| Red | `#FF6B6B` | Error states, destructive actions, danger buttons | `--destructive` |

---

## 📐 Typography

### Fonts
```css
/* Body Text */
font-family: 'Inter', system-ui, sans-serif;

/* Headings */
font-family: 'Poppins', system-ui, sans-serif;
```

### Size Scale
- **h1**: `text-4xl lg:text-5xl` - Page hero titles
- **h2**: `text-3xl` - Section titles
- **h3**: `text-2xl` - Card titles, subsection headers
- **h4**: `text-lg` - Smaller headings
- **Body**: `text-base` - Default body text
- **Small**: `text-sm` - Secondary text, descriptions
- **Extra Small**: `text-xs` - Badge labels, tiny text

### Weight
- **Bold**: `font-bold` (700) - Headings (h1-h3)
- **Semibold**: `font-semibold` (600) - Subheadings, navigation
- **Medium**: `font-medium` (500) - Section titles, buttons
- **Regular**: `font-normal` (400) - Body text

### Line Height
- Headings: `leading-none`
- Body text: `leading-relaxed` (1.625)
- Descriptive text: `leading-relaxed`

**Example Usage:**
```html
<h1 class="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins']">
  Pioneering Environmental
  <span class="text-gradient">Compliance</span>
</h1>

<p class="text-[#81C784] text-lg leading-relaxed">
  Comprehensive solution description...
</p>
```

---

## 🎚️ Border Radius

CSS Variable: `--radius: 0.625rem;` (10px)

| Class | Size | Calculation |
|-------|------|-------------|
| `rounded-xs` | 4px | `calc(var(--radius) - 6px)` |
| `rounded-sm` | 6px | `calc(var(--radius) - 4px)` |
| `rounded-md` | 8px | `calc(var(--radius) - 2px)` |
| `rounded-lg` | 10px | `var(--radius)` |
| `rounded-xl` | 14px | `calc(var(--radius) + 4px)` |
| `rounded-2xl` | 16px | Default `rounded-2xl` |
| `rounded-3xl` | 24px | Larger containers |
| `rounded-full` | 9999px | Pill buttons, complete circles |

**Common Usage:**
```html
<!-- Small rounded buttons -->
<button class="rounded-lg px-4 py-2">Button</button>

<!-- Large card sections -->
<div class="rounded-2xl p-8 bg-[#044036]/30">Card</div>

<!-- Pill-shaped CTAs -->
<button class="rounded-full px-8 py-3">Get Started</button>
```

---

## 🌈 Custom Utilities (in `index.css`)

```css
.shadow-glow {
  box-shadow: 0 4px 24px rgba(0, 230, 118, 0.2);
}
/* Used on hover effects and prominent elements */

.shadow-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
/* Used on image cards and elevated sections */

.text-gradient {
  background: linear-gradient(to right, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
/* Green-to-cyan gradient text for highlights in headings */

.bg-gradient-glow {
  background: linear-gradient(to right, #00E676, #00BFA5);
}
/* For button backgrounds */

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbars on custom scroll areas */
```

---

## 🎯 Component Specifications

### Buttons

#### Button Variants

**1. Default (Primary - Main CTA)**
```html
<Button class="bg-primary text-primary-foreground hover:bg-primary/90">
  Action Button
</Button>
```
- **Background**: `#00E676` (Neon Green)
- **Text**: `#021C18` (Dark)
- **Hover**: `bg-primary/90` (slightly darker green)
- **Transition**: All properties, all 300ms

**2. Gradient Variant (Premium CTA)**
```html
<Button class="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold rounded-full px-6 hover:shadow-glow">
  Premium Action
</Button>
```
- **Background**: Green to Cyan gradient
- **Hover Effect**: `shadow-glow` (glowing effect)
- **Border Radius**: `rounded-full` (pill-shaped)

**3. Destructive (Secondary Red)**
```html
<Button class="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white">
  Get Consultation
</Button>
```
- **Background**: `#FF6B6B` (Red)
- **Hover**: `bg-[#FF6B6B]/90`
- **Use Case**: "Get Consultation", secondary important actions

**4. Ghost (Minimal)**
```html
<Button variant="ghost" class="text-[#81C784] hover:text-[#E0F2E9] hover:bg-[#044036]/30">
  Ghost Button
</Button>
```
- **Background**: Transparent
- **Hover Background**: `#044036/30` (tinted)
- **Use Case**: Less prominent actions

**5. Outline (Secondary)**
```html
<Button variant="outline" class="border border-[#044036]/50 hover:bg-[#044036]/30">
  Outlined
</Button>
```
- **Border**: Subtle teal
- **Hover**: Slight background tint

#### Button Sizes

| Size | Class | Dimensions | Use Case |
|------|-------|------------|----------|
| Small | `size="sm"` | `h-8` | Secondary CTAs |
| Default | `size="default"` | `h-9` | Standard buttons |
| Large | `size="lg"` | `h-10` | Primary CTAs |
| Icon | `size="icon"` | `size-9` | Icon-only buttons |

**Button Transitions:**
```css
transition-all   /* Applied to all variants */
duration-300     /* Smooth transitions */
hover:bg-primary/90  /* Color fade on hover */
hover:shadow-glow    /* Glow effect on premium buttons */
hover:shadow-lg      /* Shadow lift on hover */
```

### Cards

**Card Container**
```html
<div class="p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
  <!-- Content -->
</div>
```

**Card Features:**
- **Background**: `#044036/30` (semi-transparent dark teal)
- **Border**: `border-[#044036]/50` (subtle teal border)
- **Hover State**:
  - Border changes to: `border-[#00E676]/30` (green tint)
  - Shadow adds: `shadow-glow` (green glow)
  - Lifts up: `-translate-y-1` (moves up 4px)
  - Smooth transition: `transition-all duration-300`

**Card with Image**
```html
<div class="relative rounded-2xl overflow-hidden border border-[#044036]/50">
  <img src="..." alt="..." class="w-full h-72 object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-[#021C18]/60 to-transparent" />
</div>
```
- Image overlay gradient from dark to transparent (top-to-bottom reverse)
- Improves text readability if text is placed over it

### Form Inputs

**Input Field**
```html
<input 
  type="text" 
  class="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base 
         focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
         transition-[color,box-shadow] outline-none"
  placeholder="Enter text..."
/>
```

**Input Styling:**
- **Background**: Transparent with subtle tint when dark mode
- **Border**: `border-[#0F3D38]` (medium teal)
- **Text**: `#E0F2E9` (light cream)
- **Placeholder**: `#81C784` (medium green)
- **Focus Styles**:
  - Border becomes: `#00E676` (neon green)
  - Ring appears: `0 0 0 3px rgba(0, 230, 118, 0.5)`
  - Smooth transition

**Textarea** - Same styling as input + `min-h-16`

**Form Labels**
```html
<label class="text-sm font-medium text-[#E0F2E9]">
  Your Name
</label>
```

### Navigation

**Desktop Navigation**
```html
<Link 
  to="/path" 
  class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
         text-[#81C784] hover:text-[#E0F2E9] hover:bg-[#044036]/30
         active:text-[#00E676] active:bg-[#044036]/50"
>
  Menu Item
</Link>
```

**Navigation States:**
- **Default**: `text-[#81C784]` (medium green)
- **Hover**: `text-[#E0F2E9]` (light) + `bg-[#044036]/30` (subtle background)
- **Active**: `text-[#00E676]` (neon green) + `bg-[#044036]/50` (stronger background)
- **Transition**: All properties over 300ms

**Mobile Menu**
- Same styling as desktop
- Full width on small screens
- Slide down animation (handled by React state)

### Badges & Tags

**Icon Badge (on Cards)**
```html
<div class="w-14 h-14 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-6 group-hover:bg-[#00E676]/20 transition-colors">
  <Icon className="w-7 h-7 text-[#00E676]" />
</div>
```

**Icon Badge Variations:**
```html
<!-- Green badge -->
<div class="bg-[#00E676]/10 border border-[#00E676]/20">
  
<!-- Cyan badge -->
<div class="bg-[#00BFA5]/10 border border-[#00BFA5]/20">

<!-- On hover, opacity increases -->
group-hover:bg-[#00E676]/20
```

### Sections & Backgrounds

**Full-Width Hero Background**
```html
<section class="relative pt-32 pb-20 bg-[#021C18]">
  <div class="absolute inset-0 bg-gradient-to-b from-[#044036]/20 to-transparent" />
  <div class="relative ...">Content</div>
</section>
```
- **Solid background**: `#021C18`
- **Gradient overlay**: Teal fade from top (adds depth)
- **Padding**: `pt-32 pb-20` (128px top, 80px bottom)

**Secondary Background Section**
```html
<section class="py-20 bg-[#044036]/20">
  <!-- Content -->
</section>
```
- Background is tinted teal for variation
- Padding: `py-20` (80px top/bottom)

---

## ✨ Hover & Interactive Effects

### General Hover Patterns

**1. Subtle Lift & Glow**
```html
class="hover:shadow-glow hover:-translate-y-1"
```
- Card moves up 4px (`-translate-y-1`)
- Green glow appears
- Used on service cards, industry cards

**2. Color Transition**
```html
class="transition-all duration-300 hover:text-[#00E676]"
```
- Smooth color change from muted green to bright green
- Used on links, text

**3. Background Fade**
```html
class="hover:bg-[#044036]/30"
```
- Background tint appears on hover
- Used on buttons, input areas

**4. Border Highlight**
```html
class="hover:border-[#00E676]/30"
```
- Border becomes green-tinted on hover
- Used on cards

**5. Icon Color Change**
```html
class="group-hover:bg-[#00E676]/20 group-hover:text-[#00E676]"
```
- Icon container background brightens
- Used on icon badges within group elements

### Focus States (Keyboard Navigation)

```css
focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
```
- Neon green border
- Semi-transparent green ring (3px)
- Indicates keyboard focus for accessibility

---

## 🎭 Animation & Motion

### Tailwind Animation Classes Used

**1. Spinner Animation**
```html
<div class="w-8 h-8 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin" />
```
- Used for loading states
- Neon green border with transparent top
- Continuous rotation

**2. Transitions**
```css
transition-all duration-300    /* Smooth transitions */
transition-colors duration-300 /* Color changes only */
transition-[color,box-shadow] duration-300  /* Specific properties */
```

**3. Custom Keyframes** (in tailwind.config.js)
```css
"accordion-down": "accordion-down 0.2s ease-out"
"accordion-up": "accordion-up 0.2s ease-out"
"caret-blink": "caret-blink 1.25s ease-out infinite"
```

### Particle Canvas Animation
The Home page features an animated particle system:
```javascript
// In Home.tsx - ParticleCanvas component
- 600 particles flowing across the screen
- Colors: Green (#00E676), Cyan (#00BFA5), Light Green (#81C784)
- Creates dynamic background with subtle movement
- Particles have gradient glow effect
```

**Particle Features:**
- Responsive sizing
- Noise-based flow field
- Semi-transparent rendering (8% opacity per frame)
- Gradient glow for each particle

---

## 🏗️ Layout & Spacing

### Container
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Full width content with max-width constraint -->
</div>
```
- **Max Width**: `7xl` (80rem / 1280px)
- **Responsive Padding**: 
  - Mobile: `px-4` (16px)
  - Tablet: `sm:px-6` (24px)
  - Desktop: `lg:px-8` (32px)

### Section Padding
| Section | Class | Padding |
|---------|-------|---------|
| Hero | `pt-32 pb-20` | 128px top, 80px bottom |
| Content | `py-20` | 80px top/bottom |
| Compact | `py-12` | 48px top/bottom |

### Grid Layouts
```html
<!-- 2-column grid (wraps on mobile) -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

<!-- 4-column grid (3 on tablet, 1 on mobile) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

<!-- Responsive gap -->
gap-6    <!-- 24px -->
gap-8    <!-- 32px -->
gap-12   <!-- 48px -->
gap-16   <!-- 64px -->
```

---

## 📱 Responsive Breakpoints

Tailwind's default breakpoints are used:

| Prefix | Min-Width | Use |
|--------|-----------|-----|
| (none) | 0px | Mobile-first |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktops |
| `xl:` | 1280px | Large desktops |
| `2xl:` | 1536px | Extra large |

**Example:**
```html
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Scales from 2xl on mobile to 5xl on desktop
</h1>
```

---

## 🎨 Sections Breakdown

### Page Sections Pattern

Each page follows a consistent structure:

**1. Hero Section**
```html
<section class="relative pt-32 pb-20 bg-[#021C18]">
  <div class="absolute inset-0 bg-gradient-to-b from-[#044036]/20 to-transparent" />
  <div class="relative max-w-7xl mx-auto px-4">
    <span class="text-[#00E676] text-sm font-medium uppercase tracking-wider">
      Section Label
    </span>
    <h1 class="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins']">
      Main Title <span class="text-gradient">Highlight</span>
    </h1>
    <p class="text-[#81C784] text-lg">Description...</p>
  </div>
</section>
```

**2. Content Section**
```html
<section class="py-20 bg-[#021C18]">
  <div class="max-w-7xl mx-auto px-4">
    <!-- Grid or list of items -->
  </div>
</section>
```

**3. Alternative Background Section**
```html
<section class="py-20 bg-[#044036]/20">
  <!-- Different background for visual break -->
</section>
```

---

## 📋 Component Library Reference

### Available UI Components (from `src/components/ui/`)

| Component | Usage | Key Features |
|-----------|-------|--------------|
| **Button** | Primary / Secondary actions | Variants: default, ghost, outline, destructive; Sizes: sm, default, lg, icon |
| **Card** | Content containers | CardHeader, CardTitle, CardDescription, CardAction |
| **Input** | Text fields | Auto-focus styling, validation states |
| **Textarea** | Multi-line text | Similar to Input with min-h-16 |
| **Label** | Form labels | Accessible labeling for inputs |
| **Select** | Dropdown menus | SelectTrigger, SelectContent, SelectItem |
| **Accordion** | Collapsible sections | AccordionItem, AccordionTrigger, AccordionContent |
| **Dialog** | Modal popups | DialogTrigger, DialogContent, DialogHeader, DialogFooter |
| **Tabs** | Tabbed navigation | TabsList, TabsTrigger, TabsContent |
| **Tooltip** | Hover tooltips | TooltipTrigger, TooltipContent |
| **Toast/Sonner** | Notifications | Using Sonner library |

---

## 🚀 Style Application in New Pages

When creating a new page, follow this template:

```typescript
import { Link } from 'react-router'
import { Icon1, Icon2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PublicLayout from '@/components/layout/PublicLayout'

export default function NewPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#021C18]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#044036]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#00E676] text-sm font-medium uppercase tracking-wider">
            Page Label
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#E0F2E9] font-['Poppins'] mt-3 mb-6">
            Main Title <span className="text-gradient">Highlight</span>
          </h1>
          <p className="text-[#81C784] text-lg max-w-3xl mx-auto">
            Description paragraph...
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-[#021C18]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Items */}
            <div className="group p-6 rounded-2xl bg-[#044036]/30 border border-[#044036]/50 hover:border-[#00E676]/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-5 group-hover:bg-[#00E676]/20 transition-colors">
                <Icon1 className="w-7 h-7 text-[#00E676]" />
              </div>
              <h3 className="text-lg font-semibold text-[#E0F2E9] font-['Poppins'] mb-3">
                Title
              </h3>
              <p className="text-[#81C784] text-sm leading-relaxed">
                Description...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#044036]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#E0F2E9] font-['Poppins'] mb-4">
            Section Title
          </h2>
          <p className="text-[#81C784] mb-8">Description...</p>
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-[#00E676] to-[#00BFA5] text-[#021C18] font-semibold px-8 rounded-full hover:shadow-glow">
              Call to Action
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
```

---

## 🎯 Color Quick Reference for Copy-Paste

```css
/* Main Colors */
bg-[#021C18]         /* Dark background */
text-[#E0F2E9]       /* Light text */
text-[#00E676]       /* Neon green - primary */
text-[#00BFA5]       /* Cyan - secondary */
text-[#81C784]       /* Medium green - muted text */
bg-[#044036]         /* Dark teal - cards, hover */
bg-[#FF6B6B]         /* Red - destructive */

/* With Opacity */
bg-[#044036]/30      /* 30% opacity teal (cards) */
bg-[#044036]/50      /* 50% opacity teal (stronger) */
bg-[#00E676]/10      /* 10% opacity green (badge bg) */
border-[#044036]/50  /* 50% opacity teal border */
hover:border-[#00E676]/30  /* Green border on hover */
```

---

## 🔑 Key Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| Primary Color | `#00E676` | Buttons, accents, focus states |
| Secondary Color | `#00BFA5` | Gradients, alternative accents |
| Text Color | `#E0F2E9` | Headings, primary body text |
| Muted Text | `#81C784` | Secondary text, descriptions |
| Background | `#021C18` | Page backgrounds |
| Card Background | `#044036` | Card containers, hover states |
| Border | `#0F3D38` | Subtle dividers, input borders |
| Error | `#FF6B6B` | Destructive actions |
| Border Radius | `10px` | Standard corners |
| Transition | `300ms` | All interactive changes |
| Shadow Glow | `0 4px 24px rgba(0, 230, 118, 0.2)` | Prominent elements |
| Shadow Card | `0 8px 32px rgba(0, 0, 0, 0.3)` | Card elevation |

---

## 🛠️ Best Practices for New Pages

1. **Always use PublicLayout wrapper** - Ensures header/footer consistency
2. **Follow section background pattern** - Alternate between `bg-[#021C18]` and `bg-[#044036]/20`
3. **Use text-gradient class** for highlighted parts in headings
4. **Add icon badges** for cards - `w-14 h-14 rounded-xl bg-[#00E676]/10`
5. **Apply hover effects** - `hover:border-[#00E676]/30 hover:shadow-glow hover:-translate-y-1`
6. **Maintain spacing** - `py-20` for sections, `pt-32 pb-20` for heroes
7. **Use responsive grid** - `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
8. **Keep button variants consistent** - Gradient for primary, red for secondary, ghost for tertiary
9. **Always include transition classes** - `transition-all duration-300`
10. **Test on mobile, tablet, desktop** - Use responsive classes appropriately

---

## 📚 Resources

- **Color System**: CSS Custom Properties in `src/index.css`
- **Tailwind Config**: `tailwind.config.js` (border radius, animations, colors)
- **Component Examples**: Each `.tsx` file in `src/components/ui/`
- **Page Examples**: Each file in `src/pages/`
- **Layout**: `src/components/layout/PublicLayout.tsx`

---

**Last Updated**: 2 July 2026
**Project**: Srishti Eco Tech Solutions
**Design System Version**: 1.0
