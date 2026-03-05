import { navigateTo } from '../main.js';

export function renderEventScreen(container, state) {
  const event = state.currentEvent;
  if (!event) { navigateTo('travel', state); return; }

  const isGood = event.type === 'good' || event.type === 'special';
  const bgClass = isGood ? 'event-good' : 'event-bad';

  container.innerHTML = `
    <div class="event-screen ${bgClass}">
      <div class="event-overlay"></div>
      
      <div class="event-card">
        <div class="event-card-glow ${bgClass}"></div>
        <div class="event-title-icon">${event.title.split(' ')[0]}</div>
        <h2 class="event-title">${event.title.substring(event.title.indexOf(' ') + 1)}</h2>
        <p class="event-description">${event.description}</p>
        
        <div class="event-effects">
          ${event.healthLoss ? `<div class="effect bad">❤️ -${event.healthLoss} Health</div>` : ''}
          ${event.healthGain ? `<div class="effect good">❤️ +${event.healthGain} Health</div>` : ''}
          ${event.foodLoss ? `<div class="effect bad">🥩 -${event.foodLoss} Food</div>` : ''}
          ${event.foodGain ? `<div class="effect good">🥩 +${event.foodGain} Food</div>` : ''}
          ${event.daysLost ? `<div class="effect bad">📅 -${event.daysLost} Days</div>` : ''}
          ${event.spareParts ? `<div class="effect bad">🔧 -1 Spare Part</div>` : ''}
          ${event.ammoLoss ? `<div class="effect bad">🔫 -${event.ammoLoss} Ammo</div>` : ''}
          ${event.oxenLoss ? `<div class="effect bad">🐂 -${event.oxenLoss} Oxen</div>` : ''}
          ${event.clothingLoss ? `<div class="effect bad">👕 -${event.clothingLoss} Clothing</div>` : ''}
        </div>
        
        <button class="btn btn-primary" id="btn-event-continue">Continue Journey →</button>
      </div>
    </div>
  `;

  // Animate card entrance
  setTimeout(() => {
    const card = container.querySelector('.event-card');
    if (card) card.classList.add('show');
  }, 100);

  container.querySelector('#btn-event-continue').addEventListener('click', () => {
    state.currentEvent = null;
    
    // Check if we hit a landmark too
    if (state.atLandmark && !state.gameOver) {
      navigateTo('landmark', state);
    } else if (state.gameOver) {
      navigateTo('gameover', state);
    } else {
      navigateTo('travel', state);
    }
  });
}
