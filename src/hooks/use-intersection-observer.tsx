
import { useState, useEffect, useRef, RefObject } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        const isVisible = entry.isIntersecting;
        
        if (isVisible) {
          setIsIntersecting(true);
          
          // If triggerOnce is true, record that we've triggered once
          if (triggerOnce) {
            setHasTriggered(true);
            // Unobserve after first intersection if triggerOnce is true
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { 
        threshold,
        rootMargin 
      }
    );

    const currentRef = ref.current;

    if (currentRef && !hasTriggered) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, isIntersecting };
}
