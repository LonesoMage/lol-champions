import { describe, test, expect } from 'vitest'
import championReducer, { 
  setChampions, 
  setLoading, 
  setSelectedRoles, 
  setSearchQuery 
} from '../slices/championSlice'
import type { Champion } from '../../types/champion'

const mockChampion: Champion = {
  id: 'TestChampion',
  key: '266',
  name: 'Test Champion',
  title: 'the Test Blade',
  blurb: 'Test description',
  info: {
    attack: 8,
    defense: 4,
    magic: 3,
    difficulty: 4
  },
  image: {
    full: 'TestChampion.png',
    sprite: 'champion0.png',
    group: 'champion',
    x: 0,
    y: 0,
    w: 48,
    h: 48
  },
  tags: ['Fighter', 'Tank'],
  partype: 'Blood Well',
  stats: {
    hp: 580,
    hpperlevel: 90,
    mp: 0,
    mpperlevel: 0,
    movespeed: 345,
    armor: 38,
    armorperlevel: 3.25,
    spellblock: 32.1,
    spellblockperlevel: 1.25,
    attackrange: 175,
    hpregen: 3,
    hpregenperlevel: 1,
    mpregen: 0,
    mpregenperlevel: 0,
    crit: 0,
    critperlevel: 0,
    attackdamage: 60,
    attackdamageperlevel: 5,
    attackspeedperlevel: 2.5,
    attackspeed: 0.651
  }
}

describe('championSlice', () => {
  test('should set champions', () => {
    const initialState = {
      champions: [],
      championDetails: null,
      loading: false,
      error: null,
      selectedRoles: [],
      searchQuery: ''
    }
    const action = setChampions([mockChampion])
    const state = championReducer(initialState, action)
    
    expect(state.champions).toHaveLength(1)
    expect(state.champions[0].id).toBe('TestChampion')
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })

  test('should set loading state', () => {
    const initialState = {
      champions: [],
      championDetails: null,
      loading: false,
      error: null,
      selectedRoles: [],
      searchQuery: ''
    }
    const action = setLoading(true)
    const state = championReducer(initialState, action)
    
    expect(state.loading).toBe(true)
  })

  test('should set selected roles', () => {
    const initialState = {
      champions: [],
      championDetails: null,
      loading: false,
      error: null,
      selectedRoles: [],
      searchQuery: ''
    }
    const action = setSelectedRoles(['Fighter'])
    const state = championReducer(initialState, action)
    
    expect(state.selectedRoles).toEqual(['Fighter'])
  })

  test('should set search query', () => {
    const initialState = {
      champions: [],
      championDetails: null,
      loading: false,
      error: null,
      selectedRoles: [],
      searchQuery: ''
    }
    const action = setSearchQuery('Test Champion')
    const state = championReducer(initialState, action)
    
    expect(state.searchQuery).toBe('Test Champion')
  })
})