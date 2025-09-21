import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as variants from '@/lib/utils/variants';

type VariantType = keyof typeof variants;

interface AnimateWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: VariantType;
  delay?: number;
  className?: string;
  motionProps?: MotionProps;
  as?: React.ElementType;
}

const AnimateWrapper = ({
  children,
  variant = 'fadeInUp',
  delay = 0,
  className,
  motionProps,
  as: Component = motion.div,
  ...props
}: AnimateWrapperProps) => {
  const selectedVariant = variants[variant] || variants.fadeInUp;
  
  return (
    <Component
      {...selectedVariant}
      {...motionProps}
      transition={{
        ...(('animate' in selectedVariant) ? selectedVariant.animate?.transition : {}),
        delay,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export { AnimateWrapper };