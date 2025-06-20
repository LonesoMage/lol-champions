import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { ChampionCard } from '../ChampionCard'

const mockChampion = {
  id: 'Aatrox',
  name: 'Aatrox',
  title: 'The Darkin Blade',
  blurb: 'Test description',
  image: { full: 'Aatrox.png' },
  tags: ['Fighter', 'Tank'],
  info: { attack: 8, defense: 4, magic: 3, difficulty: 4 }
}

describe('ChampionCard', () => {
  test('renders champion information', () => {
    render(<ChampionCard champion={mockChampion} />)
    expect(screen.getByText('Aatrox')).toBeInTheDocument()
    expect(screen.getByText('The Darkin Blade')).toBeInTheDocument()
  })

  test('calls onViewDetails when button clicked', () => {
    const handleViewDetails = vi.fn()
    render(<ChampionCard champion={mockChampion} onViewDetails={handleViewDetails} />)
    
    fireEvent.click(screen.getByText('View Details'))
    expect(handleViewDetails).toHaveBeenCalledWith('Aatrox')
  })
})