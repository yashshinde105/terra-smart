import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as variants from '@/lib/utils/variants';

type StaggerVariantType = 'stagger' | 'staggerFast' | 'staggerSlow';
type ItemVariantType = keyof typeof variants;

interface AnimateListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerVariant?: StaggerVariantType;
  itemVariant?: ItemVariantType;
  className?: string;
  itemClassName?: string;
  as?: React.ElementType;
  itemAs?: React.ElementType;
}

const AnimateList = ({
  children,
  staggerVariant = 'stagger',
  itemVariant = 'fadeInUp',
  className,
  itemClassName,
  as: Component = motion.div,
  itemAs: ItemComponent = motion.div,
  ...props
}: AnimateListProps) => {
  const staggerConfig = variants[staggerVariant] || variants.stagger;
  const itemConfig = variants[itemVariant] || variants.fadeInUp;
  
  // Convert children to array to map over them
  const childrenArray = React.Children.toArray(children);
  
  return (
    <Component
      {...staggerConfig}
      className={cn(className)}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <ItemComponent
          key={index}
          {...itemConfig}
          className={cn(itemClassName)}
        >
          {child}
        </ItemComponent>
      ))}
    </Component>
  );
};

export { AnimateList };