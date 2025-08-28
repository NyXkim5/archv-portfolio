# Archv Portfolio

A modern, minimal, brutalist-style portfolio site for **Archv**.  
Built with **React + Vite + Tailwind**, featuring smooth animations, SVG logos, and a full-bleed background video on the Platform page.

---

## ✨ Features

- ⚡ **React + Vite** for fast dev builds  
- 🎨 **TailwindCSS** for styling with utility-first classes  
- 🌙 **Dark/Light theme support** with theme provider  
- 🖼️ **SVG logo support** (crisp at all sizes)  
- 📹 **Platform page video background** (autoplay, muted, loop, playsInline, dual format support: `.mp4` & `.webm`)  
- 🔗 **Social links** in footer (LinkedIn, Instagram, TikTok) with icons  
- 🌀 **Custom animations** (boot flicker, breathing glow)  

---

## 📂 Project Structure

archv-portfolio/
├── public/
│ └── video/
│ ├── platform.mp4 # H.264 encoded
│ ├── platform.webm # VP9 encoded
│ └── platform-poster.jpg (optional still frame)
├── src/
│ ├── assets/
│ │ ├── ARCHV (2).svg # main logo
│ │ └── tiktok.svg # TikTok logo (if used instead of Music2)
│ ├── components/
│ │ ├── Nav.jsx
│ │ └── ThemeProvider.jsx
│ └── pages/
│ ├── Home.jsx # landing page with SVG logo + socials
│ └── Platform.jsx # video background section
├── package.json
└── README.md

yaml
Copy code

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/NyXkim5/archv-portfolio.git
cd archv-portfolio
2. Install dependencies
bash
Copy code
npm install
3. Run in dev mode
bash
Copy code
npm run dev
Then open the local dev server URL (usually http://localhost:5173/).

📹 Video Setup
To ensure the Platform page video works for all browsers:

Place your MP4 and WebM files inside public/video/.

Example:

swift
Copy code
public/video/platform.mp4
public/video/platform.webm
Encoding guide (FFmpeg)
bash
Copy code
# H.264 MP4 (for Safari, iOS, most browsers)
ffmpeg -i input.mp4 -c:v libx264 -pix_fmt yuv420p -movflags +faststart -preset fast -crf 20 -r 30 public/video/platform.mp4

VP9 WebM (for Chrome, Edge, Firefox)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 -r 30 -an public/video/platform.webm
🌐 Socials
Find Archv across platforms:

LinkedIn

Instagram

TikTok

🛠️ Tech Stack
React 18

Vite

TailwindCSS

Lucide React (icon set)

FFmpeg (for video encoding)

📜 License
This project is proprietary and owned by Archv.
Not for redistribution or reuse without permission.

yaml
Copy code
