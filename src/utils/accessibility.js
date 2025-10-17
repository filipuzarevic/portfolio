// Accessibility Utilities

export function initAccessibility() {
  // Skip to main content link
  addSkipLink();

  // Keyboard navigation improvements
  enhanceKeyboardNav();

  // Announce page changes for screen readers
  announcePageLoad();

  console.log('Accessibility features initialized');
}

function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#value';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.setAttribute('tabindex', '0');

  document.body.insertBefore(skipLink, document.body.firstChild);
}

function enhanceKeyboardNav() {
  // Add keyboard support for smooth scrolling
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Set focus to the target for screen reader users
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      }
    });
  });
}

function announcePageLoad() {
  // Create live region for screen reader announcements
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.id = 'aria-live-region';

  document.body.appendChild(liveRegion);

  // Announce page is ready
  setTimeout(() => {
    liveRegion.textContent = 'Page loaded. Welcome to Simpli.fi - Product Research and Strategy.';
  }, 1000);
}

// Announce section changes when scrolling
export function announceSection(sectionName) {
  const liveRegion = document.getElementById('aria-live-region');
  if (liveRegion) {
    liveRegion.textContent = `Now viewing: ${sectionName}`;
  }
}
