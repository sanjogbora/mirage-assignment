# City Exploration Flow

## Use Case Context

**Scenario:** You're walking in a new neighborhood in a new city. The device wakes to a "Nearby places" view.

**Emotional needs:**
- **Discovery:** "Show me things I wouldn't find on my own"
- **Trust:** "These recommendations are actually good, not ads"
- **Serendipity:** "I'm browsing, not searching - surprise me"
- **Actionable:** "I can get directions or save this for later"

**Critical success factors:**
- Curated, not exhaustive (7-10 places max, not 50)
- Real local wisdom (Reddit, forums, not SEO spam)
- Quick to browse (easy to flip through with ball)
- Clear what each place IS (type, vibe, distance)

---

## Screen States

### State 1: Nearby Places (List View)

This is the default exploration view when you enter this mode or when it auto-surfaces.

```
┌─────────────────────────────────────────┐
│                                         │
│         Spots near you                  │ ← Title
│         ──────────────                  │   (Title, 32px, Perfectly 90s)
│                                         │
│                                         │
│   ╭─────────────────────────────────╮  │ ← Focused card (yellow ring)
│   │ ┌─────────────────────────────┐ │  │
│   │ │ [placeholder: place image]  │ │  │ ← Image placeholder
│   │ └─────────────────────────────┘ │  │   (16:9 ratio, ~140px wide)
│   │                                 │  │   Background: #3A3A3C
│   │ The Old Bookshop                │  │   Label: centered
│   │ ─────────────────               │  │
│   │                                 │  │ ← Place name (Heading, 24px)
│   │ BOOKSTORE • 0.3 km              │  │ ← Type + distance (Label, 10px)
│   │                                 │  │
│   │ ★★★★ Loved by locals           │  │ ← Rating + tag (Metadata, 12px)
│   │                                 │  │
│   │ "Hidden gem, rare travel        │  │ ← Quote (Body, 15px, italic)
│   │  books and cozy reading nook"   │  │   Color: #8E8E93
│   ╰─────────────────────────────────╯  │
│                                         │
│   ┌─────────────────────────────────┐  │ ← Next card (partially visible)
│   │ ┌─────────────────────────────┐ │  │   Shows there's more below
│   │ │ [placeholder: place image]  │ │  │
│   │ └─────────────────────────────┘ │  │
│   │ Silo Café                       │  │
│   │ ─────────                       │  │
│   │ CAFE • 0.6 km                   │  │
│                                         │
│   ○ Roll to browse, press for details │
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **Vertical scrolling list** - Ball rolls naturally up/down
2. **One card prominently focused** - Yellow ring makes it clear what you're looking at
3. **Image placeholder** - Space reserved for future photos, but clean placeholder for now
4. **Quote from locals** - Real signal, not marketing copy
5. **Next card peek** - Shows there's more to explore below

**Ball interactions in List View:**

- **Roll up/down** → Scrolls through nearby places
  - Smooth scroll, one card at a time
  - Focused card has yellow ring
  - Scroll has momentum (feels physical)
- **Single press** → Opens Place Detail view for focused place
- **Double press** → Returns to Home
- **Long press** → Shows filter/sort options (see below)

---

### State 2: Place Detail View

Single press on a place card opens the detail view.

```
┌─────────────────────────────────────────┐
│  ←                                      │ ← Back hint (small, top left)
│                                         │
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │ [placeholder: place image]        │ │ ← Larger image placeholder
│  │                                   │ │   (Full width, 4:3 ratio)
│  └───────────────────────────────────┘ │
│                                         │
│                                         │
│         The Old Bookshop                │ ← Place name (Title, 32px)
│         ────────────────                │
│                                         │
│         BOOKSTORE                       │ ← Category (Label, 10px)
│         0.3 km away • Open now          │ ← Distance + status (Metadata, 12px)
│                                         │
│                                         │
│   ★★★★  4.8 · Loved by locals          │ ← Rating + tag
│                                         │
│                                         │
│   "Hidden gem with rare travel books   │ ← Longer quote (Body, 15px)
│   and a cozy reading nook upstairs.    │   Line clamp: 3 lines max
│   Great for rainy afternoons."          │
│                                         │
│   — Reddit • r/london                   │ ← Attribution (Metadata, 12px)
│                                         │
│                                         │
│   Hours: 10:00 - 18:00                  │ ← Practical info (Body, 15px)
│   Closes in 3 hours                     │   Color: #8E8E93
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ► Start Navigation             │  │ ← Action buttons
│   └─────────────────────────────────┘  │   (can focus/select with ball)
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ☆ Save for Later               │  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions in Detail View:**

- **Roll up/down** → Scrolls through detail content (reviews, hours, actions)
- **Single press** → Selects focused action button
  - "Start Navigation" → Opens Navigation mode to this place
  - "Save for Later" → Adds to trip list, shows checkmark
- **Double press** → Returns to List View (back to browsing)
- **Long press** → Quick action menu (Share, Report, etc.)

---

### State 3: Filter/Sort Options (Long Press from List)

Long press from List View opens filtering options.

```
┌─────────────────────────────────────────┐
│                                         │
│         Filter & Sort                   │
│         ─────────────                   │
│                                         │
│                                         │
│   SHOW                                  │ ← Section label
│                                         │
│   ╭─────────────────────────────────╮  │ ← Focused (yellow ring)
│   │  •  All Places                  │  │
│   ╰─────────────────────────────────╯  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ○  Food & Drink                │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ○  Sights & Culture            │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ○  Shops & Markets             │  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   SORT BY                               │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  •  Distance                    │  │ ← Currently selected
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ○  Rating                      │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ○ Press to apply, long press to close│
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions:**
- **Roll up/down** → Moves focus between options
- **Single press** → Selects focused option (radio button style)
  - Selected option gets yellow bullet: •
  - Unselected: ○
- **Single press** (after selection) → Applies filter and returns to List View
- **Long press** → Closes filter menu without applying changes

**Design decision:** Keep filters simple. This isn't a search engine - it's curated discovery. Too many filters defeats the purpose.

---

### State 4: Empty State (No Places Found)

If you're in a location with no interesting places nearby, or filters eliminate everything:

```
┌─────────────────────────────────────────┐
│                                         │
│         Spots near you                  │
│         ──────────────                  │
│                                         │
│                                         │
│                                         │
│                                         │
│            ⊙                            │ ← Simple icon (not too sad)
│                                         │
│         Nothing nearby                  │ ← (Body Large, 18px)
│                                         │
│         Try exploring a different       │ ← (Body, 15px)
│         neighborhood or check back      │   Color: #8E8E93
│         when you're moving around.      │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Navigate to City Center        │  │ ← Helpful action
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  View Saved Places              │  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   ○○ Double-press for Home             │
│                                         │
└─────────────────────────────────────────┘
```

---

## Context Auto-Surface Behavior

### Trigger Conditions

City Exploration auto-surfaces when:

1. **New neighborhood detected:**
   - GPS shows you've moved to a new area (>500m from last known location)
   - In a city with known POI data
   - During daytime hours (8am - 10pm)

2. **Walking/wandering behavior:**
   - Speed indicates walking, not driving
   - Not in a metro station or airport (other contexts have priority)

3. **Time since last trigger:**
   - At least 15 minutes since last exploration auto-surface
   - Prevents spam if you're walking around a lot

4. **User history:**
   - If you've dismissed this 3 times in a row, lower the auto-trigger priority
   - Device learns you're not in "exploration mode" today

### Context Label

```
┌─────────────────────────────────────────┐
│  NEARBY · Shoreditch                    │ ← Neighborhood name if known
│                                         │
│         Spots near you                  │
│         ──────────────                  │
│                                         │
│   ╭─────────────────────────────────╮  │
│   │ The Old Bookshop                 │  │
│   ╰─────────────────────────────────╯  │
```

---

## Card Design Details

### Place Card Anatomy (List View)

```
╭─────────────────────────────────────────╮ ← Border: 3px #FFB800 (focused)
│ ┌─────────────────────────────────────┐ │    or 1px #3A3A3C (unfocused)
│ │                                     │ │
│ │ [placeholder: place image]          │ │ ← Background: #3A3A3C
│ │                                     │ │   Height: 100px
│ └─────────────────────────────────────┘ │   Width: full card width - 32px padding
│                                         │   Radius: 8px
│ The Old Bookshop                        │   Centered text: "placeholder: place image"
│ ─────────────────                       │   Font: Null Regular, 12px, #8E8E93
│                                         │
│ BOOKSTORE • 0.3 km                      │ ← (Label, 10px, Null Bold, all caps)
│                                         │   Color: #FFB800 (yellow for category)
│ ★★★★ Loved by locals                   │   Color: #8E8E93 (gray for distance)
│                                         │
│ "Hidden gem, rare travel                │ ← (Body, 15px, Null Regular, italic)
│  books and cozy reading nook"           │   Color: #8E8E93
│                                         │   Line clamp: 2 lines max in list view
╰─────────────────────────────────────────╯

Card padding: 16px all sides
Card radius: 12px
Card background: #2C2C2E
Card margin: 24px between cards
```

### Rating Display

```
★★★★ Loved by locals
│││└─ Empty star (if needed): ☆ #48484A
││└── Filled star: ★ #FFB800 (yellow)
│└─── 4 stars shown (out of 5)
└──── Tag: "Loved by locals", "Hidden gem", "Tourist favorite", etc.
```

**Tag variations:**
- "Loved by locals" (greenish tint)
- "Hidden gem" (yellow tint)
- "Popular spot" (neutral)
- "Tourist favorite" (blue tint - not necessarily bad, just informative)

---

## Data & Content Strategy

### Where does this data come from?

**Sources (in priority order):**
1. **Reddit threads** - Search city/neighborhood subreddits for recommendations
2. **Local forums** - TripAdvisor alternative sites, local blogs
3. **Curated lists** - "Best of" lists from trustworthy publications
4. **Structured data** - Google Places, but filtered heavily

**What we show:**
- Name, category, distance (always)
- Rating (if confident in source)
- ONE good quote (best signal from sources above)
- Hours / status (from structured data)
- Photo placeholder (for future implementation)

**What we DON'T show:**
- SEO spam ("best pizza in the world!")
- Paid placement / ads
- Every single place in a 1km radius
- Overly detailed menus or price lists (that's for Restaurant Recommender)

### Curation Philosophy

**7 places, not 70:**
- Show top 7-10 places within walkable distance (~1-2 km)
- Prioritize:
  1. Things that are open NOW
  2. High local ratings (not tourist trap ratings)
  3. Variety (not 5 coffee shops)
  4. Uniqueness (not chains)

**Update frequency:**
- Refresh when you move to a new area
- Don't refresh if you're just scrolling through the list (no jumpy updates)

---

## Edge Cases

### What if a place is closed?

Show it in the list, but dim it and add status:

```
╭─────────────────────────────────────────╮
│ ┌─────────────────────────────────────┐ │
│ │ [placeholder: place image]          │ │ ← Dimmed (lower opacity)
│ └─────────────────────────────────────┘ │
│                                         │
│ The Old Bookshop                        │ ← Dimmed text (#8E8E93)
│ ─────────────────                       │
│                                         │
│ BOOKSTORE • 0.3 km • Closed             │ ← "Closed" in red (#FF3B30)
│                                         │
│ ★★★★ Loved by locals                   │
│                                         │
│ Opens tomorrow at 10:00                 │ ← Helpful info
╰─────────────────────────────────────────╯
```

Still browsable, but clearly not actionable right now.

### What if GPS is inaccurate?

Show best effort based on last known location, with a subtle indicator:

```
┌─────────────────────────────────────────┐
│  NEARBY · Location approximate          │ ← Honest label
│                                         │
│         Spots near you                  │
│         ──────────────                  │
│                                         │
```

Distances might be slightly off, but that's okay - user can judge when they see it.

### What if I'm in a city with no data?

```
┌─────────────────────────────────────────┐
│         Spots near you                  │
│         ──────────────                  │
│                                         │
│            ⊙                            │
│                                         │
│         Not available here              │
│                                         │
│         We don't have local             │
│         recommendations for this        │
│         area yet.                       │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Suggest Places to Add          │  │ ← Crowdsource future data
│   └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### What if I save a place for later?

**Saved indicator on card:**

```
╭─────────────────────────────────────────╮
│ ☆ SAVED                                 │ ← Top right badge
│                                         │   Background: #FFB80033 (yellow glow)
│ The Old Bookshop                        │   Text: #FFB800
│ ─────────────────                       │
│                                         │
│ BOOKSTORE • 0.3 km                      │
╰─────────────────────────────────────────╯
```

**Access saved places:**
- Home → Trips & Tickets → Saved Places
- Or via filter menu: "Show Only Saved"

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                    ENTRY POINTS                     │
└─────────────────────────────────────────────────────┘
              │                      │
              │                      │
  ┌───────────┴────────┐    ┌────────┴──────────┐
  │  Auto-surface      │    │  Manual from Home │
  │  (walking in area) │    │  (Explore Nearby) │
  └───────┬────────────┘    └────────┬──────────┘
          │                          │
          └──────────┬───────────────┘
                     ↓
          ┌──────────────────────┐
          │  LIST VIEW           │ ← Default, scrollable
          │  (Nearby Places)     │    7-10 cards
          └──────┬───────────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
Roll up/down  Press     Long press
     │           │           │
     │           ↓           ↓
     │    ┌──────────────┐  ┌─────────────┐
     │    │ DETAIL VIEW  │  │ FILTER MENU │
     │    │ (one place)  │  └──────┬──────┘
     │    └──────┬───────┘         │
     │           │            Apply filter
     │      Select action         │
     │           │                 │
     │    ┌──────┴────┐            │
     │    │           │            │
     ↓    ↓           ↓            ↓
Navigate  Save   (back to)   ┌──────────────┐
to place  place    List      │ FILTERED     │
  │        │                 │ LIST VIEW    │
  │        ↓                 └──────────────┘
  │   [Saved indicator               │
  │    shows on card]                │
  │                                  │
  ↓                                  │
Opens Navigation mode                │
  │                                  │
  │      Double press from anywhere  │
  └──────────────┬───────────────────┘
                 ↓
          ┌──────────────┐
          │    HOME      │
          └──────────────┘
```

---

## Design Rationale

### Why vertical list, not map view?

**Decision:** List first, map optional.

**Reasoning:**
1. Small screen = map is cramped, hard to read labels
2. List gives you richer info (quotes, ratings, photos)
3. Ball rolls naturally for vertical scrolling
4. Map can be an alternate view (long press → "Show on Map")

If we add map view later:
- Simple, minimal map
- Yellow pins for places
- Roll to pan, press pin to see name
- But list is still primary

### Why limit to 7-10 places?

**Philosophy:** Curated, not exhaustive.

This isn't Yelp showing you 147 coffee shops ranked by distance. It's 7 GOOD spots worth your time. Forces editorial quality.

### Why show quotes from Reddit/forums?

**Authenticity signal:** Marketing copy says "world-class cuisine." A Redditor says "the lasagna is insane." Which do you trust?

Quotes from real people = credibility.

### Why peek at next card?

**UX pattern:** Showing 80% of the next card signals "there's more below, keep scrolling."

Without peek, user might think that's all there is.

### Why italicize quotes?

**Visual differentiation:**
- Place name, category, distance = facts (regular weight)
- Quote = opinion (italic, softer)

Easy to scan and distinguish information types.

---

## Visual Design Details

### List View Scroll Behavior

```
Initial state (card 1 focused):
┌─────────────────────────┐
│ ╭─────────────────────╮ │ ← Card 1, focused (yellow ring)
│ │ The Old Bookshop    │ │    Fully visible
│ ╰─────────────────────╯ │
│                         │
│ ┌─────────────────────┐ │ ← Card 2, next
│ │ Silo Café           │ │    80% visible (peek)
│ └─────────────────────┘ │
└─────────────────────────┘

Roll down:
┌─────────────────────────┐
│ ╭─────────────────────╮ │ ← Card 2, now focused
│ │ Silo Café           │ │    Fully visible
│ ╰─────────────────────╯ │
│                         │
│ ┌─────────────────────┐ │ ← Card 3, next
│ │ Vintage Market      │ │    80% visible
│ └─────────────────────┘ │
└─────────────────────────┘
```

**Animation:** 300ms ease-out scroll, focus ring moves smoothly.

### Placeholder Image Treatment

For place images (not yet implemented):

```
┌───────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░[placeholder: place image]░│ ← Background: #3A3A3C
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   Text: #8E8E93, 12px
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   Centered
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└───────────────────────────────┘

Aspect ratio: 16:9 (landscape)
Border radius: 8px (matches card aesthetic)
```

---

## Next: Restaurant Recommender Flow

City Exploration is about browsing. Restaurant Recommender is about deciding - a more focused, personalized use case.
