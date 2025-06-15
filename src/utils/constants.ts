export const RIOT_API_ENDPOINTS = {
  DATA_DRAGON_BASE: 'https://ddragon.leagueoflegends.com',
  VERSIONS: 'https://ddragon.leagueoflegends.com/api/versions.json',
  CHAMPIONS_DATA: (version: string) => 
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
  CHAMPION_DETAILS: (version: string, championName: string) => 
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championName}.json`,
  CHAMPION_IMAGE: (version: string, imageName: string) => 
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${imageName}`,
  SPELL_IMAGE: (version: string, imageName: string) => 
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${imageName}`,
  PASSIVE_IMAGE: (version: string, imageName: string) => 
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${imageName}`,
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
