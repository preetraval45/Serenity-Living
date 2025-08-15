## Serenity Living — Coming Soon

A responsive, accessible landing site for Serenity Living (senior living and nursing services). It features a clean light/dark theme, a large “COMING SOON” hero with subtle 3D canvas animation and confetti, and placeholder sections for About, Services, Gallery, and Contact. A minimal Node.js static file server (no Express) serves the site from the `public` directory.

### Tech Stack
- **HTML**: Semantic sections and accessible navigation
- **CSS**: Modern, minimal design with CSS variables and responsive layout
- **JavaScript**: Theme toggle with persistence, animated hero, confetti, simple form handling
- **Node.js**: Static file server built with `http` and `fs` (no Express)

### Project Structure
```
public/
  index.html      # Main page
  404.html        # Graceful 404 page
  style.css       # Styles (light + dark theme)
  script.js       # UI behaviors, animations, theme persistence
server.js         # Node static server (no Express)
logo.jpeg         # Site logo (served from project root, server falls back here)
```

### Installation
1. Install Node.js (v16+ recommended).
2. Place your assets (e.g., `logo.jpeg`) in the project root (already included by default).

### Run
```bash
node server.js
```
Open `http://localhost:3000` in your browser.

### Features
- **Responsive navbar** with brand logo and mobile menu
- **Light/Dark mode** toggle with `localStorage` persistence
- **Hero** section with big “COMING SOON”, subtle 3D particle canvas and confetti burst
- **About, Services, Gallery, Contact** sections with placeholder content
- **Sticky header**, modern typography, smooth transitions, reduced-motion support
- **Node static server**: serves files from `public/`, falls back to root for assets, custom 404

### Customization
- Replace `logo.jpeg` with your own logo (keep the same filename or update references)
- Tweak brand colors in `public/style.css` (`:root` variables)
- Edit content in `public/index.html`

### License
This project is provided under the [TBD License]. Replace this section with your chosen license (e.g., MIT) and include the full license text.


