# Local Alerts Flow

## Use Case Context

**Scenario:** You arrive at a well-known tourist site (temple, monument, viewpoint). The device knows common scams, mistakes, or better options at this location.

**Emotional needs:**
- **Safety:** "I won't get scammed"
- **Insider knowledge:** "I'm getting local wisdom, not tourist traps"
- **Calm confidence:** "This is helpful, not alarming"
- **Actionable:** "I know what to do (or not do)"

**Critical success factors:**
- Auto-surfaces at relevant locations (geo-triggered)
- Tone is friendly and protective, never panicky or scary
- Information is specific and actionable ("Don't X, instead do Y")
- Can handle multiple alerts at one location
- Easy to dismiss if not relevant

---

## Screen States

### State 1: Single Alert (Primary View)

This is what auto-surfaces when you arrive at a tourist spot with a known tip/warning.

```
┌─────────────────────────────────────────┐
│  NEARBY · Trevi Fountain                │ ← Context label
│                                         │
│                                         │
│                                         │
│         Local Tip                       │ ← Title
│         ─────────                       │   (Title, 32px, Perfectly 90s)
│                                         │
│                                         │
│                                         │
│                                         │
│   Watch out for coin-toss scammers      │ ← Alert heading (Body Large, 18px)
│                                         │   Color: #FFB800 (warm, not alarming)
│                                         │
│   People will offer to "help" you       │ ← Description (Body, 15px)
│   throw coins the "right way" then      │   Color: #E8E8E8
│   ask for money. It's a scam.           │   Line height: 21px
│                                         │   Max 6-7 lines
│   Just toss your own coin - any way     │
│   works fine!                           │
│                                         │
│                                         │
│   — Shared by locals on r/rome          │ ← Attribution (Metadata, 12px)
│                                         │   Color: #8E8E93
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Thanks, got it                 │  │ ← Dismiss button
│   └─────────────────────────────────┘  │   (Gray, not prominent)
│                                         │
│                                         │
│   ○ Roll if more tips available        │ ← Hint if multiple alerts
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **"Local Tip" not "WARNING"** - Friendly, helpful tone, not scary
2. **Yellow accent** - Warm but noticeable (not red/alarming)
3. **Clear what/why/what to do** - Explains the scam + gives alternative
4. **Attribution** - Builds trust ("locals on Reddit" not "the algorithm")
5. **Easy dismiss** - One button press, you're done

**Ball interactions in Single Alert:**

- **Roll down** → Dismisses alert, returns to previous context
- **Roll up** → If multiple alerts exist, shows next alert
- **Single press** → Dismisses ("Thanks, got it")
- **Double press** → Returns to Home
- **Long press** → "Mark as not helpful" feedback option

---

### State 2: Multiple Alerts at One Location

When there are 2-3 tips for a single spot, roll through them like a carousel.

```
┌─────────────────────────────────────────┐
│  NEARBY · Sacré-Cœur Basilica           │
│                                         │
│         2 of 3 Tips                     │ ← Indicator showing progress
│         ───────────                     │   (Metadata, 12px, #8E8E93)
│                                         │
│                                         │
│         Local Tip                       │
│         ─────────                       │
│                                         │
│                                         │
│   Free entry to the basilica, but       │ ← Tip #2 content
│   paid entry for the dome.              │
│                                         │
│   The dome view is worth it - buy       │
│   tickets inside, not from street       │
│   vendors (they charge more).           │
│                                         │
│                                         │
│   — Shared by travelers                 │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Got it                         │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ○ Roll for next tip (1 more)         │ ← Shows how many remain
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions:**
- **Roll up** → Shows next tip (tip 3 of 3)
- **Roll down** → Shows previous tip (tip 1 of 3)
- **Single press** → Dismisses all tips
- **Double press** → Returns to Home

**Design decision:** Max 3 tips per location. More than that is overwhelming.

---

### State 3: Alert Categories

Different types of alerts have slightly different styling:

#### Scam Warning

```
┌─────────────────────────────────────────┐
│         Local Tip                       │
│         ─────────                       │
│                                         │
│   ⚠                                     │ ← Warning icon (yellow)
│                                         │   Only for scams
│   Avoid taxi scammers at the station    │
│                                         │
│   Official taxis are white with a       │
│   number. Ignore anyone approaching     │
│   you directly offering rides.          │
│                                         │
│   Use the official taxi queue outside.  │
│                                         │
└─────────────────────────────────────────┘

Icon: ⚠ #FFB800 (yellow triangle)
Tone: Protective but calm
```

#### Better Option Available

```
┌─────────────────────────────────────────┐
│         Local Tip                       │
│         ─────────                       │
│                                         │
│   ✓                                     │ ← Checkmark icon (green)
│                                         │   For positive suggestions
│   Free audio guide available inside     │
│                                         │
│   Don't hire guides outside the gate.   │
│   There's a free audio tour available   │
│   when you enter - just ask at the      │
│   desk.                                 │
│                                         │
└─────────────────────────────────────────┘

Icon: ✓ #34C759 (green check)
Tone: Helpful, positive
```

#### Local Etiquette

```
┌─────────────────────────────────────────┐
│         Local Tip                       │
│         ─────────                       │
│                                         │
│   ℹ                                     │ ← Info icon (blue)
│                                         │   For cultural guidance
│   Modest dress required inside          │
│                                         │
│   Shoulders and knees must be covered.  │
│   Free shawls available at entrance if  │
│   needed.                               │
│                                         │
└─────────────────────────────────────────┘

Icon: ℹ #0A84FF (blue info circle)
Tone: Informative, respectful
```

#### Timing / Crowds

```
┌─────────────────────────────────────────┐
│         Local Tip                       │
│         ─────────                       │
│                                         │
│   🕐                                    │ ← Clock icon
│                                         │
│   Best time to visit: early morning     │
│                                         │
│   Crowds peak 10am-2pm. Arrive before   │
│   9am or after 4pm for a more peaceful  │
│   experience.                           │
│                                         │
└─────────────────────────────────────────┘

Icon: 🕐 #8E8E93 (gray clock - neutral)
Tone: Practical, advisory
```

---

### State 4: Alert List View (From Trips & Tickets)

If you want to review all alerts for saved places, or for your current city:

```
┌─────────────────────────────────────────┐
│                                         │
│         Tips for Rome                   │ ← City name
│         ─────────────                   │   (Title, 32px)
│                                         │
│                                         │
│   SAVED LOCATIONS                       │ ← Section
│                                         │
│   ╭─────────────────────────────────╮  │ ← Focused
│   │  ⚠  Trevi Fountain              │  │   (Yellow ring)
│   │     Coin-toss scammers          │  │
│   ╰─────────────────────────────────╯  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ✓  Sacré-Cœur Basilica         │  │
│   │     Free audio guide inside     │  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   RECENT                                │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ℹ  Pantheon                    │  │
│   │     Modest dress required       │  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   ○ Press to view full tip             │
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions:**
- **Roll up/down** → Scrolls through alert summaries
- **Single press** → Opens full alert view
- **Double press** → Returns to Home
- **Long press** → Mark as read / dismiss from list

---

## Context Auto-Surface Behavior

### Trigger Conditions

Local Alerts auto-surface when:

1. **Proximity to known location:**
   - GPS within 100m of a landmark with alert data
   - Database of major tourist sites worldwide

2. **First visit detection:**
   - Device tracks if you've been here before
   - If first visit → auto-surface alert
   - If repeat visit + alert dismissed before → don't show again

3. **Priority over other contexts:**
   - Alerts are important but not urgent
   - Lower priority than boarding pass, metro card
   - Can appear alongside City Exploration mode

4. **Time sensitivity:**
   - Some alerts are time-specific: "Best before 9am"
   - If it's 2pm, don't show "arrive early" tips
   - Show relevant tips for current time

### Interruption Pattern

**Gentle, not alarming:**

```
Current screen (e.g., City Exploration)
         ↓
Small pill notification appears at top:
┌─────────────────────────────────────────┐
│  [ 💡 Local tip available · Tap to view ]│ ← Yellow pill, subtle
│                                         │
│  [Rest of current screen continues...]  │
│                                         │
└─────────────────────────────────────────┘

Single press on pill → opens full alert
Ignore it → fades after 10 seconds
```

**Design decision:** Don't force-interrupt unless it's urgent (rare). Let user opt-in with a tap.

**Exception - Urgent alerts:**

If truly urgent (active scam area, safety concern), full-screen interrupt:

```
┌─────────────────────────────────────────┐
│  ⚠ IMPORTANT                            │ ← Red accent (rare!)
│                                         │
│         Safety Alert                    │
│         ────────────                    │
│                                         │
│   Pickpocket activity high in this      │
│   area right now.                       │
│                                         │
│   Keep valuables secure and stay        │
│   aware of your surroundings.           │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Understood                     │  │
│   └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

Use red (#FF3B30) ONLY for genuine safety concerns. Keep extremely rare.

---

## Data & Content Strategy

### Where alerts come from:

1. **Travel communities:**
   - Reddit (r/travel, city subreddits)
   - TripAdvisor forums
   - Lonely Planet Thorn Tree

2. **Curated by editors:**
   - Verified by human reviewers
   - Updated quarterly or when reports come in

3. **Government sources:**
   - Embassy warnings (rare, serious only)
   - Official tourist board guidance

4. **User reports:**
   - "Report a scam" feature
   - Community moderation

### Alert writing guidelines:

**Structure:**
1. **Heading** - What's the issue? (5-8 words)
2. **Context** - What happens / why it matters (2-3 sentences)
3. **Action** - What to do instead (1-2 sentences)
4. **Attribution** - Source of this info

**Tone:**
- Friendly guide, not stern parent
- Specific, not vague ("Don't hire guides outside" not "Be careful")
- Empowering, not scary ("Here's how to avoid X" not "X is terrifying")

**Good example:**
```
Watch out for coin-toss scammers

People will offer to "help" you throw coins the "right way"
then ask for money. It's a scam.

Just toss your own coin - any way works fine!

— Shared by locals on r/rome
```

**Bad example:**
```
⚠ DANGER ⚠

NEVER talk to ANYONE near the fountain! You WILL be scammed!
Stay ALERT at ALL times!

— Anonymous tip
```

### Alert lifecycle:

- **New alerts** - Reviewed within 48h of submission
- **Active alerts** - Shown to users
- **Outdated alerts** - Removed when no longer relevant (scam dies down, venue changes policy)
- **Archived** - Kept for historical data

---

## Edge Cases

### What if I dismiss an alert but want to see it again?

**Access dismissed alerts:**

Home → Trips & Tickets → Local Tips → Dismissed

```
┌─────────────────────────────────────────┐
│         Dismissed Tips                  │
│         ──────────────                  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ⚠  Trevi Fountain              │  │
│   │     Coin-toss scammers          │  │
│   │     Dismissed 2 hours ago       │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ○ Press to view again                │
│                                         │
└─────────────────────────────────────────┘
```

### What if an alert is wrong or outdated?

**Long press → "Report issue"**

```
┌─────────────────────────────────────────┐
│         Report Issue                    │
│         ────────────                    │
│                                         │
│   ╭─────────────────────────────────╮  │
│   │  This is outdated               │  │
│   ╰─────────────────────────────────╯  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  This is incorrect              │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  This didn't happen to me       │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ○ Press to submit                    │
│                                         │
└─────────────────────────────────────────┘
```

Reports are reviewed, and if multiple users report same issue, alert is flagged for review.

### What if I'm at a location with no alerts?

No auto-surface. Device stays silent.

User can optionally contribute:

**From City Exploration detail view of a place:**

Long press → "Share a local tip" → opens simple form

### What if alert is in a language I don't understand?

**Future enhancement:** Device language settings apply to all content.

Alerts are translated to user's language.

If translation unavailable, show in English (default) with note: "Translation unavailable, showing in English"

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                TRIGGER CONDITIONS                   │
│  • GPS within 100m of landmark with alerts          │
│  • First visit to this location                     │
│  • Alert is time-relevant                           │
└─────────────────────┬───────────────────────────────┘
                      ↓
          ┌───────────────────────┐
          │  GENTLE INTERRUPT     │ ← Pill notification at top of screen
          │  (unless urgent)      │    User can tap or ignore
          └───────┬───────────────┘
                  │
            Tap to view
                  │
                  ↓
         ┌────────────────────┐
         │  SINGLE ALERT      │ ← Full-screen tip
         │  (Primary view)    │
         └────┬───────────────┘
              │
      ┌───────┼────────┐
      │       │        │
Roll for  Press    Long press
next tip  dismiss   report
      │       │        │
      ↓       │        ↓
┌──────────┐  │   ┌──────────┐
│ ALERT 2  │  │   │  REPORT  │
│ (if any) │  │   │  FORM    │
└────┬─────┘  │   └─────┬────┘
     │        │         │
Roll again    │    Submit
     │        │         │
     ↓        ↓         ↓
   Alert 3  Dismissed  [Feedback sent]
     │        │         │
     └────────┴─────────┘
              │
              ↓
      Returns to previous
      screen or Home
```

---

## Design Rationale

### Why friendly tone instead of scary warnings?

**Psychology:** Fear creates stress. Stress makes travel miserable.

**Approach:** "Here's what locals know" > "DANGER EVERYWHERE"

Users are more likely to:
- Read the whole message (not skip due to anxiety)
- Trust the guidance
- Share with other travelers

### Why attribute sources?

**Credibility:** "Shared by locals on r/rome" > anonymous algorithm

Transparent sourcing builds trust.

### Why limit to 3 alerts per location?

**Information overload:** 10 tips at one spot = none remembered.

3 tips = focused, digestible, actionable.

Prioritize: Safety > Money-saving > Experience-enhancing

### Why allow dismissing?

**User agency:** Not everyone wants/needs every tip.

Seasoned traveler who knows Rome? Dismiss.
First-time visitor? Read carefully.

### Why gentle interrupt instead of full-screen?

**Respectful UX:** User is already doing something (exploring, navigating).

Pill notification = "FYI, when you're ready"
Full-screen = "STOP EVERYTHING"

Full-screen reserved for genuine urgency.

---

## Visual Details

### Alert Card Styling

```
┌─────────────────────────────────────────┐
│                                         │
│         Local Tip                       │ ← 32px Perfectly 90s
│         ─────────                       │
│                                         │
│   ⚠                                     │ ← Icon: 32px, centered
│                                         │    Color varies by type
│   Watch out for coin-toss scammers      │ ← 18px Null Regular (heading)
│                                         │    Color: #FFB800
│   People will offer to "help" you       │ ← 15px Null Regular (body)
│   throw coins the "right way" then      │    Color: #E8E8E8
│   ask for money. It's a scam.           │    Line height: 21px
│                                         │
│   Just toss your own coin - any way     │
│   works fine!                           │
│                                         │
│   — Shared by locals on r/rome          │ ← 12px Null Medium (attribution)
│                                         │    Color: #8E8E93
│                                         │    Italic
└─────────────────────────────────────────┘

Card background: #2C2C2E
Card padding: 32px (generous, calm)
Card radius: 12px
```

### Pill Notification (Gentle Interrupt)

```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │ 💡 Local tip available · Tap to view│ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

Background: #FFB80033 (yellow glow)
Border: 1px #FFB800
Text: #E8E8E8, 12px Null Medium
Padding: 12px 16px
Radius: 8px
Position: Top of screen, 16px from edges
Animation: Slide down from top (300ms ease-out)
Auto-dismiss: Fades after 10 seconds if not tapped
```

---

## Comparison to Other Flows

| Aspect | Local Alerts | City Exploration | Restaurant Recommender |
|--------|--------------|------------------|------------------------|
| **Purpose** | Protect & guide | Discover | Decide |
| **Tone** | Helpful, calm | Serendipitous | Personal |
| **Urgency** | Low-medium | Low | Medium |
| **Auto-surface** | At landmarks | In new areas | Inside restaurants |
| **Interaction** | Read & dismiss | Browse & select | Browse & pin |
| **Frequency** | Occasional | Frequent | Occasional |

All share:
- Dark theme, yellow accents
- Attribution for trust
- Easy dismiss (user agency)
- Contextual triggering

---

## Next: Navigation Flow

Local Alerts was about protection. Navigation is about guidance - getting from A to B with minimal screen-staring.
