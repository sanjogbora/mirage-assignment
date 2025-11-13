# Interaction Patterns Reference Guide

## Philosophy

The **single 360° ball** is not a limitation - it's a design principle. Every interaction must be:

1. **Learnable** - User discovers the pattern quickly
2. **Consistent** - Same gesture means similar things across contexts
3. **Physical** - Feels tactile and satisfying
4. **Forgiving** - Hard to make catastrophic mistakes

**Core principle:** The ball is both cursor and command.
- **Rolling** = browsing, exploring, not committing
- **Pressing** = selecting, confirming, committing
- **Long pressing** = accessing deeper options, context menus

---

## The Ball: Physical Specifications

### Assumed Hardware

```
┌────────────────────────────────────┐
│                                    │
│                                    │
│         Screen Area                │
│                                    │
│                                    │
│                                    │
│                           ⊚        │ ← Ball
│                           Ball     │   (Right side)
│                           on       │   360° rotation
│                           device   │   Clickable
│                           right    │   Tactile feedback
│                           edge     │
└────────────────────────────────────┘
```

**Ball capabilities:**
- **360° rotation** - Roll up, down, left, right, diagonally
- **Click** - Single press, double press, long press detection
- **Tactile feedback** - Physical click, optional haptics
- **Smooth rotation** - No stepped angles, continuous
- **Durable** - Designed for frequent use

---

## Universal Interaction Grammar

### Rolling (Continuous Motion)

**Meaning:** Browsing, navigating, exploring - no commitment

#### Roll Up
- **Vertical lists:** Scroll up (previous items)
- **Carousels:** Previous item
- **Maps:** Pan north
- **Turn-by-Turn Nav:** Show upcoming turns

#### Roll Down
- **Vertical lists:** Scroll down (next items)
- **Carousels:** Next item
- **Maps:** Pan south
- **Turn-by-Turn Nav:** Switch to map view

#### Roll Left
- **Horizontal carousels:** Previous item (e.g., metro passes for different cities)
- **Music:** Previous track
- **Time-based controls:** Scrub backward
- **Maps:** Pan west

#### Roll Right
- **Horizontal carousels:** Next item
- **Music:** Next track (most common use!)
- **Time-based controls:** Scrub forward
- **Maps:** Pan east

#### Roll Speed & Momentum

**Slow roll:**
- Precise control (scrubbing music, fine map pan)
- One-item-at-a-time list scrolling

**Fast roll:**
- Momentum scrolling through long lists
- Quick skip through multiple music tracks
- Rapid map panning

**Continuous roll:**
- Hold direction for sustained motion
- Auto-accelerates (starts slow, speeds up)

---

### Single Press (Definitive Action)

**Meaning:** Select, confirm, commit, toggle

#### Context-Specific Uses

| Screen/Mode | Single Press Action |
|-------------|---------------------|
| **Home** | Enter focused mode |
| **Lists (places, dishes)** | Open detail view of focused item |
| **Boarding Pass** | Lock screen (prevent dimming) |
| **Metro Card** | Refresh QR code |
| **Navigation** | Re-center map / refresh location |
| **Music** | Play / Pause toggle |
| **Alerts** | Dismiss alert |
| **Action buttons** | Execute button action |

#### Visual Feedback

```
Before press:
┌─────────────────────┐
│  Action Button      │  ← Yellow focus ring
└─────────────────────┘

During press (50ms):
┌─────────────────────┐
│  Action Button      │  ← Darker background (#26262E)
└─────────────────────┘    Slight inset effect

After press:
[Action executes, screen transitions]
```

---

### Double Press (Quick Escape)

**Meaning:** Go back, exit, cancel

**Universal behavior:** **ALWAYS returns to Home**

This is the most consistent interaction across the entire device:
- From any screen
- In any mode
- At any time

Double-press = "Get me out, go to safe place (Home)"

#### Why Double-Press for Home?

1. **Muscle memory** - One gesture, always the same result
2. **Safety net** - Never lost, always can return
3. **No conflict** - Doesn't clash with single press (select) or long press (options)
4. **Speed** - Faster than navigating back through menus

#### Timing

**Double-press detection:**
- Two presses within 400ms = double-press
- > 400ms = two separate single presses

**Visual feedback:**
- No feedback after first press (waiting for second)
- After second press: screen slides to Home (300ms transition)

---

### Long Press (Deep Options)

**Meaning:** Access context menu, additional options, alternative actions

**Minimum hold duration:** 600ms

#### Context-Specific Uses

| Screen/Mode | Long Press Action |
|-------------|-------------------|
| **Home** | Show "What's active?" overlay (background tasks) |
| **Lists** | Quick-save item (without opening detail) |
| **Boarding Pass** | Show multiple passes (outbound, return, connections) |
| **Metro Card** | Pass management (add balance, view history) |
| **Places/Restaurants** | Share, report, save for later |
| **Alerts** | Report incorrect/outdated alert |
| **Navigation** | Options (cancel, reroute, etc.) |
| **Music** | Player options (shuffle, repeat, boost) |

#### Visual Feedback

**During long press:**

```
┌─────────────────────┐
│  Focused Item       │  ← Yellow focus ring
└─────────────────────┘

After 300ms (halfway):
┌─────────────────────┐
│  Focused Item       │  ← Pulsing glow effect
└─────────────────────┘    (ring glows brighter)

After 600ms (triggered):
┌─────────────────────┐
│  Context Menu       │  ← Menu appears
│  • Option 1         │    (Or action executes)
│  • Option 2         │
└─────────────────────┘
```

**Optional:** Subtle haptic pulse at 300ms (warning) and 600ms (trigger)

---

## Mode-Specific Patterns

### Home Screen

```
Ball Action          │ Result
─────────────────────┼──────────────────────────────
Roll up/down         │ Move focus ring between mode cards
Single press         │ Enter focused mode
Double press         │ [Already home, no action / show settings]
Long press           │ Show active background tasks overlay
```

### List Views (Places, Dishes, Playlists)

```
Ball Action          │ Result
─────────────────────┼──────────────────────────────
Roll up/down         │ Scroll through list items
                     │ Focused item has yellow ring
Single press         │ Open detail view of focused item
Double press         │ Return to Home
Long press           │ Quick action (save, pin, etc.)
                     │ without opening detail
```

### Detail Views (Place, Dish, Song)

```
Ball Action          │ Result
─────────────────────┼──────────────────────────────
Roll up/down         │ Scroll through content
                     │ Move focus between action buttons
Single press         │ Execute focused action
                     │ (Navigate, Save, Pin, etc.)
Double press         │ Return to previous list view
Long press           │ Additional options (Share, Report)
```

### Boarding Pass / Metro Card (Transactional)

```
Ball Action          │ Result
─────────────────────┼──────────────────────────────
Roll up/down         │ Toggle between Scan / Details modes
Roll left/right      │ Cycle between multiple passes (cities)
Single press         │ Lock screen (max brightness for scanning)
Double press         │ Return to Home
Long press           │ Show all passes / management options
```

### Navigation

```
Ball Action          │ Result
─────────────────────┼──────────────────────────────
Roll up              │ Show upcoming turns list
Roll down            │ Switch to overview map
Roll L/R (map mode)  │ Pan map
Single press         │ Re-center / toggle zoom
Double press         │ Pause nav, return to Home
Long press           │ Nav options (cancel, reroute)
```

### Music Player

```
Ball Action          │ Result
─────────────────────┼──────────────────────────────
Roll right           │ Next track (most common!)
Roll left            │ Previous track
Slow roll L/R        │ Scrub within track (when paused/playing)
Single press         │ Play / Pause toggle
Double press         │ Return to Home (music keeps playing)
Long press           │ Player options (shuffle, repeat, boost)
```

**Global Music Shortcuts** (from any screen when music playing):
- **Roll right:** Skip track
- **Roll left:** Previous track

---

## Visual Feedback Patterns

### Focus Ring (Current Selection)

**Yellow ring = "This is where you are"**

```
Focused item:
╭─────────────────────────────────╮  ← 3px solid #FFB800
│  Selected Item                  │    8px border radius
│  ...content...                  │
╰─────────────────────────────────╯

Unfocused item:
┌─────────────────────────────────┐  ← 1px solid #3A3A3C
│  Other Item                     │    8px border radius
│  ...content...                  │
└─────────────────────────────────┘
```

**Focus ring movement:**
- Animates smoothly when rolling (300ms ease-out)
- Follows ball direction (up/down/left/right)
- Never disappears (always one focused item)

---

### Press States

#### Resting
```
Background: #2C2C2E (card default)
Border: 1px #3A3A3C (unfocused) or 3px #FFB800 (focused)
```

#### Pressed (During Single Press)
```
Background: #26262E (slightly darker)
Border: 3px #FFB800 (yellow intensifies)
Scale: 0.98 (subtle inset)
Duration: 50ms
```

#### Long Press Building
```
Border: 3px #FFB800 + glow effect
Glow: 0 0 12px #FFB80066 (pulsing)
Scale: 1.0 (no scaling)
Duration: 600ms (builds up to trigger)
```

---

### Transitions & Animations

#### Screen Transitions

**Mode Entry (Home → Mode):**
```
[Home screen] →→→→→ [Mode screen slides in from right]
              ←←←←← [Home screen slides out to left]
Duration: 300ms ease-in-out
Both screens move together
```

**Mode Exit (Mode → Home):**
```
[Mode screen] →→→→→ [Home screen slides in from right]
              ←←←←← [Mode screen slides out to left]
Duration: 300ms ease-in-out
Symmetrical to entry
```

**Context Auto-Surface:**
```
[Current screen] ╱╲ fade out (200ms)
                 ╲╱
[Context screen] ╱╲ fade in (300ms)
                 ╲╱
Duration: 500ms total (slower than manual navigation)
Feels system-initiated, not jarring
```

#### Scroll Animations

**List scroll (roll up/down):**
```
Movement: Smooth ease-out
Duration: 300ms per item
Momentum: Decelerates naturally if rolling fast
Focus ring: Follows scroll, never jumps
```

**Carousel (roll left/right):**
```
Movement: Slide transition
Duration: 250ms per item (slightly faster than vertical)
Current item: Fully visible
Next/prev item: Peek 20% (shows there's more)
```

---

## Haptic Feedback (Optional Hardware)

If device supports haptics:

```
Action               │ Haptic Pattern
─────────────────────┼──────────────────────────────
Roll (continuous)    │ No haptic (smooth)
Roll (item change)   │ Light tick (indicates new item focused)
Single press         │ Medium click (confirmation)
Double press         │ Two light clicks (rhythmic feedback)
Long press start     │ Light pulse at 300ms (halfway warning)
Long press trigger   │ Medium click at 600ms (menu opens)
Error / unavailable  │ Double buzz (gentle warning)
Success / arrival    │ Triple pulse (positive feedback)
```

**Philosophy:** Haptics enhance, never distract. Use sparingly for key moments.

---

## Error Prevention & Recovery

### Preventing Mistakes

**Destructive actions require confirmation:**

Example: Deleting a saved place

```
Long press on place → context menu appears

┌─────────────────────────────────┐
│  • Navigate Here                │
│  • Share                        │
│  ╭─────────────────────────────╮│ ← Focused
│  │  ✕ Remove from Saved        ││
│  ╰─────────────────────────────╯│
└─────────────────────────────────┘

Single press on "Remove"

┌─────────────────────────────────┐
│  Remove "Coffee Bar"?           │
│                                 │
│  ╭─────────────────────────────╮│
│  │  Yes, Remove                ││ ← Requires second confirmation
│  ╰─────────────────────────────╯│
│  ┌─────────────────────────────┐│
│  │  Cancel                     ││
│  └─────────────────────────────┘│
└─────────────────────────────────┘
```

**No accidental actions:**
- Double-press requires 2 deliberate presses (<400ms apart)
- Long press requires 600ms hold (hard to trigger accidentally)
- Scroll momentum can be stopped (press ball to stop)

### Undo Patterns

**Toast notification with undo:**

```
[Action happens: item removed]

Bottom of screen:
┌─────────────────────────────────┐
│  Coffee Bar removed             │ ← Toast (3 seconds)
│  ○ Press to undo               │
└─────────────────────────────────┘

Single press within 3 seconds → undoes action
Timeout → action is permanent
```

---

## Learning Curve & Progressive Disclosure

### First-Time User Experience

**Initial hints (first 3-5 uses):**

```
┌─────────────────────────────────┐
│  [Screen content]               │
│                                 │
│                                 │
│  ○ Roll to explore, press to   │ ← Contextual hint
│    select                       │   Fades after user acts
└─────────────────────────────────┘
```

**Progressive hints:**
- First scroll: "Roll to explore, press to select"
- First context surface: "Double-press for Home"
- First long press (accidental or intentional): "Hold for more options"
- After 10+ interactions: Hints stop showing (user has learned)

### Consistency Aids Learning

**Same gesture, similar meaning:**
- Roll = browse (everywhere)
- Press = commit (everywhere)
- Double-press = Home (everywhere)
- Long press = more options (everywhere)

User learns once, applies everywhere.

---

## Accessibility Considerations

### Visual Feedback

**High contrast focus states:**
- Yellow (#FFB800) on dark (#1C1C1E) = 8:1 contrast
- Thick border (3px) is visible even with reduced vision

**Large touch targets:**
- Minimum 44px height for focusable items
- 8px spacing between items (prevents mis-selection)

### Timing Flexibility

**Adjustable press timing (settings):**
- Standard: Single press <400ms, Long press 600ms
- Slow mode: Single press <600ms, Long press 900ms
- Fast mode: Single press <300ms, Long press 400ms

### Haptic as Visual Alternative

For users with low vision:
- Haptic feedback provides non-visual confirmation
- Different patterns for different actions
- Can operate device by feel alone (with practice)

---

## Quick Reference Chart

### The Ball Cheat Sheet

```
╔══════════════════════════════════════════════════════════╗
║  BALL ACTION            │  GENERAL MEANING               ║
╠══════════════════════════════════════════════════════════╣
║  Roll up/down           │  Scroll vertically, browse    ║
║  Roll left/right        │  Scroll horizontally, skip    ║
║  Single press           │  Select, confirm, toggle      ║
║  Double press           │  Always returns to Home       ║
║  Long press             │  Options, context menu        ║
╚══════════════════════════════════════════════════════════╝

Most Common Actions:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Roll down               Scroll to next item
Single press            Open / Select
Double press            Go to Home
Roll right (music on)   Skip to next song
Long press              See more options
```

---

## Edge Cases & Conflicts

### When Multiple Actions Could Apply

**Priority order:**

1. **Explicit mode** (e.g., in Music mode, roll right = next track)
2. **Global shortcuts** (e.g., music playing in background, roll right still works)
3. **Default scroll** (e.g., no special mode, roll = scroll)

**Example conflict resolution:**

```
Situation: Music is playing, you're in City Exploration list

Roll right:
1. Check: Is there horizontal carousel? No.
2. Check: Is music playing globally? Yes.
3. Action: Skip to next track
4. Visual: Brief toast "Next track" at top of screen
```

### Ball Gets Stuck / Doesn't Register

**Error state:**

```
┌─────────────────────────────────┐
│         ⚠                       │
│                                 │
│  Ball not responding            │
│                                 │
│  Try pressing firmly or         │
│  restarting the device.         │
│                                 │
└─────────────────────────────────┘
```

**Restart shortcut:** Hold ball for 10 seconds → soft reset

---

## Design Principles Summary

**Consistency**
- Same gesture means similar things across contexts
- Reduces cognitive load, speeds learning

**Physicality**
- Ball feels like a real object (dial, controller, turntable)
- Tactile feedback makes interactions satisfying

**Forgiveness**
- Hard to make big mistakes (confirmations for destructive actions)
- Easy undo where possible
- Double-press always gets you back to safety (Home)

**Discoverability**
- Progressive hints for first-time users
- Long press reveals deeper options without cluttering UI
- Patterns are learnable through experimentation

**Clarity**
- Yellow focus ring always shows "where you are"
- Visual feedback for every action
- Screen state always obvious

---

## Next Steps for Implementation

With interaction patterns defined:

1. **Prototype the ball** - Test physical feel, sensitivity, durability
2. **User test core flows** - Boarding pass, navigation, music (most common)
3. **Refine timing** - Adjust press detection, scroll speed based on real use
4. **Add haptics** - If hardware supports, tune feedback patterns
5. **Accessibility audit** - Test with users who have different abilities

**Remember:** The ball is the soul of this device. Get the feel right, and everything else follows.
