export const ACHIEVEMENTS = [
  { id: 'first_steps', name: 'First Steps', icon: '👣', description: 'Begin your journey on the Oregon Trail', condition: (s) => s.milesTraveled >= 1 },
  { id: 'century', name: 'Century Club', icon: '💯', description: 'Travel 100 miles', condition: (s) => s.milesTraveled >= 100 },
  { id: 'halfway', name: 'Halfway There!', icon: '⛰️', description: 'Reach the halfway point', condition: (s) => s.milesTraveled >= 935 },
  { id: 'oregon_or_bust', name: 'Oregon or Bust!', icon: '🏆', description: 'Reach Oregon City', condition: (s) => s.milesTraveled >= 1870 },
  { id: 'sharpshooter', name: 'Sharpshooter', icon: '🎯', description: 'Get 5 hits in a single hunting trip', condition: (s) => s.huntingHighScore >= 5 },
  { id: 'big_spender', name: 'Big Spender', icon: '💰', description: 'Spend over $500 at a single store', condition: (s) => s.biggestPurchase >= 500 },
  { id: 'penny_pincher', name: 'Penny Pincher', icon: '🪙', description: 'Arrive in Oregon with over $200', condition: (s) => s.milesTraveled >= 1870 && s.money >= 200 },
  { id: 'iron_stomach', name: 'Iron Stomach', icon: '💪', description: 'Complete the journey without anyone getting dysentery', condition: (s) => s.milesTraveled >= 1870 && !s.hadDysentery },
  { id: 'river_master', name: 'River Master', icon: '🛶', description: 'Cross 3 rivers without losing any supplies', condition: (s) => s.perfectCrossings >= 3 },
  { id: 'survivor', name: 'Survivor', icon: '🏕️', description: 'Complete the journey with all party members alive', condition: (s) => s.milesTraveled >= 1870 && s.party.every(m => m.health > 0) },
  { id: 'speed_demon', name: 'Speed Demon', icon: '💨', description: 'Reach Oregon in under 120 days', condition: (s) => s.milesTraveled >= 1870 && s.daysTraveled < 120 },
  { id: 'fully_stocked', name: 'Fully Stocked', icon: '📦', description: 'Buy the maximum recommended supplies', condition: (s) => s.fullyStocked },
  { id: 'buffalo_hunter', name: 'Buffalo Hunter', icon: '🦬', description: 'Bag a buffalo during hunting', condition: (s) => s.shotBuffalo },
  { id: 'trailblazer', name: 'Trailblazer', icon: '⭐', description: 'Visit every landmark along the trail', condition: (s) => s.landmarksVisited >= 17 },
  { id: 'tough_cookie', name: 'Tough Cookie', icon: '🍪', description: 'Survive 10 negative events', condition: (s) => s.negativeEvents >= 10 },
];

export function checkAchievements(gameState, unlockedAchievements) {
  const newAchievements = [];
  for (const achievement of ACHIEVEMENTS) {
    if (!unlockedAchievements.includes(achievement.id) && achievement.condition(gameState)) {
      newAchievements.push(achievement);
    }
  }
  return newAchievements;
}
