# OpenCV Quest — Gamified OpenCV Mastery

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

**OpenCV Quest** is a high-fidelity, interactive learning platform designed to take you from a Computer Vision novice to an OpenCV expert. Through a series of "Missions," users engage with core CV concepts in a gamified, mission-console environment — with **real opencv.js processing** powering the visualizer.

---

## Key Features

- **Mission-Based Learning** — Progressive modules covering pixel manipulation, color spaces, filters, edge detection, thresholding, and contours.
- **Real OpenCV.js Visualizer** — Each mission includes a live canvas-based visualizer running actual `cv2` operations (GaussianBlur, Canny, findContours, etc.) via opencv.js.
- **Premium UI/UX** — Dark-mode HUD interface with glassmorphism, micro-animations, and vibrant accents.
- **Sound Effects** — Web Audio API feedback on correct answers, XP gains, mission completions, and badge unlocks. Toggleable in Settings.
- **XP & Ranking** — Track XP, unlock badges, and advance through six ranks.
- **Integrated Skill Tree** — Visualize and unlock your learning path module by module.
- **Certification** — Earn a printable digital certificate with a deterministic verification ID on completing 3+ modules.
- **Google Sheets Logging** — Certification events are optionally logged to a Google Sheet for tracking completions.

---

## Learning Path (The Missions)

1. **Images & Pixels** — Image matrices, coordinate systems, BGR color order, brightness/contrast.
2. **Color Spaces** — BGR → Grayscale → HSV conversions with `cvtColor`.
3. **Blurring & Filters** — Noise reduction with `GaussianBlur`.
4. **Edge Detection** — Structural boundaries with `Canny`.
5. **Thresholding** — Binary segmentation with `threshold`.
6. **Contours** — Shape extraction with `findContours` + `drawContours`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | Vanilla CSS + CSS Variables (Glassmorphism) |
| Routing | React Router 7 |
| Computer Vision | **opencv.js 4.8** (loaded from CDN) |
| Audio | Web Audio API (no external dependency) |
| Effects | canvas-confetti |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/opencv-learn.git
cd opencv-learn
npm install
npm run dev
```

---

## Google Sheets Certification Logging (optional)

When a user downloads their certificate, the app can log the event (codename, XP, rank, cert ID, date) to a Google Sheet.

### Setup

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Go to **Extensions → Apps Script** and paste:

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    e.parameter.codename || '',
    Number(e.parameter.xp || 0),
    e.parameter.rank     || '',
    e.parameter.certId   || '',
    e.parameter.date     || '',
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy → New deployment → Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the Web app URL.
5. Create a `.env` file in the project root:

```env
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

6. Restart the dev server. Certifications will now be logged automatically on PDF download.

> If `VITE_GOOGLE_SHEETS_URL` is not set the app works normally — logging is skipped silently.

---

## Project Structure

```
src/
├── components/     # UI Components (HUD, Dashboard, Mission, Certification, …)
├── constants/      # xpConfig.js — XP thresholds, rank labels, level math
├── data/           # Mission definitions and challenge content
├── hooks/          # useGameState (reducer + localStorage persistence)
├── utils/          # soundEffects.js, googleSheets.js
├── styles/         # Global theme CSS variables
├── App.jsx         # Routing, GameContext provider
└── main.jsx        # Entry point
```

---

## License

Distributed under the ISC License.

---

<p align="center">Built with ❤️ for the Computer Vision Community</p>
