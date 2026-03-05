import { calculateScore, clearSave } from '../engine/gameState.js';
import { navigateTo } from '../main.js';

export function renderGameOverScreen(container, state) {
  const score = calculateScore(state);
  const surviving = state.party.filter(m => m.health > 0).length;
  const total = state.party.length;

  if (state.won) {
    renderWinScreen(container, state, score, surviving, total);
  } else {
    renderLoseScreen(container, state, score, surviving, total);
  }
}

function renderWinScreen(container, state, score, surviving, total) {
  container.innerHTML = `
    <div class="gameover-screen win">
      <div class="confetti-container" id="confetti"></div>
      <div class="fireworks" id="fireworks"></div>
      
      <div class="gameover-content">
        <div class="gameover-card win-card">
          <h1 class="win-title">🎉 You Made It!</h1>
          <p class="win-subtitle">Welcome to Oregon City!</p>
          
          <div class="win-stats">
            <div class="win-stat">
              <span class="win-stat-icon">👥</span>
              <span class="win-stat-label">Survivors</span>
              <span class="win-stat-value">${surviving} / ${total}</span>
            </div>
            <div class="win-stat">
              <span class="win-stat-icon">📅</span>
              <span class="win-stat-label">Days</span>
              <span class="win-stat-value">${state.daysTraveled}</span>
            </div>
            <div class="win-stat">
              <span class="win-stat-icon">🥩</span>
              <span class="win-stat-label">Food Left</span>
              <span class="win-stat-value">${state.food} lbs</span>
            </div>
            <div class="win-stat">
              <span class="win-stat-icon">💰</span>
              <span class="win-stat-label">Money Left</span>
              <span class="win-stat-value">$${state.money.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="score-display">
            <div class="score-label">Final Score</div>
            <div class="score-value">${score.toLocaleString()}</div>
            <div class="score-multiplier">×${state.profession.scoreMultiplier} (${state.profession.name})</div>
          </div>
          
          <div class="party-final">
            <h3>Your Party</h3>
            ${state.party.map(m => `
              <div class="party-final-member ${m.health <= 0 ? 'dead' : ''}">
                ${m.health > 0 ? '😊' : '💀'} ${m.name} — ${m.health > 0 ? `${m.health}% health` : 'Did not survive'}
              </div>
            `).join('')}
          </div>
          
          ${state.unlockedAchievements.length > 0 ? `
          <div class="achievements-earned">
            <h3>🏅 Achievements</h3>
            <div class="achievement-list">
              ${state.unlockedAchievements.map(id => `<span class="achievement-badge" title="${id}">${getAchievementIcon(id)}</span>`).join('')}
            </div>
          </div>
          ` : ''}
          
          <div class="gameover-buttons">
            <button class="btn btn-primary btn-glow" id="btn-play-again">🚐 New Journey</button>
            <button class="btn btn-ghost" id="btn-main-menu">📋 Main Menu</button>
          </div>
        </div>
      </div>
    </div>
  `;

  createConfetti(container);
  wireButtons(container);
}

function renderLoseScreen(container, state, score, surviving, total) {
  container.innerHTML = `
    <div class="gameover-screen lose">
      <div class="lose-bg">
        <div class="lose-particles" id="lose-particles"></div>
      </div>
      
      <div class="gameover-content">
        <div class="gameover-card lose-card">
          <div class="tombstone">
            <div class="tombstone-shape">
              <div class="tombstone-text">
                <p class="tombstone-rip">Rest In Peace</p>
                <p class="tombstone-name">${state.party[0].name}'s Party</p>
                <p class="tombstone-date">${formatDate(state.date)}</p>
                <p class="tombstone-epitaph">"${getEpitaph(state)}"</p>
              </div>
            </div>
          </div>
          
          <h2 class="lose-title">Your Journey Has Ended</h2>
          <p class="lose-subtitle">After ${state.milesTraveled} miles, the trail claimed your party.</p>
          
          <div class="lose-stats">
            <div class="lose-stat">
              <span>Miles Traveled: ${state.milesTraveled}</span>
            </div>
            <div class="lose-stat">
              <span>Days on Trail: ${state.daysTraveled}</span>
            </div>
            <div class="lose-stat">
              <span>Score: ${score.toLocaleString()}</span>
            </div>
          </div>
          
          <div class="gameover-buttons">
            <button class="btn btn-primary btn-glow" id="btn-play-again">🚐 Try Again</button>
            <button class="btn btn-ghost" id="btn-main-menu">📋 Main Menu</button>
          </div>
        </div>
      </div>
    </div>
  `;

  wireButtons(container);
}

function wireButtons(container) {
  container.querySelector('#btn-play-again').addEventListener('click', () => {
    clearSave();
    navigateTo('character');
  });
  container.querySelector('#btn-main-menu').addEventListener('click', () => {
    clearSave();
    navigateTo('title');
  });
}

function createConfetti(container) {
  const confettiContainer = container.querySelector('#confetti');
  if (!confettiContainer) return;
  const colors = ['#f4a261', '#e76f51', '#2d6a4f', '#e9c46a', '#264653', '#e63946', '#a8dadc'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 3 + 's';
    piece.style.animationDuration = (2 + Math.random() * 3) + 's';
    confettiContainer.appendChild(piece);
  }
}

function getEpitaph(state) {
  const epitaphs = [
    'They died as they lived — on the trail.',
    'Should have bought more food.',
    'The trail is long, but life is short.',
    'At least the oxen survived. Oh wait...',
    'Gone too soon, but the stories remain.',
    'Next time, take the ferry.',
    `${state.milesTraveled} miles wasn't far enough.`,
    'They tried their best. The trail did the rest.'
  ];
  return epitaphs[Math.floor(Math.random() * epitaphs.length)];
}

function getAchievementIcon(id) {
  const icons = { first_steps: '👣', century: '💯', halfway: '⛰️', oregon_or_bust: '🏆', sharpshooter: '🎯', big_spender: '💰', penny_pincher: '🪙', iron_stomach: '💪', river_master: '🛶', survivor: '🏕️', speed_demon: '💨', fully_stocked: '📦', buffalo_hunter: '🦬', trailblazer: '⭐', tough_cookie: '🍪' };
  return icons[id] || '🏅';
}

function formatDate(date) {
  const d = new Date(date);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
