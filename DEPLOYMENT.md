# Deploying to Vercel

This project is configured for easy deployment to Vercel.

## Quick Deploy

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project root:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration
6. Click "Deploy"

## Configuration

The project includes:

- **`vercel.json`**: Configures routing to serve files from the `prototype` directory
- **`package.json`**: Project metadata
- **`.vercelignore`**: Excludes documentation files from deployment

## Local Development

Run locally with:

```bash
npm run dev
```

This starts a local server at `http://localhost:8000`

## Project Structure

```
mirage-assignment/
├── prototype/          # Main application files (deployed)
│   ├── index.html      # Entry point
│   ├── app.js          # Application logic
│   └── styles.css      # Styling
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
└── .vercelignore       # Deployment exclusions
```

## Features

- Interactive 3D ball-based navigation using Three.js
- Travel companion features:
  - Boarding passes and tickets
  - Metro card management
  - Local exploration
  - Restaurant recommendations
  - Navigation with maps
  - Music player
  - Local alerts
  - AI assistant (voice-first)

## Requirements

No build step required - this is a static site that runs entirely in the browser.

External dependencies are loaded via CDN:
- Three.js (3D rendering)
- Leaflet (maps)
- Lucide Icons
- Google Fonts
