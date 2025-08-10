import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
}

// Subtle parallax for hero background only
export function useSubtleParallax<T extends HTMLElement>({
  speed = 0.05,
  direction = 'up'
}: ParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      
      // Only apply when element is visible and in hero area
      if (rect.bottom >= 0 && rect.top <= window.innerHeight && scrolled < window.innerHeight) {
        const rate = scrolled * speed;
        const yPos = direction === 'up' ? -rate : rate;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);

  return { ref };
}

// Very gentle image movement that doesn't affect layout
export function useGentleFloat<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Only apply when element is in viewport
      if (rect.bottom >= 0 && rect.top <= viewportHeight) {
        // Calculate how far through the viewport the element is
        const progress = Math.max(0, Math.min(1, 
          (viewportHeight - rect.top) / (viewportHeight + rect.height)
        ));
        
        // Very subtle movement (max 10px)
        const yPos = (progress - 0.5) * 10;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { ref };
}