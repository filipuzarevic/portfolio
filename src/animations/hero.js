import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimation() {
  // Get all letter elements
  const simplLetters = document.querySelectorAll('.word-simpli .letter');
  const fiLetters = document.querySelectorAll('.word-fi .letter');
  const heroSection = document.querySelector('.hero-section');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButton = document.querySelector('.hero-section .cta-button');

  // Create timeline for the scroll-triggered animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: false,
      markers: false, // Set to true for debugging
    }
  });

  // Animate "Simpli" letters fading out and moving
  tl.to(simplLetters, {
    opacity: 0,
    y: -50,
    stagger: 0.05,
    duration: 0.5,
    ease: 'power2.in',
  }, 0);

  // Animate the period in ".fi" merging with "fi"
  // The period (.) fades out
  tl.to(fiLetters[0], {
    opacity: 0,
    scale: 0,
    duration: 0.3,
    ease: 'power2.in',
  }, 0.2);

  // Scale up "fi" and move to center
  tl.to([fiLetters[1], fiLetters[2]], {
    scale: 1.5,
    x: -100,
    duration: 0.5,
    ease: 'power2.out',
  }, 0.3);

  // Fade out subtitle and button
  tl.to([heroSubtitle, heroButton], {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: 'power2.in',
  }, 0.1);

  // Create sticky "fi" element that appears after scroll
  createStickyFi();

  console.log('Hero animation initialized');
}

function createStickyFi() {
  // Create sticky branding element
  const stickyBrand = document.createElement('div');
  stickyBrand.className = 'sticky-fi';
  stickyBrand.innerHTML = '<span class="sticky-fi-text">fi</span>';
  document.body.appendChild(stickyBrand);

  // Animate sticky brand appearance
  gsap.to('.sticky-fi', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'bottom top',
      end: 'bottom top',
      scrub: false,
      onEnter: () => {
        gsap.to('.sticky-fi', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to('.sticky-fi', {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
        });
      },
    }
  });
}

// Entry animation (on page load)
export function initHeroEntrance() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButton = document.querySelector('.hero-section .cta-button');

  // Set initial states
  gsap.set([heroTitle, heroSubtitle, heroButton], {
    opacity: 0,
    y: 30,
  });

  // Entrance timeline
  const entranceTl = gsap.timeline({ delay: 0.3 });

  entranceTl
    .to(heroTitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })
    .to(heroSubtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    .to(heroButton, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5');
}
