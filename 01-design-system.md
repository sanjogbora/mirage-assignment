# Travel Companion Device - Design System

## Device Specifications

**Screen:** Small rectangular display (assume ~3.5" diagonal, 480×320px portrait orientation)
**Input:** Single 360° ball on the right side
**Context:** Handheld, one-handed operation, often used while moving

---

## Visual Language

### Core Philosophy
"Premium, slightly nostalgic, like a modern reinterpretation of classic travel tickets and metro boards"

**Mood words:**
- Calm, confident, opinionated
- Tactile, physical, deliberate
- Warm but not flashy
- Timeless, travels well

---

## Color System

### Primary Palette

```
BACKGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Deep Charcoal:     #1C1C1E  (base background)
Charcoal Mid:      #2C2C2E  (cards, elevated surfaces)
Charcoal Light:    #3A3A3C  (borders, subtle dividers)

FOREGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Off-White:         #E8E8E8  (primary text)
Mid Gray:          #8E8E93  (secondary text, metadata)
Dim Gray:          #48484A  (disabled, de-emphasized)

ACCENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Warm Yellow:       #FFB800  (primary accent, focus states)
Yellow Glow:       #FFB80033 (yellow at 20% opacity for subtle highlights)
Yellow Dark:       #CC9300  (pressed states)

SEMANTIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Alert Red:         #FF3B30  (warnings, errors - use sparingly)
Success Green:     #34C759  (confirmations, positive states)
Info Blue:         #0A84FF  (informational, not primary)
```

### Usage Rules

- **Yellow is precious** - only for: focus rings, primary CTAs, "now playing" indicators, active states
- **Never use pure white** (#FFFFFF) - always off-white (#E8E8E8) for softer contrast
- **Avoid color as only indicator** - pair with position, size, or typography weight
- **Semantic colors rarely** - most UI should be charcoal + yellow system

---

## Typography

### Font Stack

**Serif - Perfectly 90s**
- Headlines, hero numbers, flight codes, song titles
- Use for: anything that deserves weight and presence

**Sans - Null**
- Body text, lists, metadata, UI labels
- Use for: information density, readability

### Type Scale

```
HERO             48px / 52px line    Perfectly 90s Bold
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example: "SFO → LHR"
Use: Boarding pass routes, navigation instructions


TITLE            32px / 38px line    Perfectly 90s Regular
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example: "Boarding Pass"
Use: Screen titles, mode headers


HEADING          24px / 30px line    Perfectly 90s Regular
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example: "Flight BA283"
Use: Card titles, place names, restaurant names


BODY LARGE       18px / 24px line    Null Regular
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example: "Turn left in 120m"
Use: Primary readable content, descriptions


BODY             15px / 21px line    Null Regular
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example: "This cafe is loved by locals"
Use: Default body text, list items


METADATA         12px / 16px line    Null Medium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example: "2.3 km • Open now"
Use: Timestamps, distances, tags, secondary info


LABEL            10px / 14px line    Null Bold, All Caps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example: "BOARDING" "DELAYED" "NEARBY"
Use: Status labels, category tags, UI chrome
```

### Typography Rules

- **Serif for emotion, sans for information**
- **Max 3 font sizes per screen** to maintain hierarchy
- **Line length:** Keep text blocks under 45 characters on this small screen
- **Letter spacing:** Slightly increased (+0.02em) for labels and metadata
- **Number formatting:** Use tabular figures for times, distances, prices

---

## Spacing System

Based on 8px grid for consistency and rhythm:

```
4px   XXS  Micro spacing (between icon and text)
8px   XS   Tight coupling (within a component)
16px  S    Related items (list item padding)
24px  M    Section separation (between cards)
32px  L    Major sections (screen padding)
48px  XL   Screen top/bottom breathing room
```

### Layout Grid

```
┌─────────────────────────────────────────┐
│ 32px top padding                        │
│                                         │
│  16px │  CONTENT AREA  │ 16px          │
│  side │                │ side          │
│  pad  │                │ pad           │
│       │                │               │
│       │                │               │
│       │                │ (ball lives   │
│       │                │  here on      │
│       │                │  physical     │
│       │                │  device)      │
│                                         │
│ 32px bottom padding                     │
└─────────────────────────────────────────┘

Content safe area: 16px from edges
Exception: Full-bleed QR codes, maps can break this
```

---

## Components Library

### Focus Ring

The visual indicator of ball cursor position:

```
┌─────────────────────────────────────┐
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃  Focused Item               ┃  │  ← 3px solid #FFB800
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │     (Warm Yellow)
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Unfocused Item               │ │  ← 1px solid #3A3A3C
│  └───────────────────────────────┘ │     (Charcoal Light)
└─────────────────────────────────────┘

Rules:
- 8px corner radius for organic feel
- Focus ring animates in (0.2s ease)
- Pulsing glow effect on long press (focus ring + yellow glow)
```

### Card Component

Standard container for discrete pieces of information:

```
┌───────────────────────────────────────┐
│ ╭─────────────────────────────────╮   │
│ │  LABEL                          │   │  Background: #2C2C2E
│ │                                 │   │  Border: 1px #3A3A3C
│ │  Primary Text                   │   │  Radius: 12px
│ │  Secondary metadata             │   │  Padding: 16px
│ │                                 │   │
│ │  [placeholder: visual if needed]│   │
│ ╰─────────────────────────────────╯   │
└───────────────────────────────────────┘

States:
- Default: subtle border
- Focused: yellow focus ring
- Pressed: slightly darker background (#26262E)
```

### Button / Action Element

Rarely used - most actions are implicit via ball interactions:

```
┌─────────────────┐
│  Action Label   │  Background: #FFB800 (yellow)
└─────────────────┘  Text: #1C1C1E (dark charcoal)
                     Padding: 12px 24px
                     Radius: 8px
                     Font: Null Bold, 15px

Only use for:
- Critical confirmations ("Confirm Purchase")
- Explicit commits ("Start Navigation")
```

### Divider

Subtle separation between sections:

```
─────────────────────────────────────  1px solid #3A3A3C
```

Use sparingly - prefer whitespace for separation.

### Status Pill

For states like "Boarding", "On Time", "Popular":

```
┌──────────┐
│ BOARDING │  Background: #FFB80033 (yellow glow)
└──────────┘  Text: #FFB800 (warm yellow)
              Border: 1px #FFB800
              Padding: 4px 12px
              Radius: 16px (full pill)
              Font: Null Bold, 10px, All Caps
```

---

## Animation Principles

### Timing
- **Quick feedback:** 0.15s (button press, focus change)
- **Natural motion:** 0.3s (card sliding, screen transitions)
- **Deliberate reveals:** 0.5s (context changes, mode switching)

### Easing
- **Ease-out** for things appearing (responsive feel)
- **Ease-in-out** for things moving across screen (natural arc)
- **Spring** for ball-driven scrolling (physical continuity)

### Motion Rules
- **Ball rolls = continuous motion** → scroll should feel physically coupled
- **Ball clicks = discrete jumps** → clear state changes, no ambiguity
- **Reduce motion at speed** → if user is scrolling fast, reduce decorative animations

---

## Placeholder Image Treatment

When designs call for images (place photos, dish photos, album art):

```
┌─────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │  Background: #3A3A3C
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │  (Charcoal Light)
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │  With centered label:
│ ░░ [placeholder: name] ░░░░ │  "placeholder: dish image"
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │  Font: Null Regular, 12px
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │  Text: #8E8E93 (mid gray)
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────┘  Border: 1px dashed #48484A

Common ratios:
- Square: 1:1 (album art, place icons)
- Landscape: 16:9 (place photos, dish photos)
- Portrait: 3:4 (full-screen mode)
```

---

## Accessibility Considerations

1. **Contrast:** All text meets WCAG AA (4.5:1 minimum)
   - Off-white on deep charcoal: ~12:1 ✓
   - Mid gray on deep charcoal: ~5:1 ✓
   - Yellow on charcoal: ~8:1 ✓

2. **Touch targets** (for ball focus areas):
   - Minimum 44px height for focusable items
   - 8px minimum spacing between adjacent focusable items

3. **Feedback:**
   - Every ball action gets visual response (focus ring, press state)
   - Consider haptic feedback for physical device (out of scope for design)

4. **Readability:**
   - Minimum 15px body text
   - High contrast mode: swap to pure white text if needed

---

## Design Token Summary

For implementation, here's the quick reference:

```json
{
  "colors": {
    "bg": {
      "base": "#1C1C1E",
      "elevated": "#2C2C2E",
      "border": "#3A3A3C"
    },
    "text": {
      "primary": "#E8E8E8",
      "secondary": "#8E8E93",
      "disabled": "#48484A"
    },
    "accent": {
      "yellow": "#FFB800",
      "yellowGlow": "#FFB80033",
      "yellowDark": "#CC9300"
    },
    "semantic": {
      "error": "#FF3B30",
      "success": "#34C759",
      "info": "#0A84FF"
    }
  },
  "spacing": {
    "xxs": "4px",
    "xs": "8px",
    "s": "16px",
    "m": "24px",
    "l": "32px",
    "xl": "48px"
  },
  "radius": {
    "card": "12px",
    "focus": "8px",
    "button": "8px",
    "pill": "16px"
  },
  "typography": {
    "hero": "48px/52px Perfectly 90s Bold",
    "title": "32px/38px Perfectly 90s Regular",
    "heading": "24px/30px Perfectly 90s Regular",
    "bodyLarge": "18px/24px Null Regular",
    "body": "15px/21px Null Regular",
    "metadata": "12px/16px Null Medium",
    "label": "10px/14px Null Bold"
  },
  "animation": {
    "fast": "150ms",
    "normal": "300ms",
    "slow": "500ms"
  }
}
```

---

## Next: Applying This System

With this foundation established, every screen design will reference:
- Color tokens (never raw hex in designs)
- Type scale (never arbitrary sizes)
- Spacing system (8px grid always)
- Component patterns (reuse, don't reinvent)

This creates consistency and speeds up design iteration.
