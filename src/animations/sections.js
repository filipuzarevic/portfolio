import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSectionAnimations() {
  // Value Proposition Section
  initValueSection();

  // Service Cards
  initServiceCards();

  // Case Studies
  initCaseStudies();

  // Methodology
  initMethodology();

  // Contact Section
  initContactSection();

  console.log('Section animations initialized');
}

function initValueSection() {
  const valueContent = document.querySelector('.value-content');

  gsap.set(valueContent, {
    opacity: 0,
    y: 40,
  });

  ScrollTrigger.create({
    trigger: valueContent,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to(valueContent, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }
  });
}

function initServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card, index) => {
    // Alternate slide direction: left, right, left
    const xStart = index % 2 === 0 ? -100 : 100;

    gsap.set(card, {
      opacity: 0,
      x: xStart,
      scale: 0.95,
    });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
        });
      }
    });
  });
}

function initCaseStudies() {
  const caseCards = document.querySelectorAll('.case-card');

  caseCards.forEach((card, index) => {
    gsap.set(card, {
      opacity: 0,
      scale: 0.9,
      y: 40,
    });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
        });
      }
    });
  });
}

function initMethodology() {
  const methodologySteps = document.querySelectorAll('.methodology-step');

  methodologySteps.forEach((step, index) => {
    gsap.set(step, {
      opacity: 0,
      y: 30,
    });

    ScrollTrigger.create({
      trigger: step,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(step, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
        });
      }
    });
  });
}

function initContactSection() {
  const contactContent = document.querySelector('.contact-content');

  gsap.set(contactContent, {
    opacity: 0,
    y: 40,
  });

  ScrollTrigger.create({
    trigger: contactContent,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to(contactContent, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }
  });
}

// General section title animations
export function initSectionTitles() {
  const sectionTitles = document.querySelectorAll('.section-title');

  sectionTitles.forEach((title) => {
    gsap.set(title, {
      opacity: 0,
      y: 30,
    });

    ScrollTrigger.create({
      trigger: title,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    });
  });
}
