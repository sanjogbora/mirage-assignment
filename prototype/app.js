// ================================
// TRAVEL COMPANION DEVICE - PROTOTYPE
// ================================

class TravelDevice {
    constructor() {
        this.currentScreen = 'home';
        this.focusedIndex = 0;
        this.screenHistory = [];
        this.backgroundTasks = {
            music: null,
            navigation: null
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderScreen('home');
        this.updateStatus();
    }

    // ================================
    // EVENT LISTENERS
    // ================================

    setupEventListeners() {
        // Button controls
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleBallAction(action);
            });
        });

        // Demo buttons
        document.querySelectorAll('.demo-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const demo = e.target.dataset.demo;
                this.loadDemo(demo);
            });
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    handleKeyboard(e) {
        const key = e.key;

        // Prevent default for arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(key)) {
            e.preventDefault();
        }

        switch(key) {
            case 'ArrowUp':
                this.handleBallAction('roll-up');
                break;
            case 'ArrowDown':
                this.handleBallAction('roll-down');
                break;
            case 'ArrowLeft':
                this.handleBallAction('roll-left');
                break;
            case 'ArrowRight':
                this.handleBallAction('roll-right');
                break;
            case ' ':
            case 'Enter':
                this.handleBallAction('press');
                break;
            case 'Escape':
                this.handleBallAction('double-press');
                break;
            case 'Shift':
                if (!e.repeat) {
                    this.handleBallAction('long-press');
                }
                break;
        }
    }

    // ================================
    // BALL ACTIONS
    // ================================

    handleBallAction(action) {
        console.log('Ball action:', action, 'on screen:', this.currentScreen);

        // Animate ball
        this.animateBall(action);

        // Screen-specific handlers
        const handler = this[`handle_${this.currentScreen.replace(/-/g, '_')}`];
        if (handler) {
            handler.call(this, action);
        }

        this.updateStatus();
    }

    animateBall(action) {
        const ball = document.querySelector('.ball-visual');
        ball.style.transform = 'scale(0.95)';
        setTimeout(() => {
            ball.style.transform = 'scale(1)';
        }, 100);
    }

    // ================================
    // NAVIGATION
    // ================================

    renderScreen(screenName, data = {}) {
        console.log('Rendering screen:', screenName);

        this.currentScreen = screenName;
        this.focusedIndex = 0;

        const screen = document.getElementById('screen');
        const screenFunction = this[`render_${screenName.replace(/-/g, '_')}`];

        if (screenFunction) {
            screen.innerHTML = screenFunction.call(this, data);
        } else {
            screen.innerHTML = '<div class="screen-container"><p>Screen not implemented: ' + screenName + '</p></div>';
        }

        this.updateStatus();
    }

    goHome() {
        this.renderScreen('home');
    }

    goBack() {
        if (this.screenHistory.length > 0) {
            const previous = this.screenHistory.pop();
            this.renderScreen(previous);
        } else {
            this.goHome();
        }
    }

    navigateTo(screen, data = {}) {
        this.screenHistory.push(this.currentScreen);
        this.renderScreen(screen, data);
    }

    updateStatus() {
        document.getElementById('current-screen').textContent = this.currentScreen;

        // Update focused item
        const focusedElements = document.querySelectorAll('.focused');
        if (focusedElements.length > 0) {
            const focused = focusedElements[0];
            const text = focused.textContent.substring(0, 30);
            document.getElementById('focused-item').textContent = text;
        }

        // Update background tasks
        const tasks = [];
        if (this.backgroundTasks.music) tasks.push('Music Playing');
        if (this.backgroundTasks.navigation) tasks.push('Navigation Active');
        document.getElementById('background-tasks').textContent = tasks.length > 0 ? tasks.join(', ') : 'None';
    }

    updateFocus(items, delta) {
        // Remove all focus
        items.forEach(item => item.classList.remove('focused'));

        // Update index
        this.focusedIndex = (this.focusedIndex + delta + items.length) % items.length;

        // Add focus to new item
        items[this.focusedIndex].classList.add('focused');

        this.updateStatus();
    }

    // ================================
    // SCREEN: HOME
    // ================================

    render_home() {
        const modes = [
            { name: 'Trips & Tickets', desc: 'Your boarding passes, metro cards, bookings', active: false },
            { name: 'Explore Nearby', desc: 'Places, food, tips for where you are now', active: false },
            { name: 'Navigate', desc: 'Get walking directions around the city', active: this.backgroundTasks.navigation },
            { name: 'Music', desc: 'Control your audio on the go', active: this.backgroundTasks.music }
        ];

        return `
            <div class="screen-container">
                <div class="screen-title">Home</div>

                ${modes.map((mode, i) => `
                    <div class="card ${i === 0 ? 'focused' : ''}" data-mode-index="${i}">
                        <div class="card-heading">${mode.name}</div>
                        <div class="card-body" style="color: var(--text-secondary); font-size: 14px;">
                            ${mode.desc}
                        </div>
                        ${mode.active ? '<div class="card-meta" style="color: var(--accent-yellow); margin-top: 8px;">• Active</div>' : ''}
                    </div>
                `).join('')}

                <div class="hint-text">○ Roll to explore, press to select</div>
            </div>
        `;
    }

    handle_home(action) {
        const cards = document.querySelectorAll('.card');

        switch(action) {
            case 'roll-up':
                this.updateFocus(cards, -1);
                break;
            case 'roll-down':
                this.updateFocus(cards, 1);
                break;
            case 'press':
                const modes = ['trips', 'explore', 'navigation-start', 'music'];
                this.navigateTo(modes[this.focusedIndex]);
                break;
            case 'double-press':
                // Already home, show settings or do nothing
                break;
            case 'long-press':
                this.navigateTo('home-tasks');
                break;
        }
    }

    // ================================
    // SCREEN: TRIPS & TICKETS
    // ================================

    render_trips() {
        return `
            <div class="screen-container">
                <div class="screen-title">Trips & Tickets</div>

                <div class="card focused">
                    <div class="card-heading">BA 283 SFO → LHR</div>
                    <div class="card-meta">Today, 17:45 • Gate 52 • Seat 24A</div>
                    <div class="status-pill boarding">BOARDING</div>
                </div>

                <div class="card">
                    <div class="card-heading">London Underground</div>
                    <div class="card-meta">Zone 1-2 Daily Pass • £8.50 remaining</div>
                </div>

                <div class="card">
                    <div class="card-heading">Hotel Booking</div>
                    <div class="card-meta">The Hoxton, Shoreditch • Check-in Mar 15</div>
                </div>

                <div class="hint-text">○ Roll to browse, press for details</div>
            </div>
        `;
    }

    handle_trips(action) {
        const cards = document.querySelectorAll('.card');

        switch(action) {
            case 'roll-up':
                this.updateFocus(cards, -1);
                break;
            case 'roll-down':
                this.updateFocus(cards, 1);
                break;
            case 'press':
                if (this.focusedIndex === 0) {
                    this.navigateTo('boarding-pass');
                } else if (this.focusedIndex === 1) {
                    this.navigateTo('metro-card');
                }
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    // ================================
    // SCREEN: BOARDING PASS
    // ================================

    render_boarding_pass() {
        return `
            <div class="screen-container">
                <div class="context-label">NOW</div>

                <div style="text-align: center; margin-bottom: var(--space-m);">
                    <div class="status-pill boarding">BOARDING</div>
                </div>

                <div class="hero-text">BA 283</div>
                <div class="hero-text" style="margin-top: 0;">SFO → LHR</div>

                <div class="qr-code">
                    <div style="text-align: center;">
                        <div style="font-size: 60px; margin-bottom: 8px;">▚▚▚</div>
                        <div>QR CODE</div>
                        <div style="font-size: 11px; color: #666; margin-top: 4px;">Scannable</div>
                    </div>
                </div>

                <div style="text-align: center; font-size: 12px; color: var(--text-secondary); margin-top: var(--space-m);">
                    17:45  •  Gate 52  •  Seat 24A
                </div>

                <div class="hint-text">○ Roll for details</div>
                <div class="hint-text">○○ Double-press for Home</div>
            </div>
        `;
    }

    handle_boarding_pass(action) {
        switch(action) {
            case 'roll-down':
                this.navigateTo('boarding-pass-details');
                break;
            case 'press':
                alert('Screen locked at maximum brightness for scanning');
                break;
            case 'double-press':
                this.goHome();
                break;
            case 'long-press':
                this.navigateTo('boarding-pass-multi');
                break;
        }
    }

    render_boarding_pass_details() {
        return `
            <div class="screen-container">
                <div class="context-label">NOW</div>

                <div style="text-align: center; margin-bottom: var(--space-m);">
                    <div class="status-pill boarding">BOARDING</div>
                </div>

                <div class="screen-title" style="text-align: center;">British Airways</div>
                <div class="body-large" style="text-align: center; color: var(--text-secondary); margin-bottom: var(--space-m);">
                    Flight BA 283<br/>
                    San Francisco (SFO) →<br/>
                    London Heathrow (LHR)
                </div>

                <div class="card">
                    <div class="card-meta">Departure</div>
                    <div class="card-body">Wednesday, March 15<br/>17:45</div>
                </div>

                <div class="card">
                    <div class="card-meta">Gate & Boarding</div>
                    <div class="card-body">Gate 52  •  Boarding 17:15</div>
                </div>

                <div class="card">
                    <div class="card-meta">Seat & Class</div>
                    <div class="card-body">Seat 24A  •  Economy</div>
                </div>

                <div class="qr-code" style="width: 120px; height: 120px; font-size: 11px;">
                    <div>▚▚▚<br/>QR</div>
                </div>

                <div class="hint-text">○ Roll up for scan mode</div>
            </div>
        `;
    }

    handle_boarding_pass_details(action) {
        switch(action) {
            case 'roll-up':
                this.renderScreen('boarding-pass');
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    // ================================
    // SCREEN: METRO CARD
    // ================================

    render_metro_card() {
        return `
            <div class="screen-container">
                <div class="context-label">NEARBY</div>

                <div class="screen-title" style="text-align: center;">
                    London<br/>Underground
                </div>

                <div class="qr-code">
                    <div style="text-align: center;">
                        <div style="font-size: 60px; margin-bottom: 8px;">▚▚▚</div>
                        <div>QR CODE</div>
                        <div style="font-size: 11px; color: #666; margin-top: 4px;">Scannable</div>
                    </div>
                </div>

                <div class="body-large" style="text-align: center;">
                    Zone 1-2 Daily Pass
                </div>

                <div style="text-align: center; font-size: 15px; color: var(--text-secondary); margin-top: var(--space-s);">
                    £8.50 remaining<br/>
                    Valid until 23:59 today
                </div>

                <div class="hint-text">○ Roll for pass details</div>
                <div class="hint-text">○○ Double-press for Home</div>
            </div>
        `;
    }

    handle_metro_card(action) {
        switch(action) {
            case 'press':
                alert('QR code refreshed');
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    // ================================
    // SCREEN: EXPLORE NEARBY
    // ================================

    render_explore() {
        return `
            <div class="screen-container">
                <div class="context-label">NEARBY • Shoreditch</div>
                <div class="screen-title">Spots near you</div>

                <div class="card focused">
                    <div class="placeholder-image">placeholder: place image</div>
                    <div class="card-heading">The Old Bookshop</div>
                    <div class="card-meta">
                        <span class="tag popular">BOOKSTORE</span> • 0.3 km
                    </div>
                    <div style="font-size: 14px; margin-top: 8px;">
                        ★★★★ Loved by locals
                    </div>
                    <div style="font-size: 15px; font-style: italic; color: var(--text-secondary); margin-top: 8px;">
                        "Hidden gem, rare travel books and cozy reading nook"
                    </div>
                </div>

                <div class="card">
                    <div class="placeholder-image">placeholder: place image</div>
                    <div class="card-heading">Silo Café</div>
                    <div class="card-meta">
                        <span class="tag popular">CAFE</span> • 0.6 km
                    </div>
                    <div style="font-size: 14px; margin-top: 8px;">
                        ★★★★★ Popular spot
                    </div>
                </div>

                <div class="hint-text">○ Roll to browse, press for details</div>
            </div>
        `;
    }

    handle_explore(action) {
        const cards = document.querySelectorAll('.card');

        switch(action) {
            case 'roll-up':
                this.updateFocus(cards, -1);
                break;
            case 'roll-down':
                this.updateFocus(cards, 1);
                break;
            case 'press':
                this.navigateTo('place-detail', { name: 'The Old Bookshop' });
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    render_place_detail(data) {
        return `
            <div class="screen-container">
                <div class="context-label">← Back</div>

                <div class="placeholder-image" style="height: 180px;">placeholder: place image</div>

                <div class="screen-title">${data.name || 'Place Name'}</div>

                <div class="card-meta">
                    <span class="tag popular">BOOKSTORE</span><br/>
                    0.3 km away • Open now
                </div>

                <div style="font-size: 14px; margin-top: var(--space-m);">
                    ★★★★  4.8 · Loved by locals
                </div>

                <div class="card-body" style="margin-top: var(--space-s); font-style: italic; color: var(--text-secondary);">
                    "Hidden gem with rare travel books and a cozy reading nook upstairs. Great for rainy afternoons."
                </div>

                <div class="card-meta" style="margin-top: var(--space-xs);">
                    — Reddit • r/london
                </div>

                <div class="card-body" style="margin-top: var(--space-m);">
                    Hours: 10:00 - 18:00<br/>
                    Closes in 3 hours
                </div>

                <div class="button focused" style="margin-top: var(--space-m);">► Start Navigation</div>
                <div class="button">☆ Save for Later</div>

                <div class="hint-text">○○ Double-press to go back</div>
            </div>
        `;
    }

    handle_place_detail(action) {
        switch(action) {
            case 'double-press':
                this.goBack();
                break;
            case 'press':
                this.navigateTo('navigation-active', { destination: 'The Old Bookshop' });
                break;
        }
    }

    // ================================
    // SCREEN: RESTAURANT
    // ================================

    render_restaurant() {
        return `
            <div class="screen-container">
                <div class="context-label">NEARBY • Inside Restaurant</div>

                <div class="screen-title">Osteria del Sole</div>
                <div class="card-meta">Italian • €€ • ★★★★ 4.6 rating</div>

                <div class="body-large" style="color: var(--accent-yellow); margin-top: var(--space-m);">
                    Since you're vegetarian, here are some good picks:
                </div>

                <div class="button primary focused" style="margin-top: var(--space-m);">
                    Show Recommendations
                </div>

                <div class="button">Browse Full Menu</div>

                <div class="hint-text">○ Press to continue</div>
            </div>
        `;
    }

    handle_restaurant(action) {
        switch(action) {
            case 'press':
                this.navigateTo('restaurant-dishes');
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    render_restaurant_dishes() {
        return `
            <div class="screen-container">
                <div class="screen-title">Good picks for you</div>
                <div class="card-meta">at Osteria del Sole</div>

                <div class="card focused">
                    <div class="placeholder-image" style="height: 120px;">placeholder: dish image</div>
                    <div class="card-heading">Pappardelle al Funghi</div>
                    <div class="card-meta">
                        <span class="tag vegetarian">VEGETARIAN</span>
                        <span class="tag popular">POPULAR</span><br/>
                        €14
                    </div>
                    <div style="font-size: 14px; margin-top: 8px;">
                        ★★★★ Often ordered
                    </div>
                    <div style="font-size: 15px; font-style: italic; color: var(--text-secondary); margin-top: 8px;">
                        "Rich, creamy, perfect portion"
                    </div>
                </div>

                <div class="card">
                    <div class="placeholder-image" style="height: 120px;">placeholder: dish image</div>
                    <div class="card-heading">Risotto alle Erbe</div>
                    <div class="card-meta">
                        <span class="tag vegetarian">VEGETARIAN</span><br/>
                        €13
                    </div>
                </div>

                <div class="hint-text">○ Roll to browse, press for details</div>
            </div>
        `;
    }

    handle_restaurant_dishes(action) {
        const cards = document.querySelectorAll('.card');

        switch(action) {
            case 'roll-up':
                this.updateFocus(cards, -1);
                break;
            case 'roll-down':
                this.updateFocus(cards, 1);
                break;
            case 'press':
                alert('Dish added to your order list');
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    // ================================
    // SCREEN: NAVIGATION
    // ================================

    render_navigation_start() {
        return `
            <div class="screen-container">
                <div class="screen-title">Navigate</div>

                <div class="card focused">
                    <div class="card-heading">Navigate to...</div>
                    <div class="card-body" style="color: var(--text-secondary);">
                        Start walking directions from your current location
                    </div>
                </div>

                <div class="card">
                    <div class="card-heading">Recent Destinations</div>
                    <div class="card-body">
                        • Coffee Bar (0.6 km)<br/>
                        • Hotel (1.2 km)<br/>
                        • King's Cross Station (2.1 km)
                    </div>
                </div>

                <div class="hint-text">○ Press to start navigation demo</div>
            </div>
        `;
    }

    handle_navigation_start(action) {
        switch(action) {
            case 'press':
                this.navigateTo('navigation-active', { destination: 'Coffee Bar' });
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    render_navigation_active(data) {
        this.backgroundTasks.navigation = data.destination;

        return `
            <div class="screen-container">
                <div class="context-label">NOW · Navigation</div>

                <div class="arrow-icon">↰</div>

                <div class="hero-text">Turn left</div>
                <div class="hero-text" style="font-size: 36px;">in 120 m</div>

                <div class="body-large" style="text-align: center; color: var(--text-secondary);">
                    onto Baker Street
                </div>

                <div style="width: 100%; height: 4px; background: var(--bg-border); margin: var(--space-l) 0; position: relative;">
                    <div style="width: 40%; height: 100%; background: var(--accent-yellow);"></div>
                    <div style="position: absolute; left: 40%; top: 50%; transform: translate(-50%, -50%); width: 12px; height: 12px; background: #0A84FF; border-radius: 50%;"></div>
                </div>

                <div style="text-align: center; font-size: 12px; color: var(--text-secondary);">
                    4 min · 0.3 km remaining<br/>
                    to ${data.destination}
                </div>

                <div class="hint-text">○ Roll for overview map</div>
            </div>
        `;
    }

    handle_navigation_active(action) {
        switch(action) {
            case 'double-press':
                this.backgroundTasks.navigation = null;
                this.goHome();
                break;
            case 'press':
                alert('Location refreshed');
                break;
        }
    }

    // ================================
    // SCREEN: MUSIC PLAYER
    // ================================

    render_music() {
        this.backgroundTasks.music = 'Travel Mix';

        return `
            <div class="screen-container">
                <div class="screen-title">Now Playing</div>

                <div class="placeholder-image" style="width: 200px; height: 200px; margin: var(--space-m) auto;">
                    placeholder: album art
                </div>

                <div class="card-heading" style="text-align: center;">Blinded by the Lights</div>
                <div class="body-large" style="text-align: center; color: var(--text-secondary);">
                    The Streets
                </div>

                <div class="progress-bar" style="margin-top: var(--space-m);">
                    <div class="progress-fill" style="width: 40%;"></div>
                    <div class="progress-scrubber" style="left: 40%;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary);">
                    <span>1:24</span>
                    <span>3:52</span>
                </div>

                <div style="text-align: center; margin-top: var(--space-m); font-size: 12px; color: var(--text-secondary);">
                    ♪ Travel Mix
                </div>

                <div class="hint-text">○ Roll left/right to skip</div>
                <div class="hint-text">○ Press to play/pause</div>
            </div>
        `;
    }

    handle_music(action) {
        switch(action) {
            case 'roll-right':
                alert('⏭ Next track');
                break;
            case 'roll-left':
                alert('⏮ Previous track');
                break;
            case 'press':
                alert('⏸ Paused');
                break;
            case 'double-press':
                this.goHome();
                break;
            case 'long-press':
                this.navigateTo('music-options');
                break;
        }
    }

    render_music_options() {
        return `
            <div class="screen-container">
                <div class="screen-title">Player Options</div>

                <div class="card focused">
                    <div class="card-body">∞ Shuffle<br/><small style="color: var(--text-secondary);">Currently off</small></div>
                </div>

                <div class="card">
                    <div class="card-body">↻ Repeat<br/><small style="color: var(--text-secondary);">Currently off</small></div>
                </div>

                <div class="card">
                    <div class="card-body">⚡ Energy Boost<br/><small style="color: var(--text-secondary);">Play faster, upbeat tracks</small></div>
                </div>

                <div class="card">
                    <div class="card-body">◉ Change Playlist</div>
                </div>

                <div class="hint-text">○ Press to select, long press to close</div>
            </div>
        `;
    }

    handle_music_options(action) {
        const cards = document.querySelectorAll('.card');

        switch(action) {
            case 'roll-up':
                this.updateFocus(cards, -1);
                break;
            case 'roll-down':
                this.updateFocus(cards, 1);
                break;
            case 'press':
                alert('Option toggled');
                this.goBack();
                break;
            case 'long-press':
            case 'double-press':
                this.goBack();
                break;
        }
    }

    // ================================
    // SCREEN: LOCAL ALERT
    // ================================

    render_alert() {
        return `
            <div class="screen-container">
                <div class="context-label">NEARBY · Trevi Fountain</div>

                <div class="screen-title">Local Tip</div>

                <div style="text-align: center; font-size: 40px; margin: var(--space-m) 0; color: var(--accent-yellow);">
                    ⚠
                </div>

                <div class="body-large" style="color: var(--accent-yellow);">
                    Watch out for coin-toss scammers
                </div>

                <div class="card-body" style="margin-top: var(--space-s);">
                    People will offer to "help" you throw coins the "right way" then ask for money. It's a scam.
                    <br/><br/>
                    Just toss your own coin - any way works fine!
                </div>

                <div class="card-meta" style="margin-top: var(--space-m); font-style: italic;">
                    — Shared by locals on r/rome
                </div>

                <div class="button focused" style="margin-top: var(--space-l);">Thanks, got it</div>

                <div class="hint-text">○ Roll if more tips available</div>
            </div>
        `;
    }

    handle_alert(action) {
        switch(action) {
            case 'press':
                this.goHome();
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    // ================================
    // DEMO LOADER
    // ================================

    loadDemo(demo) {
        const demoScreens = {
            'boarding-pass': 'boarding-pass',
            'metro-card': 'metro-card',
            'exploration': 'explore',
            'restaurant': 'restaurant',
            'navigation': 'navigation-active',
            'music': 'music',
            'alert': 'alert'
        };

        const screen = demoScreens[demo];
        if (screen) {
            this.renderScreen(screen, { destination: 'Coffee Bar' });
        }
    }
}

// ================================
// INITIALIZE
// ================================

document.addEventListener('DOMContentLoaded', () => {
    window.device = new TravelDevice();
    console.log('Travel Companion Device initialized');
    console.log('Use arrow keys, space, enter, escape, and shift for controls');
});
