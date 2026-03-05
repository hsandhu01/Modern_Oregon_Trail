import { navigateTo } from '../main.js';

export function renderLandmarkScreen(container, state) {
  const landmark = state.atLandmark;
  if (!landmark) { navigateTo('travel', state); return; }

  const typeEmoji = {
    fort: '🏰',
    river: '🌊',
    landmark: '🏔️',
    town: '🏘️',
    destination: '🎉'
  };

  container.innerHTML = `
    <div class="landmark-screen">
      <div class="landmark-bg ${landmark.type}">
        <div class="landmark-clouds"></div>
      </div>
      
      <div class="landmark-content">
        <div class="landmark-card">
          <div class="landmark-badge">${typeEmoji[landmark.type] || '📍'} ${landmark.type.toUpperCase()}</div>
          <h2 class="landmark-name">${landmark.name}</h2>
          <p class="landmark-desc">${landmark.description}</p>
          <div class="landmark-miles">📏 ${landmark.miles} miles from Independence</div>
          
          <div class="landmark-actions">
            ${landmark.type === 'river' ? `
              <button class="btn btn-action" id="btn-cross-river">🌊 Cross the River</button>
            ` : ''}
            ${landmark.hasStore ? `
              <button class="btn btn-action" id="btn-visit-store">🏪 Visit the Store</button>
            ` : ''}
            <button class="btn btn-action secondary" id="btn-rest-here">🏕️ Rest Here</button>
            <button class="btn btn-primary" id="btn-continue-trail">🚐 Continue on Trail</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Animate
  setTimeout(() => {
    const card = container.querySelector('.landmark-card');
    if (card) card.classList.add('show');
  }, 200);

  // River crossing
  const crossRiverBtn = container.querySelector('#btn-cross-river');
  if (crossRiverBtn) {
    crossRiverBtn.addEventListener('click', () => {
      navigateTo('river', state);
    });
  }

  // Store
  const storeBtn = container.querySelector('#btn-visit-store');
  if (storeBtn) {
    storeBtn.addEventListener('click', () => {
      navigateTo('store', state);
    });
  }

  // Rest
  container.querySelector('#btn-rest-here').addEventListener('click', () => {
    state.isResting = true;
    state.party.forEach(m => {
      if (m.health > 0) m.health = Math.min(100, m.health + 10);
    });
    state.daysTraveled++;
    const d = new Date(state.date);
    d.setDate(d.getDate() + 1);
    state.date = d;
    navigateTo('travel', state);
  });

  // Continue
  container.querySelector('#btn-continue-trail').addEventListener('click', () => {
    navigateTo('travel', state);
  });
}
