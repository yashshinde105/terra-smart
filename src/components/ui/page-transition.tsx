import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { pageTransition } from '@/lib/utils/variants';

interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const PageTransition = ({
  children,
  className,
  ...props
}: PageTransitionProps) => {
  return (
    <motion.div
      {...pageTransition}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { PageTransition };