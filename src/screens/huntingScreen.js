import { navigateTo } from '../main.js';

// Resolve the base URL for assets (works on both local dev and GitHub Pages)
const BASE = import.meta.env.BASE_URL;

// Animal definitions — all use PNG sprites now
// Deer, buffalo, turkey face RIGHT in their images; squirrel faces LEFT
const ANIMALS = [
  { img: `${BASE}assets/deer.png`, name: 'Deer', food: 35, points: 1, speed: 1.8, hitRadius: 50, width: 120, height: 110, zone: 'ground', bobAmount: 3, bobSpeed: 2, facesRight: true },
  { img: `${BASE}assets/buffalo.png`, name: 'Buffalo', food: 100, points: 2, speed: 1.2, hitRadius: 60, width: 140, height: 100, zone: 'ground', bobAmount: 2, bobSpeed: 1.5, facesRight: true },
  { img: `${BASE}assets/turkey.png`, name: 'Turkey', food: 12, points: 1, speed: 2.0, hitRadius: 40, width: 90, height: 80, zone: 'ground', bobAmount: 3, bobSpeed: 3, facesRight: true },
  { img: `${BASE}assets/squirrel.png`, name: 'Squirrel', food: 3, points: 1, speed: 3.2, hitRadius: 30, width: 70, height: 55, zone: 'ground', bobAmount: 5, bobSpeed: 5, facesRight: false },
];

// Vertical zones — animals stay in the lower portion of the scene
const ZONES = {
  ground: { min: 0.55, max: 0.82 },
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

  const bgUrl = `${BASE}assets/hunting-bg.jpg`;

  container.innerHTML = `
    <div class="hunting-screen">
      <div class="hunting-bg">
        <img src="${bgUrl}" class="hunting-bg-img" alt="" />
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
      if (a.hit) continue;
      const centerX = a.x + a.data.width / 2;
      const centerY = a.y + a.data.height / 2;
      const dist = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
      
      if (dist < a.data.hitRadius) {
        // Hit!
        score++;
        foodGained += a.data.food;
        if (a.data.name === 'Buffalo') state.shotBuffalo = true;
        
        container.querySelector('#hunt-score').textContent = score;
        container.querySelector('#hunt-food').textContent = `+${foodGained} lbs`;
        
        // Hit animation
        a.hit = true;
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
    
    // Weighted random pick
    const weights = [3, 1, 3, 2]; // Deer, Buffalo, Turkey, Squirrel
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let roll = Math.random() * totalWeight;
    let idx = 0;
    for (let i = 0; i < weights.length; i++) {
      roll -= weights[i];
      if (roll <= 0) { idx = i; break; }
    }
    const template = ANIMALS[idx];
    
    const fieldRect = field.getBoundingClientRect();
    const zone = ZONES[template.zone];
    
    // Create the DOM element with an <img> inside
    const el = document.createElement('div');
    el.className = 'hunting-animal';
    el.style.width = template.width + 'px';
    el.style.height = template.height + 'px';
    
    const img = document.createElement('img');
    img.src = template.img;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.draggable = false;
    el.appendChild(img);
    
    // Determine direction: randomly left-to-right or right-to-left
    const movingLeft = Math.random() < 0.5;
    const startX = movingLeft ? fieldRect.width + 20 : -template.width - 20;
    const startY = zone.min * fieldRect.height + Math.random() * (zone.max - zone.min) * fieldRect.height;
    
    el.style.left = startX + 'px';
    el.style.top = startY + 'px';
    
    // Flip sprite if needed so the animal faces its movement direction
    // If animal image faces right and it's moving left, flip it (and vice versa)
    const needsFlip = (template.facesRight && movingLeft) || (!template.facesRight && !movingLeft);
    el.style.transform = needsFlip ? 'scaleX(-1)' : 'scaleX(1)';
    
    field.appendChild(el);
    
    const animal = {
      el,
      x: startX,
      y: startY,
      baseY: startY,
      data: template,
      dx: movingLeft ? -template.speed : template.speed,
      phase: Math.random() * Math.PI * 2,
      hit: false,
      pauseTimer: 0,
      isPaused: false,
      movingLeft,
      needsFlip,
    };
    
    animals.push(animal);
  }

  // Main animation loop
  function animate() {
    frameCount++;
    const time = frameCount / 60;
    
    for (let i = animals.length - 1; i >= 0; i--) {
      const a = animals[i];
      if (a.hit) continue;
      
      // Occasional pauses — animals stop to graze/look around
      if (!a.isPaused) {
        a.pauseTimer++;
        if (a.pauseTimer > 120 && Math.random() < 0.015) {
          a.isPaused = true;
          a.pauseTimer = 0;
          setTimeout(() => { a.isPaused = false; a.pauseTimer = 0; }, 600 + Math.random() * 1800);
        }
      }
      
      // Move horizontally (unless paused)
      if (!a.isPaused) {
        a.x += a.dx;
      }
      
      // Natural bobbing
      const bobOffset = Math.sin(time * a.data.bobSpeed + a.phase) * a.data.bobAmount;
      a.y = a.baseY + bobOffset;
      
      // Update position
      a.el.style.left = a.x + 'px';
      a.el.style.top = a.y + 'px';
      
      // Remove off-screen animals
      const fieldRect = field.getBoundingClientRect();
      if (a.x < -a.data.width - 50 || a.x > fieldRect.width + 50) {
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

  // Staggered spawn schedule
  function scheduleNextSpawn() {
    if (timeLeft <= 0) return;
    const delay = 2000 + Math.random() * 2000;
    spawnInterval = setTimeout(() => {
      spawnAnimal();
      scheduleNextSpawn();
    }, delay);
  }

  // Initial spawns
  setTimeout(() => spawnAnimal(), 600);
  setTimeout(() => spawnAnimal(), 1800);
  setTimeout(() => spawnAnimal(), 3200);
  scheduleNextSpawn();

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
