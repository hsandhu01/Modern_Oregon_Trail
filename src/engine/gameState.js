import { LANDMARKS, getNextLandmark, getLandmarkAtMiles, TOTAL_MILES } from '../data/landmarks.js';
import { rollForEvent, formatEventDescription } from '../data/events.js';
import { PACE_OPTIONS, RATIONS_OPTIONS } from '../data/items.js';
import { checkAchievements } from '../data/achievements.js';

const SAVE_KEY = 'oregonTrailSave';

export function createInitialState(leaderName, partyNames, profession) {
  return {
    // Party
    party: [
      { name: leaderName, health: 100, isLeader: true },
      ...partyNames.map(name => ({ name, health: 100, isLeader: false }))
    ],
    profession,

    // Supplies
    food: 0,
    ammunition: 0,
    clothing: 0,
    spareParts: 0,
    oxen: 0,
    money: profession.money,

    // Progress
    milesTraveled: 0,
    daysTraveled: 0,
    date: new Date(1848, 2, 1), // March 1, 1848
    pace: PACE_OPTIONS[0],
    rations: RATIONS_OPTIONS[0],
    isResting: false,

    // Stats
    huntingHighScore: 0,
    biggestPurchase: 0,
    hadDysentery: false,
    perfectCrossings: 0,
    shotBuffalo: false,
    fullyStocked: false,
    landmarksVisited: 0,
    negativeEvents: 0,

    // Achievement tracking
    unlockedAchievements: [],

    // Game status
    gameOver: false,
    won: false,
    currentEvent: null,
    atLandmark: LANDMARKS[0],
    visitedLandmarks: ['independence'],
    weatherEmoji: '☀️',
    messages: []
  };
}

export function advanceDay(state) {
  if (state.gameOver || state.isResting) {
    if (state.isResting) {
      // Resting heals the party
      state.party.forEach(m => {
        if (m.health > 0) {
          m.health = Math.min(100, m.health + 5);
        }
      });
      state.daysTraveled++;
      advanceDate(state);
    }
    return state;
  }

  const milesPerDay = state.pace.milesPerDay + (state.oxen > 3 ? 2 : 0);
  state.milesTraveled += milesPerDay;
  state.daysTraveled++;
  advanceDate(state);

  // Consume food
  const aliveMembers = state.party.filter(m => m.health > 0).length;
  const foodConsumed = state.rations.lbsPerDay * aliveMembers;
  state.food = Math.max(0, state.food - foodConsumed);

  // Health effects from pace
  state.party.forEach(m => {
    if (m.health > 0) {
      m.health = Math.max(0, m.health - state.pace.healthDrain);
      m.health = Math.min(100, m.health + state.rations.healthBonus);
      
      // Starvation
      if (state.food <= 0) {
        m.health -= 8;
      }

      // Clothing warmth bonus
      if (state.clothing > 0 && getMonth(state) >= 10) {
        m.health = Math.min(100, m.health + 1);
      }

      // Check for death
      if (m.health <= 0) {
        m.health = 0;
      }
    }
  });

  // Weather changes
  updateWeather(state);

  // Check for random events
  const month = getMonth(state);
  const event = rollForEvent(month);
  if (event) {
    applyEvent(state, event);
  }

  // Check for landmarks
  const landmark = getLandmarkAtMiles(state.milesTraveled);
  if (landmark && !state.visitedLandmarks.includes(landmark.id)) {
    state.atLandmark = landmark;
    state.visitedLandmarks.push(landmark.id);
    state.landmarksVisited = state.visitedLandmarks.length;
  } else {
    state.atLandmark = null;
  }

  // Check win condition
  if (state.milesTraveled >= TOTAL_MILES) {
    state.milesTraveled = TOTAL_MILES;
    state.won = true;
    state.gameOver = true;
    state.atLandmark = LANDMARKS[LANDMARKS.length - 1];
  }

  // Check lose condition — all party members dead
  if (state.party.every(m => m.health <= 0)) {
    state.gameOver = true;
    state.won = false;
  }

  // Check achievements
  const newAchievements = checkAchievements(state, state.unlockedAchievements);
  if (newAchievements.length > 0) {
    state.unlockedAchievements.push(...newAchievements.map(a => a.id));
    state.newAchievements = newAchievements;
  } else {
    state.newAchievements = [];
  }

  return state;
}

function applyEvent(state, event) {
  const desc = formatEventDescription(event, state.party);
  state.currentEvent = { ...event, description: desc };

  if (event.healthLoss) {
    const target = state.party.filter(m => m.health > 0);
    if (target.length > 0) {
      const victim = target[Math.floor(Math.random() * target.length)];
      victim.health = Math.max(0, victim.health - event.healthLoss);
      state.currentEvent.description = desc.replace('{name}', victim.name);
    }
    state.negativeEvents++;
  }
  if (event.healthGain) {
    state.party.forEach(m => {
      if (m.health > 0) m.health = Math.min(100, m.health + event.healthGain);
    });
  }
  if (event.foodLoss) { state.food = Math.max(0, state.food - event.foodLoss); state.negativeEvents++; }
  if (event.foodGain) state.food += event.foodGain;
  if (event.spareParts) {
    if (state.spareParts > 0) {
      state.spareParts += event.spareParts;
      state.currentEvent.description += ' You used a spare part to fix it.';
    } else {
      state.currentEvent.description += ' You don\'t have any spare parts! You lost extra days.';
    }
    state.negativeEvents++;
  }
  if (event.ammoLoss) { state.ammunition = Math.max(0, state.ammunition - event.ammoLoss); state.negativeEvents++; }
  if (event.oxenLoss) { state.oxen = Math.max(0, state.oxen - event.oxenLoss); state.negativeEvents++; }
  if (event.clothingLoss) { state.clothing = Math.max(0, state.clothing - event.clothingLoss); state.negativeEvents++; }
  if (event.id === 'dysentery') state.hadDysentery = true;
}

function advanceDate(state) {
  const d = new Date(state.date);
  d.setDate(d.getDate() + 1);
  state.date = d;
}

function getMonth(state) {
  return new Date(state.date).getMonth() + 1;
}

function updateWeather(state) {
  const month = getMonth(state);
  const roll = Math.random();
  if (month >= 11 || month <= 2) {
    state.weatherEmoji = roll < 0.3 ? '🌨️' : roll < 0.6 ? '☁️' : '❄️';
  } else if (month >= 6 && month <= 8) {
    state.weatherEmoji = roll < 0.5 ? '☀️' : roll < 0.7 ? '⛅' : '⛈️';
  } else {
    state.weatherEmoji = roll < 0.4 ? '☀️' : roll < 0.7 ? '⛅' : roll < 0.85 ? '🌧️' : '🌈';
  }
}

export function saveGame(state) {
  const saveData = { ...state, date: new Date(state.date).toISOString() };
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

export function loadGame() {
  const data = localStorage.getItem(SAVE_KEY);
  if (!data) return null;
  const state = JSON.parse(data);
  state.date = new Date(state.date);
  // Restore pace and rations objects
  state.pace = PACE_OPTIONS.find(p => p.id === state.pace.id) || PACE_OPTIONS[0];
  state.rations = RATIONS_OPTIONS.find(r => r.id === state.rations.id) || RATIONS_OPTIONS[0];
  return state;
}

export function hasSavedGame() {
  return localStorage.getItem(SAVE_KEY) !== null;
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function calculateScore(state) {
  let score = 0;
  // Points for surviving members
  state.party.forEach(m => {
    if (m.health > 0) score += 200;
    score += m.health;
  });
  // Points for remaining supplies
  score += state.food;
  score += state.ammunition * 5;
  score += state.money;
  // Bonus for speed
  if (state.daysTraveled < 120) score += 500;
  else if (state.daysTraveled < 150) score += 200;
  // Profession multiplier
  score *= state.profession.scoreMultiplier;
  return Math.round(score);
}
