import styled from 'styled-components';
import { useState } from 'react';
import type { Champion } from '../../types/champion';
import { Button } from './Button';
import { championService } from '../../services/championService';

interface ChampionCardProps {
  champion: Champion;
  onViewDetails?: (id: string) => void;
}

const Card = styled.div`
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  border: 2px solid #3f51b5;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    border-color: #5c6bc0;
    box-shadow: 0 20px 40px rgba(63, 81, 181, 0.3);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const RoleBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  background: rgba(63, 81, 181, 0.9);
  color: white;
  font-size: 12px;
  font-weight: 700;
  border-radius: 16px;
  backdrop-filter: blur(10px);
`;

const Content = styled.div`
  padding: 20px;
`;

const Name = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #e8eaf6;
`;

const Title = styled.p`
  color: #7986cb;
  font-size: 14px;
  margin: 0 0 12px 0;
  font-style: italic;
`;

const Description = styled.p`
  color: #b0bec5;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 16px;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #7986cb;
`;

const StatBar = styled.div<{ value: number }>`
  width: 100%;
  height: 4px;
  background: #263238;
  border-radius: 2px;
  margin-top: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => (props.value / 10) * 100}%;
    background: linear-gradient(90deg, #3f51b5, #5c6bc0);
    border-radius: 2px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ChampionCard = ({ champion, onViewDetails }: ChampionCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageLoading, setImageLoading] = useState(true);

  // Load image URL
  useState(() => {
    championService.getChampionImageUrl(champion.image.full).then(url => {
      setImageUrl(url);
      setImageLoading(false);
    });
  });

  const handleViewDetails = () => {
    onViewDetails?.(champion.id);
  };

  return (
    <Card data-testid="champion-card">
      <ImageContainer>
        {!imageLoading && (
          <Image 
            src={imageUrl} 
            alt={champion.name}
            onError={() => setImageLoading(true)}
          />
        )}
        {champion.tags.length > 0 && (
          <RoleBadge>{champion.tags[0]}</RoleBadge>
        )}
      </ImageContainer>
      
      <Content>
        <Name data-testid="champion-name">{champion.name}</Name>
        <Title>{champion.title}</Title>
        <Description>{champion.blurb}</Description>
        
        <StatsContainer>
          <div>
            <StatItem>
              <span>Attack</span>
              <span>{champion.info.attack}/10</span>
            </StatItem>
            <StatBar value={champion.info.attack} />
          </div>
          <div>
            <StatItem>
              <span>Defense</span>
              <span>{champion.info.defense}/10</span>
            </StatItem>
            <StatBar value={champion.info.defense} />
          </div>
          <div>
            <StatItem>
              <span>Magic</span>
              <span>{champion.info.magic}/10</span>
            </StatItem>
            <StatBar value={champion.info.magic} />
          </div>
          <div>
            <StatItem>
              <span>Difficulty</span>
              <span>{champion.info.difficulty}/10</span>
            </StatItem>
            <StatBar value={champion.info.difficulty} />
          </div>
        </StatsContainer>
        
        <ButtonContainer>
          <Button 
            size="small"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </ButtonContainer>
      </Content>
    </Card>
  );
};