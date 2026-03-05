import { hasSavedGame, loadGame, clearSave } from '../engine/gameState.js';
import { navigateTo, setGameState } from '../main.js';

export function renderTitleScreen(container) {
  container.innerHTML = `
    <div class="title-screen">
      <div class="stars" id="stars-container"></div>
      <div class="parallax-bg">
        <div class="mountain-layer mountain-far"></div>
        <div class="mountain-layer mountain-mid"></div>
        <div class="mountain-layer mountain-near"></div>
        <div class="prairie-layer"></div>
      </div>
      <div class="campfire-glow"></div>
      <div class="dust-particles" id="dust-particles"></div>
      
      <div class="title-content">
        <div class="title-badge">⚙️ A Modern Classic</div>
        <h1 class="game-title">
          <span class="title-the">The</span>
          <span class="title-oregon">Oregon</span>
          <span class="title-trail">Trail</span>
        </h1>
        <p class="title-subtitle">The year is 1848. Your destination: Oregon City.</p>
        <p class="title-subtitle2">Do you have what it takes to survive the journey?</p>
        
        <div class="title-buttons">
          <button class="btn btn-primary btn-glow" id="btn-new-game">
            <span class="btn-icon">🚀</span> New Journey
          </button>
          ${hasSavedGame() ? `
          <button class="btn btn-secondary" id="btn-continue">
            <span class="btn-icon">📂</span> Continue Journey
          </button>
          ` : ''}
          <button class="btn btn-ghost" id="btn-how-to-play">
            <span class="btn-icon">📖</span> How to Play
          </button>
        </div>
      </div>
      
      <div class="wagon-silhouette">
        <div class="wagon-sprite">🚐</div>
      </div>
      
      <div class="title-footer">
        <span>🌾 2,000 miles of adventure await 🏔️</span>
      </div>
    </div>
    
    <div class="modal-overlay hidden" id="how-to-play-modal">
      <div class="modal-card">
        <h2>📖 How to Play</h2>
        <div class="how-to-play-content">
          <div class="how-to-section">
            <h3>🎯 Your Goal</h3>
            <p>Lead your party of 5 pioneers from <strong>Independence, Missouri</strong> to <strong>Oregon City</strong> — a 2,000-mile journey through wilderness!</p>
          </div>
          <div class="how-to-section">
            <h3>📦 Manage Supplies</h3>
            <p>Buy food, ammunition, clothing, spare parts, and oxen. Run out and your party will suffer!</p>
          </div>
          <div class="how-to-section">
            <h3>⚡ Face Challenges</h3>
            <p>Cross dangerous rivers, hunt wild animals, survive storms, illness, and bandits. Every day brings new surprises!</p>
          </div>
          <div class="how-to-section">
            <h3>💡 Tips</h3>
            <ul>
              <li>Start with plenty of food — you'll need it!</li>
              <li>Spare parts save you days of lost travel</li>
              <li>A steady pace keeps your party healthy</li>
              <li>Hunt often to keep your food supplies up</li>
            </ul>
          </div>
        </div>
        <button class="btn btn-primary" id="btn-close-modal">Got it!</button>
      </div>
    </div>
  `;

  // Create stars
  const starsContainer = container.querySelector('#stars-container');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 50 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px';
    starsContainer.appendChild(star);
  }

  // Create dust particles
  const dustContainer = container.querySelector('#dust-particles');
  for (let i = 0; i < 20; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust';
    dust.style.left = Math.random() * 100 + '%';
    dust.style.top = (50 + Math.random() * 50) + '%';
    dust.style.animationDelay = Math.random() * 5 + 's';
    dust.style.animationDuration = (5 + Math.random() * 5) + 's';
    dustContainer.appendChild(dust);
  }

  // Event listeners
  container.querySelector('#btn-new-game').addEventListener('click', () => {
    navigateTo('character');
  });

  const continueBtn = container.querySelector('#btn-continue');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const state = loadGame();
      if (state) {
        setGameState(state);
        navigateTo('travel', state);
      }
    });
  }

  container.querySelector('#btn-how-to-play').addEventListener('click', () => {
    container.querySelector('#how-to-play-modal').classList.remove('hidden');
  });

  container.querySelector('#btn-close-modal').addEventListener('click', () => {
    container.querySelector('#how-to-play-modal').classList.add('hidden');
  });
}
