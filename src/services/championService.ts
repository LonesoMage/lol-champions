import axios from 'axios';
import type { Champion, ChampionDetails } from '../types/champion';

const RIOT_API_KEY = 'RGAPI-486450b9-af97-4c26-900e-ecb19de36ba3';
const DATA_DRAGON_BASE = 'https://ddragon.leagueoflegends.com';

// Спочатку отримуємо актуальну версію гри
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
  // Отримати всіх чемпіонів
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

  // Отримати детальну інформацію про чемпіона
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

  // Отримати URL для зображення чемпіона
  async getChampionImageUrl(imageName: string): Promise<string> {
    const version = await getLatestVersion();
    return `${DATA_DRAGON_BASE}/cdn/${version}/img/champion/${imageName}`;
  },

  // Отримати URL для зображення здібності
  async getSpellImageUrl(imageName: string): Promise<string> {
    const version = await getLatestVersion();
    return `${DATA_DRAGON_BASE}/cdn/${version}/img/spell/${imageName}`;
  },

  // Отримати URL для зображення пасивної здібності
  async getPassiveImageUrl(imageName: string): Promise<string> {
    const version = await getLatestVersion();
    return `${DATA_DRAGON_BASE}/cdn/${version}/img/passive/${imageName}`;
  },

  // Пошук чемпіонів
  searchChampions: async (champions: Champion[], query: string): Promise<Champion[]> => {
    const lowercaseQuery = query.toLowerCase();
    return champions.filter(champion => 
      champion.name.toLowerCase().includes(lowercaseQuery) ||
      champion.title.toLowerCase().includes(lowercaseQuery) ||
      champion.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  },

  // Фільтрація за роллю
  filterByRole: async (champions: Champion[], role: string): Promise<Champion[]> => {
    if (role === 'all') return champions;
    return champions.filter(champion => champion.tags.includes(role));
  },
};