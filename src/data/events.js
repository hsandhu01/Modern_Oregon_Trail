// Random events that can occur during travel
export const EVENTS = [
  // ILLNESS EVENTS
  { id: 'dysentery', type: 'illness', title: '🤢 Dysentery!', description: '{name} has come down with dysentery! They look absolutely miserable.', healthLoss: 25, chance: 0.04 },
  { id: 'fever', type: 'illness', title: '🤒 Fever!', description: '{name} is burning up with a terrible fever and can barely stand.', healthLoss: 20, chance: 0.05 },
  { id: 'broken_leg', type: 'illness', title: '🦴 Broken Leg!', description: '{name} tripped over a rock and broke their leg! Ouch!', healthLoss: 15, chance: 0.03 },
  { id: 'snakebite', type: 'illness', title: '🐍 Snakebite!', description: '{name} was bitten by a rattlesnake while gathering firewood!', healthLoss: 30, chance: 0.02 },
  { id: 'cholera', type: 'illness', title: '☠️ Cholera!', description: '{name} has contracted cholera from bad water. This is serious!', healthLoss: 40, chance: 0.02 },
  { id: 'exhaustion', type: 'illness', title: '😴 Exhaustion', description: '{name} is completely worn out from the grueling pace.', healthLoss: 10, chance: 0.06 },
  { id: 'measles', type: 'illness', title: '🔴 Measles!', description: '{name} has broken out in spots — it\'s the measles!', healthLoss: 20, chance: 0.02 },

  // WAGON EVENTS
  { id: 'broken_wheel', type: 'wagon', title: '🛞 Broken Wheel!', description: 'A wagon wheel has shattered on a rock! You need a spare part to fix it.', spareParts: -1, daysLost: 1, chance: 0.04 },
  { id: 'broken_axle', type: 'wagon', title: '🪓 Broken Axle!', description: 'The wagon axle snapped in two! This is a serious problem.', spareParts: -1, daysLost: 2, chance: 0.03 },
  { id: 'broken_tongue', type: 'wagon', title: '🔧 Broken Tongue!', description: 'The wagon tongue broke! The oxen can\'t pull without it.', spareParts: -1, daysLost: 1, chance: 0.03 },

  // WEATHER EVENTS
  { id: 'thunderstorm', type: 'weather', title: '⛈️ Thunderstorm!', description: 'A massive thunderstorm rolls in with deafening thunder and blinding lightning!', daysLost: 1, chance: 0.06 },
  { id: 'blizzard', type: 'weather', title: '🌨️ Blizzard!', description: 'A howling blizzard blankets the trail in snow! Visibility is zero.', daysLost: 2, healthLoss: 10, chance: 0.03, minMonth: 10 },
  { id: 'heatwave', type: 'weather', title: '🔥 Heatwave!', description: 'The scorching sun beats down relentlessly. Everyone is drenched in sweat.', healthLoss: 5, waterLoss: 10, chance: 0.04, maxMonth: 8 },
  { id: 'fog', type: 'weather', title: '🌫️ Heavy Fog!', description: 'Thick fog rolls in and you can barely see the trail ahead.', daysLost: 1, chance: 0.04 },

  // GOOD FORTUNE
  { id: 'find_food', type: 'good', title: '🍖 Lucky Find!', description: 'You stumble upon an abandoned camp with leftover supplies!', foodGain: 30, chance: 0.03 },
  { id: 'friendly_natives', type: 'good', title: '🤝 Friendly Travelers!', description: 'Friendly travelers share tips about the trail ahead and give you supplies.', foodGain: 20, chance: 0.04 },
  { id: 'berry_patch', type: 'good', title: '🫐 Berry Patch!', description: 'You discover a huge patch of wild berries! Time for a feast!', foodGain: 15, chance: 0.05 },
  { id: 'wagon_train', type: 'good', title: '🤠 Wagon Train!', description: 'You meet another wagon train and trade stories around the campfire.', healthGain: 5, chance: 0.04 },
  { id: 'clear_water', type: 'good', title: '💧 Fresh Spring!', description: 'You find a crystal-clear spring of fresh water. Everyone drinks their fill!', healthGain: 10, chance: 0.04 },
  { id: 'wildflowers', type: 'good', title: '🌸 Wildflower Meadow!', description: 'A stunning meadow of wildflowers lifts everyone\'s spirits!', healthGain: 5, chance: 0.04 },

  // DANGER EVENTS  
  { id: 'thief', type: 'danger', title: '🦹 Thief in the Night!', description: 'Someone snuck into camp while everyone slept and stole supplies!', foodLoss: 25, chance: 0.03 },
  { id: 'wolves', type: 'danger', title: '🐺 Wolf Pack!', description: 'A pack of wolves circles your camp, howling in the moonlight!', oxenLoss: 1, chance: 0.02 },
  { id: 'stampede', type: 'danger', title: '🐂 Stampede!', description: 'Something spooked the oxen and they nearly stampeded off a cliff!', oxenLoss: 1, chance: 0.02 },
  { id: 'fire', type: 'danger', title: '🔥 Prairie Fire!', description: 'A wall of fire sweeps across the prairie! Everyone runs for cover!', foodLoss: 20, clothingLoss: 1, chance: 0.02 },
  { id: 'river_flood', type: 'danger', title: '🌊 Flash Flood!', description: 'A sudden flood sweeps through camp, carrying away supplies!', foodLoss: 30, ammoLoss: 10, chance: 0.02 },

  // SPECIAL EVENTS
  { id: 'lost_trail', type: 'special', title: '🗺️ Lost the Trail!', description: 'The trail markers have disappeared. You wander for days trying to find the way.', daysLost: 3, chance: 0.02 },
  { id: 'beautiful_sunset', type: 'special', title: '🌅 Beautiful Sunset!', description: 'The most incredible sunset you\'ve ever seen paints the sky in gold and crimson.', healthGain: 3, chance: 0.06 },
  { id: 'shooting_star', type: 'special', title: '🌠 Shooting Star!', description: '{name} spots a brilliant shooting star streaking across the night sky. Make a wish!', healthGain: 2, chance: 0.05 },
  { id: 'old_grave', type: 'special', title: '⚰️ Trailside Grave', description: 'You pass a lonely grave marker by the trail. A somber reminder of the journey\'s dangers.', chance: 0.05 },
];

export function rollForEvent(month) {
  const shuffled = [...EVENTS].sort(() => Math.random() - 0.5);
  for (const event of shuffled) {
    if (event.minMonth && month < event.minMonth) continue;
    if (event.maxMonth && month > event.maxMonth) continue;
    if (Math.random() < event.chance) {
      return event;
    }
  }
  return null;
}

export function formatEventDescription(event, partyMembers) {
  if (event.description.includes('{name}')) {
    const aliveMembers = partyMembers.filter(m => m.health > 0);
    const randomMember = aliveMembers[Math.floor(Math.random() * aliveMembers.length)];
    return event.description.replace('{name}', randomMember?.name || 'Someone');
  }
  return event.description;
}
