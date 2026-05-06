# Student's Day — Design Document

> A modern, mobile-first web app for a high school event.
> Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## 🎯 Design Philosophy

- **Youthful & Engaging** — The interface should feel alive and energetic, matching the spirit of a school event
- **Clean & Readable** — Content-first layout with generous whitespace and clear typography
- **Mobile-First** — Every component designed for small screens first, then enhanced for desktop
- **No Dead Ends** — Every page has clear calls-to-action guiding users forward

---

## 🎨 Color Palette

The palette strictly follows the brand colors of the **Instituto Chapultepec Norte** logo: a deep navy blue background and a vibrant grass green accent.

### Primary (Chapultepec Green Scale)

| Token          | Hex       | Usage                            |
|----------------|-----------|----------------------------------|
| `--green-50`   | `#f4faeb` | Page backgrounds, subtle fills   |
| `--green-100`  | `#dcf3c8` | Card borders, badges, dividers   |
| `--green-200`  | `#bce999` | Input borders, hover states      |
| `--green-300`  | `#93d865` | Decorative particles, separators |
| `--green-400`  | `#6eb942` | Gradient endpoint, outline CTAs  |
| `--green-500`  | `#4fa32a` | Primary actions, gradient start  |
| `--green-600`  | `#3b821d` | Bracket labels, secondary accent |
| `--green-700`  | `#2c6314` | Emphasized text, active states   |

### Dark (Chapultepec Navy Scale)

| Token          | Hex       | Usage                            |
|----------------|-----------|----------------------------------|
| `--navy-50`    | `#f0f4f8` | Secondary borders                |
| `--navy-100`   | `#d9e2ec` | Muted backgrounds                |
| `--navy-600`   | `#243b53` | Secondary headings               |
| `--navy-800`   | `#142e63` | Dark gradient start              |
| `--navy-900`   | `#0a1b3f` | Main text, hero background       |

### Surfaces & Backgrounds

| Token              | Value                        | Usage                    |
|--------------------|------------------------------|--------------------------|
| `--bg`             | `#f8fafc`                    | Body background          |
| `--surface`        | `#ffffff`                    | Cards, form inputs       |
| `--surface-glass`  | `rgba(255, 255, 255, 0.85)`  | Navbar (glassmorphism)   |
| `--text`           | `var(--navy-900)`            | Primary body text        |
| `--text-muted`     | `#486581`                    | Descriptions, meta info  |

### Gradients

| Name              | Value                                              | Usage                       |
|-------------------|----------------------------------------------------|-----------------------------|
| `--gradient`      | `linear-gradient(135deg, #4fa32a, #6eb942)`        | Primary buttons, active nav |
| `--gradient-dark` | `linear-gradient(135deg, #142e63, #0a1b3f)`        | Hero background, tabs       |

### Category Tag Colors

| Category   | Background | Text      |
|------------|------------|-----------|
| Sports     | `#dcfce7`  | `#166534` |
| Arts       | `#fef3c7`  | `#92400e` |
| Academic   | `#dbeafe`  | `#1e40af` |
| Fun        | `#fce7f3`  | `#9d174d` |

---

## 🔤 Typography

**Font Family:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)

| Element          | Weight | Size                        | Notes                    |
|------------------|--------|-----------------------------|--------------------------|
| Hero title       | 800    | `clamp(2.8rem, 8vw, 5rem)` | Fluid scaling            |
| Page titles      | 800    | `clamp(2rem, 5vw, 3rem)`   | Fluid scaling            |
| Section titles   | 700    | `1.6rem`                    |                          |
| Card titles      | 700    | `1.15rem`                   |                          |
| Body text        | 400    | `0.92rem`                   | Line-height: 1.5         |
| Nav links        | 500    | `0.9rem`                    | `1rem` on mobile         |
| Stat numbers     | 800    | `2rem`                      | Gradient text fill       |
| Badges / tags    | 600    | `0.72–0.85rem`              | Uppercase, letter-spaced |

---

## 📐 Spacing & Layout

### Border Radius

| Token            | Value   | Usage                          |
|------------------|---------|--------------------------------|
| `--radius`       | `16px`  | Cards, countdown blocks, forms |
| `--radius-sm`    | `10px`  | Inputs, match blocks, mobile nav links |
| `--radius-full`  | `999px` | Buttons, pills, badges, nav links |

### Shadows (3-tier system)

| Token          | Value                              | Usage                  |
|----------------|------------------------------------|------------------------|
| `--shadow-sm`  | `0 1px 3px rgba(6,78,59,0.08)`     | Default card elevation |
| `--shadow-md`  | `0 4px 14px rgba(6,78,59,0.10)`    | Hover states, stats    |
| `--shadow-lg`  | `0 8px 30px rgba(6,78,59,0.12)`    | Active hover, toasts   |

### Grid Breakpoints

| Breakpoint  | Behavior                                            |
|-------------|-----------------------------------------------------|
| `< 480px`   | Single-column grids, smaller padding, compact stats  |
| `< 768px`   | Hamburger menu, stacked nav links, full-width cards  |
| `≥ 768px`   | Horizontal nav, multi-column grids                   |

---

## 🧩 Component Inventory

### Navigation Bar
- Fixed to top, `64px` height
- Glassmorphism: `backdrop-filter: blur(18px)` with semi-transparent white
- Active link gets gradient pill with glow shadow
- Hamburger menu on mobile (animated open/close with CSS transforms)

### Hero Section
- Full-viewport height with diagonal gradient background
- Floating particle animation (18 randomly-placed circles with `float` keyframe)
- Animated stat counters (count-up on page load)
- Dual CTA buttons: primary (gradient fill) and outline

### Countdown Timer
- 4 blocks (Days / Hours / Minutes / Seconds) separated by colons
- Auto-updates every second via `setInterval`
- Target date: **June 15, 2026, 8:00 AM**

### Activity Cards
- Emoji banner header (`140px` tall)
- Category tag pill (color-coded)
- Meta row showing time and available spots
- Filterable by category via pill buttons
- Staggered `slideIn` entrance animation

### Registration Form
- Max-width `520px`, centered
- Custom-styled select dropdowns (CSS arrow icon)
- Focus states: green border + green glow ring
- Toast notification on submit (slides up from bottom)

### Tournament Brackets
- Tabbed by sport (Basketball / Soccer / Volleyball)
- Match cards show two teams with scores
- Winner row highlighted with green background + gradient score badge
- Rounds displayed vertically (Quarter-Finals → Semi-Finals → Final)

### Schedule Page
- Week toggle tabs (Semana 1 / Semana 2)
- Day cards with green left accent border (amber for Fiesta, blue for Libre)
- "Today" detection logic with pulsing border glow and "📌 HOY" badge
- Exam badges for morning schedules
- Expandable activity rows (chevron icon animation, dropdown panel with location/time/desc)

### Winner Cards
- Top accent bar (4px gradient stripe)
- Medal emoji in a circular badge (gold/silver/bronze gradient)
- Activity name, winner name, and team/class

### Buttons

| Variant      | Style                                 |
|--------------|---------------------------------------|
| `btn--primary` | Gradient fill, white text, glow shadow |
| `btn--outline` | Green border, transparent background   |
| `btn--full`    | Full-width modifier                    |

---

## ✨ Animations & Micro-interactions

| Animation      | Keyframe       | Duration | Usage                        |
|----------------|----------------|----------|------------------------------|
| Page entrance  | `fadeUp`       | 450ms    | All page transitions         |
| Card entrance  | `slideIn`      | 400ms    | Activity cards (staggered)   |
| Floating dots  | `float`        | 4–9s     | Hero background particles    |
| Hover lift     | `translateY`   | 300ms    | Cards, stat blocks           |
| Button hover   | `translateY`   | 300ms    | All buttons (-2px lift)      |
| Arrow slide    | `translateX`   | 300ms    | Submit button arrow icon     |
| Hamburger      | `rotate/fade`  | 300ms    | Menu icon open/close         |
| Toast          | `translateY`   | 300ms    | Success notification slide-up |

**Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design standard easing)

---

## 📱 Responsive Behavior

### Mobile (< 768px)
- Navbar collapses to hamburger menu
- Nav links stack vertically in a dropdown panel
- Activity and winner grids become single-column
- Hero section reduces minimum height to `70vh`
- Touch-friendly tap targets (minimum `44px`)

### Desktop (≥ 768px)
- Horizontal navigation with pill-style links
- Multi-column grids: up to 3 columns for activities, auto-fit for info cards
- Max-width containers (`900px–1100px`) keep content readable

---

## 📁 File Structure

```
StudentDay/
├── index.html      # SPA markup — all 5 pages as <section> elements
├── style.css       # Complete design system + component styles
├── app.js          # Navigation, data, rendering, interactivity
└── design.md       # This document
```

---

## 🚀 Future Considerations

- **Backend Integration** — Form submissions, real-time bracket updates, user auth
- **Dark Mode** — Swap CSS custom properties for a dark theme variant
- **PWA Support** — Service worker + manifest for offline access and home screen install
- **Live Scores** — WebSocket integration for real-time bracket updates
- **Accessibility** — ARIA labels, keyboard navigation, focus management
- **i18n** — Multi-language support if the school has diverse student body
