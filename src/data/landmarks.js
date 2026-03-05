// Landmarks along the Oregon Trail with distances (in miles from Independence, MO)
export const LANDMARKS = [
  { id: 'independence', name: 'Independence, MO', miles: 0, type: 'town', description: 'Your journey begins here at the bustling frontier town.', hasStore: true },
  { id: 'kansas_crossing', name: 'Kansas River Crossing', miles: 102, type: 'river', description: 'The wide Kansas River blocks your path.', riverWidth: 620, riverDepth: 4.5 },
  { id: 'alcove_spring', name: 'Alcove Spring', miles: 166, type: 'landmark', description: 'A beautiful natural spring surrounded by wildflowers and carved names.' },
  { id: 'fort_kearney', name: 'Fort Kearney', miles: 304, type: 'fort', description: 'A military outpost buzzing with soldiers and traders.', hasStore: true },
  { id: 'chimney_rock', name: 'Chimney Rock', miles: 554, type: 'landmark', description: 'The towering 300-foot spire rises from the plains like a giant finger!' },
  { id: 'fort_laramie', name: 'Fort Laramie', miles: 640, type: 'fort', description: 'A major trading post where mountain men swap wild stories.', hasStore: true },
  { id: 'independence_rock', name: 'Independence Rock', miles: 830, type: 'landmark', description: 'The "Great Register of the Desert" — thousands of names carved in stone!' },
  { id: 'south_pass', name: 'South Pass', miles: 914, type: 'landmark', description: 'The gentle gateway through the mighty Rocky Mountains.' },
  { id: 'green_river', name: 'Green River Crossing', miles: 980, type: 'river', description: 'The swift Green River rushes through a deep canyon.', riverWidth: 400, riverDepth: 12 },
  { id: 'fort_bridger', name: 'Fort Bridger', miles: 1025, type: 'fort', description: 'Jim Bridger\'s famous trading post in the mountain wilderness.', hasStore: true },
  { id: 'soda_springs', name: 'Soda Springs', miles: 1160, type: 'landmark', description: 'Magical bubbling springs that taste like fizzy soda pop!' },
  { id: 'fort_hall', name: 'Fort Hall', miles: 1210, type: 'fort', description: 'A Hudson\'s Bay Company post on the Snake River.', hasStore: true },
  { id: 'snake_river', name: 'Snake River Crossing', miles: 1330, type: 'river', description: 'The Snake River carves through a deep and dangerous canyon.', riverWidth: 1000, riverDepth: 8 },
  { id: 'fort_boise', name: 'Fort Boise', miles: 1490, type: 'fort', description: 'The last fort before the rugged Blue Mountains.', hasStore: true },
  { id: 'blue_mountains', name: 'Blue Mountains', miles: 1600, type: 'landmark', description: 'Dense forests and steep slopes test your wagon\'s strength.' },
  { id: 'the_dalles', name: 'The Dalles', miles: 1740, type: 'landmark', description: 'The mighty Columbia River gorge — almost there!' },
  { id: 'oregon_city', name: 'Oregon City, OR', miles: 1870, type: 'destination', description: '🎉 The promised land at the end of the trail! You made it!' }
];

export const TOTAL_MILES = 1870;

export function getNextLandmark(currentMiles) {
  return LANDMARKS.find(l => l.miles > currentMiles) || LANDMARKS[LANDMARKS.length - 1];
}

export function getLandmarkAtMiles(currentMiles) {
  return LANDMARKS.find(l => Math.abs(l.miles - currentMiles) < 5);
}

export function getProgress(currentMiles) {
  return Math.min(currentMiles / TOTAL_MILES, 1);
}
