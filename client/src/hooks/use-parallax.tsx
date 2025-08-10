import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  opacity?: boolean;
  scale?: boolean;
}

export function useParallax<T extends HTMLElement>({
  speed = 0.5,
  direction = 'up',
  opacity = false,
  scale = false
}: ParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = direction === 'up' ? -rate : rate;
        
        let transform = `translate3d(0, ${yPos}px, 0)`;
        
        if (scale) {
          const scaleValue = 1 + (scrolled * 0.0002);
          transform += ` scale(${Math.min(scaleValue, 1.1)})`;
        }
        
        element.style.transform = transform;
        
        if (opacity) {
          const opacityValue = Math.max(0, 1 - (scrolled * 0.001));
          element.style.opacity = opacityValue.toString();
        }
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction, opacity, scale]);

  return { ref };
}

export function useFloatingParallax<T extends HTMLElement>(intensity = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = scrolled * intensity;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [intensity]);

  return { ref };
}

export function useStaggeredParallax<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const adjustedScroll = Math.max(0, scrolled - delay);
        const yPos = adjustedScroll * 0.2;
        element.style.transform = `translate3d(0, ${-yPos}px, 0)`;
        
        // Add subtle fade effect
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        element.style.opacity = progress.toString();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay]);

  return { ref };
}