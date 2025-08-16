export const quotes = [
  'Love is not what you say. Love is what you do. 💞',
  'Together is our favorite place to be. 🏡',
  'Small tasks, big love. Every step counts. 💖',
  'You + Me = Better. Keep going! 🌟',
  'Teamwork makes the dream work. 💑'
];

export function quoteOfDay() {
  const d = new Date();
  const idx = (d.getFullYear() + d.getMonth() + d.getDate()) % quotes.length;
  return quotes[idx];
}
