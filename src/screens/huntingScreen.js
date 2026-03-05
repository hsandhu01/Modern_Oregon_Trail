import { navigateTo } from '../main.js';

// Animal definitions — supports both emoji and image sprites
// To use PNG images: set `img` to the path (e.g. '/assets/deer.png')
// Images should be transparent PNGs facing LEFT
const ANIMALS = [
  { emoji: '🦌', img: null, name: 'Deer', food: 35, points: 1, speed: 0.8, hitRadius: 45, width: 70, height: 55, zone: 'ground', bobAmount: 3, bobSpeed: 2 },
  { emoji: '🐇', img: null, name: 'Rabbit', food: 5, points: 1, speed: 1.4, hitRadius: 30, width: 45, height: 35, zone: 'ground', bobAmount: 8, bobSpeed: 4 },
  { emoji: '🦬', img: null, name: 'Buffalo', food: 100, points: 2, speed: 0.5, hitRadius: 55, width: 90, height: 70, zone: 'ground', bobAmount: 2, bobSpeed: 1.5 },
  { emoji: '🦃', img: null, name: 'Turkey', food: 8, points: 1, speed: 1.0, hitRadius: 35, width: 55, height: 45, zone: 'ground', bobAmount: 4, bobSpeed: 3 },
  { emoji: '🐿️', img: null, name: 'Squirrel', food: 2, points: 1, speed: 1.8, hitRadius: 25, width: 35, height: 30, zone: 'ground', bobAmount: 5, bobSpeed: 5 },
  { emoji: '🦅', img: null, name: 'Eagle', food: 0, points: 0, speed: 1.2, hitRadius: 35, width: 60, height: 50, zone: 'sky', bobAmount: 15, bobSpeed: 0.8, nohit: true },
];

// Vertical zones for spawning (percentage of field height)
const ZONES = {
  sky: { min: 0.08, max: 0.3 },    // Eagles soar up high
  ground: { min: 0.5, max: 0.85 },  // Ground animals stay low
};

let animLoop = null;
let animals = [];
let score = 0;
let foodGained = 0;
let ammoUsed = 0;
let timeLeft = 30;
let timerInterval = null;
let spawnInterval = null;
let frameCount = 0;

export function renderHuntingScreen(container, state) {
  score = 0;
  foodGained = 0;
  ammoUsed = 0;
  timeLeft = 30;
  animals = [];
  frameCount = 0;

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
        <div class="crosshair" id="crosshair">⊕</div>
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

  // Custom crosshair follows mouse
  field.addEventListener('mousemove', (e) => {
    const rect = field.getBoundingClientRect();
    crosshair.style.left = (e.clientX - rect.left) + 'px';
    crosshair.style.top = (e.clientY - rect.top) + 'px';
  });

  // Shoot on click
  field.addEventListener('click', (e) => {
    if (timeLeft <= 0) return;
    if (state.ammunition <= 0) return;
    
    state.ammunition--;
    ammoUsed++;
    container.querySelector('#hunt-ammo').textContent = `${state.ammunition} boxes`;
    
    // Muzzle flash effect
    const flash = document.createElement('div');
    flash.className = 'shot-flash';
    flash.style.left = (e.clientX - field.getBoundingClientRect().left) + 'px';
    flash.style.top = (e.clientY - field.getBoundingClientRect().top) + 'px';
    field.appendChild(flash);
    setTimeout(() => flash.remove(), 300);
    
    // Check collisions with animals
    const clickX = e.clientX - field.getBoundingClientRect().left;
    const clickY = e.clientY - field.getBoundingClientRect().top;
    
    for (let i = animals.length - 1; i >= 0; i--) {
      const a = animals[i];
      // Hit detection: use center of the animal element
      const centerX = a.x + a.data.width / 2;
      const centerY = a.y + a.data.height / 2;
      const dist = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
      
      if (dist < a.data.hitRadius) {
        if (a.data.nohit) continue;
        
        // Hit!
        score++;
        foodGained += a.data.food;
        if (a.data.name === 'Buffalo') state.shotBuffalo = true;
        
        container.querySelector('#hunt-score').textContent = score;
        container.querySelector('#hunt-food').textContent = `+${foodGained} lbs`;
        
        // Hit animation — show burst then fade
        a.hit = true;
        a.el.innerHTML = a.data.img 
          ? '' 
          : '<span style="font-size:2rem">💥</span>';
        a.el.classList.add('hit');
        const capturedEl = a.el;
        setTimeout(() => { if (capturedEl.parentNode) capturedEl.remove(); }, 500);
        animals.splice(i, 1);
        break;
      }
    }
  });

  // Spawn a new animal
  function spawnAnimal() {
    if (timeLeft <= 0) return;
    
    // Pick a random animal type (weighted: more common animals appear more)
    const weights = [3, 3, 1, 3, 2, 1]; // Deer, Rabbit, Buffalo, Turkey, Squirrel, Eagle
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let roll = Math.random() * totalWeight;
    let templateIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      roll -= weights[i];
      if (roll <= 0) { templateIndex = i; break; }
    }
    const template = ANIMALS[templateIndex];
    
    const fieldRect = field.getBoundingClientRect();
    const zone = ZONES[template.zone];
    
    // Create the DOM element
    const el = document.createElement('div');
    el.className = 'hunting-animal';
    el.style.width = template.width + 'px';
    el.style.height = template.height + 'px';
    
    if (template.img) {
      // Use PNG image
      const img = document.createElement('img');
      img.src = template.img;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      img.draggable = false;
      el.appendChild(img);
    } else {
      // Use emoji fallback
      el.style.fontSize = (template.width * 0.7) + 'px';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.textContent = template.emoji;
    }
    
    // Determine spawn side and Y position within zone
    const movingLeft = Math.random() < 0.5;
    const startX = movingLeft ? fieldRect.width + 20 : -template.width - 20;
    const startY = zone.min * fieldRect.height + Math.random() * (zone.max - zone.min) * fieldRect.height;
    
    el.style.left = startX + 'px';
    el.style.top = startY + 'px';
    field.appendChild(el);
    
    const animal = {
      el,
      x: startX,
      y: startY,
      baseY: startY,              // Base Y for bobbing oscillation
      data: template,
      dx: movingLeft ? -template.speed : template.speed,
      phase: Math.random() * Math.PI * 2,  // Random bob phase offset
      hit: false,
      pauseTimer: 0,              // Occasional pauses (for ground animals)
      isPaused: false,
    };
    
    animals.push(animal);
  }

  // Main animation loop — runs at 60fps via requestAnimationFrame
  function animate() {
    frameCount++;
    const time = frameCount / 60; // Time in seconds
    
    for (let i = animals.length - 1; i >= 0; i--) {
      const a = animals[i];
      if (a.hit) continue;
      
      // Occasional pauses for ground animals (they stop to graze/look around)
      if (a.data.zone === 'ground' && !a.isPaused) {
        a.pauseTimer++;
        // ~2% chance per frame to pause (roughly every 3-5 seconds)
        if (a.pauseTimer > 120 && Math.random() < 0.02) {
          a.isPaused = true;
          a.pauseTimer = 0;
          // Resume after 0.5-2 seconds
          setTimeout(() => { a.isPaused = false; a.pauseTimer = 0; }, 500 + Math.random() * 1500);
        }
      }
      
      // Move horizontally (unless paused)
      if (!a.isPaused) {
        a.x += a.dx;
      }
      
      // Natural bobbing — sine wave for up/down motion
      const bobOffset = Math.sin(time * a.data.bobSpeed + a.phase) * a.data.bobAmount;
      a.y = a.baseY + bobOffset;
      
      // Update DOM position
      a.el.style.left = a.x + 'px';
      a.el.style.top = a.y + 'px';
      
      // Flip sprite based on direction (facing left = normal, facing right = flipped)
      a.el.style.transform = a.dx > 0 ? 'scaleX(-1)' : 'scaleX(1)';
      
      // Remove when fully off-screen
      const fieldRect = field.getBoundingClientRect();
      if (a.x < -template.width - 50 || a.x > fieldRect.width + 50) {
        a.el.remove();
        animals.splice(i, 1);
      }
    }
    
    animLoop = requestAnimationFrame(animate);
  }

  // Timer countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    const timerEl = container.querySelector('#hunt-timer');
    if (timerEl) timerEl.textContent = `${timeLeft}s`;
    if (timeLeft <= 5 && timerEl) timerEl.style.color = '#ff6b6b';
    if (timeLeft <= 0) {
      endHunt(container, state);
    }
  }, 1000);

  // Spawn animals every 2.5-4 seconds (more natural pacing)
  function scheduleNextSpawn() {
    if (timeLeft <= 0) return;
    const delay = 2500 + Math.random() * 1500;
    spawnInterval = setTimeout(() => {
      spawnAnimal();
      scheduleNextSpawn();
    }, delay);
  }

  // Initial spawns — stagger them
  setTimeout(() => spawnAnimal(), 800);
  setTimeout(() => spawnAnimal(), 2000);
  setTimeout(() => spawnAnimal(), 3500);
  scheduleNextSpawn();

  // Start the animation loop
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
  if (spawnInterval) { clearTimeout(spawnInterval); spawnInterval = null; }
  if (animLoop) { cancelAnimationFrame(animLoop); animLoop = null; }
  
  const results = container.querySelector('#hunting-results');
  if (results) {
    results.classList.remove('hidden');
    container.querySelector('#result-hits').textContent = score;
    container.querySelector('#result-food').textContent = `${foodGained} lbs`;
    container.querySelector('#result-ammo').textContent = `${ammoUsed} boxes`;
  }
}
