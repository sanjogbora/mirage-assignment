# Metro Card Flow

## Use Case Context

**Scenario:** You're walking into a metro station. The device detects this and quietly shows your metro pass.

**Emotional needs:**
- **Speed:** "I don't even have to think about it"
- **Zero friction:** "It just appears when I need it"
- **Clarity:** "Which pass, which city, how much is left"
- **Trust:** "This will work at the turnstile"

**Critical success factors:**
- Must auto-surface within 50m of station entrance
- Must be scannable immediately (no navigation needed)
- Must handle multiple cities gracefully
- Must show balance/validity clearly

---

## Screen States

### State 1: Metro Pass (Primary View)

This is what auto-surfaces when you approach a metro station.

```
┌─────────────────────────────────────────┐
│  NEARBY                                 │ ← Context label
│                                         │   (Null Bold, 10px, #8E8E93)
│                                         │
│                                         │
│         London                          │ ← City name
│         Underground                     │   (Title, 32px, Perfectly 90s)
│         ───────────                     │
│                                         │
│                                         │
│                                         │
│     ╔═════════════════════════════╗    │
│     ║                             ║    │
│     ║                             ║    │
│     ║                             ║    │ ← QR/NFC token
│     ║      [  QR CODE  ]         ║    │   Size: 180px × 180px
│     ║                             ║    │   Background: white
│     ║                             ║    │   Centered
│     ║                             ║    │
│     ╚═════════════════════════════╝    │
│                                         │
│                                         │
│         Zone 1-2 Daily Pass             │ ← Pass type
│                                         │   (Body Large, 18px, Null)
│                                         │
│      £8.50 remaining                   │ ← Balance/validity
│                                         │   (Body, 15px, Null)
│      Valid until 23:59 today            │   Color: #8E8E93
│                                         │
│                                         │
│   ○ Roll for pass details              │ ← Hint
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **Minimal, focused** - Just city, QR, and essential status
2. **"NEARBY" label** - User knows this appeared automatically
3. **White QR background** - Maximum scanability (same as boarding pass)
4. **Balance prominently shown** - No surprises at the turnstile
5. **Simple validity statement** - "Valid until X" or "3 rides remaining"

**Ball interactions in Primary View:**

- **Roll down** → Shows detailed pass information (history, zones, etc.)
- **Roll left/right** → Cycles between passes if you have multiple cities
- **Single press** → Refreshes QR code (some systems need fresh codes)
  - Small spinner appears, code regenerates
  - Useful if you're worried the code timed out
- **Double press** → Returns to Home
- **Long press** → Opens pass management (add balance, purchase, history)

---

### State 2: Pass Details View

Roll down from primary view to see more information.

```
┌─────────────────────────────────────────┐
│                                         │
│         London Underground              │
│         ───────────────────             │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Pass Type                      │  │
│   │  Zone 1-2 Daily Pass            │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Balance                        │  │
│   │  £8.50 remaining                │  │
│   │  Valid until 23:59 today        │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Recent Trips                   │  │
│   │  King's Cross → Camden 14:32    │  │
│   │  Piccadilly → King's Cross 12:15│  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│     ╔═════════════╗                    │
│     ║   QR CODE   ║                    │ ← Smaller QR, still accessible
│     ╚═════════════╝                    │   Size: 120px × 120px
│                                         │
│                                         │
│   ○ Roll up for pass view              │
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions:**
- **Roll up** → Returns to Primary View (scannable view)
- **Roll down** → Scrolls through trip history if more exists
- **Single press** → No action (or refresh QR)
- **Double press** → Returns to Home
- **Long press** → Pass management options

---

### State 3: Multiple Cities View

If you have passes for multiple cities, roll left/right to cycle through them.

**Visual indicator (top of primary view):**

```
┌─────────────────────────────────────────┐
│  NEARBY                                 │
│                                         │
│  ←  London  →                          │ ← City indicator with arrows
│                                         │   Shows you can roll left/right
│                                         │
│         London Underground              │
│         ───────────────────             │
│                                         │
│     ╔═════════════════════════════╗    │
│     ║      [  QR CODE  ]         ║    │
│     ╚═════════════════════════════╝    │
│                                         │
│         Zone 1-2 Daily Pass             │
│      £8.50 remaining                   │
│                                         │
└─────────────────────────────────────────┘

Roll right →

┌─────────────────────────────────────────┐
│  NEARBY                                 │
│                                         │
│  ←  Paris  →                           │ ← Now showing Paris
│                                         │
│                                         │
│         Paris Métro                     │
│         ───────────                     │
│                                         │
│     ╔═════════════════════════════╗    │
│     ║      [  QR CODE  ]         ║    │
│     ╚═════════════════════════════╝    │
│                                         │
│         Navigo Jour                     │
│      Valid all zones today              │
│                                         │
└─────────────────────────────────────────┘
```

**How does device know which city to show?**

Priority logic:
1. GPS + geo-database → "You're in London" → Show London pass
2. If GPS is ambiguous or unavailable → Show most recently used pass
3. User can manually cycle with roll left/right

**Smooth carousel animation:**
- Passes slide horizontally when you roll left/right
- Current pass is fully visible, next/previous are slightly visible at edges
- Creates a physical "deck of cards" feeling

---

### State 4: Pass Management (Long Press)

Long press opens quick actions for managing the pass.

```
┌─────────────────────────────────────────┐
│                                         │
│         London Underground              │
│         ───────────────────             │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ╭─────────────────────────────╮│  │ ← Focused action
│   │  │  ↻  Refresh Code           ││  │   (Yellow ring)
│   │  ╰─────────────────────────────╯│  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ┌─────────────────────────────┐│  │
│   │  │  +  Add Balance             ││  │
│   │  └─────────────────────────────┘│  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ┌─────────────────────────────┐│  │
│   │  │  •  View All Trips          ││  │
│   │  └─────────────────────────────┘│  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ┌─────────────────────────────┐│  │
│   │  │  ✕  Remove Pass             ││  │
│   │  └─────────────────────────────┘│  │
│   └─────────────────────────────────┘  │
│                                         │
│   ○ Long press again to close          │
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions:**
- **Roll up/down** → Moves focus ring between actions
- **Single press** → Executes focused action
- **Double press** → Closes this menu, returns to Home
- **Long press** → Closes this menu, returns to Pass view

---

## Context Auto-Surface Behavior

### Trigger Conditions

Metro pass auto-surfaces when:

1. **Proximity to station:**
   - GPS detects you're within 50m of a metro station entrance
   - Database of major metro systems worldwide (London, Paris, NYC, Tokyo, etc.)

2. **Walking speed:**
   - Device detects walking speed (via GPS or accelerometer)
   - If you're in a car/bus driving by a station, don't trigger

3. **Time of day:**
   - Prioritize during commute hours (7-10am, 5-8pm)
   - Lower priority late night (don't wake device unnecessarily)

4. **Frequency capping:**
   - Don't re-trigger if you were just showing metro pass <2 minutes ago
   - Prevents annoying re-surfacing if you're walking past multiple station entrances

### Context Label Variations

```
┌─────────────────────────────────────────┐
│  NEARBY · King's Cross Station          │ ← Specific station detected
│                                         │
```

Or if less certain:

```
┌─────────────────────────────────────────┐
│  NEARBY · Metro Station                 │ ← Generic label
│                                         │
```

---

## Status Indicators

### Balance / Validity States

**Sufficient balance:**
```
£8.50 remaining               Color: #E8E8E8 (normal text)
Valid until 23:59 today       Color: #8E8E93 (metadata)
```

**Low balance warning:**
```
⚠ £2.10 remaining            Color: #FFB800 (yellow warning)
Enough for ~1 more trip       Color: #FFB800
```

**Expired / insufficient:**
```
✕ Pass expired                Color: #FF3B30 (red)
Tap to add balance            Color: #FF3B30
```

**Unlimited pass:**
```
Valid all zones today         Color: #E8E8E8
Unlimited rides               Color: #34C759 (subtle green)
```

### Pass Type Visual Variations

Different cities, different visual styles (subtle):

**London Underground:**
```
┌─────────────────────────────────────────┐
│         London                          │
│         Underground                     │ ← Serif heading
│         ───────────                     │   Classic feel
│                                         │
│         Zone 1-2                        │
└─────────────────────────────────────────┘
```

**Paris Métro:**
```
┌─────────────────────────────────────────┐
│         Paris Métro                     │ ← Slightly different typography
│         ───────────                     │   Weight / spacing
│                                         │
│         Navigo Jour                     │
└─────────────────────────────────────────┘
```

**NYC Subway:**
```
┌─────────────────────────────────────────┐
│         NYC Subway                      │
│         ──────────                      │
│                                         │
│         Unlimited Ride                  │
└─────────────────────────────────────────┘
```

**Design decision:** Typography stays consistent (Perfectly 90s), but subtle spacing and weight adjustments give each city a slight flavor. Not overbranded - this isn't an ad, it's a tool.

---

## Edge Cases

### What if you're in a new city with no pass yet?

Auto-surface a "Get Pass" prompt:

```
┌─────────────────────────────────────────┐
│  NEARBY · Metro Station                 │
│                                         │
│                                         │
│         Berlin U-Bahn                   │
│         ─────────────                   │
│                                         │
│                                         │
│    You don't have a pass yet           │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Purchase Day Pass              │  │ ← Yellow button
│   │  €8.80                          │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Add Existing Pass              │  │ ← Gray button
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   ○○ Double-press to skip              │
│                                         │
└─────────────────────────────────────────┘
```

### What if GPS is wrong (showing wrong city)?

If you're in Paris but device shows London pass:

**Manual override:**
- Roll left/right to cycle through all your passes
- The correct city's QR will work even if auto-detection was wrong
- Device learns from this: "User chose Paris while GPS said London" → updates preference

**Feedback mechanism:**
- Long press → "Report incorrect location" option
- Helps improve geo-database over time

### What if QR code refresh fails?

```
┌─────────────────────────────────────────┐
│         London Underground              │
│                                         │
│     ╔═════════════════════════════╗    │
│     ║                             ║    │
│     ║    ⚠                       ║    │
│     ║                             ║    │
│     ║    Unable to refresh        ║    │ ← Error state
│     ║    code                     ║    │   Shows last known QR
│     ║                             ║    │   with warning overlay
│     ║    Using cached code        ║    │
│     ║                             ║    │
│     ╚═════════════════════════════╝    │
│                                         │
│   This may not scan at turnstile        │
│                                         │
│   ○ Press to retry                     │
│                                         │
└─────────────────────────────────────────┘
```

### What if pass expires while you're mid-journey?

**Proactive warning:**

When you board (device detects you went through a turnstile via location change):
- If pass will expire before typical journey time (say 30 min), show subtle alert:

```
┌─────────────────────────────────────────┐
│  ⚠ Pass expires at 15:30 (12 min)      │ ← Top banner
│                                         │   Yellow background
│         London Underground              │
│         ───────────────────             │
│                                         │
│     ╔═════════════════════════════╗    │
│     ║      [  QR CODE  ]         ║    │
│     ╚═════════════════════════════╝    │
│                                         │
└─────────────────────────────────────────┘
```

---

## Offline Capability

### What works offline:
- Displaying existing passes
- QR codes (cached locally)
- Trip history (last 30 days cached)

### What doesn't work offline:
- Refreshing dynamic QR codes (if system requires it)
- Adding balance
- Purchasing new passes
- Real-time balance updates

### Offline indicator:

```
┌─────────────────────────────────────────┐
│  NEARBY                                 │
│                                         │
│         London Underground              │
│                                         │
│     ╔═════════════════════════════╗    │
│     ║      [  QR CODE  ]         ║    │
│     ╚═════════════════════════════╝    │
│                                         │
│      £8.50 remaining                   │
│      (Last updated 14:32)               │ ← Offline hint
│                                         │   Gray italics
│                                         │
└─────────────────────────────────────────┘
```

---

## Flow Diagram

```
┌───────────────────────────────────────────────────┐
│              TRIGGER CONDITIONS                   │
│  • Within 50m of metro station                    │
│  • Walking speed detected                         │
│  • Valid pass exists for this city                │
└───────────────────┬───────────────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  AUTO-SURFACE         │
        │  Metro Pass (Primary) │ ← "NEARBY" label
        │  QR + Balance         │
        └───────┬───────────────┘
                │
    ┌───────────┼───────────┬─────────────┐
    │           │           │             │
Roll down   Roll L/R   Single press  Long press
    │           │           │             │
    ↓           ↓           ↓             ↓
┌────────┐  ┌────────┐  ┌──────────┐  ┌──────────┐
│Details │  │ Switch │  │ Refresh  │  │  Pass    │
│View    │  │  City  │  │   QR     │  │  Mgmt    │
└───┬────┘  └────┬───┘  └────┬─────┘  └────┬─────┘
    │            │           │             │
Roll up     Roll L/R    (returns)    Select action
    │            │           │             │
    └────────────┴───────────┴─────────────┘
                 │
            Double press
                 │
                 ↓
         ┌───────────────┐
         │     HOME      │
         └───────────────┘
```

---

## Design Rationale

### Why auto-surface at 50m, not closer?

**User testing insight:** At 50m, you have ~30 seconds of walking time before reaching the turnstile. Enough time to:
1. Notice the device auto-surfaced the pass
2. Glance at balance to confirm it's valid
3. Get the device ready in your hand

Too close (<20m) = rushed, stressful
Too far (>100m) = annoying false triggers when just walking by

### Why allow manual city switching?

**Real scenario:** You're in London with both London and Paris passes stored. GPS is flaky underground. You need to manually select London pass. Roll left/right gives you that escape hatch.

### Why show recent trips?

**Two benefits:**
1. Helps you retrace your steps ("How did I get here earlier?")
2. Lets you verify the pass is actually working (trips are being logged)

### Why refresh code feature?

**Technical reality:** Some metro systems (e.g., Beijing, Shanghai) use dynamic QR codes that expire every 60-90 seconds for security. Refresh gives user confidence the code is fresh.

### Why prominence on balance?

**Pain point prevention:** Nothing worse than reaching the turnstile and realizing your pass expired or ran out. Front-and-center balance prevents this embarrassment.

---

## Visual Details

### QR Code Specifications

```
Primary View QR:
- Size: 180px × 180px
- Background: #FFFFFF (white)
- Padding: 20px white border inside the square
- Position: Centered, ~35% from top
- Shadow: None (clean, scannable)

Details View QR:
- Size: 120px × 120px
- Same styling, just smaller
- Position: Lower on screen, still accessible
```

### City Name Typography

```
┌─────────────────────────────────────────┐
│         London                          │ ← 32px Perfectly 90s Regular
│         Underground                     │    #E8E8E8
│         ───────────                     │    Line height: 38px
│                                         │    Centered alignment
│                                         │    Underline: 1px, same width as text
└─────────────────────────────────────────┘
```

### Balance / Validity Typography

```
┌─────────────────────────────────────────┐
│      £8.50 remaining                   │ ← 15px Null Regular
│                                         │    #E8E8E8
│                                         │
│      Valid until 23:59 today            │ ← 15px Null Regular
│                                         │    #8E8E93 (dimmer)
└─────────────────────────────────────────┘

Warning state:
│      ⚠ £2.10 remaining                 │ ← 15px Null Medium (heavier weight)
│      Enough for ~1 more trip            │    #FFB800 (yellow)
```

---

## Comparison to Boarding Pass

| Aspect | Boarding Pass | Metro Pass |
|--------|---------------|------------|
| **Context trigger** | Time + location, high stakes | Location, frequent use |
| **Visual priority** | QR + flight details | QR + balance |
| **Interaction** | Mostly static (scan and done) | More dynamic (cycle cities, refresh) |
| **Tone** | Confident, formal | Quick, utilitarian |
| **Status info** | Flight status (delayed, gate change) | Balance, validity |
| **Edge cases** | Multi-leg trips | Multi-city passes |

Both share:
- White QR background for scanability
- "NEARBY" / "NOW" context labels
- Double-press to Home
- Offline capability

---

## Next: City Exploration Flow

With metro card done, next is the browsing/discovery mode - City Exploration. This shifts from transactional (scan QR) to exploratory (what's around me?).
