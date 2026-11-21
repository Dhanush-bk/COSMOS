# COSMOS — Planetary Asset Documentation

All planetary texture files are stored locally under `public/textures/` and `src/assets/textures/`.

| File | Celestial Body | Dimensions | Source / Mission | License / Usage |
| :--- | :--- | :--- | :--- | :--- |
| `sun.jpg` | The Sun | 2048 × 1024 | NASA Solar Dynamics Observatory (SDO) | Public Domain (NASA) |
| `mercury.jpg` | Mercury | 8192 × 4096 | NASA MESSENGER Global Mosaic | Public Domain (NASA / USGS) |
| `venus.jpg` | Venus | 4096 × 2048 | NASA Magellan & Pioneer Venus | Public Domain (NASA) |
| `earth_atmos_2048.jpg` | Earth | 2048 × 1024 | NASA Visible Earth (Blue Marble Next Generation) | Public Domain (NASA) |
| `mars.jpg` | Mars | 8192 × 4096 | USGS Astrogeology / Mars Global Surveyor (MOLA) | Public Domain (USGS / NASA) |
| `jupiter.jpg` | Jupiter | 4096 × 2048 | NASA Juno & Cassini Global Mosaics | Public Domain (NASA / JPL) |
| `saturn.jpg` | Saturn | 4096 × 2048 | NASA Cassini Imaging Science Subsystem | Public Domain (NASA / JPL) |
| `saturn_ring.png` | Saturn Rings | 8192 × 500 | NASA Cassini Ring UV/Alpha Profiles | Public Domain (NASA / JPL) |
| `uranus.jpg` | Uranus | 2048 × 1024 | NASA Voyager 2 ISS Science Team | Public Domain (NASA) |
| `neptune.jpg` | Neptune | 2048 × 1024 | NASA Voyager 2 Narrow Angle Camera | Public Domain (NASA) |

### Notes
- Static textures are bundled and served from `/public/textures/` for production stability.
- All assets are under open public domain licensing from NASA, USGS, or JPL-Caltech.
- Texture color spaces are automatically mapped to `SRGBColorSpace` with 8x anisotropic filtering for sharp oblique viewing angles.
