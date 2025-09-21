import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHoverAnimation } from "@/lib/utils/variants";

const AnimatedCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <motion.div as="div"
      ref={ref}
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...cardHoverAnimation}
      {...props}
    />
  )
);
AnimatedCard.displayName = "AnimatedCard";

const AnimatedCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
AnimatedCardHeader.displayName = "AnimatedCardHeader";

const AnimatedCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <motion.h3 
      ref={ref} 
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      {...props} 
    />
  )
);
AnimatedCardTitle.displayName = "AnimatedCardTitle";

const AnimatedCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <motion.p 
      ref={ref} 
      className={cn("text-sm text-muted-foreground", className)} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      {...props} 
    />
  )
);
AnimatedCardDescription.displayName = "AnimatedCardDescription";

const AnimatedCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <motion.div 
      ref={ref} 
      className={cn("p-6 pt-0", className)} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      {...props} 
    />
  )
);
AnimatedCardContent.displayName = "AnimatedCardContent";

const AnimatedCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <motion.div 
      ref={ref} 
      className={cn("flex items-center p-6 pt-0", className)} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      {...props} 
    />
  )
);
AnimatedCardFooter.displayName = "AnimatedCardFooter";

export { 
  AnimatedCard, 
  AnimatedCardHeader, 
  AnimatedCardFooter, 
  AnimatedCardTitle, 
  AnimatedCardDescription, 
  AnimatedCardContent 
};