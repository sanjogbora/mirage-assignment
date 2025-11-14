// ================================
// TRAVEL COMPANION DEVICE
// Premium Interactive Prototype
// ================================

class TravelDevice {
    constructor() {
        this.currentScreen = 'home';
        this.focusedIndex = 0;
        this.screenHistory = [];
        this.map = null;
        this.mapZoom = 15;

        // Three.js ball properties
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphere = null;
        this.ballRotation = { x: 0, y: 0 };

        this.init();
    }

    init() {
        this.setup3DBall();
        this.setupKeyboard();
        this.renderScreen('home');
        this.updateStatus();
    }

    // ================================
    // FEEDBACK TOAST
    // ================================

    showFeedback(message, duration = 2000) {
        const toast = document.getElementById('feedback-toast');
        toast.innerHTML = message;
        toast.classList.add('show');

        // Initialize Lucide icons in the toast
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // ================================
    // 3D BALL CONTROLS WITH THREE.JS
    // ================================

    setup3DBall() {
        const container = document.getElementById('ball');
        const width = 100;
        const height = 100;

        // Scene setup
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        this.camera.position.z = 3;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        // Sphere geometry with high detail
        const geometry = new THREE.SphereGeometry(1, 64, 64);

        // Advanced material with realistic shading
        const material = new THREE.MeshStandardMaterial({
            color: 0x3a3a3c,
            metalness: 0.6,
            roughness: 0.4,
            envMapIntensity: 1
        });

        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);

        // Equator ring
        const ringGeometry = new THREE.TorusGeometry(1.01, 0.01, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFB800,
            transparent: true,
            opacity: 0.3
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        this.sphere.add(ring);

        // Lighting for realistic 3D appearance
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
        pointLight1.position.set(2, 2, 3);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xFFB800, 0.3);
        pointLight2.position.set(-2, -1, 2);
        this.scene.add(pointLight2);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Apply rotation
            this.sphere.rotation.x = this.ballRotation.x;
            this.sphere.rotation.y = this.ballRotation.y;

            // Auto-rotation when idle
            if (!this.isDragging) {
                this.ballRotation.y += 0.003;
            }

            this.renderer.render(this.scene, this.camera);
        };
        animate();

        // Interaction setup
        this.setupBallInteractions(container);
    }

    setupBallInteractions(container) {
        let isDragging = false;
        let previousMouseX = 0;
        let previousMouseY = 0;
        let velocityX = 0;
        let velocityY = 0;
        let lastActionTime = 0;
        const actionDelay = 150; // Reduced for faster response
        let pressStartTime = 0;
        let longPressTimeout = null;
        let longPressTriggered = false;

        // Mouse down
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            this.isDragging = true;
            previousMouseX = e.clientX;
            previousMouseY = e.clientY;
            velocityX = 0;
            velocityY = 0;
            pressStartTime = Date.now();
            longPressTriggered = false;

            // Set long-press timeout (2000ms = 2 seconds)
            longPressTimeout = setTimeout(() => {
                if (isDragging && Math.abs(velocityX) < 2 && Math.abs(velocityY) < 2) {
                    longPressTriggered = true;
                    this.handleBallAction('long-press');
                }
            }, 2000);
        });

        // Mouse move
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - previousMouseX;
            const deltaY = e.clientY - previousMouseY;

            previousMouseX = e.clientX;
            previousMouseY = e.clientY;

            // Update rotation with MUCH higher sensitivity
            this.ballRotation.y += deltaX * 0.03; // Increased from 0.01 to 0.03 (3x)
            this.ballRotation.x += deltaY * 0.03; // Increased from 0.01 to 0.03 (3x)

            velocityX = deltaX;
            velocityY = deltaY;

            // Cancel long-press if moving
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                clearTimeout(longPressTimeout);
            }

            // Throttled action detection with MUCH lower threshold
            const now = Date.now();
            if (now - lastActionTime < actionDelay) return;
            lastActionTime = now;

            const threshold = 3; // Reduced from 10 to 3 for more sensitivity
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                if (deltaY > threshold) this.handleBallAction('roll-down');
                else if (deltaY < -threshold) this.handleBallAction('roll-up');
            } else {
                if (deltaX > threshold) this.handleBallAction('roll-right');
                else if (deltaX < -threshold) this.handleBallAction('roll-left');
            }
        });

        // Mouse up
        document.addEventListener('mouseup', () => {
            clearTimeout(longPressTimeout);

            // Check if this was a click (minimal movement)
            const totalMovement = Math.abs(velocityX) + Math.abs(velocityY);

            // If minimal movement and not a long press, treat as click
            if (!longPressTriggered && totalMovement < 5) {
                this.handleBallAction('press');
            }

            isDragging = false;
            this.isDragging = false;
            velocityX = 0;
            velocityY = 0;
        });

        // Wheel with increased sensitivity
        container.addEventListener('wheel', (e) => {
            e.preventDefault();

            this.ballRotation.x += e.deltaY * 0.01; // Doubled from 0.005 to 0.01

            if (e.deltaY > 0) {
                this.handleBallAction('roll-down');
            } else {
                this.handleBallAction('roll-up');
            }
        });

        // Double click
        container.addEventListener('dblclick', () => {
            this.handleBallAction('double-press');
            // Reset rotation
            this.ballRotation = { x: 0, y: 0 };
        });
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.handleBallAction('roll-up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.handleBallAction('roll-down');
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.handleBallAction('roll-left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.handleBallAction('roll-right');
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.handleBallAction('press');
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.handleBallAction('double-press');
                    break;
            }
        });
    }

    // ================================
    // BALL ACTIONS
    // ================================

    handleBallAction(action) {
        // If AI is active, route to AI handler
        if (this.aiActive) {
            this.handle_ai(action);
            return;
        }

        const handler = this[`handle_${this.currentScreen.replace(/-/g, '_')}`];
        if (handler) {
            handler.call(this, action);
        }
        this.updateStatus(action);
    }

    updateStatus(action = '') {
        document.getElementById('current-screen').textContent =
            this.currentScreen.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        if (action) {
            const actionText = action.replace(/-/g, ' ').replace('press', 'click');
            document.getElementById('last-action').textContent = actionText;
        }
    }

    // ================================
    // NAVIGATION
    // ================================

    renderScreen(screenName, data = {}) {
        this.currentScreen = screenName;
        this.focusedIndex = 0;

        const screen = document.getElementById('screen');
        const renderer = this[`render_${screenName.replace(/-/g, '_')}`];

        if (renderer) {
            screen.innerHTML = renderer.call(this, data);

            // Initialize map if needed
            if (screenName === 'navigation') {
                this.initMap();
            }
        }

        this.updateStatus();
    }

    navigateTo(screen, data = {}) {
        this.screenHistory.push(this.currentScreen);
        this.renderScreen(screen, data);
    }

    goHome() {
        this.renderScreen('home');
    }

    updateFocus(items, delta) {
        items.forEach(item => item.classList.remove('focused'));
        this.focusedIndex = (this.focusedIndex + delta + items.length) % items.length;
        items[this.focusedIndex].classList.add('focused');

        // Auto-scroll to bring focused item into view
        const focusedItem = items[this.focusedIndex];
        if (focusedItem) {
            focusedItem.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        }
    }

    // ================================
    // HOME SCREEN
    // ================================

    render_home() {
        setTimeout(() => lucide.createIcons(), 0);
        return `
            <div class="screen-content">
                <div class="screen-title" style="margin-bottom: var(--space-8);">Travel Companion</div>

                <div class="home-grid">
                    <div class="home-tile focused" data-screen="navigation">
                        <i data-lucide="navigation" style="width: 48px; height: 48px;"></i>
                        <div class="tile-label">Navigate</div>
                    </div>

                    <div class="home-tile" data-screen="restaurant">
                        <i data-lucide="utensils" style="width: 48px; height: 48px;"></i>
                        <div class="tile-label">Food</div>
                    </div>

                    <div class="home-tile" data-screen="music">
                        <i data-lucide="music" style="width: 48px; height: 48px;"></i>
                        <div class="tile-label">Music</div>
                    </div>

                    <div class="home-tile" data-screen="tickets">
                        <i data-lucide="ticket" style="width: 48px; height: 48px;"></i>
                        <div class="tile-label">Tickets</div>
                    </div>

                    <div class="home-tile" data-screen="explore">
                        <i data-lucide="compass" style="width: 48px; height: 48px;"></i>
                        <div class="tile-label">Explore</div>
                    </div>

                    <div class="home-tile" data-screen="alert">
                        <i data-lucide="shield-alert" style="width: 48px; height: 48px;"></i>
                        <div class="tile-label">Alerts</div>
                    </div>
                </div>

                <div class="hint-text">Roll to browse • Click to open</div>
            </div>
        `;
    }

    handle_home(action) {
        const tiles = document.querySelectorAll('.home-tile');

        switch(action) {
            case 'roll-up':
                // Move up (2 tiles up in grid)
                if (this.focusedIndex >= 2) {
                    this.updateFocus(tiles, -2);
                }
                break;
            case 'roll-down':
                // Move down (2 tiles down in grid)
                if (this.focusedIndex < tiles.length - 2) {
                    this.updateFocus(tiles, 2);
                }
                break;
            case 'roll-left':
                // Move left in row
                if (this.focusedIndex % 2 === 1) {
                    this.updateFocus(tiles, -1);
                }
                break;
            case 'roll-right':
                // Move right in row
                if (this.focusedIndex % 2 === 0 && this.focusedIndex < tiles.length - 1) {
                    this.updateFocus(tiles, 1);
                }
                break;
            case 'press':
                const screens = ['navigation', 'restaurant', 'music', 'tickets', 'explore', 'alert'];
                this.navigateTo(screens[this.focusedIndex]);
                break;
            case 'long-press':
                this.activateAIAssistant();
                break;
        }
    }

    // ================================
    // TICKETS CAROUSEL
    // ================================

    render_tickets() {
        setTimeout(() => lucide.createIcons(), 0);
        const activeCard = this.ticketCard || 0;
        // Track is 300% wide with 3 cards at 33.333% each
        // TranslateX percentages are relative to the TRACK, not wrapper
        // So we move by 33.333% of track per card (which equals 100% of wrapper)
        const translatePercent = activeCard * 33.333;

        return `
            <div class="screen-content screen-no-scroll">
                <div class="context-label">YOUR TICKETS</div>

                <div class="carousel-wrapper">
                    <div class="carousel-track" style="transform: translateX(-${translatePercent}%);">
                        ${this.renderBoardingCard()}
                        ${this.renderMetroCard()}
                        ${this.renderPaymentCard()}
                    </div>
                </div>

                <div class="carousel-dots">
                    <div class="dot ${activeCard === 0 ? 'active' : ''}"></div>
                    <div class="dot ${activeCard === 1 ? 'active' : ''}"></div>
                    <div class="dot ${activeCard === 2 ? 'active' : ''}"></div>
                </div>

                <div class="hint-text">Roll left/right to switch • Click to interact • Hold for AI • Double-click for home</div>
            </div>
        `;
    }

    renderBoardingCard() {
        return `
            <div class="carousel-card">
                <div class="card-badge">
                    <i data-lucide="plane" style="width: 16px; height: 16px;"></i>
                    <span>Flight</span>
                </div>
                <div class="hero-text" style="font-size: 32px; margin: var(--space-3) 0;">BA 283</div>
                <div style="font-size: 24px; font-weight: 600; color: var(--text-secondary); text-align: center;">
                    SFO <i data-lucide="arrow-right" style="width: 20px; height: 20px; display: inline; vertical-align: middle;"></i> LHR
                </div>

                <div class="qr-container" style="padding: var(--space-4) 0;">
                    <div class="qr-code" style="width: 140px; height: 140px;">
                        <div class="qr-pattern" style="font-size: 70px;">▚▚▚</div>
                    </div>
                </div>

                <div class="ticket-info-row">
                    <div class="ticket-info-col">
                        <div class="info-label">Gate</div>
                        <div style="font-size: 24px; font-weight: 600; color: var(--accent-yellow);">52</div>
                    </div>
                    <div class="ticket-info-col">
                        <div class="info-label">Seat</div>
                        <div style="font-size: 24px; font-weight: 600;">24A</div>
                    </div>
                    <div class="ticket-info-col">
                        <div class="info-label">Departure</div>
                        <div style="font-size: 24px; font-weight: 600;">17:45</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMetroCard() {
        return `
            <div class="carousel-card">
                <div class="card-badge">
                    <i data-lucide="train" style="width: 16px; height: 16px;"></i>
                    <span>Metro</span>
                </div>
                <div style="font-size: 26px; font-weight: 600; text-align: center; margin: var(--space-3) 0;">
                    London Underground
                </div>
                <div style="font-size: 16px; color: var(--text-secondary); text-align: center;">
                    Zone 1-2 Daily Pass
                </div>

                <div class="qr-container" style="padding: var(--space-4) 0;">
                    <div class="qr-code" style="width: 160px; height: 160px;">
                        <div class="qr-pattern" style="font-size: 80px;">▚▚▚</div>
                    </div>
                </div>

                <div class="ticket-info-row">
                    <div class="ticket-info-col">
                        <div class="info-label">Balance</div>
                        <div style="font-size: 24px; font-weight: 600; color: var(--accent-yellow);">£8.50</div>
                    </div>
                    <div class="ticket-info-col">
                        <div class="info-label">Trips Today</div>
                        <div style="font-size: 24px; font-weight: 600;">4</div>
                    </div>
                    <div class="ticket-info-col">
                        <div class="info-label">Valid Until</div>
                        <div style="font-size: 20px; font-weight: 600;">23:59</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPaymentCard() {
        return `
            <div class="carousel-card">
                <div class="card-badge">
                    <i data-lucide="scan" style="width: 16px; height: 16px;"></i>
                    <span>Payment</span>
                </div>
                <div style="font-size: 26px; font-weight: 600; text-align: center; margin: var(--space-3) 0;">
                    Scan to Pay
                </div>
                <div style="font-size: 15px; color: var(--text-secondary); text-align: center; max-width: 80%; margin: 0 auto;">
                    Receive payments by sharing your QR code
                </div>

                <div class="qr-container" style="padding: var(--space-5) 0;">
                    <div class="qr-code" style="width: 180px; height: 180px;">
                        <div class="qr-pattern" style="font-size: 90px;">▚▚▚</div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: var(--space-4);">
                    <div style="font-size: 13px; color: var(--text-tertiary); margin-bottom: var(--space-2);">
                        <i data-lucide="shield-check" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i>
                        Secure payment link
                    </div>
                    <div style="font-size: 18px; font-weight: 600; color: var(--text-secondary);">
                        pay.travel/user123
                    </div>
                </div>
            </div>
        `;
    }

    handle_tickets(action) {
        this.ticketCard = this.ticketCard || 0;

        switch(action) {
            case 'roll-left':
                if (this.ticketCard > 0) {
                    this.ticketCard--;
                    this.renderScreen('tickets');
                }
                break;
            case 'roll-right':
                if (this.ticketCard < 2) {
                    this.ticketCard++;
                    this.renderScreen('tickets');
                }
                break;
            case 'press':
                // Maximize the ticket QR code
                const ticketTypes = ['Boarding Pass', 'Metro Card', 'Payment QR'];
                const qrCodes = document.querySelectorAll('.qr-code');

                if (qrCodes[this.ticketCard]) {
                    const qr = qrCodes[this.ticketCard];
                    const originalSize = qr.style.width;

                    // Pulse effect to indicate maximization
                    qr.style.transform = 'scale(1.15)';
                    qr.style.boxShadow = '0 0 30px rgba(255, 184, 0, 0.6)';

                    setTimeout(() => {
                        qr.style.transform = 'scale(1)';
                        qr.style.boxShadow = '';
                    }, 800);

                    const actions = [
                        'Brightness maximized • Sent to Apple Watch',
                        'QR refreshed • Synced to iPhone wallet',
                        'Payment link copied • Ready to share'
                    ];
                    this.showFeedback(`<i data-lucide="check"></i> ${actions[this.ticketCard]}`, 2000);
                }
                break;
            case 'long-press':
                this.activateAIAssistant();
                break;
            case 'double-press':
                this.ticketCard = 0;
                this.goHome();
                break;
        }
    }

    // ================================
    // BOARDING PASS (Legacy - keeping for compatibility)
    // ================================

    render_boarding() {
        setTimeout(() => lucide.createIcons(), 0);
        return `
            <div class="screen-content screen-no-scroll">
                <div>
                    <div class="context-label">NOW • BOARDING</div>
                    <span class="pill boarding">BOARDING</span>
                </div>

                <div style="text-align: center;">
                    <div class="hero-text" style="font-size: 36px; margin: var(--space-3) 0;">BA 283</div>
                    <div class="hero-text" style="font-size: 32px; margin: 0;">SFO <i data-lucide="plane" style="width: 20px; height: 20px; display: inline; vertical-align: middle;"></i> LHR</div>
                </div>

                <div class="qr-container" style="padding: var(--space-4) 0;">
                    <div class="qr-code" style="width: 160px; height: 160px;">
                        <div class="qr-pattern" style="font-size: 80px;">▚▚▚</div>
                    </div>
                </div>

                <div class="info-grid" style="margin: var(--space-3) 0;">
                    <div class="info-item">
                        <div class="info-label">Departure</div>
                        <div class="info-value" style="font-size: 18px;">17:45</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Gate</div>
                        <div class="info-value" style="font-size: 18px;">52</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Seat</div>
                        <div class="info-value" style="font-size: 18px;">24A</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Class</div>
                        <div class="info-value" style="font-size: 18px;">Economy</div>
                    </div>
                </div>

                <div style="text-align: center;">
                    <div style="font-size: 13px; color: var(--text-secondary);">Wed, Mar 15 • British Airways</div>
                </div>

                <div class="hint-text" style="margin-top: var(--space-3); padding-top: var(--space-3);">Click to maximize brightness • Double-click for home</div>
            </div>
        `;
    }

    handle_boarding(action) {
        if (action === 'double-press') this.goHome();
        if (action === 'press') {
            this.showFeedback('<i data-lucide="sun"></i> Brightness maximized', 1500);
        }
    }

    // ================================
    // METRO CARD
    // ================================

    render_metro() {
        setTimeout(() => lucide.createIcons(), 0);
        return `
            <div class="screen-content screen-no-scroll">
                <div>
                    <div class="context-label">NEARBY • METRO STATION</div>
                    <div class="screen-title" style="text-align: center; margin-bottom: var(--space-4); font-size: 28px;">London Underground</div>
                </div>

                <div class="qr-container" style="padding: var(--space-4) 0;">
                    <div class="qr-code" style="width: 180px; height: 180px;">
                        <div class="qr-pattern" style="font-size: 90px;">▚▚▚</div>
                    </div>
                </div>

                <div style="text-align: center; margin: var(--space-4) 0;">
                    <div style="font-size: 18px; font-weight: 600; margin-bottom: var(--space-2);">
                        Zone 1-2 Daily Pass
                    </div>
                    <div style="font-size: 14px; color: var(--text-secondary); display: flex; align-items: center; justify-content: center; gap: var(--space-1);">
                        <i data-lucide="clock" style="width: 14px; height: 14px;"></i> Valid until 23:59 today
                    </div>
                </div>

                <div class="info-grid" style="margin: var(--space-3) 0;">
                    <div class="info-item">
                        <div class="info-label">Balance</div>
                        <div class="info-value" style="font-size: 18px;">£8.50</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Trips Today</div>
                        <div class="info-value" style="font-size: 18px;">4</div>
                    </div>
                </div>

                <div class="hint-text" style="padding-top: var(--space-3);">Click to refresh code • Double-click for home</div>
            </div>
        `;
    }

    handle_metro(action) {
        if (action === 'double-press') this.goHome();
        if (action === 'press') {
            this.showFeedback('<i data-lucide="refresh-cw"></i> QR code refreshed', 1500);
        }
    }

    // ================================
    // EXPLORE NEARBY
    // ================================

    render_explore() {
        setTimeout(() => lucide.createIcons(), 0);
        const spotsData = [
            { icon: 'book-open', name: 'Old Bookshop', distance: '0.3 km', reddit: '"Hidden gem with rare first editions"', mentions: 127 },
            { icon: 'coffee', name: 'Silo Café', distance: '0.6 km', reddit: '"Best flat white in East London, no cap"', mentions: 89 },
            { icon: 'palette', name: 'Art Gallery', distance: '0.8 km', reddit: '"Free entry Thursdays, incredible local artists"', mentions: 56 },
            { icon: 'shopping-bag', name: 'Vintage Shop', distance: '1.2 km', reddit: '"Found a £5 Burberry jacket here!"', mentions: 203 },
            { icon: 'tree-pine', name: 'City Park', distance: '1.5 km', reddit: '"Perfect sunset spot, bring a blanket"', mentions: 341 },
            { icon: 'landmark', name: 'Museum', distance: '1.8 km', reddit: '"The Egyptian exhibit is mind-blowing"', mentions: 178 },
            { icon: 'beer', name: 'Craft Brewery', distance: '2.1 km', reddit: '"Try the IPA sampler, trust me"', mentions: 92 },
            { icon: 'camera', name: 'Photo Walk', distance: '2.4 km', reddit: '"Street art route is Instagram gold"', mentions: 267 }
        ];

        return `
            <div class="screen-content">
                <div class="context-label">NEARBY • SHOREDITCH</div>
                <div class="screen-title" style="margin-bottom: var(--space-6);">Spots Near You</div>

                <div class="spots-grid">
                    ${spotsData.map((spot, idx) => `
                        <div class="spot-card ${idx === 0 ? 'focused' : ''}" data-spot-index="${idx}">
                            <i data-lucide="${spot.icon}" class="spot-icon"></i>
                            <div class="spot-name">${spot.name}</div>
                            <div class="spot-distance">${spot.distance}</div>
                            <div class="spot-reddit">${spot.reddit}</div>
                            <div class="spot-mentions">
                                <i data-lucide="message-circle" style="width: 10px; height: 10px;"></i>
                                ${spot.mentions} mentions
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="hint-text">Roll to browse • Click to navigate • Hold for AI</div>
            </div>
        `;
    }

    handle_explore(action) {
        const spots = document.querySelectorAll('.spot-card');
        const spotNames = ['Old Bookshop', 'Silo Café', 'Art Gallery', 'Vintage Shop', 'City Park', 'Museum', 'Craft Brewery', 'Photo Walk'];

        switch(action) {
            case 'roll-up':
                if (this.focusedIndex >= 2) {
                    this.updateFocus(spots, -2);
                }
                break;
            case 'roll-down':
                if (this.focusedIndex < spots.length - 2) {
                    this.updateFocus(spots, 2);
                }
                break;
            case 'roll-left':
                if (this.focusedIndex % 2 === 1) {
                    this.updateFocus(spots, -1);
                }
                break;
            case 'roll-right':
                if (this.focusedIndex % 2 === 0 && this.focusedIndex < spots.length - 1) {
                    this.updateFocus(spots, 1);
                }
                break;
            case 'press':
                // Actually navigate to the selected spot
                const selectedSpot = spotNames[this.focusedIndex];

                // Visual feedback - pulse the selected card
                if (spots[this.focusedIndex]) {
                    spots[this.focusedIndex].style.transform = 'scale(1.08)';
                    setTimeout(() => {
                        spots[this.focusedIndex].style.transform = '';
                    }, 300);
                }

                // Show feedback and navigate to navigation screen
                this.showFeedback(`<i data-lucide="navigation"></i> Navigating to ${selectedSpot}`, 1500);
                setTimeout(() => {
                    this.selectedDestination = selectedSpot;
                    this.navigateTo('navigation');
                }, 800);
                break;
            case 'long-press':
                this.activateAIAssistant();
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    // ================================
    // RESTAURANT
    // ================================

    render_restaurant() {
        return `
            <div class="screen-content">
                <div class="context-label">INSIDE • RESTAURANT</div>
                <div class="screen-title">Osteria del Sole</div>
                <div class="subtitle">Since you're vegetarian, here are good picks:</div>

                <div class="grid-2col">
                    <div class="grid-item focused">
                        <div style="width: 100%; height: 100px; background: var(--bg-elevated); border-radius: var(--radius-sm); margin-bottom: var(--space-3); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); font-size: 32px;">
                            🍝
                        </div>
                        <div style="font-family: var(--font-serif); font-size: 16px; font-weight: 600; margin-bottom: var(--space-2);">
                            Pappardelle al Funghi
                        </div>
                        <div style="font-size: 12px; margin-bottom: var(--space-2);">
                            <span class="tag vegetarian">VEGETARIAN</span>
                            <span class="tag popular">POPULAR</span>
                        </div>
                        <div style="font-size: 16px; font-weight: 600; color: var(--text-primary);">€14</div>
                        <div style="font-size: 12px; color: var(--accent-yellow); margin-top: var(--space-1);">
                            ★★★★ Often ordered
                        </div>
                    </div>

                    <div class="grid-item">
                        <div style="width: 100%; height: 100px; background: var(--bg-elevated); border-radius: var(--radius-sm); margin-bottom: var(--space-3); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); font-size: 32px;">
                            🍚
                        </div>
                        <div style="font-family: var(--font-serif); font-size: 16px; font-weight: 600; margin-bottom: var(--space-2);">
                            Risotto alle Erbe
                        </div>
                        <div style="font-size: 12px; margin-bottom: var(--space-2);">
                            <span class="tag vegetarian">VEGETARIAN</span>
                        </div>
                        <div style="font-size: 16px; font-weight: 600; color: var(--text-primary);">€13</div>
                        <div style="font-size: 12px; color: var(--accent-yellow); margin-top: var(--space-1);">
                            ★★★★ House specialty
                        </div>
                    </div>

                    <div class="grid-item">
                        <div style="width: 100%; height: 100px; background: var(--bg-elevated); border-radius: var(--radius-sm); margin-bottom: var(--space-3); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); font-size: 32px;">
                            🥗
                        </div>
                        <div style="font-family: var(--font-serif); font-size: 16px; font-weight: 600; margin-bottom: var(--space-2);">
                            Insalata Caprese
                        </div>
                        <div style="font-size: 12px; margin-bottom: var(--space-2);">
                            <span class="tag vegetarian">VEGETARIAN</span>
                        </div>
                        <div style="font-size: 16px; font-weight: 600; color: var(--text-primary);">€12</div>
                        <div style="font-size: 12px; color: var(--accent-yellow); margin-top: var(--space-1);">
                            ★★★ Light option
                        </div>
                    </div>

                    <div class="grid-item">
                        <div style="width: 100%; height: 100px; background: var(--bg-elevated); border-radius: var(--radius-sm); margin-bottom: var(--space-3); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); font-size: 32px;">
                            🍕
                        </div>
                        <div style="font-family: var(--font-serif); font-size: 16px; font-weight: 600; margin-bottom: var(--space-2);">
                            Pizza Margherita
                        </div>
                        <div style="font-size: 12px; margin-bottom: var(--space-2);">
                            <span class="tag vegetarian">VEGETARIAN</span>
                            <span class="tag popular">POPULAR</span>
                        </div>
                        <div style="font-size: 16px; font-weight: 600; color: var(--text-primary);">€11</div>
                        <div style="font-size: 12px; color: var(--accent-yellow); margin-top: var(--space-1);">
                            ★★★★★ Classic
                        </div>
                    </div>
                </div>

                <div class="hint-text">Roll to browse • Click to select</div>
            </div>
        `;
    }

    handle_restaurant(action) {
        const items = document.querySelectorAll('.grid-item');

        switch(action) {
            case 'roll-down':
                if (this.focusedIndex < 2) {
                    this.updateFocus(items, 2);
                }
                break;
            case 'roll-up':
                if (this.focusedIndex >= 2) {
                    this.updateFocus(items, -2);
                }
                break;
            case 'roll-left':
                if (this.focusedIndex % 2 === 1) {
                    this.updateFocus(items, -1);
                }
                break;
            case 'roll-right':
                if (this.focusedIndex % 2 === 0 && this.focusedIndex < items.length - 1) {
                    this.updateFocus(items, 1);
                }
                break;
            case 'press':
                // Initialize cart if needed
                this.restaurantCart = this.restaurantCart || [];

                const dishNames = ['Pappardelle al Funghi', 'Risotto alle Erbe', 'Insalata Caprese', 'Pizza Margherita'];
                const selectedDish = dishNames[this.focusedIndex];

                // Add to cart
                this.restaurantCart.push(selectedDish);

                // Visual feedback - pulse the selected item
                if (items[this.focusedIndex]) {
                    items[this.focusedIndex].style.transform = 'scale(1.05)';
                    items[this.focusedIndex].style.borderColor = '#30D158';

                    setTimeout(() => {
                        items[this.focusedIndex].style.transform = '';
                        items[this.focusedIndex].style.borderColor = '';
                    }, 600);
                }

                // Show feedback with cart count
                const cartCount = this.restaurantCart.length;
                this.showFeedback(`<i data-lucide="check"></i> ${selectedDish} added • Cart: ${cartCount} item${cartCount > 1 ? 's' : ''}`, 2000);
                break;
            case 'long-press':
                this.activateAIAssistant();
                break;
            case 'double-press':
                // Clear cart and go home
                this.restaurantCart = [];
                this.goHome();
                break;
        }
    }

    // ================================
    // NAVIGATION
    // ================================

    render_navigation() {
        setTimeout(() => lucide.createIcons(), 0);
        return `
            <div class="screen-content">
                <div class="context-label">NAVIGATION ACTIVE</div>

                <div style="text-align: center; margin: var(--space-3) 0;">
                    <i data-lucide="corner-up-left" style="width: 48px; height: 48px; color: var(--accent-yellow);"></i>
                </div>

                <div class="hero-text" style="font-size: 32px;">Turn left</div>
                <div style="text-align: center; font-size: 24px; font-weight: 600; color: var(--text-secondary); margin-top: var(--space-2);">
                    in 120 m
                </div>

                <div style="text-align: center; font-size: 16px; color: var(--text-secondary); margin: var(--space-4) 0;">
                    onto Baker Street
                </div>

                <div id="map" class="map-container" style="height: 220px;"></div>

                <div style="text-align: center; margin-top: var(--space-4);">
                    <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: var(--space-1);">
                        <i data-lucide="footprints" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> 4 min • 0.3 km
                    </div>
                    <div style="font-size: 13px; color: var(--accent-yellow);">
                        to Coffee Bar
                    </div>
                </div>

                <div class="hint-text">Roll to zoom/pan • Double-click to end</div>
            </div>
        `;
    }

    initMap() {
        setTimeout(() => {
            if (typeof L !== 'undefined') {
                const mapEl = document.getElementById('map');
                if (mapEl && !this.map) {
                    // London coordinates
                    this.map = L.map('map', {
                        center: [51.5074, -0.1278],
                        zoom: this.mapZoom,
                        zoomControl: false,
                        attributionControl: false,
                        scrollWheelZoom: false,
                        doubleClickZoom: false,
                        touchZoom: false,
                        boxZoom: false,
                        keyboard: false
                    });

                    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                        maxZoom: 19,
                        minZoom: 10
                    }).addTo(this.map);

                    // Add markers
                    const startIcon = L.divIcon({
                        html: '<div style="width: 12px; height: 12px; background: #64D2FF; border: 2px solid white; border-radius: 50%;"></div>',
                        iconSize: [12, 12],
                        className: ''
                    });

                    const endIcon = L.divIcon({
                        html: '<div style="width: 16px; height: 16px; background: #FFB800; border: 2px solid white; border-radius: 50%;"></div>',
                        iconSize: [16, 16],
                        className: ''
                    });

                    L.marker([51.5074, -0.1278], {icon: startIcon}).addTo(this.map);
                    L.marker([51.5094, -0.1268], {icon: endIcon}).addTo(this.map);

                    // Add route line
                    const route = [
                        [51.5074, -0.1278],
                        [51.5084, -0.1273],
                        [51.5094, -0.1268]
                    ];
                    L.polyline(route, {
                        color: '#FFB800',
                        weight: 4,
                        opacity: 0.8
                    }).addTo(this.map);
                }
            }
        }, 100);
    }

    handle_navigation(action) {
        switch(action) {
            case 'roll-up':
                // Zoom in
                if (this.map && this.mapZoom < 19) {
                    this.mapZoom++;
                    this.map.setZoom(this.mapZoom);
                    this.showFeedback(`<i data-lucide="zoom-in"></i> Zoom: ${this.mapZoom}`, 1500);
                    setTimeout(() => lucide.createIcons(), 10);
                }
                break;
            case 'roll-down':
                // Zoom out
                if (this.map && this.mapZoom > 10) {
                    this.mapZoom--;
                    this.map.setZoom(this.mapZoom);
                    this.showFeedback(`<i data-lucide="zoom-out"></i> Zoom: ${this.mapZoom}`, 1500);
                    setTimeout(() => lucide.createIcons(), 10);
                }
                break;
            case 'roll-left':
                // Pan west
                if (this.map) {
                    const center = this.map.getCenter();
                    const newCenter = [center.lat, center.lng - 0.002];
                    this.map.panTo(newCenter);
                    this.showFeedback(`<i data-lucide="arrow-left"></i> Pan West`, 1000);
                    setTimeout(() => lucide.createIcons(), 10);
                }
                break;
            case 'roll-right':
                // Pan east
                if (this.map) {
                    const center = this.map.getCenter();
                    const newCenter = [center.lat, center.lng + 0.002];
                    this.map.panTo(newCenter);
                    this.showFeedback(`<i data-lucide="arrow-right"></i> Pan East`, 1000);
                    setTimeout(() => lucide.createIcons(), 10);
                }
                break;
            case 'press':
                // Actually re-center the map to original route position
                if (this.map) {
                    const originalCenter = [51.5074, -0.1278]; // London coordinates
                    this.map.setView(originalCenter, 15, { animate: true, duration: 0.8 });
                    this.mapZoom = 15;
                    this.showFeedback('<i data-lucide="navigation-2"></i> Route re-centered', 1500);
                    setTimeout(() => lucide.createIcons(), 10);
                }
                break;
            case 'long-press':
                this.activateAIAssistant();
                break;
            case 'double-press':
                if (this.map) {
                    this.map.remove();
                    this.map = null;
                    this.mapZoom = 15; // Reset zoom
                }
                this.selectedDestination = null;
                this.goHome();
                break;
        }
    }

    // ================================
    // MUSIC PLAYER
    // ================================

    render_music() {
        setTimeout(() => lucide.createIcons(), 0);
        const isPlaying = this.musicPlaying !== false;
        const currentTrack = this.currentTrack || 0;
        const volume = this.musicVolume || 7;
        const tracks = [
            { title: 'Blinded by the Lights', artist: 'The Streets', duration: '3:52', color: '#FF6B6B' },
            { title: 'Electric Feel', artist: 'MGMT', duration: '4:02', color: '#4ECDC4' },
            { title: 'Take Me Out', artist: 'Franz Ferdinand', duration: '3:57', color: '#FFD93D' }
        ];
        const track = tracks[currentTrack % tracks.length];
        const icon = isPlaying ? 'pause' : 'play';

        return `
            <div class="screen-content screen-no-scroll music-screen">
                <div class="music-header">
                    <div class="screen-title" style="margin: 0;">Music</div>
                    <div class="volume-display">
                        <i data-lucide="volume-2" style="width: 16px; height: 16px; color: var(--text-tertiary);"></i>
                        <div class="volume-bars">
                            ${Array.from({length: 10}, (_, i) => `
                                <div class="volume-bar ${i < volume ? 'active' : ''}"></div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="music-player-compact">
                    <div class="album-square" style="background: linear-gradient(145deg, ${track.color}33, ${track.color}11);">
                        <i data-lucide="disc-3" style="width: 64px; height: 64px; color: ${track.color};"></i>
                    </div>

                    <div class="track-details">
                        <div class="track-title">${track.title}</div>
                        <div class="track-artist">${track.artist}</div>
                        <div class="track-number">Track ${currentTrack + 1} / ${tracks.length}</div>
                    </div>
                </div>

                <div class="music-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 40%;"></div>
                    </div>
                    <div class="time-display">
                        <span>1:24</span>
                        <span>${track.duration}</span>
                    </div>
                </div>

                <div class="music-controls">
                    <div class="music-control-hint">
                        <i data-lucide="skip-back"></i>
                        <span>Prev</span>
                    </div>
                    <div class="music-control-main">
                        <i data-lucide="${icon}" style="color: var(--accent-yellow);"></i>
                        <span>Play</span>
                    </div>
                    <div class="music-control-hint">
                        <i data-lucide="skip-forward"></i>
                        <span>Next</span>
                    </div>
                </div>

                <div class="hint-text">Roll up/down for volume • Hold for AI • Double-click for home</div>
            </div>
        `;
    }

    handle_music(action) {
        switch(action) {
            case 'roll-right':
                this.currentTrack = (this.currentTrack || 0) + 1;
                this.updateMusicUI();
                this.showFeedback('<i data-lucide="skip-forward"></i> Next track', 1200);
                break;
            case 'roll-left':
                this.currentTrack = Math.max(0, (this.currentTrack || 0) - 1);
                this.updateMusicUI();
                this.showFeedback('<i data-lucide="skip-back"></i> Previous track', 1200);
                break;
            case 'roll-up':
                this.musicVolume = Math.min(10, (this.musicVolume || 7) + 1);
                this.updateMusicVolume();
                this.showFeedback(`<i data-lucide="volume-2"></i> Volume ${this.musicVolume}`, 800);
                break;
            case 'roll-down':
                this.musicVolume = Math.max(0, (this.musicVolume || 7) - 1);
                this.updateMusicVolume();
                this.showFeedback(`<i data-lucide="volume-${this.musicVolume === 0 ? 'x' : '1'}"></i> Volume ${this.musicVolume}`, 800);
                break;
            case 'press':
                this.musicPlaying = !this.musicPlaying;
                this.updateMusicPlayState();
                const icon = this.musicPlaying ? 'play' : 'pause';
                const text = this.musicPlaying ? 'Playing' : 'Paused';
                this.showFeedback(`<i data-lucide="${icon}"></i> ${text}`, 1200);
                break;
            case 'long-press':
                this.activateAIAssistant();
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    updateMusicVolume() {
        const volume = this.musicVolume || 7;
        const bars = document.querySelectorAll('.volume-bar');
        bars.forEach((bar, i) => {
            if (i < volume) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });
    }

    updateMusicPlayState() {
        const isPlaying = this.musicPlaying !== false;
        const icon = isPlaying ? 'pause' : 'play';
        const mainIcon = document.querySelector('.music-control-main i');
        if (mainIcon) {
            mainIcon.setAttribute('data-lucide', icon);
            lucide.createIcons();
        }
    }

    updateMusicUI() {
        const currentTrack = this.currentTrack || 0;
        const tracks = [
            { title: 'Blinded by the Lights', artist: 'The Streets', duration: '3:52', color: '#FF6B6B' },
            { title: 'Electric Feel', artist: 'MGMT', duration: '4:02', color: '#4ECDC4' },
            { title: 'Take Me Out', artist: 'Franz Ferdinand', duration: '3:57', color: '#FFD93D' }
        ];
        const track = tracks[currentTrack % tracks.length];

        // Update album square
        const albumSquare = document.querySelector('.album-square');
        if (albumSquare) {
            albumSquare.style.background = `linear-gradient(145deg, ${track.color}33, ${track.color}11)`;
            const albumIcon = albumSquare.querySelector('i');
            if (albumIcon) {
                albumIcon.style.color = track.color;
            }
        }

        // Update track info
        const trackTitle = document.querySelector('.track-title');
        const trackArtist = document.querySelector('.track-artist');
        const trackNumber = document.querySelector('.track-number');

        if (trackTitle) trackTitle.textContent = track.title;
        if (trackArtist) trackArtist.textContent = track.artist;
        if (trackNumber) trackNumber.textContent = `Track ${currentTrack + 1} / ${tracks.length}`;
    }

    // ================================
    // AI ASSISTANT
    // ================================

    activateAIAssistant() {
        const contextMessages = {
            'home': [
                "I can help you navigate, find restaurants, or explore nearby attractions. What would you like to do?",
                "Your calendar shows a dinner reservation at 7 PM. Would you like directions to the restaurant?",
                "I noticed you're near several highly-rated coffee shops. Want recommendations?"
            ],
            'tickets': [
                "Your flight boards in 45 minutes at Gate 52. I'll remind you 20 minutes before boarding.",
                "I can add this boarding pass to your Apple Wallet and sync it across your devices.",
                "Your metro pass expires at 23:59. Should I notify you about renewal options?"
            ],
            'explore': [
                "Based on your interests, I recommend visiting the Old Bookshop first - it closes in 2 hours.",
                "The City Park is perfect for sunset photography. Golden hour starts in 45 minutes.",
                "I found 3 Reddit threads about hidden gems in this area. Want to see them?"
            ],
            'restaurant': [
                "The Pappardelle al Funghi is their signature dish - it's been featured in Time Out London.",
                "I can translate the menu to any language or explain ingredients you're allergic to.",
                "Based on reviews, this dish pairs perfectly with their house Chianti wine."
            ],
            'music': [
                "This track is from 'Original Pirate Material' (2002) - a seminal UK garage album.",
                "I can create a playlist based on this vibe. Want similar artists from the same era?",
                "Lyrics for 'Blinded by the Lights' are available. Should I display them?"
            ],
            'navigation': [
                "There's a faster route through the side streets - saves 3 minutes. Switch routes?",
                "Coffee Bar is one of your saved favorites. Their flat white has a 4.8 rating.",
                "I'll alert you about the turn 30 seconds before you need to make it."
            ],
            'alert': [
                "I can help you report suspicious activity to local authorities if needed.",
                "Based on 327 reports, this is a common scam at tourist hotspots in Rome.",
                "Would you like me to save this tip and create a local safety guide for your trip?"
            ]
        };

        const messages = contextMessages[this.currentScreen] || [
            "I'm your AI travel assistant. I can help with navigation, translations, recommendations, and more.",
            "Ask me anything about your current location or travel plans.",
            "I have access to local knowledge, reviews, and real-time information."
        ];

        // Set AI active state
        this.aiActive = true;
        this.aiFocusedButton = 0;

        // Show AI overlay with animated typing effect
        this.showAIOverlay(messages);
    }

    showAIOverlay(messages) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        // Create or get AI overlay
        let overlay = document.getElementById('ai-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'ai-overlay';
            overlay.className = 'ai-overlay';
            document.getElementById('screen').appendChild(overlay);
        }

        overlay.innerHTML = `
            <div class="ai-container">
                <div class="ai-header">
                    <div class="ai-avatar">
                        <div class="ai-listening-wave">
                            <span></span><span></span><span></span><span></span>
                        </div>
                    </div>
                    <div class="ai-title">
                        <div class="ai-name">AI Assistant</div>
                        <div class="ai-status">Voice-first • Listening...</div>
                    </div>
                </div>

                <div class="ai-message">
                    <div class="ai-speaking-indicator">
                        <i data-lucide="mic" style="width: 20px; height: 20px; color: var(--accent-yellow);"></i>
                        <div class="ai-wave-bars">
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                    </div>
                </div>

                <div class="ai-suggestions">
                    <div class="ai-suggestion focused">Tell me more</div>
                    <div class="ai-suggestion">Show alternatives</div>
                    <div class="ai-suggestion">Navigate there</div>
                </div>

                <div class="ai-hint">Roll to navigate • Click to select • Double-click to close</div>
            </div>
        `;

        // Show overlay with animation
        setTimeout(() => {
            overlay.classList.add('show');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Replace speaking indicator with actual message after delay
            setTimeout(() => {
                const messageEl = overlay.querySelector('.ai-message');
                messageEl.innerHTML = `<div class="ai-text">${randomMessage}</div>`;
            }, 1500);
        }, 50);
    }

    closeAI() {
        const overlay = document.getElementById('ai-overlay');
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
        this.aiActive = false;
        this.aiFocusedButton = 0;
    }

    handle_ai(action) {
        const buttons = document.querySelectorAll('.ai-suggestion');
        const buttonTexts = ['Tell me more', 'Show alternatives', 'Navigate there'];

        switch(action) {
            case 'roll-left':
            case 'roll-up':
                if (this.aiFocusedButton > 0) {
                    buttons[this.aiFocusedButton].classList.remove('focused');
                    this.aiFocusedButton--;
                    buttons[this.aiFocusedButton].classList.add('focused');
                }
                break;
            case 'roll-right':
            case 'roll-down':
                if (this.aiFocusedButton < buttons.length - 1) {
                    buttons[this.aiFocusedButton].classList.remove('focused');
                    this.aiFocusedButton++;
                    buttons[this.aiFocusedButton].classList.add('focused');
                }
                break;
            case 'press':
                this.showFeedback(`<i data-lucide="check"></i> ${buttonTexts[this.aiFocusedButton]}`, 1500);
                break;
            case 'double-press':
                this.closeAI();
                break;
        }
    }

    // ================================
    // LOCAL ALERT
    // ================================

    render_alert() {
        setTimeout(() => lucide.createIcons(), 0);
        return `
            <div class="screen-content screen-no-scroll alert-screen">
                <div class="context-label">NEARBY • TREVI FOUNTAIN</div>
                <div class="screen-title" style="margin-bottom: var(--space-5);">Local Tip</div>

                <div class="alert-compact">
                    <div class="alert-icon-section">
                        <i data-lucide="alert-triangle" class="alert-icon-large"></i>
                    </div>

                    <div class="alert-content">
                        <div class="alert-title">Watch out for coin-toss scammers</div>
                        <div class="alert-body">
                            People will offer to "help" you throw coins the "right way" then ask for money. It's a scam. Just toss your own coin - any way works fine!
                        </div>
                        <div class="alert-source">
                            <i data-lucide="users" style="width: 12px; height: 12px;"></i>
                            <span>327 reports on r/rome</span>
                        </div>
                    </div>
                </div>

                <div class="alert-actions">
                    <div class="alert-action-hint">
                        <i data-lucide="check-circle"></i>
                        <span>Click to dismiss</span>
                    </div>
                    <div class="alert-action-hint">
                        <i data-lucide="share-2"></i>
                        <span>Hold for AI tips</span>
                    </div>
                </div>

                <div class="hint-text">Double-click for home</div>
            </div>
        `;
    }

    handle_alert(action) {
        switch(action) {
            case 'press':
                this.showFeedback('<i data-lucide="check"></i> Alert dismissed', 1500);
                setTimeout(() => this.goHome(), 800);
                break;
            case 'long-press':
                this.activateAIAssistant();
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }
}

// ================================
// INITIALIZE
// ================================

document.addEventListener('DOMContentLoaded', () => {
    window.device = new TravelDevice();
    console.log('✨ Travel Companion Device initialized');
    console.log('🎮 Drag the 3D ball or use keyboard arrows');
});
