export const API_CONFIG = {
  DATA_DRAGON_BASE: 'https://ddragon.leagueoflegends.com',
  CDN_BASE: 'https://ddragon.leagueoflegends.com/cdn',
} as const;

export const APP_CONFIG = {
  NAME: 'LoL Champions Explorer',
  VERSION: '1.0.0',
  GITHUB_URL: 'https://github.com/YOUR_USERNAME/lol-champions',
  DEMO_URL: 'https://YOUR_USERNAME.github.io/lol-champions',
} as const;

export const CHAMPION_ROLES = [
  'Assassin',
  'Fighter', 
  'Mage',
  'Marksman',
  'Support',
  'Tank'
] as const;

export const DIFFICULTY_LABELS = {
  1: 'Very Easy',
  2: 'Easy', 
  3: 'Easy',
  4: 'Medium',
  5: 'Medium',
  6: 'Medium',
  7: 'Hard',
  8: 'Hard',
  9: 'Very Hard',
  10: 'Very Hard'
} as const;