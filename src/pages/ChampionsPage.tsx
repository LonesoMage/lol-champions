import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChampionCard } from '../components/UI/ChampionCard';
import { Button } from '../components/UI/Button';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setChampions, setLoading, setError, setSearchQuery } from '../store/slices/championSlice';
import { championService } from '../services/championService';
import type { ChampionRole, Champion } from '../types/champion';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  margin: 0;
  padding: 0;
`;

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  width: 100%;
`;

const FiltersSection = styled.section`
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  border: 2px solid #3f51b5;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #7986cb;
  font-size: 14px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #3f51b5;
  background: #1a1a2e;
  color: #e8eaf6;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #5c6bc0;
    box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
  }
  
  &::placeholder {
    color: #9e9e9e;
  }
`;

const RoleFiltersContainer = styled.div`
  margin-top: 24px;
`;

const RoleFiltersLabel = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #7986cb;
  margin-bottom: 8px;
`;

const RoleFiltersDescription = styled.p`
  font-size: 14px;
  color: #b0bec5;
  margin-bottom: 16px;
  font-style: italic;
`;

const RoleFilters = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ResultsSection = styled.section``;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #3f51b5;
`;

const ResultsCount = styled.span`
  color: #7986cb;
  font-size: 16px;
`;

const ChampionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
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
  margin: 24px 0;
`;

const ErrorButton = styled(Button)`
  margin-top: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #9e9e9e;
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  border: 2px solid #3f51b5;
  border-radius: 12px;
`;

export const ChampionsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { champions, loading, error, searchQuery } = useAppSelector(state => state.champions);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [selectedRoles, setSelectedRoles] = useState<ChampionRole[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>(champions);

  const roles: { value: ChampionRole; label: string }[] = [
    { value: 'Assassin', label: 'Assassin' },
    { value: 'Fighter', label: 'Fighter' },
    { value: 'Mage', label: 'Mage' },
    { value: 'Marksman', label: 'Marksman' },
    { value: 'Support', label: 'Support' },
    { value: 'Tank', label: 'Tank' }
  ];

  const loadChampions = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await championService.getAllChampions();
      dispatch(setChampions(data));
    } catch (err) {
      console.error('Error loading champions:', err);
      dispatch(setError('Error loading champions'));
    }
  }, [dispatch]);

  const applyFilters = useCallback(() => {
    let filtered = [...champions];

    // Role filter - AND logic: чемпіон повинен мати ВСІ обрані ролі
    if (selectedRoles.length > 0) {
      filtered = filtered.filter(champion => 
        selectedRoles.every(role => champion.tags.includes(role))
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(champion => 
        champion.name.toLowerCase().includes(query) ||
        champion.title.toLowerCase().includes(query) ||
        champion.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredChampions(filtered);
  }, [champions, selectedRoles, searchQuery]);

  useEffect(() => {
    loadChampions();
  }, [loadChampions]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearchQuery));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRoleToggle = (role: ChampionRole) => {
    setSelectedRoles(prev => {
      if (prev.includes(role)) {
        return prev.filter(r => r !== role);
      } else {
        return [...prev, role];
      }
    });
  };

  const handleViewDetails = (id: string) => {
    navigate(`/champion/${id}`);
  };

  const handleClearFilters = () => {
    setSelectedRoles([]);
    dispatch(setSearchQuery(''));
    setLocalSearchQuery('');
  };

  if (loading) {
    return (
      <Container>
        <MainContent>
          <LoadingSpinner>Loading champions...</LoadingSpinner>
        </MainContent>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <MainContent>
          <ErrorMessage>
            {error}
            <br />
            <ErrorButton onClick={loadChampions}>
              Try Again
            </ErrorButton>
          </ErrorMessage>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <MainContent>
        <FiltersSection>
          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>Search Champions</FilterLabel>
              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="Search by name, title, or role..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  data-testid="search-input"
                />
                <Button onClick={handleSearch} data-testid="search-button">Search</Button>
              </SearchContainer>
            </FilterGroup>

            <FilterGroup>
              <Button variant="outline" onClick={handleClearFilters} data-testid="clear-filters">
                Clear All Filters
              </Button>
            </FilterGroup>
          </FiltersGrid>

          <RoleFiltersContainer>
            <RoleFiltersLabel>Filter by Roles</RoleFiltersLabel>
            <RoleFiltersDescription>
              Select multiple roles to find champions that have ALL selected roles
            </RoleFiltersDescription>
            <RoleFilters data-testid="role-filters">
              {roles.map(role => (
                <Button
                  key={role.value}
                  variant="outline"
                  size="small"
                  selected={selectedRoles.includes(role.value)}
                  onClick={() => handleRoleToggle(role.value)}
                  data-testid={`role-filter-${role.value.toLowerCase()}`}
                >
                  {role.label}
                </Button>
              ))}
            </RoleFilters>
          </RoleFiltersContainer>
        </FiltersSection>

        <ResultsSection>
          <ResultsHeader>
            <ResultsCount data-testid="results-count">
              Showing {filteredChampions.length} of {champions.length} champions
            </ResultsCount>
          </ResultsHeader>

          {filteredChampions.length === 0 ? (
            <EmptyState data-testid="empty-state">
              <h3>No champions found</h3>
              {selectedRoles.length > 1 ? (
                <p>No champions have ALL the selected roles. Try selecting fewer roles or different combinations.</p>
              ) : (
                <p>Try adjusting your filters or search query</p>
              )}
              <Button onClick={handleClearFilters} style={{ marginTop: '16px' }}>
                Clear All Filters
              </Button>
            </EmptyState>
          ) : (
            <ChampionsGrid data-testid="champions-grid">
              {filteredChampions.map(champion => (
                <ChampionCard
                  key={champion.id}
                  champion={champion}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </ChampionsGrid>
          )}
        </ResultsSection>
      </MainContent>
    </Container>
  );
};