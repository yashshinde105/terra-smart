import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
  size?: number;
  className?: string;
  motionProps?: MotionProps;
  animationType?: 'pulse' | 'hover' | 'rotate' | 'bounce' | 'none';
}

const AnimatedIcon = ({
  icon: Icon,
  size = 24,
  className,
  motionProps,
  animationType = 'hover',
  ...props
}: AnimatedIconProps) => {
  // Define animation variants based on type
  const getAnimationProps = () => {
    switch (animationType) {
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.1, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            },
          },
        };
      case 'hover':
        return {
          whileHover: { scale: 1.2 },
          transition: { duration: 0.2 },
        };
      case 'rotate':
        return {
          animate: {
            rotate: [0, 360],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            },
          },
        };
      case 'bounce':
        return {
          animate: {
            y: [0, -10, 0],
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: 'loop',
            },
          },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={cn('inline-flex items-center justify-center', className)}
      {...getAnimationProps()}
      {...motionProps}
      {...props}
    >
      <Icon size={size} />
    </motion.div>
  );
};

export { AnimatedIcon };