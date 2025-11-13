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
        toast.textContent = message;
        toast.classList.add('show');

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
        const actionDelay = 200;

        // Mouse down
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            this.isDragging = true;
            previousMouseX = e.clientX;
            previousMouseY = e.clientY;
            velocityX = 0;
            velocityY = 0;
        });

        // Mouse move
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - previousMouseX;
            const deltaY = e.clientY - previousMouseY;

            previousMouseX = e.clientX;
            previousMouseY = e.clientY;

            // Update rotation
            this.ballRotation.y += deltaX * 0.01;
            this.ballRotation.x += deltaY * 0.01;

            velocityX = deltaX;
            velocityY = deltaY;

            // Throttled action detection
            const now = Date.now();
            if (now - lastActionTime < actionDelay) return;
            lastActionTime = now;

            const threshold = 10;
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
            isDragging = false;
            this.isDragging = false;
        });

        // Wheel
        container.addEventListener('wheel', (e) => {
            e.preventDefault();

            this.ballRotation.x += e.deltaY * 0.005;

            if (e.deltaY > 0) {
                this.handleBallAction('roll-down');
            } else {
                this.handleBallAction('roll-up');
            }
        });

        // Click
        container.addEventListener('click', () => {
            if (Math.abs(velocityX) < 2 && Math.abs(velocityY) < 2) {
                this.handleBallAction('press');
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
    }

    // ================================
    // HOME SCREEN
    // ================================

    render_home() {
        return `
            <div class="screen-content">
                <div class="screen-title">Travel Companion</div>
                <div class="subtitle">Your smart travel assistant</div>

                <div class="card focused" data-screen="boarding">
                    <div class="card-title">✈️ Boarding Pass</div>
                    <div class="card-body">Your flight ticket ready for scanning</div>
                </div>

                <div class="card" data-screen="metro">
                    <div class="card-title">🚇 Metro Card</div>
                    <div class="card-body">Public transit pass and balance</div>
                </div>

                <div class="card" data-screen="explore">
                    <div class="card-title">🗺️ Explore Nearby</div>
                    <div class="card-body">Discover curated local spots</div>
                </div>

                <div class="card" data-screen="restaurant">
                    <div class="card-title">🍽️ Restaurant</div>
                    <div class="card-body">Personalized dish recommendations</div>
                </div>

                <div class="card" data-screen="navigation">
                    <div class="card-title">🧭 Navigation</div>
                    <div class="card-body">Turn-by-turn walking directions</div>
                </div>

                <div class="card" data-screen="alert">
                    <div class="card-title">⚠️ Local Alerts</div>
                    <div class="card-body">Important tips and safety warnings</div>
                </div>

                <div class="card" data-screen="music">
                    <div class="card-title">🎵 Music Player</div>
                    <div class="card-body">Control your soundtrack</div>
                </div>

                <div class="hint-text">Roll to browse • Click to open • Double-click for home</div>
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
                const screens = ['boarding', 'metro', 'explore', 'restaurant', 'navigation', 'alert', 'music'];
                this.navigateTo(screens[this.focusedIndex]);
                break;
        }
    }

    // ================================
    // BOARDING PASS
    // ================================

    render_boarding() {
        return `
            <div class="screen-content">
                <div class="context-label">NOW • BOARDING</div>

                <div style="text-align: center; margin-bottom: var(--space-6);">
                    <span class="pill boarding">BOARDING</span>
                </div>

                <div class="hero-text">BA 283</div>
                <div class="hero-text" style="font-size: 42px; margin-top: 0;">SFO → LHR</div>

                <div class="qr-container">
                    <div class="qr-code">
                        <div class="qr-pattern">▚▚▚</div>
                    </div>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Departure</div>
                        <div class="info-value">17:45</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Gate</div>
                        <div class="info-value">52</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Seat</div>
                        <div class="info-value">24A</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Class</div>
                        <div class="info-value">Economy</div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: var(--space-8); color: var(--text-secondary);">
                    <div style="font-size: 14px; margin-bottom: var(--space-2);">Wednesday, March 15</div>
                    <div style="font-size: 13px; color: var(--text-tertiary);">British Airways</div>
                </div>

                <div class="hint-text">Click ball to lock screen • Double-click for home</div>
            </div>
        `;
    }

    handle_boarding(action) {
        if (action === 'double-press') this.goHome();
        if (action === 'press') {
            this.showFeedback('🔆 Screen brightness maximized');
        }
    }

    // ================================
    // METRO CARD
    // ================================

    render_metro() {
        return `
            <div class="screen-content">
                <div class="context-label">NEARBY • METRO STATION</div>

                <div class="screen-title" style="text-align: center;">London Underground</div>

                <div class="qr-container">
                    <div class="qr-code">
                        <div class="qr-pattern">▚▚▚</div>
                    </div>
                </div>

                <div style="text-align: center; margin: var(--space-6) 0;">
                    <div style="font-size: 20px; font-weight: 600; margin-bottom: var(--space-2);">
                        Zone 1-2 Daily Pass
                    </div>
                    <div style="font-size: 16px; color: var(--text-secondary);">
                        Valid until 23:59 today
                    </div>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Balance</div>
                        <div class="info-value">£8.50</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Trips Today</div>
                        <div class="info-value">4</div>
                    </div>
                </div>

                <div class="hint-text">Click to refresh code • Double-click for home</div>
            </div>
        `;
    }

    handle_metro(action) {
        if (action === 'double-press') this.goHome();
        if (action === 'press') {
            this.showFeedback('✓ QR code refreshed');
        }
    }

    // ================================
    // EXPLORE NEARBY
    // ================================

    render_explore() {
        return `
            <div class="screen-content">
                <div class="context-label">NEARBY • SHOREDITCH</div>
                <div class="screen-title">Spots Near You</div>

                <div class="card focused">
                    <div style="width: 100%; height: 120px; background: var(--bg-elevated); border-radius: var(--radius-md); margin-bottom: var(--space-3); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary);">
                        📸
                    </div>
                    <div class="card-title">The Old Bookshop</div>
                    <div class="card-meta">
                        <span class="tag popular">BOOKSTORE</span>
                        <span>0.3 km</span>
                    </div>
                    <div style="color: var(--accent-yellow); font-size: 13px; margin-bottom: var(--space-2);">
                        ★★★★ Loved by locals
                    </div>
                    <div class="card-body" style="font-style: italic;">
                        "Hidden gem with rare travel books and cozy reading nook"
                    </div>
                </div>

                <div class="card">
                    <div style="width: 100%; height: 120px; background: var(--bg-elevated); border-radius: var(--radius-md); margin-bottom: var(--space-3); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary);">
                        📸
                    </div>
                    <div class="card-title">Silo Café</div>
                    <div class="card-meta">
                        <span class="tag popular">CAFE</span>
                        <span>0.6 km</span>
                    </div>
                    <div style="color: var(--accent-yellow); font-size: 13px;">
                        ★★★★★ Popular spot
                    </div>
                </div>

                <div class="hint-text">Roll to browse • Click for details</div>
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
                const dishNames = ['Pappardelle al Funghi', 'Risotto alle Erbe', 'Insalata Caprese', 'Pizza Margherita'];
                this.showFeedback(`✓ ${dishNames[this.focusedIndex]} added to order`);
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    // ================================
    // NAVIGATION
    // ================================

    render_navigation() {
        return `
            <div class="screen-content">
                <div class="context-label">NAVIGATION ACTIVE</div>

                <div class="nav-arrow">↰</div>

                <div class="hero-text">Turn left</div>
                <div style="text-align: center; font-size: 32px; font-weight: 600; color: var(--text-secondary); margin-top: var(--space-4);">
                    in 120 m
                </div>

                <div style="text-align: center; font-size: 18px; color: var(--text-secondary); margin: var(--space-6) 0;">
                    onto Baker Street
                </div>

                <div id="map" class="map-container"></div>

                <div style="text-align: center;">
                    <div style="font-size: 16px; color: var(--text-secondary); margin-bottom: var(--space-2);">
                        4 min • 0.3 km remaining
                    </div>
                    <div style="font-size: 14px; color: var(--accent-yellow);">
                        to Coffee Bar
                    </div>
                </div>

                <div class="hint-text">Double-click to end navigation</div>
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
                    this.showFeedback(`🔍 Zoom: ${this.mapZoom}`);
                }
                break;
            case 'roll-down':
                // Zoom out
                if (this.map && this.mapZoom > 10) {
                    this.mapZoom--;
                    this.map.setZoom(this.mapZoom);
                    this.showFeedback(`🔍 Zoom: ${this.mapZoom}`);
                }
                break;
            case 'double-press':
                if (this.map) {
                    this.map.remove();
                    this.map = null;
                    this.mapZoom = 15; // Reset zoom
                }
                this.goHome();
                break;
        }
    }

    // ================================
    // MUSIC PLAYER
    // ================================

    render_music() {
        const isPlaying = this.musicPlaying !== false;
        const currentTrack = this.currentTrack || 0;
        const tracks = [
            { title: 'Blinded by the Lights', artist: 'The Streets', duration: '3:52' },
            { title: 'Electric Feel', artist: 'MGMT', duration: '4:02' },
            { title: 'Take Me Out', artist: 'Franz Ferdinand', duration: '3:57' }
        ];
        const track = tracks[currentTrack % tracks.length];

        return `
            <div class="screen-content">
                <div class="screen-title">Now Playing</div>

                <div class="album-art">
                    <div class="album-placeholder">${isPlaying ? '♪' : '⏸'}</div>
                </div>

                <div class="track-info">
                    <div class="track-title">${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>

                <div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 40%;"></div>
                    </div>
                    <div class="time-display">
                        <span>1:24</span>
                        <span>${track.duration}</span>
                    </div>
                </div>

                <div style="text-align: center; margin-top: var(--space-8);">
                    <div style="font-size: 48px; color: var(--accent-yellow); margin-bottom: var(--space-4);">
                        ${isPlaying ? '▶' : '⏸'}
                    </div>
                    <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: var(--space-2);">
                        ♪ Travel Mix
                    </div>
                    <div style="font-size: 12px; color: var(--text-tertiary);">
                        Track ${currentTrack + 1} of ${tracks.length}
                    </div>
                </div>

                <div class="hint-text">Roll left/right to skip • Click to ${isPlaying ? 'pause' : 'play'}</div>
            </div>
        `;
    }

    handle_music(action) {
        switch(action) {
            case 'roll-right':
                this.currentTrack = (this.currentTrack || 0) + 1;
                this.renderScreen('music');
                this.showFeedback('⏭ Next track');
                break;
            case 'roll-left':
                this.currentTrack = Math.max(0, (this.currentTrack || 0) - 1);
                this.renderScreen('music');
                this.showFeedback('⏮ Previous track');
                break;
            case 'press':
                this.musicPlaying = !this.musicPlaying;
                this.renderScreen('music');
                this.showFeedback(this.musicPlaying ? '▶ Playing' : '⏸ Paused');
                break;
            case 'double-press':
                this.goHome();
                break;
        }
    }

    // ================================
    // LOCAL ALERT
    // ================================

    render_alert() {
        return `
            <div class="screen-content">
                <div class="context-label">NEARBY • TREVI FOUNTAIN</div>

                <div class="screen-title">Local Tip</div>

                <div class="alert-icon">⚠</div>

                <div style="font-size: 20px; font-weight: 600; color: var(--accent-yellow); text-align: center; margin-bottom: var(--space-4);">
                    Watch out for coin-toss scammers
                </div>

                <div class="card">
                    <div class="card-body">
                        People will offer to "help" you throw coins the "right way" then ask for money. It's a scam.
                        <br/><br/>
                        Just toss your own coin - any way works fine!
                    </div>
                </div>

                <div style="text-align: center; font-size: 13px; color: var(--text-tertiary); font-style: italic; margin-top: var(--space-4);">
                    — Shared by locals on r/rome
                </div>

                <div class="hint-text">Click to dismiss • Double-click for home</div>
            </div>
        `;
    }

    handle_alert(action) {
        if (action === 'press' || action === 'double-press') {
            this.goHome();
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
