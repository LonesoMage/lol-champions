import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChampionCard } from '../components/UI/ChampionCard';
import { Button } from '../components/UI/Button';
import { useAppDispatch } from '../hooks/redux';
import { setLoading, setError } from '../store/slices/championSlice';
import { championService } from '../services/championService';
import type { Champion } from '../types/champion';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #e8eaf6;
  padding: 120px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="swords" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><text x="50" y="50" font-size="30" text-anchor="middle" fill="rgba(63,81,181,0.1)">⚔️</text></pattern></defs><rect width="1000" height="1000" fill="url(%23swords)"/></svg>');
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 72px;
  font-weight: 800;
  margin-bottom: 24px;
  background: linear-gradient(45deg, #3f51b5, #7986cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const HeroButton = styled(Button)`
  background: linear-gradient(45deg, #3f51b5, #7986cb);
  border: none;
  color: white;
  padding: 20px 40px;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 8px 32px rgba(63, 81, 181, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(63, 81, 181, 0.4);
  }
`;

const FeaturesSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(180deg, #16213e 0%, #0f3460 100%);
  width: 100%;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const SectionTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: #e8eaf6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  border: 2px solid #3f51b5;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    border-color: #5c6bc0;
    box-shadow: 0 20px 40px rgba(63, 81, 181, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #e8eaf6;
`;

const FeatureDescription = styled.p`
  color: #b0bec5;
  line-height: 1.6;
`;

const FeaturedSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%);
  width: 100%;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
`;

const ViewAllButton = styled(Button)`
  margin: 60px auto 0;
  display: block;
  background: linear-gradient(45deg, #3f51b5, #7986cb);
  color: white;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 700;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 48px;
  font-size: 18px;
  color: #7986cb;
`;

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoadingState] = useState(false);
  const [featuredChampions, setFeaturedChampions] = useState<Champion[]>([]);

  const loadFeaturedChampions = useCallback(async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const champions = await championService.getAllChampions();
      // Вибираємо випадкових 6 чемпіонів як featured
      const shuffled = champions.sort(() => 0.5 - Math.random());
      setFeaturedChampions(shuffled.slice(0, 6));
    } catch (error) {
      console.error('Error loading featured champions:', error);
      dispatch(setError('Error loading featured champions'));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadFeaturedChampions();
  }, [loadFeaturedChampions]);

  const handleViewDetails = (id: string) => {
    navigate(`/champion/${id}`);
  };

  const handleViewChampions = () => {
    navigate('/champions');
  };

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Discover Champions</HeroTitle>
          <HeroSubtitle>
            Explore the diverse roster of League of Legends champions. 
            Learn about their abilities, stats, and find your perfect playstyle.
          </HeroSubtitle>
          <HeroButton onClick={handleViewChampions}>
            Explore All Champions
          </HeroButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionContainer>
          <SectionTitle>Why Use Champion Explorer?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Detailed Stats</FeatureTitle>
              <FeatureDescription>
                View comprehensive champion statistics including attack, defense, magic power, and difficulty ratings.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>⚔️</FeatureIcon>
              <FeatureTitle>Abilities & Spells</FeatureTitle>
              <FeatureDescription>
                Explore each champion's unique abilities, passive skills, and ultimate powers with detailed descriptions.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🔍</FeatureIcon>
              <FeatureTitle>Easy Search</FeatureTitle>
              <FeatureDescription>
                Find champions by name, role, or playstyle with our intuitive search and filtering system.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </SectionContainer>
      </FeaturesSection>

      <FeaturedSection>
        <SectionContainer>
          <SectionTitle>Featured Champions</SectionTitle>
          {loading ? (
            <LoadingSpinner>Loading featured champions...</LoadingSpinner>
          ) : (
            <>
              <FeaturedGrid>
                {featuredChampions.map(champion => (
                  <ChampionCard
                    key={champion.id}
                    champion={champion}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </FeaturedGrid>
              <ViewAllButton onClick={handleViewChampions}>
                View All Champions
              </ViewAllButton>
            </>
          )}
        </SectionContainer>
      </FeaturedSection>
    </Container>
  );
};