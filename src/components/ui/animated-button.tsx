import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  animateScale?: boolean;
  animateHover?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, animateScale = true, animateHover = true, ...props }, ref) => {
    const motionProps = {
      whileHover: animateHover ? { scale: 1.05 } : undefined,
      whileTap: animateScale ? { scale: 0.98 } : undefined,
      transition: { duration: 0.2 }
    };

    return (
      <motion.div {...motionProps} className="inline-block">
        <Button
          ref={ref}
          className={cn(className)}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton };