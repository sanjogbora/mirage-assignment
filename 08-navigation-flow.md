# Navigation Flow

## Use Case Context

**Scenario:** You're walking through a city following a path to a destination. You don't want to stare at a screen constantly.

**Emotional needs:**
- **Confidence:** "I know where I'm going"
- **Glanceable:** "2-second check every 2 minutes"
- **No staring:** "I want to look at the city, not my device"
- **Clear next step:** "Turn left in 120m - that's all I need to know"

**Critical success factors:**
- Must work for walking (not driving)
- Large, readable "next instruction" at a glance
- Simple map when you need orientation
- Minimal battery drain (screen can dim between checks)
- Works offline (cached maps)

---

## Screen States

### State 1: Turn-by-Turn Mode (Default)

This is the primary navigation view - focused on the next action.

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│            ↰                            │ ← Large arrow icon
│                                         │   (Hero size, yellow)
│                                         │   Visual direction indicator
│                                         │
│                                         │
│         Turn left                       │ ← Instruction
│                                         │   (Hero, 48px, Perfectly 90s Bold)
│         in 120 m                        │   Color: #E8E8E8
│                                         │
│                                         │
│                                         │
│         onto Baker Street               │ ← Street name (if known)
│                                         │   (Body Large, 18px, Null)
│                                         │   Color: #8E8E93
│                                         │
│                                         │
│ ═══════════════════════════════════     │ ← Route strip (simplified map)
│                                         │   Yellow line showing path
│ •  You are here                         │   Dot for current location
│                                         │
│                                         │
│         4 min · 0.3 km remaining        │ ← Time + distance to destination
│         to Coffee Bar                   │   (Metadata, 12px, Null)
│                                         │   Color: #8E8E93
│                                         │
│   ○ Roll for overview map              │
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **Arrow first, then text** - Visual + verbal reinforcement
2. **Distance in meters** - More precise than "50 feet" for walking
3. **Street name if available** - Helps with orientation
4. **Route strip** - Simplified path view without full map clutter
5. **ETA + distance** - Helps pace yourself

**Ball interactions in Turn-by-Turn:**

- **Roll down** → Switches to Overview Map mode
- **Roll up** → Shows upcoming turns (next 2-3 steps)
- **Single press** → Re-centers map / refreshes location
- **Double press** → Pauses navigation, returns to Home
- **Long press** → Navigation options (cancel, reroute, etc.)

---

### State 2: Overview Map Mode

Roll down from Turn-by-Turn to see the full route on a simple map.

```
┌─────────────────────────────────────────┐
│                                         │
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │     ┊         Map Area           │ │ ← Simple line map
│  │     ┊  ╭─────────╮               │ │   Background: #2C2C2E
│  │   ╭─┴──┤         │               │ │   Path: yellow line (#FFB800)
│  │   │    │    ★    │               │ │   Current location: blue dot
│  │   │    ╰─────────╯               │ │   Destination: yellow star
│  │   •                               │ │
│  │   You                             │ │   Minimal labels
│  │                                   │ │   No street names (unless key)
│  │                                   │ │   No satellite imagery
│  └───────────────────────────────────┘ │
│                                         │
│                                         │
│         0.3 km to Coffee Bar            │ ← Destination name + distance
│         ────────────────────            │   (Heading, 24px, Perfectly 90s)
│                                         │
│                                         │
│         Next: Turn left in 120 m        │ ← Next instruction (reminder)
│         onto Baker Street               │   (Body, 15px, Null)
│                                         │   Color: #8E8E93
│                                         │
│                                         │
│   ○ Roll up for turn-by-turn           │
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **Simplified map** - Just the path, not every street
2. **Yellow path** - Matches brand color, high contrast
3. **Current location always visible** - Blue dot (different from yellow UI elements)
4. **Next turn still shown** - Even in map view, you get the instruction
5. **Can pan/zoom** - But defaults to "show full route"

**Ball interactions in Overview Map:**

- **Roll up** → Returns to Turn-by-Turn mode
- **Roll left/right/up/down** → Pans the map
- **Single press** → Zooms in (press again to zoom out)
  - Or could be toggle between zoom levels
- **Double press** → Returns to Turn-by-Turn or pauses navigation
- **Long press** → Navigation options

---

### State 3: Upcoming Turns Preview

Roll up from Turn-by-Turn to see next few steps.

```
┌─────────────────────────────────────────┐
│                                         │
│         Upcoming Turns                  │ ← Title
│         ──────────────                  │   (Title, 32px, Perfectly 90s)
│                                         │
│                                         │
│   ╭─────────────────────────────────╮  │ ← Current turn (yellow ring)
│   │  ↰  Turn left in 120 m          │  │
│   │     onto Baker Street           │  │
│   ╰─────────────────────────────────╯  │
│                                         │
│   ┌─────────────────────────────────┐  │ ← Next turn
│   │  →  Continue straight 300 m     │  │
│   │     on Baker Street             │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │ ← After that
│   │  ↱  Turn right 150 m            │  │
│   │     onto Oxford Street          │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ★  Arrive at destination       │  │ ← Destination
│   └─────────────────────────────────┘  │
│                                         │
│   ○ Roll down for turn-by-turn         │
│                                         │
└─────────────────────────────────────────┘
```

**Use case:** You want to orient yourself mentally before the turn. "Okay, left, then straight, then right. Got it."

**Ball interactions:**
- **Roll down** → Returns to Turn-by-Turn mode
- **Roll up/down** → Scrolls through upcoming turns (if more than 4)
- **Single press** → No action (or could expand a specific turn)
- **Double press** → Pauses navigation

---

### State 4: Navigation Start (Destination Selection)

How do you start navigation? From City Exploration or Restaurant detail views:

**"Start Navigation" button pressed:**

```
┌─────────────────────────────────────────┐
│                                         │
│         Navigate to                     │ ← Title
│         ───────────                     │
│                                         │
│                                         │
│         Coffee Bar                      │ ← Destination name
│         ──────────                      │   (Title, 32px, Perfectly 90s)
│                                         │
│         Café • 0.6 km away              │ ← Type + distance
│                                         │
│                                         │
│   ┌───────────────────────────────────┐│
│   │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ││ ← Simple route preview
│   │         •                    ★   ││   Start (•) to destination (★)
│   │       You                         ││
│   │                                   ││
│   │  8 min walking                    ││ ← Estimated time
│   └───────────────────────────────────┘│
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Start Walking                  │  │ ← Primary CTA (yellow button)
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Cancel                         │  │ ← Secondary option
│   └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions:**
- **Roll up/down** → Toggles between buttons
- **Single press** → Confirms selection
  - "Start Walking" → Begins navigation in Turn-by-Turn mode
  - "Cancel" → Returns to previous screen
- **Double press** → Cancels, returns to Home

---

### State 5: Navigation Active (Background)

When navigation is running and you're in another mode (e.g., Music), show minimal indicator:

**In Music mode with navigation active:**

```
┌─────────────────────────────────────────┐
│  ↰ 120 m                                │ ← Top banner
│                                         │   Yellow background (#FFB80033)
│                                         │   Next turn + distance
│         Music                           │   Tap to return to navigation
│         ─────                           │
│                                         │
│         Travel Mix                      │
│                                         │
│         Now Playing                     │ ← Rest of Music screen
│         The Streets                     │   continues normally
│         Blinded by the Lights           │
│                                         │
└─────────────────────────────────────────┘
```

**Design decision:** Navigation runs in background. Top banner keeps you informed without interrupting.

---

### State 6: Arrival

When you reach your destination:

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│            ★                            │ ← Star icon (yellow)
│                                         │
│                                         │
│         You've arrived                  │ ← Confirmation
│                                         │   (Hero, 48px, Perfectly 90s)
│         at Coffee Bar                   │   Color: #E8E8E8
│                                         │
│                                         │
│                                         │
│         Total: 0.6 km · 8 min           │ ← Trip summary
│                                         │   (Metadata, 12px)
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Explore This Place             │  │ ← Helpful next action
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Start Return Navigation        │  │ ← Return to start
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   ○○ Double-press for Home             │
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions:**
- **Roll up/down** → Selects action
- **Single press** → Confirms action
- **Double press** → Returns to Home (navigation ends)

**Auto-dismiss:** After 30 seconds, fades back to Home automatically.

---

## Arrow / Direction Icons

Visual language for turn directions:

```
↰   Turn left (gentle curve)
↱   Turn right (gentle curve)
⤎   Sharp left (tight angle)
⤏   Sharp right (tight angle)
→   Continue straight / slight right
←   Slight left
↶   U-turn left
↷   U-turn right
⬆   Head north / continue forward
★   Destination reached
•   Current location
```

**Design specs:**
- Size: 80px × 80px in Turn-by-Turn mode
- Color: #FFB800 (yellow)
- Weight: Bold, clear lines
- Background: None (icon only)

---

## Context Auto-Surface Behavior

### When does navigation auto-surface?

**NOT auto-surface** - Navigation must be user-initiated.

You don't want the device randomly saying "Go this way" when you didn't ask.

**Exception - Turn coming up:**

If navigation is running in background (e.g., you're in Music mode), and a turn is <50m away:

```
┌─────────────────────────────────────────┐
│  NOW · Navigation                       │ ← Context interrupt
│                                         │
│            ↰                            │
│         Turn left                       │
│         in 40 m                         │
│                                         │
│   Auto-returns to Music in 10s          │ ← Temporary
│                                         │
└─────────────────────────────────────────┘
```

Briefly interrupts to show the turn, then returns to Music mode.

---

## Route Calculation & Offline

### How routes are calculated:

**Online (preferred):**
- Uses live walking directions API (Google Maps, Mapbox, etc.)
- Considers: current traffic, road closures, shortcuts

**Offline fallback:**
- Cached map tiles for current city
- Pre-downloaded route when you start navigation
- Basic pathfinding using cached street network

**Hybrid:**
- Calculate route online
- Cache route + map tiles for that path
- If GPS works but internet doesn't → still navigate using cached route

### Data usage optimization:

**On WiFi:**
- Pre-download maps for cities in your itinerary
- Device suggests: "Download offline map for London? (42 MB)"

**On cellular:**
- Fetch only route, not high-res map tiles
- Use vector maps (smaller file size)

---

## Edge Cases

### What if you go off-route?

**Auto-reroute:**

```
┌─────────────────────────────────────────┐
│                                         │
│            ↻                            │ ← Rerouting icon
│                                         │
│         Rerouting...                    │ ← (Hero, 48px)
│                                         │
│         Stay on current street          │ ← Interim instruction
│                                         │   while calculating
│                                         │
└─────────────────────────────────────────┘

[2 seconds later]

┌─────────────────────────────────────────┐
│            →                            │
│         Continue straight               │ ← New route calculated
│         for 200 m                       │
│                                         │
└─────────────────────────────────────────┘
```

**Design decision:** Quick, no-fuss rerouting. No scolding ("You missed the turn!"), just adapt.

### What if GPS signal is lost?

```
┌─────────────────────────────────────────┐
│                                         │
│            ⊙                            │ ← GPS icon (searching)
│                                         │
│         Searching for GPS...            │
│                                         │
│         Last known:                     │ ← Show last position
│         Turn left in ~120 m             │   with "~" to indicate
│         onto Baker Street               │   approximate
│                                         │
│   ○ Long press to cancel navigation    │
│                                         │
└─────────────────────────────────────────┘
```

**Graceful degradation:** Show last known instruction until GPS returns.

### What if destination is very close (< 50m)?

Skip turn-by-turn, go straight to map view:

```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │    ┊                              │ │
│  │    ┊  ★                           │ │ ← Destination is visible
│  │    •                              │ │   Just show it on map
│  │   You                             │ │
│  └───────────────────────────────────┘ │
│                                         │
│         Coffee Bar                      │
│         35 m ahead on the right         │ ← Simple text instruction
│                                         │
└─────────────────────────────────────────┘
```

### What if you request navigation home?

**"Navigate Home" quick action:**

Device knows your hotel/accommodation from trip data.

Home → Navigate → "Navigate Home" → starts route to hotel.

Or long press from any screen → "Navigate Home" quick action.

---

## Flow Diagram

```
┌──────────────────────────────────────────────────┐
│              ENTRY POINTS                        │
└──────────────────────────────────────────────────┘
         │                    │
         │                    │
From City Exploration   From Restaurant Detail
  (place detail)         (after looking at menu)
         │                    │
         └──────────┬─────────┘
                    ↓
         ┌──────────────────────┐
         │  START NAVIGATION    │ ← Confirm destination
         │  (preview route)     │    Show ETA
         └──────┬───────────────┘
                │
         Start Walking
                │
                ↓
         ┌──────────────────────┐
         │  TURN-BY-TURN MODE   │ ← Default, glanceable
         │  (next instruction)  │
         └──────┬───────────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
Roll down  Roll up    Long press
    │           │           │
    ↓           ↓           ↓
┌─────────┐ ┌──────────┐ ┌────────────┐
│OVERVIEW │ │UPCOMING  │ │  OPTIONS   │
│MAP MODE │ │  TURNS   │ │ (cancel,   │
└────┬────┘ └────┬─────┘ │  reroute)  │
     │           │        └─────┬──────┘
Roll up     Roll down           │
     │           │              │
     └───────────┴──────────────┘
                 │
           Arrival detected
                 │
                 ↓
         ┌──────────────────┐
         │   ARRIVAL        │ ← Confirmation + next actions
         │   "You've arrived"│
         └──────┬───────────┘
                │
         Auto-dismiss (30s)
         or Double-press
                │
                ↓
         ┌──────────────┐
         │    HOME      │
         └──────────────┘
```

---

## Design Rationale

### Why Turn-by-Turn as default, not map?

**Small screen limitation:** Maps are hard to read on tiny screens.

**Glanceable priority:** "Turn left in 120m" = instant understanding. Map requires interpretation.

**Map available when needed:** Roll down to see context, but default is text instruction.

### Why show upcoming turns?

**Mental preparation:** Knowing "left, then straight, then right" helps you prepare, reduces anxiety.

**Reduces checking:** If you know what's coming, you check device less often.

### Why simplified route strip instead of full map in Turn-by-Turn?

**Compromise:** Give spatial context (where am I on the path?) without full map complexity.

Route strip shows: progress, current position, next turn location.

### Why yellow path on map?

**Consistency:** Yellow is the accent color throughout the device.

**High contrast:** Yellow on dark gray (#2C2C2E) = very readable.

### Why distance in meters, not blocks or landmarks?

**Universal:** Works in any city worldwide.

**Precise:** "120m" more accurate than "half a block" (block sizes vary).

**Pacing:** Helps you estimate time ("100m = ~1.5 min walk").

---

## Visual Details

### Turn-by-Turn Screen Layout

```
┌─────────────────────────────────────────┐
│                                         │ 48px top padding
│            ↰                            │ Arrow: 80×80px, centered
│                                         │ Color: #FFB800
│         Turn left                       │ Instruction: 48px, Perfectly 90s Bold
│         in 120 m                        │ Distance: same line, slightly dimmed
│                                         │
│         onto Baker Street               │ Street: 18px, Null Regular
│                                         │ Color: #8E8E93
│                                         │ 24px gap
│ ═══════════════════════════════════     │ Route strip: 4px height
│                                         │ Yellow (#FFB800) line
│ •  You are here                         │ Dot: 12px circle, blue (#0A84FF)
│                                         │ 32px gap
│         4 min · 0.3 km remaining        │ ETA: 12px, Null Medium
│         to Coffee Bar                   │ Color: #8E8E93
│                                         │
└─────────────────────────────────────────┘ 48px bottom padding
```

### Map Styling

```
Background: #2C2C2E (charcoal mid)
Path: 4px solid #FFB800 (yellow)
Roads (background): 1px solid #3A3A3C (dim gray)
Current location: 12px circle, #0A84FF (blue)
Destination: ★ 24px, #FFB800 (yellow star)
Labels: 12px Null Medium, #E8E8E8 (only key streets)
```

**Minimal labels:** Only show street names when necessary (major roads, your path).

---

## Comparison to Phone Navigation

| Aspect | This Device | Phone (Google Maps) |
|--------|-------------|---------------------|
| **Screen size** | Small (~3.5") | Large (5-7") |
| **Primary mode** | Turn-by-Turn text | Map view |
| **Use case** | Walking, glanceable | Walking + driving, detailed |
| **Complexity** | Simplified, 1-2 actions | Full-featured, many options |
| **Battery** | Optimized for low drain | High drain (constant screen) |
| **Distraction** | Minimal (2-sec glances) | High (staring at map) |

**Philosophy:** This isn't replacing phone navigation. It's a complement for when you want to travel lighter and look up less.

---

## Next: Music Player Flow

Navigation was about guidance. Music Player is about ambient control - managing audio without interrupting your journey.
