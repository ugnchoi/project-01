import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { buttonVariants, type ButtonVariant } from './button-variants';

import { cn } from '@/lib/utils';

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  ButtonVariant & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// src/components/ui/button.tsx
export { Button }; // ← keep the component export

// eslint-disable-next-line react-refresh/only-export-components
export { buttonVariants }; // ← make sure this line is present and spelled exactly
