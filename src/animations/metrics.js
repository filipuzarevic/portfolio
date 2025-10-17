import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMetricsAnimation() {
  const metricCards = document.querySelectorAll('.metric-card');

  metricCards.forEach((card, index) => {
    const valueElement = card.querySelector('.metric-value');
    const targetValue = parseFloat(valueElement.getAttribute('data-target'));

    // Set initial state
    gsap.set(card, {
      opacity: 0,
      y: 50,
    });

    // Create scroll trigger for each metric card
    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        // Fade in the card
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
        });

        // Animate the number count-up
        gsap.to({ val: 0 }, {
          val: targetValue,
          duration: 2,
          delay: index * 0.1 + 0.3,
          ease: 'power2.out',
          onUpdate: function() {
            // Format the number appropriately
            const currentValue = this.targets()[0].val;
            if (targetValue % 1 !== 0) {
              // Has decimal (like 3.5 or 6.8)
              valueElement.textContent = currentValue.toFixed(1);
            } else {
              // Whole number
              valueElement.textContent = Math.round(currentValue);
            }
          }
        });
      }
    });
  });

  console.log('Metrics animations initialized');
}
