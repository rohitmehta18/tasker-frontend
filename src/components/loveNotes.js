export const loveNotes = [
  'Great job love! Proud of you 💖',
  'You\'re amazing! Keep it up 🌟',
  'Every task you complete brings us closer! 💑',
  'Your effort inspires me! 💪',
  'High-five, sweetheart! 🖐️💞'
];

export function randomLoveNote() {
  return loveNotes[Math.floor(Math.random() * loveNotes.length)];
}
