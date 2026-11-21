# COSMOS — Cinematic 3D Universe Exploration Platform

> A premium, cinematic, interactive 3D universe exploration and simulation platform built with React 19, Three.js, React Three Fiber, and Tailwind CSS v4.

---

## 🌌 Overview

**COSMOS** is an immersive 3D space exploration platform that combines scientific grounding with cinematic visual quality. Designed to look and feel like a modern planetarium and space flight simulator rather than a generic educational tool, COSMOS delivers photorealistic planetary rendering, atmospheric scattering, realistic ring systems, and smooth orbital dynamics.

---

## ✨ Features

### 🪐 Photorealistic Planetary System
- **All 8 Major Planets**: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune rendered with high-resolution global texture mosaics (2K–8K).
- **Physical Characteristics**: Customized surface roughness, metalness, and lighting contrast across daylight and terminator zones.
- **Accurate Axial Tilts**: True-to-life planetary tilts, including Venus's retrograde rotation and Uranus's 97.8° lateral tilt.
- **Independent Diurnal & Orbital Cycles**: Planets spin on their tilted axes while revolutionizing around the Sun at relative orbital speeds.

### ☀️ Central Solar Illuminator & Corona
- **Emissive Solar Sphere**: High-intensity point-light illuminator (180 intensity, 150 unit falloff).
- **Procedural Corona Halo**: Dynamic radial corona sprite utilizing additive blending for soft atmospheric radiance.

### 🌍 Atmospheric Scattering Shells
- **Translucent Halos**: Inverse backside-rendered atmospheric shells for planets with dense atmospheres (Earth, Venus, Uranus, Neptune).
- **Color Tuning**: Distinct Rayleigh/Mie scattering colors for Earth's blue limb, Venus's sulfur-tinted shroud, and the methane blues of Uranus and Neptune.

### 🪐 Saturn's Complex Ring System
- **Radial UV Mapping**: Ring geometry mathematically mapped from inner to outer radius, wrapping authentic Cassini mission alpha profiles.
- **Transparency & Tilt**: Tilted 26.7° with dual-sided visibility and translucent gap structures.

### 🎛️ Real-Time Mission Control HUD
- **Playback Controls**: Seamless Play / Pause toggle for orbital and rotational animation.
- **Speed Multiplier**: Variable time dilation from `0.25×` to `3.00×`.
- **Glassmorphism UI**: Minimalist, non-intrusive translucent HUD panel built with Tailwind CSS v4 and Lucide React.
- **Visual Scale Badge**: Clear disclaimer acknowledging visual artistic adjustments.

### 🎥 Cinematic Orbit Controls
- Smooth inertial damping (`dampingFactor: 0.06`), zoom limits (`3.5` to `80`), and full orbital rotation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) |
| **3D Rendering** | [Three.js r187](https://threejs.org/) |
| **Declarative WebGL** | [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism System |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Code Quality** | ESLint 10 + Flat Config + React Compiler Rules |

---

## 📁 Architecture & File Structure

```text
cosmos/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── textures/                # Production static textures
│       ├── earth_atmos_2048.jpg
│       ├── jupiter.jpg
│       ├── mars.jpg
│       ├── mercury.jpg
│       ├── neptune.jpg
│       ├── saturn.jpg
│       ├── saturn_ring.png
│       ├── sun.jpg
│       ├── uranus.jpg
│       └── venus.jpg
│
├── src/
│   ├── assets/
│   │   ├── README.md            # Asset attribution and licensing details
│   │   └── textures/            # Source textures
│   │
│   ├── components/
│   │   ├── celestial/
│   │   │   └── Planet.jsx       # Celestial body with axial tilt, materials & halos
│   │   │
│   │   ├── interface/
│   │   │   ├── AppFooter.jsx    # Persistent bottom bar
│   │   │   ├── AppHeader.jsx    # Top mission HUD
│   │   │   ├── ControlsPanel.jsx# Bottom glass controls (play/pause/speed)
│   │   │   └── UIKit.jsx        # GlassPanel, Badge, IconButton primitives
│   │   │
│   │   └── space/
│   │       ├── Atmosphere.jsx   # Additive halo shell
│   │       ├── OrbitPath.jsx    # Dashed orbital path rings
│   │       ├── SaturnRings.jsx  # Concentric ring geometry with alpha texture
│   │       └── Sun.jsx          # Emissive core + corona halo sprite
│   │
│   ├── contexts/
│   │   ├── animationContextDef.js # React animation context definition
│   │   └── AnimationContext.jsx   # Global playback provider
│   │
│   ├── data/
│   │   └── designSystem.js      # Palette, glass mixins, typography tokens
│   │
│   ├── hooks/
│   │   ├── useAnimation.js      # Animation consumer hook
│   │   └── usePlanetMaterials.js# Three.js texture loading & color space hook
│   │
│   ├── scenes/
│   │   └── SolarSystem.jsx      # Primary 3D Solar System scene composition
│   │
│   ├── App.jsx                  # Application root & canvas mount
│   ├── index.css                # Tailwind CSS v4 directives
│   └── main.jsx                 # Entry point
│
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation
```bash
# Clone repository
git clone https://github.com/dhanushbk/cosmos.git
cd cosmos

# Install dependencies
npm install
```

### Development
```bash
# Start Vite development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

### Linting
```bash
# Run ESLint validation
npm run lint
```

---

## 🛰️ Asset Attribution & Licensing

All celestial maps utilized in COSMOS are derived from public domain imagery provided by:
- **NASA** (National Aeronautics and Space Administration)
- **USGS** (United States Geological Survey Astrogeology Science Center)
- **JPL-Caltech** (Jet Propulsion Laboratory)

Detailed information on resolutions and missions is documented in [src/assets/README.md](file:///Users/dhanushbk/cosmos/src/assets/README.md).

---

## 🗺️ Project Roadmap

- [x] **Phase 0 — Project Audit & Foundation**: Scalable architecture, Vite + React 19 + Tailwind v4 + Three.js integration, clean linting setup.
- [x] **Phase 1 — Cinematic Solar System**: Central Sun, 8 planets, orbit guides, camera controllers, HUD headers.
- [x] **Phase 2 — Photorealistic Planetary Rendering**: High-res textures, anisotropic filtering, atmospheric shells, Saturn rings, animation playback deck, performance optimizations.
- [ ] **Phase 3 — Interactive Planetary Exploration**: Planet selection & focus travel, dynamic telemetry overlay, scale toggles, camera fly-bys.
- [ ] **Phase 4 — Deep Space & Expansion**: Natural satellites (Moon, Galilean moons, Titan), asteroid belt, Kuiper belt, distant celestial deep-space entities.

---

## 📄 License

This project is licensed under the MIT License.



