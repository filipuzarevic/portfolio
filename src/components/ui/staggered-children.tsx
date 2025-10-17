
import React, { Children, cloneElement, isValidElement, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface StaggeredChildrenProps {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  animation: string;
  staggerDelay?: number;
  threshold?: number;
  rootMargin?: string;
  baseDelay?: number;
  duration?: number;
}

const StaggeredChildren = ({
  children,
  className = "",
  childClassName = "",
  animation,
  staggerDelay = 100,
  threshold = 0.1,
  rootMargin = "0px",
  baseDelay = 0,
  duration = 700,
}: StaggeredChildrenProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  const childrenArray = Children.toArray(children);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cn(className)}>
      {childrenArray.map((child, index) => {
        if (!isValidElement(child)) return child;
        
        const delay = baseDelay + index * staggerDelay;
        
        return (
          <div
            key={index}
            className={cn(
              "transition-all",
              isIntersecting ? animation : "opacity-0",
              childClassName
            )}
            style={{
              transitionDelay: `${delay}ms`,
              transitionDuration: `${duration}ms`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default StaggeredChildren;
