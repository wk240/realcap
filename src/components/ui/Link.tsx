import { cn } from '@/lib/utils/cn';
import { type AnchorHTMLAttributes, forwardRef } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted' | 'button' | 'outline';
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', children, href, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'transition-colors',
          {
            'text-blue-600 hover:text-blue-800 hover:underline': variant === 'default',
            'text-gray-600 hover:text-gray-900': variant === 'muted',
            'inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700': variant === 'button',
            'inline-flex items-center justify-center rounded-md border-2 border-blue-600 text-blue-600 px-4 py-2 font-medium hover:bg-blue-50': variant === 'outline',
          },
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';