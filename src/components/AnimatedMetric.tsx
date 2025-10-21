import React from "react";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";

interface AnimatedMetricProps {
  metric: string;
  initialDelay?: number;
}

const AnimatedMetric: React.FC<AnimatedMetricProps> = ({ metric, initialDelay = 0 }) => {
  const { displayValue, elementRef } = useAnimatedCounter(metric, {
    threshold: 0.5,
    duration: 2000,
    initialDelay,
  });

  return (
    <div ref={elementRef} className="text-5xl md:text-6xl lg:text-7xl font-bold text-agency-navy font-mono">
      {displayValue}
    </div>
  );
};

export default React.memo(AnimatedMetric);
