import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Variants supported by the underlying shadcn/ui Button */
type ShadcnVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

interface ButtonProps {
  /** Adds our custom "primary" alias while preserving shadcn variants */
  variant?: ShadcnVariant | 'primary';
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
  /** Map our custom variant to the matching shadcn variant */
  const mapVariant = (v: NonNullable<ButtonProps['variant']>): ShadcnVariant =>
    v === 'primary' ? 'default' : (v as ShadcnVariant);

  const handleClick = () => {
    if (!disabled && onClick) onClick();
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
      variant={mapVariant(variant)}
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
