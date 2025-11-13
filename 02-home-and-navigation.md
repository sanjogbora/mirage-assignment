# Home Screen & Core Navigation Structure

## Navigation Philosophy

The device operates on a **3-layer priority system**:

```
╔════════════════════════════════════════╗
║         NOW LAYER                      ║  ← Highest priority
║  "The one thing that matters right now"║    Auto-surfaces
╚════════════════════════════════════════╝
             ↓ (if nothing urgent)
╔════════════════════════════════════════╗
║       CONTEXT LAYER                    ║  ← Location/time aware
║  "What probably matters where you are" ║    Auto-surfaces
╚════════════════════════════════════════╝
             ↓ (if no context match)
╔════════════════════════════════════════╗
║        HOME LAYER                      ║  ← Manual navigation
║  "Choose what you want to do"          ║    User-driven
╚════════════════════════════════════════╝
```

### The Navigation Contract

**Universal rule:** Double-press ALWAYS returns to Home, from anywhere.

This creates a safe "reset" that users can rely on:
- Lost in a flow? Double-press.
- Context auto-surfaced something you don't want? Double-press.
- Want to manually navigate somewhere? Double-press to Home, then choose.

---

## Home Screen Design

### Screen Layout

```
┌─────────────────────────────────────────────┐ 480px wide
│                                             │
│         48px breathing room                 │
│                                             │
│   ╭─────────────────────────────────────╮  │
│   │         Trips & Tickets             │  │ ← Focused (yellow ring)
│   │         ─────────                   │  │
│   │         Your boarding passes,       │  │
│   │         metro cards, bookings       │  │
│   ╰─────────────────────────────────────╯  │
│                                             │
│          24px gap                           │
│                                             │
│   ┌─────────────────────────────────────┐  │
│   │         Explore Nearby              │  │
│   │         ──────────────              │  │
│   │         Places, food, tips for      │  │
│   │         where you are now           │  │
│   └─────────────────────────────────────┘  │
│                                             │
│          24px gap                           │
│                                             │
│   ┌─────────────────────────────────────┐  │
│   │         Navigate                    │  │
│   │         ────────                    │  │
│   │         Get walking directions      │  │
│   │         around the city             │  │
│   └─────────────────────────────────────┘  │
│                                             │
│          24px gap                           │
│                                             │
│   ┌─────────────────────────────────────┐  │
│   │         Music                       │  │
│   │         ─────                       │  │
│   │         Control your audio on       │  │
│   │         the go                      │  │
│   └─────────────────────────────────────┘  │
│                                             │
│         48px breathing room                 │
│                                             │
└─────────────────────────────────────────────┘
```

### Ball Interactions on Home

**Roll up/down:**
- Moves yellow focus ring between the 4 mode cards
- Smooth scrolling if cards extend beyond viewport
- The focused card has the yellow border (3px solid #FFB800)
- Unfocused cards have subtle gray border (1px solid #3A3A3C)

**Single press:**
- Enters the focused mode
- Card animates out to the left, new mode screen slides in from right
- Transition: 300ms ease-in-out

**Double press:**
- Already on Home, so this does nothing (or perhaps dims screen / shows settings)

**Long press:**
- Shows a quick "What's active?" overlay
- Small status indicators: "Music playing", "Navigation active in background"
- Press again or wait 2s to dismiss

---

## Home Screen Variations

### State 1: Clean Home (Nothing Active)

This is what you see when you manually navigate to Home and nothing is running in the background.

```
┌───────────────────────────────────────┐
│                                       │
│                                       │
│   ╭─────────────────────────────╮    │
│   │  Trips & Tickets            │    │ ← Yellow focus ring
│   │  ─────────                  │    │
│   │  Your boarding passes,      │    │
│   │  metro cards, bookings      │    │
│   ╰─────────────────────────────╯    │
│                                       │
│   ┌─────────────────────────────┐    │
│   │  Explore Nearby             │    │
│   └─────────────────────────────┘    │
│                                       │
│   ┌─────────────────────────────┐    │
│   │  Navigate                   │    │
│   └─────────────────────────────┘    │
│                                       │
│   ┌─────────────────────────────┐    │
│   │  Music                      │    │
│   └─────────────────────────────┘    │
│                                       │
└───────────────────────────────────────┘
```

### State 2: Home with Active Background Task

If music is playing or navigation is running, show a subtle indicator:

```
┌───────────────────────────────────────┐
│                                       │
│   ╭─────────────────────────────╮    │
│   │  Trips & Tickets            │    │
│   ╰─────────────────────────────╯    │
│                                       │
│   ┌─────────────────────────────┐    │
│   │  Explore Nearby             │    │
│   └─────────────────────────────┘    │
│                                       │
│   ┌─────────────────────────────┐    │
│   │  Navigate                   │    │
│   │  • Active to Coffee Bar     │    │ ← Small indicator
│   └─────────────────────────────┘    │   (bullet + yellow text)
│                                       │
│   ╭─────────────────────────────╮    │
│   │  Music                      │    │ ← Yellow focus ring
│   │  ♪ Now Playing              │    │
│   ╰─────────────────────────────╯    │
│                                       │
└───────────────────────────────────────┘
```

**Design decision:** Active modes show small inline status to give context without cluttering.

---

## Context Auto-Surface Behavior

### How Context Layer Works

The device continuously evaluates context:

```
Check NOW layer:
├─ Navigation active + turn in <100m? → Show navigation
├─ Boarding time in <45 min + at airport? → Show boarding pass
└─ No urgent NOW → Check CONTEXT layer

Check CONTEXT layer:
├─ Within 50m of metro station? → Show metro card
├─ GPS inside known restaurant? → Show restaurant recommender
├─ In tourist zone? → Check for local alerts
├─ Walking in interesting neighborhood? → Show Explore Nearby
└─ No context match → Show HOME
```

### Context Interruption Design

When context auto-surfaces a screen, the user should always know:

1. **Why this appeared** - subtle label at top
2. **How to dismiss it** - double-press reminder if it's their first time
3. **What else is happening** - small background task indicators

Example: Metro card auto-surfaces

```
┌───────────────────────────────────────┐
│  NEARBY                               │ ← Small label (Null Bold, 10px)
│                                       │    explaining WHY this appeared
│                                       │
│                                       │
│        London Underground             │
│        ──────────────────             │
│                                       │
│   ╭───────────────────────────────╮  │
│   │                               │  │
│   │      [QR CODE AREA]          │  │
│   │                               │  │
│   ╰───────────────────────────────╯  │
│                                       │
│        Zone 1-2 Daily Pass            │
│        £8.50 remaining                │
│                                       │
│                                       │
│  ○○ Double-press for Home            │ ← Hint (only shows first few times)
│                                       │
└───────────────────────────────────────┘
```

---

## Information Architecture Map

### Complete Screen Hierarchy

```
HOME
│
├─ Trips & Tickets
│  ├─ Boarding Pass (individual)
│  ├─ Metro Card (individual)
│  ├─ Hotel Booking (individual)
│  └─ All Tickets (list view)
│
├─ Explore Nearby
│  ├─ Places (carousel/list)
│  │  └─ Place Detail
│  ├─ Food (filtered view)
│  │  └─ Restaurant Detail
│  │     └─ Dish Recommendations (if inside restaurant)
│  └─ Local Alerts (if any at this location)
│
├─ Navigate
│  ├─ Start Navigation (destination input - TBD how)
│  ├─ Active Navigation
│  │  ├─ Turn-by-turn mode
│  │  └─ Overview map mode
│  └─ Recent/Saved Places
│
└─ Music
   ├─ Now Playing
   ├─ Playlists
   └─ Basic Controls
```

### Navigation Flows

**Entering a mode from Home:**
```
Home (focused on "Explore Nearby")
  → Single press
  → Card slides left, Explore screen slides in from right
  → Now in Explore mode
```

**Exiting back to Home:**
```
Any screen
  → Double press
  → Current screen slides left, Home slides in from right
  → Back on Home with last-focused mode card highlighted
```

**Context auto-surface interruption:**
```
Home (or any screen)
  → Device detects: "user near metro station"
  → Gentle fade transition (not a hard slide - it's system-initiated)
  → Metro card appears
  → "NEARBY" label at top
  → Double-press hint shown (first few times)
```

**Overriding context:**
```
Metro card auto-surfaced (you didn't ask for it)
  → You want Music instead
  → Double press → returns to Home
  → Roll to Music, single press → enters Music mode
```

---

## Edge Cases & Micro-interactions

### What if multiple contexts match?

Priority order:
1. NOW layer (urgent, time-sensitive)
2. CONTEXT layer - closest proximity
3. If tied, most recently used context wins

Example: You're at airport near metro station
- Boarding time is in 30 min → Show boarding pass (NOW layer wins)
- If boarding time > 2 hours → Show metro card (CONTEXT, closer proximity)

### What if you're in a mode and context wants to interrupt?

**Gentle interrupt pattern:**
- Small yellow pill notification appears at top of current screen
- "Tap to view: Boarding Pass"
- Doesn't force you out
- Single press switches to it
- Ignore it and it fades after 10 seconds

### First-time user experience

**On first boot:**
1. Home screen appears
2. Small animated hint: "Roll to explore, press to select"
3. Yellow focus ring pulses gently on first card
4. User experiments, learns the pattern

**Progressive hints:**
- First context surface → show "Double-press for Home" hint
- First long press → show "Hold for more options" hint
- After 5-10 interactions → hints stop appearing

---

## Visual Design Details

### Mode Card Anatomy

```
┌─────────────────────────────────────┐
│ 16px padding                        │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │  Mode Title                     │ │ ← Heading (24px, Perfectly 90s)
│ │  ──────────                     │ │ ← Decorative underline
│ │                                 │ │    (1px, matches text width)
│ │  Brief description of           │ │ ← Body (15px, Null Regular)
│ │  what this mode does            │ │    Color: #8E8E93 (mid gray)
│ │                                 │ │
│ │                                 │ │
│ │ [optional status indicator]     │ │ ← e.g., "♪ Now Playing"
│ │                                 │ │
│ └─────────────────────────────────┘ │
│ 16px padding                        │
└─────────────────────────────────────┘

Card styling:
- Background: #2C2C2E (charcoal mid)
- Border radius: 12px
- Border: 1px #3A3A3C (default) or 3px #FFB800 (focused)
- Min height: 88px (plenty of touch target)
- Margin: 24px between cards
```

### Transition Animations

**Mode entry (Home → Mode):**
```
[Home screen]
              →→→→→
                    [Mode screen slides in from right]
←←←←←
[Home screen slides out to left]

Timing: 300ms ease-in-out
Both screens move together (coupled motion)
```

**Mode exit (Mode → Home):**
```
[Mode screen]
              →→→→→
                    [Home screen slides in from right]
←←←←←
[Mode screen slides out to left]

Timing: 300ms ease-in-out
Feels symmetrical to entry
```

**Context auto-surface:**
```
[Current screen]
         ╱╲
        fade out (200ms)
         ╲╱

[Context screen]
         ╱╲
        fade in (300ms)
         ╲╱

Timing: 500ms total (slower than manual navigation)
Feels system-initiated, not user-driven
```

---

## Design Rationale

### Why 4 modes?

- Small enough to fit on one screen (no scrolling on Home)
- Each mode is distinct and learnable
- Maps to clear travel use cases
- Room for future expansion if needed

### Why vertical stack, not grid?

- Ball rolls naturally up/down (ergonomic)
- Clear linear progression through focus states
- Larger cards = more readable text
- One column = no ambiguity about what's focused

### Why "Trips & Tickets" first?

- Most urgent/important travel function
- Default focus on Home = quick access to boarding pass, metro card
- Single press from startup → immediately useful

### Why double-press as universal "Home"?

- Doesn't conflict with single press (selection)
- Doesn't conflict with long press (options)
- Quick enough to be reflexive
- Symmetric gesture (feels intentional, not accidental)

---

## Next Steps

With Home and navigation structure defined:
1. Each mode gets detailed screen-by-screen design
2. Context triggering rules get refined per mode
3. Interaction patterns established here cascade to all screens

Consistency check:
✓ Every screen can return to Home (double-press)
✓ Every screen has clear focus states (yellow ring)
✓ Every screen uses design system tokens
