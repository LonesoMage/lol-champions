import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { ChampionsPage } from './pages/ChampionsPage';
import { ChampionDetailsPage } from './pages/ChampionDetailsPage';
import { ErrorBoundary } from './components/UI/ErrorBoundary';
import './index.css';

const basename = import.meta.env.PROD ? '/lol-champions' : '';

function App() {
  return (
    <ErrorBoundary>
      <Router basename={basename}>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/champions" element={<ChampionsPage />} />
              <Route path="/champion/:id" element={<ChampionDetailsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;