import { navigateTo } from '../main.js';

export function renderRiverScreen(container, state) {
  const landmark = state.atLandmark;
  const depth = landmark?.riverDepth || 5;
  const width = landmark?.riverWidth || 500;

  container.innerHTML = `
    <div class="river-screen">
      <div class="river-bg">
        <div class="river-sky"></div>
        <div class="river-banks">
          <div class="river-bank-left"></div>
          <div class="river-water" id="river-water">
            <div class="water-wave wave1"></div>
            <div class="water-wave wave2"></div>
            <div class="water-wave wave3"></div>
            <div class="river-wagon-container">
              <span class="river-wagon" id="river-wagon">🚐</span>
            </div>
          </div>
          <div class="river-bank-right"></div>
        </div>
      </div>
      
      <div class="river-info-panel">
        <h2>🌊 ${landmark?.name || 'River Crossing'}</h2>
        <p class="river-desc">${landmark?.description || 'A wide river blocks your path.'}</p>
        
        <div class="river-stats">
          <div class="river-stat">
            <span class="river-stat-label">Width</span>
            <span class="river-stat-value">${width} feet</span>
          </div>
          <div class="river-stat">
            <span class="river-stat-label">Depth</span>
            <span class="river-stat-value">${depth} feet</span>
          </div>
          <div class="river-stat">
            <span class="river-stat-label">Current</span>
            <span class="river-stat-value">${depth > 6 ? 'Strong' : depth > 3 ? 'Moderate' : 'Gentle'}</span>
          </div>
        </div>
        
        <div class="river-options">
          <button class="river-option-btn" id="btn-ford" ${depth > 5 ? 'title="Very risky at this depth!"' : ''}>
            <div class="option-icon">🚶</div>
            <div class="option-text">
              <strong>Ford the River</strong>
              <span>Walk through it. ${depth > 5 ? '⚠️ Dangerous!' : 'Risky if deep.'}</span>
            </div>
          </button>
          <button class="river-option-btn" id="btn-caulk">
            <div class="option-icon">🛟</div>
            <div class="option-text">
              <strong>Caulk & Float</strong>
              <span>Seal the wagon and float across. Moderate risk.</span>
            </div>
          </button>
          <button class="river-option-btn" id="btn-ferry" ${state.money < 20 ? 'disabled title="You need $20"' : ''}>
            <div class="option-icon">⛴️</div>
            <div class="option-text">
              <strong>Take the Ferry</strong>
              <span>Safe crossing. Costs $20.</span>
            </div>
          </button>
          <button class="river-option-btn" id="btn-wait">
            <div class="option-icon">⏳</div>
            <div class="option-text">
              <strong>Wait for Conditions</strong>
              <span>Rest 1-3 days for better crossing.</span>
            </div>
          </button>
        </div>
      </div>
      
      <div class="river-result hidden" id="river-result">
        <div class="result-card">
          <div class="result-icon" id="river-result-icon">✅</div>
          <h3 id="river-result-title">Crossed Successfully!</h3>
          <p id="river-result-desc"></p>
          <button class="btn btn-primary" id="btn-river-continue">Continue</button>
        </div>
      </div>
    </div>
  `;

  // Ford
  container.querySelector('#btn-ford').addEventListener('click', () => {
    const risk = depth > 5 ? 0.6 : depth > 3 ? 0.3 : 0.1;
    crossRiver(container, state, risk, 'forded');
  });

  // Caulk
  container.querySelector('#btn-caulk').addEventListener('click', () => {
    const risk = width > 700 ? 0.4 : 0.2;
    crossRiver(container, state, risk, 'floated');
  });

  // Ferry
  container.querySelector('#btn-ferry').addEventListener('click', () => {
    if (state.money >= 20) {
      state.money -= 20;
      crossRiver(container, state, 0.02, 'ferried');
    }
  });

  // Wait
  container.querySelector('#btn-wait').addEventListener('click', () => {
    const daysWaited = 1 + Math.floor(Math.random() * 3);
    state.daysTraveled += daysWaited;
    const d = new Date(state.date);
    d.setDate(d.getDate() + daysWaited);
    state.date = d;
    crossRiver(container, state, 0.1, 'waited', daysWaited);
  });

  container.querySelector('#btn-river-continue').addEventListener('click', () => {
    navigateTo('travel', state);
  });
}

function crossRiver(container, state, risk, method, daysWaited) {
  // Animate wagon crossing
  const wagon = container.querySelector('#river-wagon');
  wagon.classList.add('crossing');
  
  setTimeout(() => {
    const result = container.querySelector('#river-result');
    const icon = container.querySelector('#river-result-icon');
    const title = container.querySelector('#river-result-title');
    const desc = container.querySelector('#river-result-desc');
    
    if (Math.random() < risk) {
      // Failure
      const foodLost = Math.floor(Math.random() * 50) + 20;
      const healthLost = Math.floor(Math.random() * 15) + 5;
      state.food = Math.max(0, state.food - foodLost);
      state.party.forEach(m => {
        if (m.health > 0) m.health = Math.max(0, m.health - healthLost);
      });
      
      icon.textContent = '😰';
      title.textContent = 'Rough Crossing!';
      desc.textContent = `You lost ${foodLost} lbs of food and everyone took damage while crossing.`;
      result.classList.add('failure');
    } else {
      // Success
      state.perfectCrossings = (state.perfectCrossings || 0) + 1;
      icon.textContent = '✅';
      title.textContent = 'Crossed Successfully!';
      if (method === 'waited') {
        desc.textContent = `After waiting ${daysWaited} days, you crossed safely!`;
      } else if (method === 'ferried') {
        desc.textContent = `The ferry took you across smoothly. Well worth the $20!`;
      } else {
        desc.textContent = `You ${method} across the river without any problems!`;
      }
    }
    
    result.classList.remove('hidden');
  }, 2000);
}
