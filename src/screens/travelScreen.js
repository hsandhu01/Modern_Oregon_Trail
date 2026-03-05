import { advanceDay, saveGame } from '../engine/gameState.js';
import { getNextLandmark, getProgress, TOTAL_MILES } from '../data/landmarks.js';
import { PACE_OPTIONS, RATIONS_OPTIONS } from '../data/items.js';
import { navigateTo } from '../main.js';

let travelInterval = null;
let animFrame = null;

export function stopTravelLoop() {
  if (travelInterval) { clearInterval(travelInterval); travelInterval = null; }
  if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
}

export function renderTravelScreen(container, state) {
  const nextLandmark = getNextLandmark(state.milesTraveled);
  const milesToNext = nextLandmark ? nextLandmark.miles - state.milesTraveled : 0;
  const dateStr = formatDate(state.date);
  const progress = getProgress(state.milesTraveled);

  container.innerHTML = `
    <div class="travel-screen">
      <!-- Animated landscape -->
      <div class="landscape">
        <div class="sky" id="sky">
          <div class="sun-moon" id="sun-moon">☀️</div>
          <div class="clouds" id="clouds"></div>
        </div>
        <div class="mountains-far travel-parallax" data-speed="0.2"></div>
        <div class="mountains-mid travel-parallax" data-speed="0.5"></div>
        <div class="hills travel-parallax" data-speed="0.8"></div>
        <div class="ground">
          <div class="trail-path"></div>
          <div class="wagon-container">
            <div class="travel-wagon" id="travel-wagon">
              <span class="wagon-body">🚐</span>
            </div>
          </div>
        </div>
        <div class="weather-overlay" id="weather-overlay"></div>
      </div>
      
      <!-- HUD -->
      <div class="travel-hud">
        <div class="hud-top">
          <div class="hud-date">
            <span class="hud-label">Date</span>
            <span class="hud-value" id="hud-date">${dateStr}</span>
          </div>
          <div class="hud-weather">
            <span class="hud-label">Weather</span>
            <span class="hud-value" id="hud-weather">${state.weatherEmoji}</span>
          </div>
          <div class="hud-miles">
            <span class="hud-label">Miles</span>
            <span class="hud-value" id="hud-miles">${state.milesTraveled} / ${TOTAL_MILES}</span>
          </div>
          <div class="hud-next">
            <span class="hud-label">Next Stop</span>
            <span class="hud-value" id="hud-next">${nextLandmark?.name || 'Oregon City'}</span>
            <span class="hud-sub" id="hud-next-miles">${milesToNext} miles</span>
          </div>
        </div>
        
        <div class="progress-bar-container">
          <div class="progress-bar" id="progress-bar" style="width: ${progress * 100}%"></div>
          <div class="progress-markers">
            <span>Independence</span>
            <span>Oregon City</span>
          </div>
        </div>
      </div>
      
      <!-- Status Panel -->
      <div class="travel-status">
        <div class="party-health-list" id="party-health">
          ${renderPartyHealth(state)}
        </div>
        
        <div class="supplies-grid">
          <div class="supply-item">
            <span class="supply-icon">🥩</span>
            <span class="supply-label">Food</span>
            <span class="supply-value ${state.food < 100 ? 'warning' : ''}" id="supply-food">${state.food} lbs</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">🔫</span>
            <span class="supply-label">Ammo</span>
            <span class="supply-value" id="supply-ammo">${state.ammunition} boxes</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">👕</span>
            <span class="supply-label">Clothes</span>
            <span class="supply-value" id="supply-clothes">${state.clothing} sets</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">🔧</span>
            <span class="supply-label">Parts</span>
            <span class="supply-value" id="supply-parts">${state.spareParts} sets</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">🐂</span>
            <span class="supply-label">Oxen</span>
            <span class="supply-value" id="supply-oxen">${state.oxen} yoke</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">💰</span>
            <span class="supply-label">Money</span>
            <span class="supply-value" id="supply-money">$${state.money.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <!-- Controls -->
      <div class="travel-controls">
        <div class="control-group">
          <label class="control-label">Pace</label>
          <div class="control-options" id="pace-options">
            ${PACE_OPTIONS.map(p => `
              <button class="control-btn ${p.id === state.pace.id ? 'active' : ''}" data-pace="${p.id}" title="${p.description}">
                ${p.name}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Rations</label>
          <div class="control-options" id="rations-options">
            ${RATIONS_OPTIONS.map(r => `
              <button class="control-btn ${r.id === state.rations.id ? 'active' : ''}" data-rations="${r.id}" title="${r.description}">
                ${r.name}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="control-actions">
          <button class="btn btn-action" id="btn-travel" title="Travel another day">
            🚐 Travel
          </button>
          <button class="btn btn-action secondary" id="btn-rest" title="Rest to recover health">
            🏕️ Rest
          </button>
          <button class="btn btn-action secondary" id="btn-hunt" title="Hunt for food">
            🎯 Hunt
          </button>
        </div>
      </div>
      
      <!-- Achievement popup -->
      <div class="achievement-popup hidden" id="achievement-popup">
        <div class="achievement-icon" id="achievement-icon"></div>
        <div class="achievement-text">
          <span class="achievement-label">Achievement Unlocked!</span>
          <span class="achievement-name" id="achievement-name"></span>
        </div>
      </div>
      
      <!-- Event toast -->
      <div class="event-toast hidden" id="event-toast">
        <div class="event-toast-content" id="event-toast-content"></div>
      </div>
    </div>
  `;

  // Add clouds
  const cloudsEl = container.querySelector('#clouds');
  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.textContent = '☁️';
    cloud.style.top = (5 + Math.random() * 20) + '%';
    cloud.style.left = (Math.random() * 100) + '%';
    cloud.style.animationDuration = (30 + Math.random() * 20) + 's';
    cloud.style.animationDelay = (-Math.random() * 30) + 's';
    cloud.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
    cloud.style.opacity = 0.3 + Math.random() * 0.4;
    cloudsEl.appendChild(cloud);
  }

  // Pace controls
  container.querySelectorAll('[data-pace]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.pace = PACE_OPTIONS.find(p => p.id === btn.dataset.pace);
      container.querySelectorAll('[data-pace]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Rations controls
  container.querySelectorAll('[data-rations]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.rations = RATIONS_OPTIONS.find(r => r.id === btn.dataset.rations);
      container.querySelectorAll('[data-rations]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Travel button
  container.querySelector('#btn-travel').addEventListener('click', () => {
    state.isResting = false;
    doTravel(container, state);
  });

  // Rest button
  container.querySelector('#btn-rest').addEventListener('click', () => {
    state.isResting = true;
    advanceDay(state);
    updateHUD(container, state);
    showToast(container, '🏕️ You rested for a day. Your party feels a bit better!');
    saveGame(state);
  });

  // Hunt button
  container.querySelector('#btn-hunt').addEventListener('click', () => {
    if (state.ammunition <= 0) {
      showToast(container, '🔫 You don\'t have any ammunition! Buy some at the next store.');
      return;
    }
    navigateTo('hunting', state);
  });
}

function doTravel(container, state) {
  if (state.oxen <= 0) {
    showToast(container, '🐂 You have no oxen! You can\'t travel without them.');
    return;
  }

  advanceDay(state);
  updateHUD(container, state);

  // Check for events
  if (state.currentEvent) {
    setTimeout(() => {
      navigateTo('event', state);
    }, 500);
    return;
  }

  // Check for landmark arrival
  if (state.atLandmark && state.atLandmark.type !== 'destination') {
    setTimeout(() => {
      navigateTo('landmark', state);
    }, 500);
    return;
  }

  // Check game over
  if (state.gameOver) {
    setTimeout(() => navigateTo('gameover', state), 500);
    return;
  }

  // Show achievements
  if (state.newAchievements && state.newAchievements.length > 0) {
    showAchievement(container, state.newAchievements[0]);
  }

  saveGame(state);
}

function updateHUD(container, state) {
  const nextLandmark = getNextLandmark(state.milesTraveled);
  const milesToNext = nextLandmark ? nextLandmark.miles - state.milesTraveled : 0;
  const progress = getProgress(state.milesTraveled);

  const update = (id, val) => { const el = container.querySelector(id); if (el) el.textContent = val; };
  
  update('#hud-date', formatDate(state.date));
  update('#hud-weather', state.weatherEmoji);
  update('#hud-miles', `${state.milesTraveled} / ${TOTAL_MILES}`);
  update('#hud-next', nextLandmark?.name || 'Oregon City');
  update('#hud-next-miles', `${Math.max(0, milesToNext)} miles`);
  
  const progressBar = container.querySelector('#progress-bar');
  if (progressBar) progressBar.style.width = `${progress * 100}%`;

  update('#supply-food', `${state.food} lbs`);
  update('#supply-ammo', `${state.ammunition} boxes`);
  update('#supply-clothes', `${state.clothing} sets`);
  update('#supply-parts', `${state.spareParts} sets`);
  update('#supply-oxen', `${state.oxen} yoke`);
  update('#supply-money', `$${state.money.toFixed(2)}`);

  // Food warning
  const foodEl = container.querySelector('#supply-food');
  if (foodEl) foodEl.classList.toggle('warning', state.food < 100);

  // Update party health
  const partyEl = container.querySelector('#party-health');
  if (partyEl) partyEl.innerHTML = renderPartyHealth(state);

  // Animate wagon
  const wagon = container.querySelector('#travel-wagon');
  if (wagon) {
    wagon.classList.add('wagon-moving');
    setTimeout(() => wagon.classList.remove('wagon-moving'), 400);
  }
}

function renderPartyHealth(state) {
  return state.party.map(m => `
    <div class="party-member-health ${m.health <= 0 ? 'dead' : ''}">
      <span class="member-name">${m.isLeader ? '⭐' : '👤'} ${m.name}</span>
      <div class="health-bar-mini">
        <div class="health-fill ${m.health < 30 ? 'critical' : m.health < 60 ? 'warn' : 'good'}" 
             style="width: ${m.health}%"></div>
      </div>
      <span class="health-text">${m.health <= 0 ? '💀' : m.health + '%'}</span>
    </div>
  `).join('');
}

function showAchievement(container, achievement) {
  const popup = container.querySelector('#achievement-popup');
  const icon = container.querySelector('#achievement-icon');
  const name = container.querySelector('#achievement-name');
  if (popup && icon && name) {
    icon.textContent = achievement.icon;
    name.textContent = achievement.name;
    popup.classList.remove('hidden');
    popup.classList.add('show');
    setTimeout(() => {
      popup.classList.remove('show');
      popup.classList.add('hidden');
    }, 3000);
  }
}

function showToast(container, message) {
  const toast = container.querySelector('#event-toast');
  const content = container.querySelector('#event-toast-content');
  if (toast && content) {
    content.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hidden');
    }, 3000);
  }
}

function formatDate(date) {
  const d = new Date(date);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
