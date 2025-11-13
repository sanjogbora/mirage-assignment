# Travel Companion Device - Complete Design Documentation

**A pocket travel companion with a dark theme, yellow accent, serif headings, sans body text, and one 360° ball for all input.**

---

## Overview

This repository contains the complete interface design for a small travel companion device - something that sits between a phone and a wearable, designed specifically for travelers who want contextual information without the distraction of a full smartphone.

**Core Philosophy:**
- **Travel brain** - holds tickets, passes, tips, and your context
- **City whisperer** - surfaces what matters near you, not endless feeds
- **Taste buddy** - helps you pick what to eat, tuned to your preferences
- **Safe guide** - nudges you away from scams and bad decisions
- **Pocket DJ** - handles basic music and audio without opening your phone

---

## What's Inside

### 1. Foundation

**[01-design-system.md](01-design-system.md)**
- Complete visual language and design tokens
- Color palette (dark charcoal + warm yellow accent)
- Typography system (Perfectly 90s serif + Null sans)
- Spacing, components, animation principles
- Accessibility considerations

**[02-home-and-navigation.md](02-home-and-navigation.md)**
- 3-layer information architecture (NOW → CONTEXT → HOME)
- Home screen layout and navigation structure
- Context auto-surface behavior
- Screen transition patterns
- Universal "double-press to Home" escape hatch

### 2. Use Case Flows

**[03-boarding-pass-flow.md](03-boarding-pass-flow.md)**
- High-stakes, must-work-perfectly use case
- Scan mode (QR prominent) vs Details mode
- Multi-leg trip handling
- Auto-surface at airport near boarding time
- Lock screen for reliable scanning

**[04-metro-card-flow.md](04-metro-card-flow.md)**
- Zero-friction, auto-context use case
- Auto-surfaces near metro stations
- Multi-city pass management
- Balance warnings and validity checks
- Quick refresh for dynamic QR systems

**[05-city-exploration-flow.md](05-city-exploration-flow.md)**
- Discovery and browsing use case
- Curated recommendations (7-10 places, not 50)
- Real quotes from Reddit/forums, not marketing
- Filter by type (food, sights, shops)
- Save places for later

**[06-restaurant-recommender-flow.md](06-restaurant-recommender-flow.md)**
- Personalized decision-making use case
- Auto-detects you're inside a restaurant
- Filters by dietary preferences (vegan, allergies, etc.)
- Shows 5-8 best dishes, not full menu
- "Order list" memory aid

**[07-local-alerts-flow.md](07-local-alerts-flow.md)**
- Protective guidance use case
- Scam warnings, better options, local etiquette
- Gentle tone (helpful, not scary)
- Geo-triggered at tourist sites
- Attribution for credibility

**[08-navigation-flow.md](08-navigation-flow.md)**
- Glanceable walking directions
- Turn-by-turn mode (default) vs overview map
- Large arrows + text instructions
- Works offline (cached maps)
- Runs in background with top banner

**[09-music-player-flow.md](09-music-player-flow.md)**
- Ambient audio control
- Roll ball to skip tracks (feels like DJ controller)
- Playlist selection, not full library browsing
- "Energy Boost" mode for travel context
- Controls work globally (even from other modes)

### 3. Interaction System

**[10-interaction-patterns.md](10-interaction-patterns.md)**
- Complete ball interaction reference
- Roll = browse, Press = commit, Double-press = Home, Long-press = options
- Mode-specific patterns for each use case
- Visual feedback specifications
- Error prevention and recovery
- Accessibility considerations
- Learning curve and progressive disclosure

---

## Key Design Decisions

### The Single Ball Philosophy

**Why one input?**
- Forces simplicity and clarity in every interaction
- Creates a learnable, consistent language
- Makes the device feel tactile and intentional
- Reduces accidental actions (unlike touch screens)

**Ball as cursor + command:**
- Rolling = exploration (no commitment)
- Pressing = confirmation (commitment)
- The interface responds visually to your physical movements

### Context-Aware, Not App-Based

**3-layer priority:**
1. **NOW** - Urgent, time-sensitive (boarding soon, turn coming up)
2. **CONTEXT** - Location/time aware (near metro, in restaurant)
3. **HOME** - Manual navigation (you choose what to do)

**Philosophy:** The device brings the right thing to you at the right time. You don't hunt through apps.

### Dark First, Yellow Accent

**Mood:**
- Premium, slightly nostalgic
- Like classic travel tickets and metro boards
- Calm, confident, opinionated

**Colors:**
- Deep charcoal background (#1C1C1E)
- Warm yellow accent (#FFB800) - sparingly, for focus and highlights
- Off-white text (#E8E8E8) - softer than pure white

### Serif for Emotion, Sans for Information

**Typography:**
- Headlines, flight numbers, place names: **Perfectly 90s** (serif) - gives weight and character
- Body text, metadata, lists: **Null** (sans) - clean and readable
- Mixing the two creates hierarchy and visual interest

### Placeholders, Not Photos (For Now)

**Approach:**
- Reserve space for images (places, dishes, album art)
- Use neutral placeholder blocks with labels
- Keeps designs focused on structure and interaction
- Photos can be added later without changing layouts

---

## How to Use This Documentation

### For Product Managers
Start with the **overview** sections of each flow document to understand the use cases and user needs.

### For Designers
- **01-design-system.md** - Your source of truth for all visual specs
- **10-interaction-patterns.md** - Reference for how the ball works
- Individual flow documents - Screen-by-screen layouts with rationale

### For Developers
- **Design system** provides all tokens (colors, spacing, typography)
- **Interaction patterns** define the input logic
- Flow documents show state transitions and edge cases
- All specs are implementation-ready (no ambiguity)

### For User Researchers
- Each flow includes "Design Rationale" sections explaining decisions
- Edge cases are documented (what happens when GPS fails, QR doesn't load, etc.)
- Accessibility considerations are built in

---

## Design Principles

**1. Clarity over cleverness**
- Every screen has one clear purpose
- Minimal text, maximum signal
- Generous whitespace and breathing room

**2. Physical over digital**
- The ball should feel satisfying to use
- Animations follow physical laws (momentum, easing)
- Tactile feedback enhances virtual interactions

**3. Protective, not paranoid**
- Warnings are helpful, not scary (local tips, not "DANGER!")
- Trust-building through attribution (Reddit, local sources)
- Empowering users with insider knowledge

**4. Curated, not exhaustive**
- 7 good places > 50 mediocre ones
- Playlists > full music library
- Quality over quantity

**5. Glanceable, not demanding**
- Designed for 2-second checks, not 2-minute staring
- You should look at the world, not the device
- Information is clear at a glance

---

## What Makes This Device Unique

### It's NOT Trying to Be a Phone
- Deliberately limited scope (7 travel-specific functions)
- No social media, no web browser, no email
- Embraces constraints as features

### Context is the Interface
- Auto-surfaces boarding pass when you're at the airport
- Shows metro card when you're near a station
- Recommends dishes when you're in a restaurant
- You don't navigate to apps - it brings what you need

### Single Input, Rich Interactions
- The ball does everything (browse, select, skip, scrub, pan)
- No gesture confusion (unlike swipe-heavy touch UIs)
- Learnable through experimentation
- Feels like a physical music player or game controller

### Travel-Specific Intelligence
- Knows you're vegan, shows vegetarian dishes
- Warns about scams at tourist traps
- "Energy Boost" music mode for tired travelers
- Navigation optimized for walking, not driving

---

## Next Steps for Implementation

### Phase 1: Core Flows (MVP)
1. **Home screen** - Navigation foundation
2. **Boarding pass** - High-stakes, must work
3. **Music player** - Frequent use, showcases ball feel
4. **Navigation** - Core travel utility

### Phase 2: Discovery Features
5. **City exploration** - Serendipity and discovery
6. **Restaurant recommender** - Personalization showcase

### Phase 3: Polish & Protection
7. **Metro card** - Seamless auto-context
8. **Local alerts** - Safety and trust-building

### Phase 4: Refinement
- User testing on ball sensitivity and timing
- Haptic feedback tuning (if hardware supports)
- Accessibility improvements
- Performance optimization (battery, offline capability)

---

## File Structure

```
/
├── README.md (you are here)
├── 01-design-system.md
├── 02-home-and-navigation.md
├── 03-boarding-pass-flow.md
├── 04-metro-card-flow.md
├── 05-city-exploration-flow.md
├── 06-restaurant-recommender-flow.md
├── 07-local-alerts-flow.md
├── 08-navigation-flow.md
├── 09-music-player-flow.md
└── 10-interaction-patterns.md
```

Each document is self-contained but references the design system and interaction patterns for consistency.

---

## Design Specifications at a Glance

**Screen:**
- ~3.5" diagonal, 480×320px (assumed)
- Portrait orientation
- High DPI for QR code scanning

**Colors:**
- Background: #1C1C1E (deep charcoal)
- Accent: #FFB800 (warm yellow)
- Text: #E8E8E8 (off-white)

**Typography:**
- Serif: Perfectly 90s (headlines, numbers, place names)
- Sans: Null (body, metadata, UI labels)
- Scale: 10px (labels) → 48px (hero)

**Spacing:**
- 8px grid system
- 16px content padding
- 24px section gaps
- 32px screen margins

**Input:**
- Single 360° ball (right side)
- Roll (continuous), Press (click), Long-press (600ms hold)

---

## Questions or Feedback?

This design is comprehensive but not final. It's meant to be:
- **Explored** - Read through the flows, imagine using the device
- **Challenged** - Question decisions, propose alternatives
- **Refined** - User-tested and iterated based on real feedback
- **Built** - Implemented and brought to life

The best designs evolve. This is a strong foundation to build on.

---

**Designed for travelers, by thinking like a traveler.**

*Dark theme. Yellow accent. One ball. Infinite possibilities.*
