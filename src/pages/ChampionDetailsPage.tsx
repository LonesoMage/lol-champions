import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { ChampionDetails } from '../types/champion';
import { Button } from '../components/UI/Button';
import { useAppDispatch } from '../hooks/redux';
import { setChampionDetails, setLoading, setError, clearChampionDetails } from '../store/slices/championSlice';
import { championService } from '../services/championService';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 20px;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
`;

const BackButton = styled(Button)`
  margin-bottom: 24px;
`;

const ChampionGrid = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 48px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const ImageSection = styled.div``;

const ChampionImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  border: 3px solid #3f51b5;
  box-shadow: 0 8px 32px rgba(63, 81, 181, 0.3);
`;

const InfoSection = styled.div``;

const ChampionName = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #e8eaf6;
  background: linear-gradient(45deg, #3f51b5, #7986cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ChampionTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 16px 0;
  color: #7986cb;
  font-style: italic;
`;

const RolesContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const RoleBadge = styled.span`
  padding: 6px 12px;
  background: linear-gradient(45deg, #3f51b5, #7986cb);
  color: white;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
  padding: 24px;
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  border: 2px solid #3f51b5;
  border-radius: 12px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #7986cb;
  margin-bottom: 8px;
  font-weight: 600;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #e8eaf6;
`;

const StatBar = styled.div<{ value: number }>`
  width: 100%;
  height: 8px;
  background: #263238;
  border-radius: 4px;
  margin-top: 8px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => (props.value / 10) * 100}%;
    background: linear-gradient(90deg, #3f51b5, #7986cb);
    border-radius: 4px;
  }
`;

const LoreSection = styled.div`
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  padding: 32px;
  border-radius: 16px;
  border: 2px solid #3f51b5;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: #e8eaf6;
`;

const LoreText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #b0bec5;
`;

const AbilitiesSection = styled.div`
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  padding: 32px;
  border-radius: 16px;
  border: 2px solid #3f51b5;
  margin-bottom: 32px;
`;

const AbilitiesGrid = styled.div`
  display: grid;
  gap: 24px;
`;

const AbilityCard = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 24px;
  border-radius: 12px;
  border: 2px solid #3f51b5;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: #5c6bc0;
  }
`;

const AbilityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const AbilityIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 2px solid #3f51b5;
`;

const AbilityInfo = styled.div`
  flex: 1;
`;

const AbilityName = styled.h4`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #e8eaf6;
`;

const AbilityType = styled.span`
  font-size: 12px;
  color: #7986cb;
  text-transform: uppercase;
  font-weight: 600;
`;

const AbilityCooldownInfo = styled.div`
  color: #b0bec5;
  font-size: 14px;
`;

const AbilityDescription = styled.p`
  color: #b0bec5;
  line-height: 1.6;
  margin: 0;
`;

const DetailedStatsSection = styled.div`
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  padding: 32px;
  border-radius: 16px;
  border: 2px solid #3f51b5;
`;

const DetailedStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const DetailedStatItem = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #3f51b5;
`;

const DetailedStatLabel = styled.div`
  font-size: 12px;
  color: #7986cb;
  margin-bottom: 4px;
  font-weight: 600;
`;

const DetailedStatValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #e8eaf6;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 48px;
  font-size: 18px;
  color: #7986cb;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 48px;
  font-size: 18px;
  color: #f44336;
  background: rgba(244, 67, 54, 0.1);
  border: 2px solid rgba(244, 67, 54, 0.3);
  border-radius: 12px;
`;

export const ChampionDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [champion, setChampion] = useState<ChampionDetails | null>(null);
  const [loading, setLoadingState] = useState(true);
  const [error, setErrorState] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<{
    champion: string;
    passive: string;
    spells: string[];
  }>({
    champion: '',
    passive: '',
    spells: []
  });

  // Helper function to clean HTML descriptions
  const cleanDescription = (description: string): string => {
    return description
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  };

  useEffect(() => {
    const loadChampion = async () => {
      if (!id) {
        setErrorState('Champion ID not provided');
        setLoadingState(false);
        return;
      }

      try {
        setLoadingState(true);
        dispatch(setLoading(true));
        
        const data = await championService.getChampionDetails(id);
        if (data) {
          setChampion(data);
          dispatch(setChampionDetails(data));
          
          // Load image URLs
          const championImageUrl = await championService.getChampionImageUrl(data.image.full);
          const passiveImageUrl = await championService.getPassiveImageUrl(data.passive.image.full);
          const spellImageUrls = await Promise.all(
            data.spells.map(spell => championService.getSpellImageUrl(spell.image.full))
          );
          
          setImageUrls({
            champion: championImageUrl,
            passive: passiveImageUrl,
            spells: spellImageUrls
          });
        } else {
          setErrorState('Champion not found');
        }
      } catch (err) {
        console.error('Error loading champion:', err);
        setErrorState('Error loading champion details');
        dispatch(setError('Error loading champion details'));
      } finally {
        setLoadingState(false);
        dispatch(setLoading(false));
      }
    };

    loadChampion();
    
    return () => {
      dispatch(clearChampionDetails());
    };
  }, [id, dispatch]);

  const handleBack = () => {
    navigate('/champions');
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading champion details...</LoadingSpinner>
      </Container>
    );
  }

  if (error || !champion) {
    return (
      <Container>
        <ErrorMessage>
          {error || 'Champion not found'}
          <br />
          <Button onClick={handleBack} style={{ marginTop: '16px' }}>
            Back to Champions
          </Button>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton variant="outline" onClick={handleBack}>
        ← Back to Champions
      </BackButton>

      <ChampionGrid>
        <ImageSection>
          <ChampionImage 
            src={imageUrls.champion} 
            alt={champion.name}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </ImageSection>

        <InfoSection>
          <ChampionName data-testid="champion-name">{champion.name}</ChampionName>
          <ChampionTitle data-testid="champion-title">{champion.title}</ChampionTitle>

          <RolesContainer>
            {champion.tags.map(tag => (
              <RoleBadge key={tag}>{tag}</RoleBadge>
            ))}
          </RolesContainer>

          <StatsGrid>
            <StatItem>
              <StatLabel>Attack</StatLabel>
              <StatValue>{champion.info.attack}/10</StatValue>
              <StatBar value={champion.info.attack} />
            </StatItem>
            <StatItem>
              <StatLabel>Defense</StatLabel>
              <StatValue>{champion.info.defense}/10</StatValue>
              <StatBar value={champion.info.defense} />
            </StatItem>
            <StatItem>
              <StatLabel>Magic</StatLabel>
              <StatValue>{champion.info.magic}/10</StatValue>
              <StatBar value={champion.info.magic} />
            </StatItem>
            <StatItem>
              <StatLabel>Difficulty</StatLabel>
              <StatValue>{champion.info.difficulty}/10</StatValue>
              <StatBar value={champion.info.difficulty} />
            </StatItem>
          </StatsGrid>
        </InfoSection>
      </ChampionGrid>

      <LoreSection>
        <SectionTitle>Champion Lore</SectionTitle>
        <LoreText data-testid="champion-lore">
          {cleanDescription(champion.lore)}
        </LoreText>
      </LoreSection>

      <AbilitiesSection data-testid="abilities-section">
      <SectionTitle>Abilities</SectionTitle>
      <AbilitiesGrid>
        <AbilityCard data-testid="ability-card">
          <AbilityHeader>
            <AbilityIcon 
              src={imageUrls.passive} 
              alt={champion.passive.name}
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
            <AbilityInfo>
              <AbilityName>{champion.passive.name}</AbilityName>
              <AbilityType>Passive</AbilityType>
            </AbilityInfo>
          </AbilityHeader>
          <AbilityDescription>
            {cleanDescription(champion.passive.description)}
          </AbilityDescription>
        </AbilityCard>

        {champion.spells.map((spell, index) => (
          <AbilityCard key={spell.id} data-testid="ability-card">
            <AbilityHeader>
              <AbilityIcon 
                src={imageUrls.spells[index]} 
                alt={spell.name}
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              <AbilityInfo>
                <AbilityName>{spell.name}</AbilityName>
                <AbilityType>
                  {index === 3 ? 'Ultimate' : `Ability ${['Q', 'W', 'E', 'R'][index]}`}
                </AbilityType>
              </AbilityInfo>
              <AbilityCooldownInfo>
                {spell.cooldownBurn && `Cooldown: ${spell.cooldownBurn}s`}
                {spell.costBurn && ` | Cost: ${spell.costBurn}`}
              </AbilityCooldownInfo>
            </AbilityHeader>
            <AbilityDescription>
              {cleanDescription(spell.description)}
            </AbilityDescription>
          </AbilityCard>
        ))}
      </AbilitiesGrid>
    </AbilitiesSection>

    <DetailedStatsSection data-testid="stats-section">
      <SectionTitle>Detailed Statistics</SectionTitle>
      <DetailedStatsGrid>
        <DetailedStatItem>
          <DetailedStatLabel>Health</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.hp}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Health per Level</DetailedStatLabel>
          <DetailedStatValue>+{champion.stats.hpperlevel}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Mana</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.mp}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Mana per Level</DetailedStatLabel>
          <DetailedStatValue>+{champion.stats.mpperlevel}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Movement Speed</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.movespeed}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Armor</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.armor}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Magic Resist</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.spellblock}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Attack Damage</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.attackdamage}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Attack Speed</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.attackspeed.toFixed(3)}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Attack Range</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.attackrange}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Health Regeneration</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.hpregen}</DetailedStatValue>
        </DetailedStatItem>
        <DetailedStatItem>
          <DetailedStatLabel>Mana Regeneration</DetailedStatLabel>
          <DetailedStatValue>{champion.stats.mpregen}</DetailedStatValue>
        </DetailedStatItem>
      </DetailedStatsGrid>
    </DetailedStatsSection>
    </Container>
  );
};