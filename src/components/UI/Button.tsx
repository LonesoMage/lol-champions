import { type ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  selected?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
  
  border-radius: 8px;
  border: 2px solid;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  font-family: inherit;
  
  ${props => {
    if (props.selected) {
      return `
        background: linear-gradient(45deg, #3f51b5, #5c6bc0);
        border-color: #3f51b5;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(63, 81, 181, 0.3);
        &:hover { 
          background: linear-gradient(45deg, #303f9f, #3f51b5);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(63, 81, 181, 0.4);
        }
      `;
    }
    
    switch (props.variant) {
      case 'secondary':
        return `
          background: linear-gradient(45deg, #424242, #616161);
          border-color: #757575;
          color: #e8eaf6;
          &:hover { 
            background: linear-gradient(45deg, #616161, #757575);
            transform: translateY(-2px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          border-color: #3f51b5;
          color: #3f51b5;
          &:hover { 
            background: rgba(63, 81, 181, 0.1);
            border-color: #5c6bc0;
            color: #5c6bc0;
          }
        `;
      default:
        return `
          background: linear-gradient(45deg, #3f51b5, #5c6bc0);
          border-color: #3f51b5;
          color: #ffffff;
          &:hover { 
            background: linear-gradient(45deg, #303f9f, #3f51b5);
            transform: translateY(-2px);
          }
        `;
    }
  }}
  
  ${props => props.disabled && `
    opacity: 0.6;
    cursor: not-allowed;
    &:hover { 
      transform: none;
    }
  `}
`;

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  selected = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      selected={selected}
      {...props}
    >
      {children}
    </StyledButton>
  );
};