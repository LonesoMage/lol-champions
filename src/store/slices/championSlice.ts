import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Champion, ChampionDetails, ChampionRole } from '../../types/champion';

interface ChampionState {
  champions: Champion[];
  championDetails: ChampionDetails | null;
  loading: boolean;
  error: string | null;
  selectedRoles: ChampionRole[];
  searchQuery: string;
}

const initialState: ChampionState = {
  champions: [],
  championDetails: null,
  loading: false,
  error: null,
  selectedRoles: [], // Changed to empty array
  searchQuery: '',
};

const championSlice = createSlice({
  name: 'champions',
  initialState,
  reducers: {
    setChampions: (state, action: PayloadAction<Champion[]>) => {
      state.champions = action.payload;
      state.loading = false;
      state.error = null;
    },
    setChampionDetails: (state, action: PayloadAction<ChampionDetails>) => {
      state.championDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedRoles: (state, action: PayloadAction<ChampionRole[]>) => {
      state.selectedRoles = action.payload;
    },
    toggleRole: (state, action: PayloadAction<ChampionRole>) => {
      const role = action.payload;
      if (state.selectedRoles.includes(role)) {
        state.selectedRoles = state.selectedRoles.filter(r => r !== role);
      } else {
        state.selectedRoles.push(role);
      }
    },
    clearRoles: (state) => {
      state.selectedRoles = [];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearChampionDetails: (state) => {
      state.championDetails = null;
    },
    clearAllFilters: (state) => {
      state.selectedRoles = [];
      state.searchQuery = '';
    },
  },
});

export const {
  setChampions,
  setChampionDetails,
  setLoading,
  setError,
  setSelectedRoles,
  toggleRole,
  clearRoles,
  setSearchQuery,
  clearChampionDetails,
  clearAllFilters,
} = championSlice.actions;

export default championSlice.reducer;