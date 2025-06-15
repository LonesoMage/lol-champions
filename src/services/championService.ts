import axios from 'axios';
import type { Champion, ChampionDetails } from '../types/champion';

const DATA_DRAGON_BASE = 'https://ddragon.leagueoflegends.com';

// Get latest game version
const getLatestVersion = async (): Promise<string> => {
  try {
    const response = await axios.get(`${DATA_DRAGON_BASE}/api/versions.json`);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching latest version:', error);
    return '14.1.1'; // fallback version
  }
};

export const championService = {
  // Get all champions
  async getAllChampions(): Promise<Champion[]> {
    try {
      const version = await getLatestVersion();
      const response = await axios.get(
        `${DATA_DRAGON_BASE}/cdn/${version}/data/en_US/champion.json`
      );
      
      const championsData = response.data.data;
      return Object.values(championsData) as Champion[];
    } catch (error) {
      console.error('Error fetching champions:', error);
      throw new Error('Failed to fetch champions');
    }
  },

  // Get champion details
  async getChampionDetails(championName: string): Promise<ChampionDetails> {
    try {
      const version = await getLatestVersion();
      const response = await axios.get(
        `${DATA_DRAGON_BASE}/cdn/${version}/data/en_US/champion/${championName}.json`
      );
      
      const championData = response.data.data[championName];
      return championData as ChampionDetails;
    } catch (error) {
      console.error('Error fetching champion details:', error);
      throw new Error('Failed to fetch champion details');
    }
  },

  // Get champion image URL
  async getChampionImageUrl(imageName: string): Promise<string> {
    const version = await getLatestVersion();
    return `${DATA_DRAGON_BASE}/cdn/${version}/img/champion/${imageName}`;
  },

  // Get spell image URL
  async getSpellImageUrl(imageName: string): Promise<string> {
    const version = await getLatestVersion();
    return `${DATA_DRAGON_BASE}/cdn/${version}/img/spell/${imageName}`;
  },

  // Get passive image URL
  async getPassiveImageUrl(imageName: string): Promise<string> {
    const version = await getLatestVersion();
    return `${DATA_DRAGON_BASE}/cdn/${version}/img/passive/${imageName}`;
  },

  // Search champions
  searchChampions: async (champions: Champion[], query: string): Promise<Champion[]> => {
    const lowercaseQuery = query.toLowerCase();
    return champions.filter(champion => 
      champion.name.toLowerCase().includes(lowercaseQuery) ||
      champion.title.toLowerCase().includes(lowercaseQuery) ||
      champion.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  },

  // Filter by role
  filterByRole: async (champions: Champion[], role: string): Promise<Champion[]> => {
    if (role === 'all') return champions;
    return champions.filter(champion => champion.tags.includes(role));
  },
};