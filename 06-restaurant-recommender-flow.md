# Restaurant Recommender Flow

## Use Case Context

**Scenario:** You're seated inside a restaurant. The device recognizes the location and knows your dietary preferences (vegan, allergies, etc.).

**Emotional needs:**
- **Confidence:** "These dishes will work for my diet"
- **Speed:** "I don't have to read the whole menu"
- **Discovery:** "Show me what's actually good HERE"
- **Memory aid:** "Help me remember what to order"

**Critical success factors:**
- Auto-detects you're in a restaurant (GPS + wifi + business data)
- Filters dishes by your preferences (dietary, taste profile)
- Shows what's popular/recommended at THIS specific restaurant
- Quick to browse (menu can have 50+ items, show me 5-8 best)

---

## Screen States

### State 1: Restaurant Detected (Entry View)

When device detects you've entered a restaurant, this auto-surfaces:

```
┌─────────────────────────────────────────┐
│  NEARBY · Inside Restaurant             │ ← Context label
│                                         │
│                                         │
│         Osteria del Sole                │ ← Restaurant name
│         ────────────────                │   (Title, 32px, Perfectly 90s)
│                                         │
│         Italian • €€                    │ ← Type + price (Metadata, 12px)
│         ★★★★ 4.6 rating                │
│                                         │
│                                         │
│    Since you're vegetarian, here        │ ← Personalized message
│    are some good picks:                 │   (Body Large, 18px, Null)
│                                         │   Color: #FFB800 (warm, welcoming)
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Show Recommendations           │  │ ← Primary CTA (yellow button)
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Browse Full Menu               │  │ ← Secondary option
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   ○ Press to continue                  │
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **Welcoming entry** - Confirms location, acknowledges your preferences
2. **Two paths** - Curated recommendations (preferred) or full menu
3. **Personalization visible** - "Since you're vegetarian" builds trust
4. **Not pushy** - If you want to dismiss, double-press to Home

**Ball interactions:**

- **Roll up/down** → Toggles focus between the two buttons
- **Single press** → Selects focused option
  - "Show Recommendations" → Goes to Dish List (State 2)
  - "Browse Full Menu" → Goes to Full Menu (State 3, optional)
- **Double press** → Dismisses, returns to Home
- **Long press** → Quick action: "Not here" to report incorrect detection

---

### State 2: Dish Recommendations List

The main view - curated dishes that match your preferences.

```
┌─────────────────────────────────────────┐
│                                         │
│         Good picks for you              │ ← Title
│         ──────────────────              │   (Title, 32px, Perfectly 90s)
│         at Osteria del Sole             │   (Metadata, 12px)
│                                         │
│                                         │
│   ╭─────────────────────────────────╮  │ ← Focused dish (yellow ring)
│   │                                 │  │
│   │ ┌─────────────────────────────┐ │  │
│   │ │ [placeholder: dish image]   │ │  │ ← Image placeholder (square, 1:1)
│   │ └─────────────────────────────┘ │  │   Size: ~120px, centered
│   │                                 │  │
│   │ Pappardelle al Funghi           │  │ ← Dish name (Heading, 24px)
│   │ ─────────────────────           │  │
│   │                                 │  │
│   │ VEGETARIAN • POPULAR            │  │ ← Tags (Label, 10px, all caps)
│   │                                 │  │   Color: #34C759 (vegetarian tag)
│   │                                 │  │   Color: #FFB800 (popular tag)
│   │ €14                             │  │ ← Price (Body, 15px)
│   │                                 │  │
│   │ ★★★★ Often ordered             │  │ ← Rating + marker (Metadata, 12px)
│   │                                 │  │
│   │ "Rich, creamy, perfect portion" │  │ ← Short quote (Body, 15px, italic)
│   │                                 │  │   Color: #8E8E93
│   ╰─────────────────────────────────╯  │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │ ← Next dish (peek)
│   │ ┌─────────────────────────────┐ │  │
│   │ │ [placeholder: dish image]   │ │  │
│   │ └─────────────────────────────┘ │  │
│   │ Risotto alle Erbe               │  │
│   │ ─────────────────               │  │
│                                         │
│   ○ Roll to browse, press for details │
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **Dietary tags prominent** - Green "VEGETARIAN" gives instant confidence
2. **Popular marker** - "Often ordered" or "House favorite" signals safety
3. **Quote from reviews** - Real diner feedback, not menu marketing
4. **Square dish image** - Food photos work well in 1:1 ratio
5. **Price visible** - No surprises

**Ball interactions in Dish List:**

- **Roll up/down** → Scrolls through recommended dishes (5-8 dishes total)
  - Focused dish has yellow ring
  - Scroll feels smooth, one dish at a time
- **Single press** → Opens Dish Detail view
- **Double press** → Returns to Entry View or exits to Home
- **Long press** → "Pin to order list" (quick save without opening detail)

---

### State 3: Dish Detail View

Single press on a dish opens detailed information.

```
┌─────────────────────────────────────────┐
│  ←                                      │ ← Back indicator
│                                         │
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │ [placeholder: dish image]         │ │ ← Larger image (4:3 landscape)
│  │                                   │ │
│  └───────────────────────────────────┘ │
│                                         │
│                                         │
│         Pappardelle al Funghi           │ ← Dish name (Title, 32px)
│         ─────────────────────           │
│                                         │
│         VEGETARIAN • POPULAR            │ ← Tags
│         €14                             │ ← Price
│                                         │
│                                         │
│   Wide pasta ribbons with mixed         │ ← Description (Body, 15px)
│   mushrooms in a light cream sauce.     │   Line clamp: 3-4 lines
│   Finished with parsley and             │
│   parmesan.                             │
│                                         │
│   ★★★★ 4.7 · Often ordered             │ ← Rating
│                                         │
│                                         │
│   "Rich, creamy, perfect portion.       │ ← Longer review quote
│   The mushrooms are incredible."        │   (Body, 15px, italic)
│                                         │
│   — TripAdvisor                         │ ← Attribution
│                                         │
│                                         │
│   Portion: Large                        │ ← Practical details
│   Spice level: Mild                     │   (Metadata, 12px)
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ☆ Pin to Order List            │  │ ← Action buttons (focusable)
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ◊ Ask Waiter About This        │  │ ← Memory aid
│   └─────────────────────────────────┘  │   (adds to "questions" list)
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions in Detail View:**

- **Roll up/down** → Scrolls through content and action buttons
- **Single press** → Selects focused action
  - "Pin to Order List" → Adds dish, shows checkmark, returns to List
  - "Ask Waiter About This" → Saves question, returns to List
- **Double press** → Returns to Dish List
- **Long press** → Share dish or report issue

---

### State 4: Order List (Your Pinned Dishes)

Access this from long press on Home, or from a menu option.

```
┌─────────────────────────────────────────┐
│                                         │
│         Your Order List                 │ ← Title
│         ───────────────                 │
│         at Osteria del Sole             │
│                                         │
│                                         │
│   PINNED                                │ ← Section label
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ✓ Pappardelle al Funghi        │  │ ← Checkmark = pinned
│   │     €14                         │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ✓ Tiramisù                     │  │
│   │     €7                          │  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   TO ASK WAITER                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ? Is the risotto very creamy?  │  │ ← Questions you saved
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   Total: ~€21                           │ ← Running total (helpful!)
│                                         │
│                                         │
│   ○ Roll to review, press to edit      │
│                                         │
└─────────────────────────────────────────┘
```

**Design decision:** This is a memory aid, not a live ordering system. You still tell the waiter verbally. This just helps you remember what you wanted and what questions you had.

**Ball interactions:**

- **Roll up/down** → Scrolls through pinned items
- **Single press** → Opens that dish detail (if you want to review)
- **Long press** → Remove from list
- **Double press** → Returns to previous view

---

### State 5: Full Menu View (Optional)

If user selects "Browse Full Menu" instead of recommendations:

```
┌─────────────────────────────────────────┐
│                                         │
│         Full Menu                       │
│         ─────────                       │
│         Osteria del Sole                │
│                                         │
│                                         │
│   ANTIPASTI                             │ ← Section header
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Bruschetta al Pomodoro         │  │ ← Simple list (no images)
│   │  VEGETARIAN • €6                │  │   More compact than
│   └─────────────────────────────────┘  │   recommendations
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Prosciutto e Melone            │  │
│   │  €9                             │  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   PRIMI PIATTI                          │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Pappardelle al Funghi          │  │
│   │  VEGETARIAN • POPULAR • €14     │  │ ← Still shows tags
│   └─────────────────────────────────┘  │   for matches
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Spaghetti alle Vongole         │  │
│   │  €16                            │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ○ Roll to browse, press for details │
│                                         │
└─────────────────────────────────────────┘
```

**Design decision:** Full menu is more utilitarian. No photos, tighter spacing, but still highlights matches to your preferences.

---

## Context Auto-Surface Behavior

### Trigger Conditions

Restaurant Recommender auto-surfaces when:

1. **Location detection:**
   - GPS coordinates match a known restaurant in database
   - Or wifi SSID matches restaurant network
   - Confidence threshold: 85%+ to avoid false positives

2. **Time of day:**
   - During meal hours:
     - Breakfast: 7-10am
     - Lunch: 11:30am-2:30pm
     - Dinner: 6-10pm
   - Lower priority outside these times

3. **Dwell time:**
   - You've been stationary for >2 minutes
   - Suggests you're seated, not just passing through

4. **Not conflicting with other contexts:**
   - Boarding pass (airport) takes priority
   - Navigation (actively moving) takes priority

### Context Label

```
┌─────────────────────────────────────────┐
│  NEARBY · Inside Restaurant             │ ← Generic
│                                         │
```

Or if confident:

```
┌─────────────────────────────────────────┐
│  NEARBY · Osteria del Sole              │ ← Restaurant name
│                                         │
```

---

## Personalization System

### Dietary Preferences

**How it knows:**

User sets preferences in device settings:
- Vegetarian
- Vegan
- Gluten-free
- Allergies (nuts, shellfish, dairy, etc.)
- Taste preferences (spicy, mild, etc.)

**How it filters:**

Dishes tagged with dietary info:
- ✓ Match = show prominently, green tag
- ⚠ Partial match = show with warning (e.g., "Can be made vegan - ask waiter")
- ✗ No match = hide from recommendations (but available in full menu)

**Personalized intro messages:**

```
"Since you're vegan, here are some good picks:"
"Since you avoid gluten, here are safe options:"
"Since you like spicy food, try these:"
"Based on your preferences, we recommend:"
```

### Learning Over Time

**Future enhancement** (not in initial design):

Device could learn from:
- What you pin to order list
- What you actually order (if integrated with payment)
- What you rate after eating

Then adjust recommendations: "You usually like pasta dishes, try this one."

---

## Edge Cases

### What if restaurant isn't recognized?

No auto-surface. User can manually:
- Home → Explore Nearby → Find restaurant → Select it
- Then see generic recommendations (not personalized to THIS restaurant's menu)

### What if restaurant has no menu data?

```
┌─────────────────────────────────────────┐
│  NEARBY · Inside Restaurant             │
│                                         │
│                                         │
│         Osteria del Sole                │
│         ────────────────                │
│                                         │
│         Italian • €€                    │
│         ★★★★ 4.6 rating                │
│                                         │
│                                         │
│    We don't have menu details yet,      │
│    but here's what others say:          │ ← Graceful fallback
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ★★★★ Great pasta                │  │ ← General reviews
│   │  "Amazing carbonara and friendly│  │
│   │   service"                       │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  View on TripAdvisor            │  │ ← External link
│   └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### What if dietary preference conflicts with restaurant type?

Example: You're vegan, but you're in a steakhouse.

```
┌─────────────────────────────────────────┐
│         Texas Roadhouse                 │
│         ───────────────                 │
│                                         │
│         Steakhouse • €€€                │
│                                         │
│                                         │
│    Limited vegan options here,          │
│    but we found a few:                  │ ← Honest message
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  House Salad (no cheese)        │  │ ← Best effort
│   │  VEGAN (customized) • €8        │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Grilled Vegetables             │  │
│   │  VEGAN • €12                    │  │
│   └─────────────────────────────────┘  │
│                                         │
│   You might prefer another spot.        │ ← Gentle suggestion
│   Tap to find vegan-friendly places.    │   to exit
│                                         │
└─────────────────────────────────────────┘
```

### What if you're with others who have different diets?

**Settings option:**
- "Group mode" - shows all options, tags what works for whom
- "My diet + vegetarian" - temporary override

```
┌─────────────────────────────────────────┐
│   ┌─────────────────────────────────┐  │
│   │  Pappardelle al Funghi          │  │
│   │  VEGETARIAN • VEGAN             │  │ ← Multiple tags
│   │  Good for: You, Sarah           │  │   (if device knows group)
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Spaghetti Carbonara            │  │
│   │  VEGETARIAN                     │  │
│   │  Good for: Sarah                │  │
│   └─────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## Data & Content Strategy

### Menu Data Sources

1. **Restaurant partnerships** - Direct menu feeds (ideal, rare)
2. **Crowdsourced** - Users submit menus, photos, tags
3. **Scraped data** - From delivery apps (Deliveroo, UberEats) with attribution
4. **OCR + manual review** - Device can scan paper menus (future feature)

### Dish Tagging

Critical for filtering:
- Dietary: vegetarian, vegan, gluten-free, dairy-free, nut-free, etc.
- Popularity: popular, house favorite, chef's special
- Style: spicy, mild, light, heavy, shareable
- Reviews: quotes from real diners (TripAdvisor, Google, Reddit)

### Review Quote Selection

**Criteria for a good quote:**
- Specific to the dish (not "great restaurant")
- Informative ("huge portion") not vague ("delicious")
- Recent (within 6 months)
- From a real person, not marketing

**Bad quotes (avoid):**
- "Best pasta in the world!" (hyperbole)
- "Try this!" (no info)
- "Decent" (damns with faint praise)

**Good quotes:**
- "Rich, creamy, perfect portion"
- "Spicier than expected, but incredible flavor"
- "Enough for two people"

---

## Flow Diagram

```
┌───────────────────────────────────────────────────────┐
│                 TRIGGER CONDITIONS                    │
│  • GPS/wifi inside restaurant                         │
│  • Meal time (breakfast/lunch/dinner)                 │
│  • Stationary >2 min (seated)                         │
└───────────────────┬───────────────────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  ENTRY VIEW           │ ← "Since you're vegetarian..."
        │  Restaurant detected  │
        └───────┬───────────────┘
                │
    ┌───────────┴───────────┐
    │                       │
Show Recs          Browse Full Menu
    │                       │
    ↓                       ↓
┌─────────────────┐   ┌──────────────┐
│ DISH LIST       │   │ FULL MENU    │
│ (Recommended)   │   │ (All dishes) │
│ 5-8 dishes      │   │ Sectioned    │
└────┬────────────┘   └───┬──────────┘
     │                    │
     │ Press on dish      │
     └────────┬───────────┘
              ↓
     ┌─────────────────┐
     │ DISH DETAIL     │ ← Description, reviews, actions
     └────┬────────────┘
          │
    Select action
          │
     ┌────┴─────┐
     │          │
Pin to List  Ask Waiter
     │          │
     ↓          ↓
┌────────────────────┐
│ ORDER LIST         │ ← Memory aid
│ (Pinned + Questions)│
└────────────────────┘
     │
Double press
     │
     ↓
┌──────────┐
│   HOME   │
└──────────┘
```

---

## Design Rationale

### Why auto-detect restaurants at all?

**Pain point:** You're in a foreign country, menu is overwhelming, you don't know what's good here.

Auto-surfacing says: "I know where you are, I know your diet, here's what works."

### Why limit recommendations to 5-8 dishes?

**Decision fatigue:** Full menus can have 50+ items. Analysis paralysis.

Curated list = "these are the GOOD ones for YOU" = faster, more confident decision.

### Why show "order list" instead of actual ordering?

**Scope constraint:** This is a travel companion, not a POS system.

Order list = memory aid for when waiter comes. Simple, no integration needed.

### Why allow full menu view?

**User agency:** Some people want to explore everything, not just recommendations.

Recommendations are the smart default, full menu is the escape hatch.

### Why dietary tags in green?

**Visual affirmation:** Green = "this is safe for you."

Instant recognition without reading full tags.

---

## Visual Details

### Dish Card Specifications (Recommended List)

```
╭───────────────────────────────────────╮ ← Border: 3px #FFB800 (focused)
│                                       │    1px #3A3A3C (unfocused)
│ ┌───────────────────────────────────┐ │
│ │                                   │ │
│ │ [placeholder: dish image]         │ │ ← Square, 1:1 ratio
│ │                                   │ │   Size: 120px × 120px
│ └───────────────────────────────────┘ │   Centered in card
│                                       │
│ Pappardelle al Funghi                 │ ← (Heading, 24px, Perfectly 90s)
│ ─────────────────────                 │
│                                       │
│ VEGETARIAN • POPULAR                  │ ← (Label, 10px, Null Bold, all caps)
│ €14                                   │   Green for dietary, yellow for popular
│                                       │   (Body, 15px, Null Regular)
│ ★★★★ Often ordered                   │
│                                       │
│ "Rich, creamy, perfect portion"       │ ← (Body, 15px, Null Italic)
│                                       │   Color: #8E8E93
╰───────────────────────────────────────╯

Card padding: 16px
Card background: #2C2C2E
Card radius: 12px
Card margin: 24px between cards
```

### Tag Color System

```
VEGETARIAN    Background: #34C75933 (green glow)
              Border: 1px #34C759
              Text: #34C759

VEGAN         Background: #34C75933
              Border: 1px #34C759
              Text: #34C759

POPULAR       Background: #FFB80033 (yellow glow)
              Border: 1px #FFB800
              Text: #FFB800

SPICY         Background: #FF3B3033 (red glow)
              Border: 1px #FF3B30
              Text: #FF3B30

GLUTEN-FREE   Background: #0A84FF33 (blue glow)
              Border: 1px #0A84FF
              Text: #0A84FF
```

---

## Comparison to City Exploration

| Aspect | City Exploration | Restaurant Recommender |
|--------|------------------|------------------------|
| **Trigger** | Walking in new area | Inside restaurant, seated |
| **Purpose** | Discover places | Decide what to order |
| **Personalization** | Light (general interests) | Heavy (dietary restrictions) |
| **Volume** | 7-10 places | 5-8 dishes (from 50+ menu items) |
| **Action** | Navigate, save place | Pin to order, ask questions |
| **Urgency** | Casual browsing | Time-sensitive (waiter is waiting) |
| **Data source** | Reddit, forums, reviews | Menu data + reviews |

Both share:
- Card-based scrolling lists
- Image placeholders
- Quote-based authenticity
- Yellow focus rings, dark theme

---

## Next: Local Alerts Flow

Restaurant Recommender was about personal decision-making. Local Alerts is about protection - warning you about scams, mistakes, or better options.
