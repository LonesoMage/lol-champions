import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  text-align: center;
  background: linear-gradient(135deg, #1e2328 0%, #3c3c41 100%);
  border: 2px solid rgba(255, 107, 107, 0.3);
  border-radius: 16px;
  margin: 24px;
`;

const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const ErrorTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ff6b6b;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: #a09b8c;
  margin-bottom: 24px;
  max-width: 400px;
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We encountered an unexpected error. Please try refreshing the page.
          </ErrorMessage>
          <Button onClick={this.handleReload}>
            Refresh Page
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}