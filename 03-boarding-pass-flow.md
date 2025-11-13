# Boarding Pass Flow

## Use Case Context

**Scenario:** You're at the airport. Your phone is in your bag. You pull out the device to board.

**Emotional needs:**
- Confidence: "Everything I need is here"
- Speed: "I can present this instantly"
- Legibility: "Agents can scan this immediately"
- No fumbling: "I don't have to pinch, zoom, or scroll"

**Critical success factors:**
- QR/barcode must be scannable from the device screen
- Essential info must be readable at a glance
- Must work under pressure (security line, boarding queue, gate agent waiting)
- Must handle multi-leg trips (outbound, return, connections)

---

## Screen States

### State 1: Scan Mode (Default)

This is the "present to agent" view - optimized for scanning.

```
┌─────────────────────────────────────────┐
│                                         │
│         BOARDING                        │ ← Status pill
│                                         │   (yellow, "BOARDING", "ON TIME", etc.)
│                                         │
│                                         │
│         BA 283                          │ ← Flight number
│                                         │   (Hero, 48px, Perfectly 90s Bold)
│     SFO → LHR                           │ ← Route
│                                         │   (Hero, 48px, Perfectly 90s Bold)
│                                         │
│                                         │
│                                         │
│   ╔═══════════════════════════════╗    │
│   ║                               ║    │
│   ║                               ║    │
│   ║                               ║    │
│   ║      QR CODE                  ║    │ ← Large, scannable
│   ║      (large, centered)        ║    │   Background: white
│   ║                               ║    │   Padding: 24px
│   ║                               ║    │   Border: none
│   ║                               ║    │   Size: ~200px square
│   ╚═══════════════════════════════╝    │
│                                         │
│                                         │
│   17:45  •  Gate 52  •  Seat 24A       │ ← Essential info
│                                         │   (Metadata, 12px, Null Medium)
│                                         │   Color: #8E8E93
│                                         │
│                                         │
│   ○ Roll for details                   │ ← Subtle hint
│                                         │   (Metadata, 10px, #48484A)
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **QR first, details second** - When you pull this out at security or gate, scanning is the priority
2. **White QR background** - Maximum contrast for reliable scanning (breaks dark theme intentionally)
3. **Minimal text** - Flight number, route, and key details only
4. **Status pill** - Clear, calm indicator (not alarming even if "DELAYED")
5. **Generous whitespace** - No clutter, easy to find the QR instantly

**Ball interactions in Scan Mode:**

- **Roll down** → Transitions to Details Mode
- **Single press** → Locks screen (prevents accidental dimming, max brightness)
  - Small yellow indicator appears: "🔒 Screen locked"
  - Press again to unlock
- **Double press** → Returns to Home (or Trips & Tickets if you came from there)
- **Long press** → Shows other passes if you have multiple (see below)

---

### State 2: Details Mode

Roll down from Scan Mode to see more information.

```
┌─────────────────────────────────────────┐
│                                         │
│         BOARDING                        │
│                                         │
│                                         │
│         British Airways                 │ ← Airline name
│         ───────────────                 │   (Title, 32px, Perfectly 90s)
│                                         │
│         Flight BA 283                   │ ← Flight details
│         San Francisco (SFO) →           │   (Body Large, 18px, Null)
│         London Heathrow (LHR)           │
│                                         │
│                                         │
│   ┌───────────────────────────────┐    │
│   │  Departure                    │    │ ← Info cards
│   │  Wednesday, March 15          │    │   (Background: #2C2C2E)
│   │  17:45                        │    │
│   └───────────────────────────────┘    │
│                                         │
│   ┌───────────────────────────────┐    │
│   │  Gate 52  •  Boarding 17:15   │    │
│   └───────────────────────────────┘    │
│                                         │
│   ┌───────────────────────────────┐    │
│   │  Seat 24A  •  Economy         │    │
│   └───────────────────────────────┘    │
│                                         │
│                                         │
│   ╔═══════════════╗                    │
│   ║               ║                    │ ← Smaller QR
│   ║   QR CODE     ║                    │   Still accessible
│   ║               ║                    │   Size: ~120px square
│   ╔═══════════════╝                    │
│                                         │
│   ○ Roll up for scan mode              │
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **Information hierarchy** - Full airline name, expanded route, structured cards for details
2. **Smaller QR** - Still there if needed, but not the focus
3. **Grouped info** - Departure, Gate/Boarding, Seat/Class in separate cards
4. **Readable at a glance** - You might check this while walking to gate

**Ball interactions in Details Mode:**

- **Roll up** → Returns to Scan Mode
- **Roll down** → Scrolls if more details exist (baggage info, booking reference, etc.)
- **Single press** → No action (or same lock screen feature)
- **Double press** → Returns to Home
- **Long press** → Shows other passes

---

### State 3: Multiple Passes View

When you have multiple tickets (outbound + return, or connections), long press reveals this:

```
┌─────────────────────────────────────────┐
│                                         │
│         Your Flights                    │
│         ────────────                    │
│                                         │
│                                         │
│   ╭─────────────────────────────────╮  │ ← Currently viewing
│   │  BA 283  SFO → LHR              │  │   (Yellow focus ring)
│   │  Today, 17:45  •  Boarding      │  │
│   ╰─────────────────────────────────╯  │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  BA 284  LHR → SFO              │  │ ← Return flight
│   │  Mar 22, 11:30  •  Confirmed    │  │   (Not focused)
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  UA 1532  LHR → MAN             │  │ ← Connection
│   │  Mar 22, 16:20  •  Confirmed    │  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   ○ Roll to select, press to view      │
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions in Multiple Passes:**

- **Roll up/down** → Moves focus ring between passes
- **Single press** → Opens the focused pass in Scan Mode
- **Double press** → Returns to previous screen (or Home)
- **Long press** → Closes this overlay, returns to current pass

**Design decision:** This is a quick switcher, not a full ticket management screen. For that, you'd go to Home → Trips & Tickets → All Tickets.

---

## Context Auto-Surface Behavior

### Trigger Conditions

The boarding pass auto-surfaces when:

1. **Time-based:**
   - Boarding time is within 45 minutes
   - Departure time is within 2 hours (if no boarding time available)

2. **Location-based:**
   - GPS detects you're at the departure airport
   - Combined with time condition above

3. **Priority:**
   - If you have multiple flights today, show the NEXT one
   - If you're at the airport with multiple upcoming flights, show the soonest

### Auto-Surface Screen

When context triggers this, it appears with context label:

```
┌─────────────────────────────────────────┐
│  NOW                                    │ ← Context label
│                                         │   (Small, top left, Null Bold 10px)
│                                         │
│         BOARDING                        │
│                                         │
│                                         │
│         BA 283                          │
│     SFO → LHR                           │
│                                         │
│                                         │
│   ╔═══════════════════════════════╗    │
│   ║                               ║    │
│   ║      QR CODE                  ║    │
│   ║                               ║    │
│   ╚═══════════════════════════════╝    │
│                                         │
│   17:45  •  Gate 52  •  Seat 24A       │
│                                         │
│                                         │
│   ○○ Double-press for Home             │ ← First-time hint
│                                         │
└─────────────────────────────────────────┘
```

---

## Status Indicators

### Status Pill Variations

**On Time (default):**
```
┌────────────┐
│  BOARDING  │  Background: #FFB80033 (yellow glow)
└────────────┘  Border: 1px #FFB800
                Text: #FFB800
```

**Delayed:**
```
┌───────────────────┐
│  DELAYED · 18:30  │  Background: #FF3B3033 (red glow)
└───────────────────┘  Border: 1px #FF3B30
                       Text: #FF3B30
                       Shows new time
```

**Gate Changed:**
```
┌──────────────────────┐
│  GATE CHANGED · 47   │  Background: #0A84FF33 (blue glow)
└──────────────────────┘  Border: 1px #0A84FF
                          Text: #0A84FF
                          Shows new gate
```

**Boarding:**
```
┌────────────┐
│  BOARDING  │  Background: #34C75933 (green glow)
└────────────┘  Border: 1px #34C759
                Text: #34C759
                Active, happening now
```

**Departed / Past:**
```
┌───────────┐
│  DEPARTED │  Background: none
└───────────┘  Border: 1px #48484A
               Text: #8E8E93 (dimmed)
               No longer active
```

---

## Edge Cases

### What if QR code doesn't load?

```
┌─────────────────────────────────────────┐
│                                         │
│         BA 283                          │
│     SFO → LHR                           │
│                                         │
│                                         │
│   ╔═══════════════════════════════╗    │
│   ║                               ║    │
│   ║   Booking Reference           ║    │ ← Fallback: show
│   ║                               ║    │   alphanumeric code
│   ║   ABC123XYZ                   ║    │   in large, mono text
│   ║                               ║    │
│   ║   (QR unavailable)            ║    │
│   ╚═══════════════════════════════╝    │
│                                         │
│   17:45  •  Gate 52  •  Seat 24A       │
│                                         │
│   ○ Long press to retry                │ ← Action hint
│                                         │
└─────────────────────────────────────────┘
```

**Long press** attempts to re-fetch the QR code.

### What if there's no boarding time yet?

Show departure time prominently, status = "Confirmed" instead of "Boarding"

### What if you're checking in remotely (not at airport)?

No auto-surface. Must manually navigate: Home → Trips & Tickets → Select pass.

### Multi-passenger tickets?

If one booking reference covers multiple passengers:

```
┌─────────────────────────────────────────┐
│         BA 283                          │
│     SFO → LHR                           │
│                                         │
│   ╔═══════════════════════════════╗    │
│   ║      QR CODE (Passenger 1)    ║    │
│   ╚═══════════════════════════════╝    │
│                                         │
│   Seat 24A (You)                       │
│                                         │
│   ○ Roll for other passengers          │ ← Hint
│                                         │
└─────────────────────────────────────────┘
```

Roll down shows other passengers' QR codes in a carousel.

---

## Flow Diagram

### Complete Boarding Pass Journey

```
┌─────────────────────────────────────────────────────────────┐
│                       ENTRY POINTS                          │
└─────────────────────────────────────────────────────────────┘
                │                │
                │                │
    ┌───────────┴────┐     ┌────┴──────────┐
    │  Auto-surface  │     │    Manual     │
    │  (NOW layer)   │     │  Navigation   │
    └───────┬────────┘     └────┬──────────┘
            │                   │
            └─────────┬─────────┘
                      ↓
            ┌─────────────────────┐
            │   SCAN MODE         │ ← Default view
            │   (QR + essentials) │
            └─────────┬───────────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
    Roll down    Single press  Long press
         │            │            │
         ↓            ↓            ↓
 ┌──────────────┐ ┌───────┐  ┌──────────────┐
 │ DETAILS MODE │ │ Lock  │  │ MULTI-PASS   │
 │ (full info)  │ │Screen │  │ SELECTOR     │
 └──────┬───────┘ └───┬───┘  └──────┬───────┘
        │             │              │
   Roll up      Press again     Select pass
        │             │              │
        └─────────────┴──────────────┘
                      │
                      ↓
            ┌─────────────────────┐
            │   SCAN MODE         │
            └─────────────────────┘
                      │
                 Double press
                      │
                      ↓
            ┌─────────────────────┐
            │      HOME           │
            └─────────────────────┘
```

---

## Accessibility & Reliability

### Brightness Control

When boarding pass is shown:
- Screen brightness auto-increases to 100% (for scanning)
- Remains at 100% until you leave this screen
- Single press "lock" further ensures no dimming

### Offline Capability

- Boarding passes must be cached locally
- QR codes stored as image data, not fetched on demand
- Works without internet connection (critical at airport)

### Scanability

- QR code must be:
  - At least 180px × 180px on screen
  - White background (#FFFFFF), black code
  - Rendered at high DPI
  - Free of any overlay or gradient

### Error States

If pass data is corrupted or missing:

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│         ⚠                               │
│                                         │
│    Boarding pass unavailable           │
│                                         │
│    Unable to load your pass for        │
│    BA 283 (SFO → LHR)                  │
│                                         │
│    ┌─────────────────────────────┐    │
│    │  Try Again                  │    │ ← Yellow button
│    └─────────────────────────────┘    │
│                                         │
│    Booking reference: ABC123XYZ        │
│                                         │
│                                         │
│   ○○ Double-press for Home             │
│                                         │
└─────────────────────────────────────────┘
```

---

## Design Rationale

### Why Scan Mode as default, not Details?

**User testing insight:** At the gate or security, you need the QR *immediately*. Details are secondary. Optimizing for the 90% use case (presenting the pass) over the 10% case (reviewing details).

### Why allow Details Mode at all?

**Real scenario:** You're walking to the gate and forget which gate number. Quick roll down, check gate, roll back up. Doesn't require exiting to a separate screen.

### Why lock screen feature?

**Pain point:** Airport scanners are often slow. You hold your phone, screen dims mid-scan, scanner fails. Lock prevents this frustration.

### Why long press for multi-pass, not a dedicated button?

**Constraint:** Only one input (the ball). Long press is discoverable, doesn't clutter the UI, and is rarely needed (most trips are one flight at a time).

---

## Visual Details

### QR Code Area Specifications

```
Scan Mode:
┌─────────────────────────────────────┐
│  ╔═══════════════════════════════╗ │
│  ║ ▓▓░░▓▓░░ ░░▓▓░░▓▓ ▓▓░░▓▓░░ ║ │
│  ║ ▓▓░░▓▓░░ ░░▓▓░░▓▓ ▓▓░░▓▓░░ ║ │
│  ║ ░░▓▓░░▓▓ ▓▓░░▓▓░░ ░░▓▓░░▓▓ ║ │
│  ║ ░░▓▓░░▓▓ ▓▓░░▓▓░░ ░░▓▓░░▓▓ ║ │
│  ║ ▓▓░░▓▓░░ ░░▓▓░░▓▓ ▓▓░░▓▓░░ ║ │
│  ╚═══════════════════════════════╝ │
└─────────────────────────────────────┘

- Size: 220px × 220px
- Background: #FFFFFF (pure white)
- Padding: 24px inside white area
- Border: None (white bleeds into dark bg)
- Position: Centered horizontally, ~40% from top
```

### Typography Example

```
┌─────────────────────────────────────┐
│                                     │
│         BA 283                      │ ← 48px Perfectly 90s Bold
│     SFO → LHR                       │    #E8E8E8
│                                     │    Letter-spacing: -0.01em
│                                     │    (tighter for large serif)
│                                     │
│  17:45  •  Gate 52  •  Seat 24A    │ ← 12px Null Medium
│                                     │    #8E8E93
│                                     │    Letter-spacing: +0.02em
│                                     │    (wider for small sans)
└─────────────────────────────────────┘
```

---

## Next: Metro Card Flow

With boarding pass established as the high-stakes, clarity-focused use case, next we'll design the metro card - which is all about *speed* and *automatic context*.
