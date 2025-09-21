import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedNavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

const AnimatedNavLink = ({
  to,
  children,
  isActive = false,
  className,
  onClick,
  ...props
}: AnimatedNavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'px-3 py-2 rounded-md text-sm font-medium transition-smooth relative',
        isActive
          ? 'text-primary'
          : 'text-muted-foreground hover:text-primary',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="navbar-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export { AnimatedNavLink };