// Store items and pricing
export const ITEMS = {
  food: {
    name: 'Food',
    icon: '🥩',
    unit: 'lbs',
    price: 0.20,
    description: 'Bacon, flour, beans, and dried fruit. You\'ll need about 200 lbs per person.',
    recommended: 200
  },
  ammunition: {
    name: 'Ammunition',
    icon: '🔫',
    unit: 'boxes',
    price: 2.00,
    description: 'Each box has 20 bullets. Great for hunting game on the trail.',
    recommended: 5
  },
  clothing: {
    name: 'Clothing',
    icon: '👕',
    unit: 'sets',
    price: 10.00,
    description: 'Sets of warm, sturdy clothes. Essential for cold mountain passes.',
    recommended: 2
  },
  spareParts: {
    name: 'Spare Parts',
    icon: '🔧',
    unit: 'sets',
    price: 10.00,
    description: 'Wagon wheels, axles, and tongues. Breakdowns are common!',
    recommended: 3
  },
  oxen: {
    name: 'Oxen',
    icon: '🐂',
    unit: 'yoke',
    price: 40.00,
    description: 'A yoke of 2 oxen to pull your wagon. More oxen = faster travel.',
    recommended: 3
  }
};

export const PROFESSIONS = [
  {
    id: 'banker',
    name: 'Banker from Boston',
    icon: '🎩',
    money: 1600,
    description: 'Plenty of money but no trail skills. Points multiplier: x1',
    scoreMultiplier: 1
  },
  {
    id: 'carpenter',
    name: 'Carpenter from Ohio',
    icon: '🪚',
    money: 800,
    description: 'Some money and wagon repair skills. Points multiplier: x2',
    scoreMultiplier: 2,
    bonus: 'repairBonus'
  },
  {
    id: 'farmer',
    name: 'Farmer from Illinois',
    icon: '🌾',
    money: 400,
    description: 'Less money but great survival skills. Points multiplier: x3',
    scoreMultiplier: 3,
    bonus: 'foodBonus'
  }
];

export const PACE_OPTIONS = [
  { id: 'steady', name: 'Steady', milesPerDay: 14, healthDrain: 0, description: 'A comfortable pace. Your party stays healthy.' },
  { id: 'strenuous', name: 'Strenuous', milesPerDay: 18, healthDrain: 2, description: 'A hard push. Gets tiring after a while.' },
  { id: 'grueling', name: 'Grueling', milesPerDay: 22, healthDrain: 5, description: 'Breakneck speed! Very hard on your party.' }
];

export const RATIONS_OPTIONS = [
  { id: 'filling', name: 'Filling', lbsPerDay: 3, healthBonus: 2, description: 'Plenty to eat! Everyone stays strong.' },
  { id: 'meager', name: 'Meager', lbsPerDay: 2, healthBonus: 0, description: 'Just enough to keep going.' },
  { id: 'bare_bones', name: 'Bare Bones', lbsPerDay: 1, healthBonus: -2, description: 'Barely a bite. People will get weak.' }
];
