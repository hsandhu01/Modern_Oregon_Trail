import { navigateTo } from '../main.js';

const ANIMALS = [
  { emoji: '🦌', name: 'Deer', food: 35, points: 1, speed: 2.5, size: 40 },
  { emoji: '🐇', name: 'Rabbit', food: 5, points: 1, speed: 4, size: 25 },
  { emoji: '🦬', name: 'Buffalo', food: 100, points: 2, speed: 1.5, size: 55 },
  { emoji: '🦃', name: 'Turkey', food: 8, points: 1, speed: 3, size: 30 },
  { emoji: '🐿️', name: 'Squirrel', food: 2, points: 1, speed: 5, size: 20 },
  { emoji: '🦅', name: 'Eagle', food: 0, points: 0, speed: 6, size: 30, nohit: true },
];

let animLoop = null;
let animals = [];
let score = 0;
let foodGained = 0;
let ammoUsed = 0;
let timeLeft = 30;
let timerInterval = null;

export function renderHuntingScreen(container, state) {
  score = 0;
  foodGained = 0;
  ammoUsed = 0;
  timeLeft = 30;
  animals = [];

  container.innerHTML = `
    <div class="hunting-screen">
      <div class="hunting-bg">
        <div class="hunting-sky"></div>
        <div class="hunting-trees"></div>
        <div class="hunting-ground"></div>
      </div>
      
      <div class="hunting-hud">
        <div class="hunt-stat">
          <span class="hunt-stat-label">⏱️ Time</span>
          <span class="hunt-stat-value" id="hunt-timer">${timeLeft}s</span>
        </div>
        <div class="hunt-stat">
          <span class="hunt-stat-label">🎯 Hits</span>
          <span class="hunt-stat-value" id="hunt-score">${score}</span>
        </div>
        <div class="hunt-stat">
          <span class="hunt-stat-label">🥩 Food</span>
          <span class="hunt-stat-value" id="hunt-food">+${foodGained} lbs</span>
        </div>
        <div class="hunt-stat">
          <span class="hunt-stat-label">🔫 Ammo</span>
          <span class="hunt-stat-value" id="hunt-ammo">${state.ammunition} boxes</span>
        </div>
      </div>
      
      <div class="hunting-field" id="hunting-field">
        <div class="crosshair" id="crosshair">+</div>
      </div>
      
      <div class="hunting-results hidden" id="hunting-results">
        <div class="results-card">
          <h2>🎯 Hunt Results</h2>
          <div class="results-stats">
            <div class="result-stat">
              <span class="result-label">Animals Hit</span>
              <span class="result-value" id="result-hits">0</span>
            </div>
            <div class="result-stat">
              <span class="result-label">Food Gained</span>
              <span class="result-value" id="result-food">0 lbs</span>
            </div>
            <div class="result-stat">
              <span class="result-label">Ammo Used</span>
              <span class="result-value" id="result-ammo">0 boxes</span>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-done-hunt">Back to Trail</button>
        </div>
      </div>
    </div>
  `;

  const field = container.querySelector('#hunting-field');
  const crosshair = container.querySelector('#crosshair');

  // Custom crosshair
  field.addEventListener('mousemove', (e) => {
    const rect = field.getBoundingClientRect();
    crosshair.style.left = (e.clientX - rect.left) + 'px';
    crosshair.style.top = (e.clientY - rect.top) + 'px';
  });

  // Shoot
  field.addEventListener('click', (e) => {
    if (timeLeft <= 0) return;
    if (state.ammunition <= 0) return;
    
    state.ammunition--;
    ammoUsed++;
    container.querySelector('#hunt-ammo').textContent = `${state.ammunition} boxes`;
    
    // Flash effect
    const flash = document.createElement('div');
    flash.className = 'shot-flash';
    flash.style.left = (e.clientX - field.getBoundingClientRect().left) + 'px';
    flash.style.top = (e.clientY - field.getBoundingClientRect().top) + 'px';
    field.appendChild(flash);
    setTimeout(() => flash.remove(), 300);
    
    // Check hits
    const clickX = e.clientX - field.getBoundingClientRect().left;
    const clickY = e.clientY - field.getBoundingClientRect().top;
    
    for (let i = animals.length - 1; i >= 0; i--) {
      const a = animals[i];
      const dist = Math.sqrt((clickX - a.x) ** 2 + (clickY - a.y) ** 2);
      if (dist < a.data.size) {
        if (a.data.nohit) continue;
        // Hit!
        score++;
        foodGained += a.data.food;
        if (a.data.name === 'Buffalo') state.shotBuffalo = true;
        
        container.querySelector('#hunt-score').textContent = score;
        container.querySelector('#hunt-food').textContent = `+${foodGained} lbs`;
        
        // Hit animation
        a.el.textContent = '💥';
        a.el.classList.add('hit');
        setTimeout(() => { if (a.el.parentNode) a.el.remove(); }, 500);
        animals.splice(i, 1);
        break;
      }
    }
  });

  // Spawn animals
  function spawnAnimal() {
    if (timeLeft <= 0) return;
    const template = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const el = document.createElement('div');
    el.className = 'hunting-animal';
    el.textContent = template.emoji;
    el.style.fontSize = template.size + 'px';
    
    const fieldRect = field.getBoundingClientRect();
    const startRight = Math.random() < 0.5;
    const x = startRight ? fieldRect.width + 50 : -50;
    const y = 100 + Math.random() * (fieldRect.height - 200);
    
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    field.appendChild(el);
    
    const animal = { el, x, y, data: template, dx: startRight ? -template.speed : template.speed, dy: (Math.random() - 0.5) * 1 };
    animals.push(animal);
  }

  // Animation loop
  function animate() {
    for (let i = animals.length - 1; i >= 0; i--) {
      const a = animals[i];
      a.x += a.dx;
      a.y += a.dy;
      a.el.style.left = a.x + 'px';
      a.el.style.top = a.y + 'px';
      a.el.style.transform = a.dx > 0 ? 'scaleX(-1)' : 'scaleX(1)';
      
      // Remove off-screen
      const fieldRect = field.getBoundingClientRect();
      if (a.x < -80 || a.x > fieldRect.width + 80 || a.y < -80 || a.y > fieldRect.height + 80) {
        a.el.remove();
        animals.splice(i, 1);
      }
    }
    animLoop = requestAnimationFrame(animate);
  }

  // Timer
  timerInterval = setInterval(() => {
    timeLeft--;
    container.querySelector('#hunt-timer').textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      endHunt(container, state);
    }
  }, 1000);

  // Spawn timer
  const spawnInterval = setInterval(() => {
    if (timeLeft <= 0) { clearInterval(spawnInterval); return; }
    spawnAnimal();
  }, 1500);

  // Initial spawns
  setTimeout(() => spawnAnimal(), 500);
  setTimeout(() => spawnAnimal(), 1000);

  animate();

  // Done button
  container.querySelector('#btn-done-hunt').addEventListener('click', () => {
    state.food += foodGained;
    if (score > state.huntingHighScore) state.huntingHighScore = score;
    navigateTo('travel', state);
  });
}

function endHunt(container, state) {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  if (animLoop) { cancelAnimationFrame(animLoop); animLoop = null; }
  
  const results = container.querySelector('#hunting-results');
  if (results) {
    results.classList.remove('hidden');
    container.querySelector('#result-hits').textContent = score;
    container.querySelector('#result-food').textContent = `${foodGained} lbs`;
    container.querySelector('#result-ammo').textContent = `${ammoUsed} boxes`;
  }
}
