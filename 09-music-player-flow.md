# Music Player Flow

## Use Case Context

**Scenario:** You're walking, sitting on a train, or commuting. You want simple control of music without digging into your phone.

**Emotional needs:**
- **Quick control:** "Skip this track without breaking stride"
- **Ambient management:** "Music runs in background while I do other things"
- **Discovery:** "Something new, match my mood"
- **Physical feel:** "Ball feels like a DJ controller"

**Critical success factors:**
- Works as remote for phone audio OR device plays music itself
- Tactile, satisfying ball interactions (roll = scrub, press = play/pause)
- Runs in background (navigate while listening)
- Simple playlist/mood selection
- Low battery drain

---

## Screen States

### State 1: Now Playing (Primary View)

This is what you see when music is actively playing.

```
┌─────────────────────────────────────────┐
│                                         │
│         Now Playing                     │ ← Title
│         ───────────                     │   (Title, 32px, Perfectly 90s)
│                                         │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │                                   │ │
│  │ [placeholder: album art]          │ │ ← Album art placeholder (square)
│  │                                   │ │   Size: 200×200px, centered
│  │                                   │ │   Background: #3A3A3C
│  └───────────────────────────────────┘ │
│                                         │
│                                         │
│         Blinded by the Lights           │ ← Track name
│         ─────────────────────           │   (Heading, 24px, Perfectly 90s)
│                                         │   Color: #E8E8E8
│         The Streets                     │ ← Artist
│         ───────────                     │   (Body Large, 18px, Null)
│                                         │   Color: #8E8E93
│                                         │
│                                         │
│   ──────●─────────────────              │ ← Progress bar
│   1:24                       3:52       │   Current time / Total time
│                                         │   (Metadata, 12px)
│                                         │
│                                         │
│         ♪ Travel Mix                    │ ← Playlist/context
│                                         │   (Metadata, 12px, #8E8E93)
│                                         │
│   ○ Roll left/right to skip            │
│                                         │
└─────────────────────────────────────────┘
```

**Design decisions:**

1. **Album art prominent** - Visual anchor, makes it feel like a real music player
2. **Track + artist clear** - Serif for track name (emotion), sans for artist (info)
3. **Progress bar** - Shows where you are in the song
4. **Minimal controls** - No buttons, ball does everything
5. **Context shown** - What playlist/source is this from?

**Ball interactions in Now Playing:**

- **Roll right** → Skip to next track
  - Quick roll = next track
  - Continuous roll = fast-forward through tracks
- **Roll left** → Previous track (or restart current if >5 sec in)
- **Single press** → Play / Pause
  - Press once: pause (♪ becomes ⏸)
  - Press again: resume
- **Double press** → Returns to Home (music keeps playing in background)
- **Long press** → Opens player options (shuffle, repeat, etc.)

**Special ball behavior - Scrubbing:**

- **Slow, deliberate roll left/right** (while paused or playing):
  - Scrubs within the current track
  - Progress bar moves with your roll
  - Visual feedback: time updates live
  - Feels like a vinyl DJ scratch or tape deck

---

### State 2: Playlist / Source Selection

How do you choose what to play?

**From Home → Music → Initially:**

```
┌─────────────────────────────────────────┐
│                                         │
│         Music                           │
│         ─────                           │
│                                         │
│                                         │
│   RECENT                                │ ← Section
│                                         │
│   ╭─────────────────────────────────╮  │ ← Last played (focused)
│   │  ♪ Travel Mix                   │  │
│   │     Offline playlist · 24 songs │  │
│   │     Last played 2 hours ago     │  │
│   ╰─────────────────────────────────╯  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ♪ City Wandering               │  │
│   │     Chill beats · 18 songs      │  │
│   └─────────────────────────────────┘  │
│                                         │
│                                         │
│   YOUR PLAYLISTS                        │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ♪ Workout                      │  │
│   │     High energy · 32 songs      │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ♪ Rainy Day                    │  │
│   │     Acoustic · 15 songs         │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ○ Press to play                      │
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions:**
- **Roll up/down** → Scrolls through playlists
- **Single press** → Starts playing focused playlist → goes to Now Playing view
- **Double press** → Returns to Home
- **Long press** → Playlist options (edit, delete, etc. - out of scope for now)

**Design decision:** Simple playlist picker. This isn't Spotify with infinite browsing - it's your curated travel mixes.

---

### State 3: Player Options (Long Press)

Long press from Now Playing opens quick options:

```
┌─────────────────────────────────────────┐
│                                         │
│         Player Options                  │
│         ──────────────                  │
│                                         │
│                                         │
│   ╭─────────────────────────────────╮  │ ← Focused option
│   │  ∞  Shuffle                     │  │   (Yellow ring)
│   │     Currently off               │  │
│   ╰─────────────────────────────────╯  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ↻  Repeat                      │  │
│   │     Currently off               │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ⚡ Energy Boost                │  │ ← Special mode!
│   │     Play faster, upbeat tracks  │  │   (see below)
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ◉  Change Playlist             │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  ✕  Stop Music                  │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ○ Press to select, long press to close│
│                                         │
└─────────────────────────────────────────┘
```

**Ball interactions:**
- **Roll up/down** → Moves focus between options
- **Single press** → Toggles focused option
  - Shuffle: on/off
  - Repeat: off → repeat all → repeat one → off
  - Energy Boost: activates special mode
  - Change Playlist: goes to Playlist Selection view
  - Stop Music: stops playback, returns to Home
- **Long press** → Closes options, returns to Now Playing
- **Double press** → Returns to Home

---

### State 4: Energy Boost Mode

"Energy Boost" is a playful, travel-specific feature:

**What it does:**
- Filters playlist to upbeat, high-BPM tracks
- Skips slow or mellow songs
- Maybe increases playback speed slightly (1.1x)
- Visual indicator while active

```
┌─────────────────────────────────────────┐
│  ⚡ ENERGY BOOST                        │ ← Top banner
│                                         │   Yellow background (#FFB80033)
│         Now Playing                     │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ [placeholder: album art]          │ │
│  └───────────────────────────────────┘ │
│                                         │
│         Dancing in the Moonlight        │ ← Upbeat track selected
│         ─────────────────────────       │
│         Toploader                       │
│                                         │
│   ──────●─────────────────              │
│                                         │
│         ♪ Travel Mix (Boosted)          │ ← Indicator
│                                         │
│   ○ Long press to disable boost        │
│                                         │
└─────────────────────────────────────────┘
```

**Use case:** You're tired, walking to your hotel, need a pick-me-up. Energy Boost gives you just energetic tracks.

**Design decision:** Fun, unique feature that suits travel context. Not found in standard music apps.

---

### State 5: Music Playing in Background

When you're in another mode (e.g., Navigation) with music playing:

**Navigation screen with music active:**

```
┌─────────────────────────────────────────┐
│  ♪ Now Playing                          │ ← Top bar
│                                         │   Minimal indicator
│            ↰                            │   Tap to open Music
│         Turn left                       │
│         in 120 m                        │
│                                         │ ← Navigation continues normally
│         onto Baker Street               │
│                                         │
│ ═══════════════════════════════════     │
│                                         │
│         4 min · 0.3 km remaining        │
│         to Coffee Bar                   │
│                                         │
│                                         │
│   ○ Roll right to skip track           │ ← Still works!
│                                         │   Ball controls music even
│                                         │   when not in Music mode
└─────────────────────────────────────────┘
```

**Global ball shortcuts (from any screen when music is playing):**
- **Roll right** → Skip to next track
- **Roll left** → Previous track
- **Single press on music indicator** → Opens Now Playing view
- **Long press** → Quick play/pause toggle

**Design decision:** Music is ambient. You can control it from anywhere without switching modes.

---

### State 6: No Music / Stopped

When you enter Music mode but nothing is playing:

```
┌─────────────────────────────────────────┐
│                                         │
│         Music                           │
│         ─────                           │
│                                         │
│                                         │
│                                         │
│            ♪                            │ ← Simple music icon
│                                         │
│         No music playing                │ ← (Body Large, 18px)
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Browse Playlists               │  │ ← Primary CTA
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Resume Last Played             │  │ ← Quick resume
│   └─────────────────────────────────┘  │   (if available)
│                                         │
│                                         │
│   ○○ Double-press for Home             │
│                                         │
└─────────────────────────────────────────┘
```

---

## Ball as Music Controller

### Physical Metaphor

The ball should feel like a **DJ controller** or **vintage radio dial**:

**Rolling:**
- **Smooth, continuous** → feels like spinning a dial or turntable
- **Click detents** (optional hardware) → each track feels like a "step"
- **Momentum** → roll quickly, it keeps scrolling through tracks
- **Resistance** (optional hardware) → slight friction makes it satisfying

**Pressing:**
- **Click feedback** → definitive play/pause action
- **Hold feedback** → long press feels different (maybe subtle vibration)

**Scrubbing:**
- **Slow roll while paused** → scrub through track timeline
- **Visual coupling** → progress bar follows your finger exactly
- **Audio preview** (optional) → brief audio snippet as you scrub

---

## Music Source

### Where does music come from?

**Option A: Device as remote (simpler):**
- Controls music playing on your paired phone
- Bluetooth connection
- Device is just a remote control
- Pros: No storage needed, access to full library
- Cons: Requires phone nearby, bluetooth battery drain

**Option B: Device plays music (standalone):**
- Local storage for offline playlists
- Bluetooth speaker or headphone output
- Pre-synced playlists from phone
- Pros: Phone can stay in bag, truly standalone
- Cons: Limited storage, sync complexity

**Recommendation for this design:** **Option A (remote)** is simpler and more realistic for a small device.

---

## Context Auto-Surface Behavior

### When does Music mode auto-surface?

**Generally: No auto-surface.**

Music is user-initiated, not context-driven.

**Exception - Music already playing:**

If you start music, then switch to another mode (Navigation, Exploration), and later double-press to Home:

- Home screen shows "Music" card with yellow ring (indicating it's active)
- Single press on Music card → goes to Now Playing

**Context hint:**

If you're on a long train/bus ride (detected by GPS speed + time):

```
┌─────────────────────────────────────────┐
│  [Bottom of Home screen]                │
│                                         │
│   💡 Long journey? Try some music       │ ← Gentle suggestion
│      Tap Music to start                 │   Not intrusive
│                                         │
└─────────────────────────────────────────┘
```

Dismisses after one showing. Not annoying.

---

## Edge Cases

### What if bluetooth disconnects?

```
┌─────────────────────────────────────────┐
│                                         │
│            ⊙                            │ ← Bluetooth icon (disconnected)
│                                         │
│         Connection lost                 │
│                                         │
│         Reconnecting to iPhone...       │ ← Auto-reconnect attempt
│                                         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Retry Connection               │  │
│   └─────────────────────────────────┘  │
│                                         │
│   Music will resume when connected.     │
│                                         │
└─────────────────────────────────────────┘
```

**Auto-resume:** When connection restores, music resumes from where it left off.

### What if no playlists are available?

```
┌─────────────────────────────────────────┐
│         Music                           │
│                                         │
│            ♪                            │
│                                         │
│         No playlists yet                │
│                                         │
│         Sync playlists from your        │
│         phone to get started.           │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Open Phone App to Sync         │  │ ← Instruction
│   └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### What if track has no album art?

```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │           ♪                       │ │ ← Generic music icon
│  │                                   │ │   Background: #3A3A3C
│  │   [placeholder: album art]        │ │   Icon: #8E8E93
│  │                                   │ │
│  └───────────────────────────────────┘ │
│                                         │
│         Unknown Track                   │ ← Graceful fallback
│         ─────────────                   │
│         Unknown Artist                  │
│                                         │
└─────────────────────────────────────────┘
```

### What if you try to skip but playlist only has 1 song?

**Roll right when on last song:**
- Loops back to first song (if repeat is on)
- Shows "End of playlist" briefly, then stops (if repeat is off)

---

## Flow Diagram

```
┌──────────────────────────────────────────────────┐
│              ENTRY POINTS                        │
└──────────────────────────────────────────────────┘
         │                    │
         │                    │
   From Home            Resume from
  (Music card)          background
         │                    │
         └──────────┬─────────┘
                    ↓
         ┌──────────────────────┐
         │  Is music playing?   │
         └──────┬───────┬───────┘
                │       │
               No      Yes
                │       │
                ↓       ↓
      ┌─────────────┐  ┌──────────────┐
      │ PLAYLIST    │  │ NOW PLAYING  │ ← Primary view
      │ SELECTION   │  │ (track info) │
      └──────┬──────┘  └──────┬───────┘
             │                │
       Select playlist   ┌────┼────┐
             │           │    │    │
             └───────────┘    │    │
                         Roll│Roll│Long press
                         left│right│
                          │  │  │ │
                       Previous│ │ Next
                       track│ │ │track
                          │  │  │ │
                          │  │  │ ↓
                          │  │  │┌──────────────┐
                          │  │  ││   OPTIONS    │
                          │  │  ││ (shuffle,    │
                          │  │  ││  repeat,     │
                          │  │  ││  boost)      │
                          │  │  │└──────┬───────┘
                          │  │  │       │
                          │  │  │  Select option
                          │  │  │       │
                          └──┴──┴───────┘
                                │
                         Single press
                                │
                          ┌─────┴──────┐
                          │ Play/Pause │
                          └─────┬──────┘
                                │
                         Double press
                                │
                                ↓
                         ┌──────────────┐
                         │    HOME      │
                         │ (music runs  │
                         │ in background)│
                         └──────────────┘
```

---

## Design Rationale

### Why no on-screen playback buttons?

**Ball is the interface:** Buttons would clutter the screen and contradict the one-input philosophy.

**Physical > Visual:** Rolling to skip feels more satisfying than tapping an icon.

### Why show album art so prominently?

**Emotional connection:** Music is emotional. Album art creates mood and memory.

**Visual anchor:** Large art makes the screen feel intentional, designed, not just text.

### Why "Energy Boost" feature?

**Travel-specific:** Generic music apps don't understand context. You're walking uphill, tired, need energy. This feature does.

**Playful differentiation:** Makes the device feel unique, not just a stripped-down Spotify.

### Why allow background music control?

**Real use case:** You're navigating to a cafe, music is playing. You want to skip a song without exiting navigation.

**Ambient nature:** Music isn't the focus - it's the soundtrack to your journey.

### Why limit to playlists, not full library browsing?

**Small screen constraint:** Browsing thousands of songs on a 3.5" screen = frustrating.

**Curated approach:** Playlists = pre-selected moods. Faster to get to "good music now."

---

## Visual Details

### Now Playing Layout

```
┌─────────────────────────────────────────┐ 480px wide × ~320px tall
│         Now Playing                     │ ← 32px from top
│         ───────────                     │    Title: 32px Perfectly 90s
│                                         │
│  ┌───────────────────────────────────┐ │ ← Album art square
│  │                                   │ │    200×200px
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │    Background: #3A3A3C
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │    Centered horizontally
│  │ ░░░[placeholder: album art]░░░░░  │ │    16px from content edges
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │    Radius: 8px
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │
│  └───────────────────────────────────┘ │
│                                         │ 24px gap
│         Blinded by the Lights           │ ← Track: 24px Perfectly 90s
│         ─────────────────────           │    Underline: 1px, text width
│         The Streets                     │ ← Artist: 18px Null Regular
│         ───────────                     │    Color: #8E8E93
│                                         │ 24px gap
│   ──────●─────────────────              │ ← Progress bar
│   1:24                       3:52       │    Bar: 2px height, #3A3A3C bg
│                                         │    Progress: #FFB800
│                                         │    Scrubber: 12px circle, #FFB800
│         ♪ Travel Mix                    │ ← Context: 12px Null Medium
│                                         │    Color: #8E8E93
└─────────────────────────────────────────┘
```

### Progress Bar Interaction

```
Resting state:
──────────●───────────────
 1:24                3:52

While scrubbing (rolling slowly):
──────────────●───────────
         2:15        3:52  ← Time updates live
                             Scrubber follows ball movement

Press to play/pause continues to work while scrubbing
```

---

## Comparison to Other Modes

| Aspect | Music | Navigation | City Exploration |
|--------|-------|------------|------------------|
| **Primary interaction** | Roll to skip | Roll to view modes | Roll to browse |
| **Background capable** | Yes (runs while navigating) | Yes (shows banner) | No (foreground only) |
| **Urgency** | Low | Medium | Low |
| **Frequency of use** | Continuous | Periodic | Occasional |
| **Ball feel** | Tactile, DJ-like | Informational | Browsing, flipping |

Music is unique:
- Most "physical" feeling mode (roll = spin a dial)
- Truly ambient (works in background)
- Playful features (Energy Boost)

---

## Next: Interaction Pattern Reference

With all major flows designed, next we'll create a comprehensive reference guide for how the ball works across all contexts - the unified interaction language.
