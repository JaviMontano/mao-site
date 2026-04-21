/**
 * scroll-spy.js — IntersectionObserver-based scroll tracking module (pure).
 *
 * Tracks which page section is currently in the viewport and notifies
 * a callback when the active section changes.
 *
 * @param {Object} options
 * @param {string}   [options.sectionSelector='section[id]'] - CSS selector for observed sections
 * @param {string}   [options.rootMargin='-40% 0px -50% 0px'] - IntersectionObserver rootMargin
 * @param {number}   [options.threshold=0] - IntersectionObserver threshold
 * @param {function} options.onActivate - Called with sectionId when a section enters the zone
 * @returns {{ observe: function, disconnect: function, getActive: function }}
 */
export function createScrollSpy(options = {}) {
  const {
    sectionSelector = 'section[id]',
    rootMargin = '-40% 0px -50% 0px',
    threshold = 0,
    onActivate,
  } = options;

  let observer = null;
  let activeSectionId = null;

  function handleIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeSectionId = entry.target.id;
        if (onActivate) {
          onActivate(activeSectionId);
        }
      }
    }
  }

  function observe() {
    observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    const sections = document.querySelectorAll(sectionSelector);
    sections.forEach((section) => observer.observe(section));
  }

  function disconnect() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function getActive() {
    return activeSectionId;
  }

  return { observe, disconnect, getActive };
}
