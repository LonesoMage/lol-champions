import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #c8aa6e;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #463714;
  border-top: 4px solid #c8aa6e;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

const SpinnerText = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner = ({ text = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <SpinnerContainer>
      <Spinner />
      <SpinnerText>{text}</SpinnerText>
    </SpinnerContainer>
  );
};