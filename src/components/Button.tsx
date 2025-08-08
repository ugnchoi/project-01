import React from 'react';
import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps,
} from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<ShadcnButtonProps, 'variant'> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  // Map our custom variant to Shadcn variants
  const getVariant = (variant: string): ShadcnButtonProps['variant'] => {
    switch (variant) {
      case 'primary':
        return 'default';
      case 'secondary':
        return 'secondary';
      default:
        return variant as ShadcnButtonProps['variant'];
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <ShadcnButton
      type={type}
      variant={getVariant(variant)}
      size={size}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={cn(className)}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
