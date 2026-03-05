// Screen router and main entry point
import './style.css';
import { hasSavedGame, loadGame, clearSave } from './engine/gameState.js';
import { renderTitleScreen } from './screens/titleScreen.js';
import { renderCharacterScreen } from './screens/characterScreen.js';
import { renderStoreScreen } from './screens/storeScreen.js';
import { renderTravelScreen, stopTravelLoop } from './screens/travelScreen.js';
import { renderHuntingScreen } from './screens/huntingScreen.js';
import { renderRiverScreen } from './screens/riverScreen.js';
import { renderEventScreen } from './screens/eventScreen.js';
import { renderGameOverScreen } from './screens/gameOverScreen.js';
import { renderLandmarkScreen } from './screens/landmarkScreen.js';

let currentScreen = null;
let gameState = null;

const app = document.getElementById('app');

export function navigateTo(screen, state) {
  gameState = state || gameState;
  currentScreen = screen;
  stopTravelLoop();
  
  // Clear with fade
  app.classList.add('screen-exit');
  setTimeout(() => {
    app.innerHTML = '';
    app.classList.remove('screen-exit');
    app.classList.add('screen-enter');
    
    switch (screen) {
      case 'title':
        renderTitleScreen(app);
        break;
      case 'character':
        renderCharacterScreen(app);
        break;
      case 'store':
        renderStoreScreen(app, gameState);
        break;
      case 'travel':
        renderTravelScreen(app, gameState);
        break;
      case 'hunting':
        renderHuntingScreen(app, gameState);
        break;
      case 'river':
        renderRiverScreen(app, gameState);
        break;
      case 'event':
        renderEventScreen(app, gameState);
        break;
      case 'gameover':
        renderGameOverScreen(app, gameState);
        break;
      case 'landmark':
        renderLandmarkScreen(app, gameState);
        break;
    }
    
    setTimeout(() => app.classList.remove('screen-enter'), 500);
  }, 300);
}

export function getGameState() {
  return gameState;
}

export function setGameState(state) {
  gameState = state;
}

// Start the game
navigateTo('title');
