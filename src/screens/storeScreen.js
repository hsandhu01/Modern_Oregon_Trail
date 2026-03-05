import { ITEMS } from '../data/items.js';
import { navigateTo } from '../main.js';

export function renderStoreScreen(container, state) {
  const cart = { food: 0, ammunition: 0, clothing: 0, spareParts: 0, oxen: 0 };
  let totalSpent = 0;
  
  const isInitialStore = state.milesTraveled === 0;

  function updateTotal() {
    totalSpent = Object.entries(cart).reduce((sum, [key, qty]) => {
      return sum + qty * ITEMS[key].price;
    }, 0);
    const totalEl = container.querySelector('#cart-total');
    const remainingEl = container.querySelector('#cart-remaining');
    if (totalEl) totalEl.textContent = `$${totalSpent.toFixed(2)}`;
    if (remainingEl) {
      const remaining = state.money - totalSpent;
      remainingEl.textContent = `$${remaining.toFixed(2)}`;
      remainingEl.classList.toggle('low-money', remaining < 50);
    }
  }

  container.innerHTML = `
    <div class="store-screen">
      <div class="screen-bg-gradient store-bg"></div>
      
      <div class="store-content">
        <div class="store-header">
          <div class="store-sign">
            <h2>🏪 Matt's General Store</h2>
            <p>${isInitialStore ? 'Stock up before you hit the trail!' : 'Welcome back, traveler!'}</p>
          </div>
          <div class="money-display">
            <div class="money-label">Your Money</div>
            <div class="money-amount">💰 $${state.money.toFixed(2)}</div>
          </div>
        </div>
        
        <div class="store-items">
          ${Object.entries(ITEMS).map(([key, item]) => `
            <div class="store-item-card" data-item="${key}">
              <div class="item-header">
                <span class="item-icon">${item.icon}</span>
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price.toFixed(2)}/${item.unit}</span>
              </div>
              <p class="item-desc">${item.description}</p>
              <div class="item-controls">
                <button class="qty-btn minus" data-item="${key}" data-dir="-1">−</button>
                <div class="qty-display">
                  <span class="qty-value" id="qty-${key}">0</span>
                  <span class="qty-unit">${item.unit}</span>
                </div>
                <button class="qty-btn plus" data-item="${key}" data-dir="1">+</button>
              </div>
              ${isInitialStore ? `<div class="item-recommended">Recommended: ${item.recommended} ${item.unit}</div>` : ''}
            </div>
          `).join('')}
        </div>
        
        <div class="store-cart">
          <div class="cart-summary">
            <div class="cart-row">
              <span>Total Cost:</span>
              <span class="cart-value" id="cart-total">$0.00</span>
            </div>
            <div class="cart-row">
              <span>Remaining:</span>
              <span class="cart-value" id="cart-remaining">$${state.money.toFixed(2)}</span>
            </div>
          </div>
          <button class="btn btn-primary btn-glow" id="btn-purchase">
            ${isInitialStore ? '🚐 Hit the Trail!' : '✅ Done Shopping'}
          </button>
        </div>
      </div>
    </div>
  `;

  // Quantity controls
  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      const dir = parseInt(btn.dataset.dir);
      const step = item === 'food' ? 50 : 1;
      const newQty = cart[item] + (dir * step);
      
      if (newQty < 0) return;
      
      const newTotal = totalSpent + (dir * step * ITEMS[item].price);
      if (newTotal > state.money) return;
      
      cart[item] = newQty;
      container.querySelector(`#qty-${item}`).textContent = newQty;
      updateTotal();
      
      // Animate
      const display = container.querySelector(`#qty-${item}`);
      display.classList.add('qty-bump');
      setTimeout(() => display.classList.remove('qty-bump'), 200);
    });
  });

  // Purchase
  container.querySelector('#btn-purchase').addEventListener('click', () => {
    state.food += cart.food;
    state.ammunition += cart.ammunition;
    state.clothing += cart.clothing;
    state.spareParts += cart.spareParts;
    state.oxen += cart.oxen;
    state.money -= totalSpent;
    
    if (totalSpent > state.biggestPurchase) state.biggestPurchase = totalSpent;
    
    // Check fully stocked
    if (cart.food >= 1000 && cart.ammunition >= 5 && cart.clothing >= 10 && cart.spareParts >= 3 && cart.oxen >= 3) {
      state.fullyStocked = true;
    }
    
    navigateTo('travel', state);
  });
}
