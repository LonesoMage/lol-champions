import { describe, test, expect, vi } from 'vitest'
import axios from 'axios'
import { championService } from '../championService'

vi.mock('axios')

describe('championService', () => {
  test('getAllChampions returns champions array', async () => {
    const mockData = {
      data: {
        data: {
          Aatrox: { id: 'Aatrox', name: 'Aatrox' },
          Ahri: { id: 'Ahri', name: 'Ahri' }
        }
      }
    }
    
    vi.mocked(axios.get).mockResolvedValueOnce({ data: ['14.1.1'] })
    vi.mocked(axios.get).mockResolvedValueOnce(mockData)
    
    const champions = await championService.getAllChampions()
    expect(champions).toHaveLength(2)
    expect(champions[0].name).toBe('Aatrox')
  })
})