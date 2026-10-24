export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

/**
 * Runs `onVisible` the first time `element` enters the viewport.
 * Falls back to running immediately when IntersectionObserver is unavailable.
 * Returns a teardown function.
 */
export function observeInView(
  element: Element,
  onVisible: () => void,
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    onVisible();
    return () => undefined;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        observer.disconnect();
        onVisible();
        return;
      }
    }
  }, options);

  observer.observe(element);

  return () => observer.disconnect();
}
