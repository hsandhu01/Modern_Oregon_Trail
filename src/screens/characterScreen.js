import { createInitialState } from '../engine/gameState.js';
import { PROFESSIONS } from '../data/items.js';
import { navigateTo, setGameState } from '../main.js';

const DEFAULT_NAMES = ['Sarah', 'Benjamin', 'Emma', 'William'];

export function renderCharacterScreen(container) {
  let selectedProfession = PROFESSIONS[0];
  
  container.innerHTML = `
    <div class="character-screen">
      <div class="screen-bg-gradient"></div>
      
      <div class="character-content">
        <div class="step-indicator">
          <div class="step active" id="step1-dot"><span>1</span> Profession</div>
          <div class="step-line"></div>
          <div class="step" id="step2-dot"><span>2</span> Party</div>
        </div>
        
        <!-- Step 1: Profession -->
        <div class="character-step" id="step-profession">
          <h2 class="section-title">Choose Your Profession</h2>
          <p class="section-desc">Your profession determines your starting money and score bonus.</p>
          
          <div class="profession-cards">
            ${PROFESSIONS.map((prof, i) => `
              <div class="profession-card ${i === 0 ? 'selected' : ''}" data-profession="${prof.id}">
                <div class="prof-icon">${prof.icon}</div>
                <h3>${prof.name}</h3>
                <p class="prof-desc">${prof.description}</p>
                <div class="prof-money">💰 $${prof.money}</div>
              </div>
            `).join('')}
          </div>
          
          <button class="btn btn-primary btn-glow" id="btn-to-party">
            Next: Name Your Party <span class="btn-arrow">→</span>
          </button>
        </div>
        
        <!-- Step 2: Party Names -->
        <div class="character-step hidden" id="step-party">
          <h2 class="section-title">Name Your Party</h2>
          <p class="section-desc">Choose names for your wagon party of 5 brave pioneers.</p>
          
          <div class="party-form">
            <div class="party-member leader">
              <div class="member-badge">⭐ Leader</div>
              <div class="member-input-wrap">
                <span class="member-icon">🤠</span>
                <input type="text" class="member-input" id="name-leader" placeholder="Your Name" maxlength="15" value="" />
              </div>
            </div>
            ${[0,1,2,3].map(i => `
              <div class="party-member">
                <div class="member-badge">Pioneer ${i+1}</div>
                <div class="member-input-wrap">
                  <span class="member-icon">${['👩','👦','👧','👨'][i]}</span>
                  <input type="text" class="member-input" id="name-${i}" placeholder="${DEFAULT_NAMES[i]}" maxlength="15" value="" />
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="party-buttons">
            <button class="btn btn-ghost" id="btn-back-prof">← Back</button>
            <button class="btn btn-primary btn-glow" id="btn-start-journey">
              🚐 Start Your Journey!
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Profession selection
  const cards = container.querySelectorAll('.profession-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedProfession = PROFESSIONS.find(p => p.id === card.dataset.profession);
    });
  });

  // Step navigation
  container.querySelector('#btn-to-party').addEventListener('click', () => {
    container.querySelector('#step-profession').classList.add('hidden');
    container.querySelector('#step-party').classList.remove('hidden');
    container.querySelector('#step1-dot').classList.remove('active');
    container.querySelector('#step2-dot').classList.add('active');
    container.querySelector('#name-leader').focus();
  });

  container.querySelector('#btn-back-prof').addEventListener('click', () => {
    container.querySelector('#step-party').classList.add('hidden');
    container.querySelector('#step-profession').classList.remove('hidden');
    container.querySelector('#step2-dot').classList.remove('active');
    container.querySelector('#step1-dot').classList.add('active');
  });

  // Start journey
  container.querySelector('#btn-start-journey').addEventListener('click', () => {
    const leaderName = container.querySelector('#name-leader').value.trim() || 'Pioneer';
    const partyNames = [0,1,2,3].map(i => {
      return container.querySelector(`#name-${i}`).value.trim() || DEFAULT_NAMES[i];
    });

    const state = createInitialState(leaderName, partyNames, selectedProfession);
    setGameState(state);
    navigateTo('store', state);
  });
}
