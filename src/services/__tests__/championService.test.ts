import { describe, test, expect } from 'vitest'
import { championService } from '../championService'

describe('championService', () => {
  test('should return champions', async () => {
    const champions = await championService.getAllChampions()
    
    expect(champions).toBeDefined()
    expect(Array.isArray(champions)).toBe(true)
  })

  test('should generate proper image URLs', async () => {
    const imageUrl = await championService.getChampionImageUrl('Aatrox.png')
    
    expect(imageUrl).toContain('ddragon.leagueoflegends.com')
    expect(imageUrl).toContain('champion')
    expect(imageUrl).toContain('Aatrox.png')
  })

  test('should search champions by name', async () => {
    const allChampions = await championService.getAllChampions()
    const searchResults = await championService.searchChampions(allChampions, 'Aatrox')
    
    expect(Array.isArray(searchResults)).toBe(true)
    if (searchResults.length > 0) {
      expect(
        searchResults.some(champion => 
          champion.name.toLowerCase().includes('aatrox')
        )
      ).toBe(true)
    }
  })
})