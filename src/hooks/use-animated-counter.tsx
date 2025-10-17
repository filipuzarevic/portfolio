import { useEffect, useRef, useState } from 'react';

interface UseAnimatedCounterOptions {
  threshold?: number;
  duration?: number;
  initialDelay?: number;
}

export const useAnimatedCounter = (
  endValue: string,
  options: UseAnimatedCounterOptions = {}
) => {
  const { threshold = 0.5, duration = 2000, initialDelay = 0 } = options;
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const [canAnimate, setCanAnimate] = useState(initialDelay === 0);
  const elementRef = useRef<HTMLDivElement>(null);

  // Handle initial delay
  useEffect(() => {
    if (initialDelay > 0) {
      const timer = setTimeout(() => setCanAnimate(true), initialDelay);
      return () => clearTimeout(timer);
    }
  }, [initialDelay]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    // Parse the end value to extract number and suffix
    const matches = endValue.match(/^([+€]?)([0-9.]+)([KM%+]?)$/);
    if (!matches) {
      setDisplayValue(endValue);
      return;
    }

    const [, prefix, numberStr, suffix] = matches;
    const targetNumber = parseFloat(numberStr);

    // If we can't animate yet, just wait
    if (!canAnimate) return;

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter(targetNumber, prefix, suffix);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [endValue, threshold, duration, hasAnimated, canAnimate]);

  const animateCounter = (
    target: number,
    prefix: string,
    suffix: string
  ) => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = target * easeOut;

      // Format the number with appropriate decimal places
      let formattedNumber: string;
      if (target % 1 === 0) {
        // Integer
        formattedNumber = Math.floor(currentValue).toString();
      } else {
        // Decimal - preserve original decimal places
        const decimalPlaces = (target.toString().split('.')[1] || '').length;
        formattedNumber = currentValue.toFixed(decimalPlaces);
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return { displayValue, elementRef };
};
