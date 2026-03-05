# 🚐 The Oregon Trail — Modern Web Edition

A visually stunning, modern reimagining of the classic Oregon Trail game. Lead your party of 5 pioneers on a 2,000-mile journey from Independence, Missouri to Oregon City — facing wild animals, river crossings, illness, and the unforgiving frontier.

### 🎮 [Play Now — Live Demo](https://hsandhu01.github.io/Modern_Oregon_Trail/)

Built for kids and families who love adventure, strategy, and a little bit of chaos.

![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🎮 Classic Gameplay, Modern Experience
- **Choose your profession** — Banker ($1,600), Carpenter ($800), or Farmer ($400) with score multipliers
- **Name your party** of 5 pioneers and manage their health
- **Buy supplies** at Matt's General Store — food, ammo, clothing, spare parts, and oxen
- **Set your pace and rations** to balance speed vs. survival

### 🏔️ Stunning Visuals
- Parallax mountain landscapes with animated clouds and weather
- Dynamic sky with sunrise/sunset cycle
- Glassmorphism UI panels with smooth transitions
- Animated health bars, progress tracking, and wagon movement
- Custom Google Fonts (Playfair Display + Outfit)

### ⚡ Exciting Challenges
- **30+ random events** — dysentery, broken wheels, thunderstorms, wolf packs, prairie fires, and lucky finds
- **Hunting mini-game** — click-to-hunt deer, rabbits, buffalo, turkey, and squirrels with a 30-second timer
- **River crossings** — ford, caulk & float, take the ferry, or wait for better conditions
- **17 historically-inspired landmarks** from Fort Kearney to Chimney Rock to The Dalles

### 🏆 Replayability
- **15 achievements** to unlock (Sharpshooter, Iron Stomach, Speed Demon, Trailblazer...)
- **Score system** with profession-based multipliers
- **Tombstone epitaphs** when things go wrong
- **Save/Load** — your progress is saved automatically via localStorage

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/hsandhu01/Modern_Oregon_Trail.git
cd Modern_Oregon_Trail

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser and start your journey!

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗂️ Project Structure

```
src/
├── main.js                 # App entry point & screen router
├── style.css               # Complete design system (1,700+ lines)
├── engine/
│   └── gameState.js        # Core game logic, save/load, scoring
├── data/
│   ├── landmarks.js        # 17 trail stops with descriptions
│   ├── events.js           # 30+ random events with probabilities
│   ├── items.js            # Store items, professions, pace/rations
│   └── achievements.js     # 15 unlockable achievements
└── screens/
    ├── titleScreen.js       # Animated title with parallax
    ├── characterScreen.js   # Profession & party naming
    ├── storeScreen.js       # Supply shopping
    ├── travelScreen.js      # Main gameplay with HUD
    ├── huntingScreen.js     # Click-to-hunt mini-game
    ├── riverScreen.js       # River crossing challenge
    ├── eventScreen.js       # Random event popups
    ├── landmarkScreen.js    # Landmark arrival screens
    └── gameOverScreen.js    # Win (confetti) / Lose (tombstone)
```

---

## 🎯 How to Play

1. **Choose a profession** — more money means easier start, but lower score multiplier
2. **Stock up at the store** — you NEED oxen to travel! Buy plenty of food too
3. **Hit the trail** — click Travel to advance each day
4. **Manage your resources** — adjust pace (Steady/Strenuous/Grueling) and rations (Filling/Meager/Bare Bones)
5. **Hunt for food** — click animals before time runs out
6. **Cross rivers carefully** — the ferry is safest but costs $20
7. **Survive to Oregon City** — keep your party healthy and your wagon rolling!

### 💡 Pro Tips
- A steady pace with filling rations keeps everyone healthy
- Spare parts save you days when your wagon breaks
- Rest at forts to recover health
- Hunt often to keep your food supply up
- The farmer profession gives 3x score if you can survive on less money!

---

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** — Lightning-fast dev server and build tool
- **Vanilla JavaScript (ES6+)** — No frameworks, pure JS modules
- **Vanilla CSS** — Hand-crafted design system with CSS custom properties, animations, and glassmorphism
- **Google Fonts** — Playfair Display & Outfit
- **localStorage** — For save/load game state

---

## 📜 Historical Notes

The original Oregon Trail was a 2,170-mile route from Independence, Missouri to Oregon's Willamette Valley. Between 1840–1860, over 400,000 settlers made this journey by covered wagon. This game is inspired by the classic 1971 educational game and the real history of westward expansion.

---

## 📄 License

MIT License — feel free to fork, modify, and share!

---

**Made with ❤️ by [Sandhu Software](https://sandhusoftware.com)**
