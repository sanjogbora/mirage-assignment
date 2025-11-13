# Travel Companion Device - Interactive Prototype

🎉 **Working prototype of the travel companion device interface!**

This is a fully interactive web-based simulator that demonstrates all the designed flows and interactions.

---

## 🚀 How to Use

### Open the Prototype

1. **Simple way:** Just open `index.html` in your browser
   - Double-click `index.html`
   - Or right-click → "Open with" → Your browser

2. **Local server (recommended):**
   ```bash
   # If you have Python installed:
   cd prototype
   python -m http.server 8000
   # Then open: http://localhost:8000
   ```

---

## 🎮 Controls

### Ball Simulation

The prototype simulates the physical 360° ball with keyboard and button controls:

**Keyboard Controls:**
- **Arrow Keys** → Roll the ball (up/down/left/right)
- **Space or Enter** → Single press (select/confirm)
- **Escape** → Double press (always returns to Home)
- **Shift** → Long press (context menus)

**On-Screen Buttons:**
- Use the control panel on the right side
- Click buttons to simulate ball actions
- Or use the "Quick Demos" to jump to specific flows

---

## 📱 What's Implemented

### Complete Flows:

✅ **Home Screen**
- 4 mode cards with navigation
- Background task indicators
- Focus ring system

✅ **Boarding Pass**
- Scan mode (QR prominent)
- Details mode (full flight info)
- Context auto-surface simulation

✅ **Metro Card**
- Scannable pass view
- Balance display
- Context awareness

✅ **City Exploration**
- Place list with photos
- Detail views
- Save and navigation actions

✅ **Restaurant Recommender**
- Dietary filtering demonstration
- Dish recommendations
- Order list concept

✅ **Navigation**
- Turn-by-turn mode
- Route progress
- Background operation

✅ **Music Player**
- Now Playing interface
- Track controls (skip with roll)
- Player options menu

✅ **Local Alerts**
- Scam warnings
- Helpful tone
- Quick dismiss

---

## 🎨 Design System

The prototype implements the complete design system:

- **Colors:** Dark charcoal (#1C1C1E) + warm yellow (#FFB800)
- **Typography:** Serif headlines + sans body text
- **Spacing:** 8px grid system
- **Components:** Cards, buttons, focus rings, status pills
- **Animations:** Smooth transitions (300ms)

---

## 🎯 Interaction Patterns

All documented interaction patterns are working:

**Roll (Arrow Keys):**
- Up/Down → Scroll vertical lists
- Left/Right → Skip music, cycle items
- Smooth focus movement

**Press (Space/Enter):**
- Select focused item
- Confirm actions
- Play/Pause (in music)

**Double-Press (Escape):**
- **Always returns to Home** (universal escape)
- Works from any screen

**Long-Press (Shift):**
- Opens context menus
- Access deeper options
- Background task info

---

## 🧭 Navigation Tips

**Starting Out:**
1. Start on the **Home** screen (automatic)
2. **Roll down** to explore the 4 modes
3. **Press** to enter a mode
4. **Escape (double-press)** to return Home anytime

**Try These Flows:**

**Quick Boarding Pass Demo:**
1. Click "Boarding Pass" quick demo button
2. See QR code in scan mode
3. Roll down → see detailed flight info
4. Escape → return Home

**Music Player Demo:**
1. Click "Music Player" quick demo
2. **Arrow Right** → skip to next track
3. **Space** → pause/play
4. **Shift** → open player options
5. **Escape** → return Home (music keeps playing in background)

**City Exploration:**
1. From Home, roll down to "Explore Nearby"
2. Press to enter
3. Roll through place cards
4. Press on focused place → see details
5. Escape → back to list

---

## 🔥 Special Features

**Background Tasks:**
- Start music or navigation
- Return to Home (double-press)
- Check status panel → shows "Background: Music Playing"
- Tasks persist as you navigate other screens

**Context Auto-Surface Simulation:**
- Some screens show "NOW" or "NEARBY" labels
- Simulates how device would auto-surface content
- E.g., boarding pass shows "NOW" (urgent)

**Focus Ring System:**
- Yellow ring always shows current focus
- Follows your roll actions smoothly
- Clear visual feedback

---

## 📂 File Structure

```
prototype/
├── index.html       ← Main HTML structure
├── styles.css       ← Complete design system CSS
├── app.js           ← All interaction logic & screens
└── README.md        ← You are here!
```

---

## 💡 Implementation Notes

**What's Real:**
- All visual designs from documentation
- Complete interaction patterns
- Screen transitions and animations
- Ball control simulation
- State management

**What's Simulated:**
- QR codes (shown as placeholders)
- GPS/location detection (manual demos)
- Real music/audio playback
- Actual navigation routing
- Restaurant data fetching

**Purpose:**
This is a high-fidelity interactive mockup for:
- Demonstrating the user experience
- Testing interaction patterns
- Stakeholder presentations
- User testing the flows
- Development reference

---

## 🎓 Understanding the Code

### Adding New Screens

```javascript
// 1. Add render function
render_my_screen(data) {
    return `<div class="screen-container">...</div>`;
}

// 2. Add interaction handler
handle_my_screen(action) {
    switch(action) {
        case 'press':
            // Handle press
            break;
    }
}

// 3. Navigate to it
this.navigateTo('my-screen', { data });
```

### Design System Classes

Use these CSS classes (from `styles.css`):

- `.screen-title` - Main page heading (serif, 32px)
- `.card` - Container for content
- `.card.focused` - Yellow focus ring
- `.button` - Action button
- `.status-pill` - Status indicators
- `.placeholder-image` - Image placeholders

---

## 🚧 Future Enhancements

**Could Add:**
- Touch/mouse drag for ball rolling
- Haptic feedback simulation (vibration API)
- More realistic QR code rendering
- Sound effects for interactions
- Actual map integration
- Multi-user testing mode

**But Not Needed For:**
- Design validation ✓
- Interaction testing ✓
- Flow demonstration ✓
- Development specs ✓

---

## 🐛 Known Limitations

- No actual GPS (demos triggered manually)
- QR codes are placeholders (scannable version needs real data)
- Music doesn't actually play (UI control only)
- Single user (no multi-device state)
- Desktop-optimized (not responsive to mobile yet)

These are intentional - this is a design prototype, not production code.

---

## ✨ Credits

**Design:** Based on the complete design documentation in parent directory
**Implementation:** Interactive prototype demonstrating all flows
**Purpose:** Validate UX before hardware/firmware development

---

## 📞 Need Help?

**Common Questions:**

**Q: Nothing happens when I press keys?**
A: Make sure the browser window has focus (click on it first)

**Q: How do I get back to Home?**
A: Press **Escape** (double-press simulation) - works from anywhere!

**Q: Can I use this on mobile?**
A: It works, but keyboard controls won't. Use the on-screen buttons.

**Q: The ball visual doesn't move?**
A: Correct - it's a physical ball on the actual device. This simulates its inputs, not its rotation.

---

**Enjoy exploring the travel companion device!** 🌍✈️🎒

*Dark theme. Yellow accent. One ball. Infinite possibilities.*
