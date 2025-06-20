import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { HomePage } from '../HomePage'
import championSlice from '../../store/slices/championSlice'

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: { champions: championSlice }
  })
  
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

describe('HomePage', () => {
  test('renders hero section', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('Discover Champions')).toBeInTheDocument()
    expect(screen.getByText('Explore All Champions')).toBeInTheDocument()
  })
})