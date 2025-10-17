// Main JavaScript Entry Point
import { initHeroAnimation, initHeroEntrance } from './animations/hero.js';
import { initMetricsAnimation } from './animations/metrics.js';
import { initSectionAnimations, initSectionTitles } from './animations/sections.js';
import { initAccessibility } from './utils/accessibility.js';

console.log('Simpli.fi Portfolio - Initializing...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize accessibility features
  initAccessibility();

  // Initialize all animations
  initHeroEntrance();
  initHeroAnimation();
  initMetricsAnimation();
  initSectionAnimations();
  initSectionTitles();

  console.log('All animations initialized');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
