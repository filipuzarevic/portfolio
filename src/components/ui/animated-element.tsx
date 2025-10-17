
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface AnimatedElementProps {
  children: ReactNode;
  animation: string;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  duration?: number;
}

const AnimatedElement = ({
  children,
  animation,
  className = "",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  duration = 700,
}: AnimatedElementProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        `transition-all duration-${duration}`,
        isIntersecting ? animation : "opacity-0",
        className
      )}
      style={{
        transitionDelay: delay > 0 ? `${delay}ms` : undefined,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
