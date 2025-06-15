import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-bottom: 2px solid #3f51b5;
  color: #e8eaf6;
  padding: 16px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(45deg, #3f51b5, #7986cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const NavLink = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? '#3f51b5' : '#e8eaf6'};
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px 16px;
  border-radius: 8px;
  position: relative;
  
  &:hover {
    color: #3f51b5;
    background: rgba(63, 81, 181, 0.1);
  }
  
  ${props => props.active && `
    background: rgba(63, 81, 181, 0.2);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: #3f51b5;
      border-radius: 50%;
    }
  `}
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <HeaderContainer>
      <Container>
        <Logo 
          onClick={() => handleNavigation('/')}
          data-testid="header-logo"
        >
          ⚔️ LoL Champions
        </Logo>
        
        <Nav>
          <NavLink 
            active={isActive('/')} 
            onClick={() => handleNavigation('/')}
            data-testid="nav-home"
          >
            Home
          </NavLink>
          <NavLink 
            active={isActive('/champions')} 
            onClick={() => handleNavigation('/champions')}
            data-testid="nav-champions"
          >
            Champions
          </NavLink>
        </Nav>
      </Container>
    </HeaderContainer>
  );
};