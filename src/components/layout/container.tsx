import { cn } from '@/lib/utils';
import type React from 'react';

export const Container: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return (
    <div className={cn('container mx-auto px-4 py-4 md:px-6 md:py-6', className)} {...props} />
  );
};
