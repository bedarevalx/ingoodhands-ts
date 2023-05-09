import { useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | null>(
    null,
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollPositive, setIsScrollPositive] = useState(true);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      setScrollPosition(scrollY);
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -40)
      ) {
        setScrollDirection(direction);
      }
      setIsScrollPositive(lastScrollY > Math.abs(scrollY));
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return { scrollDirection, scrollPosition, isScrollPositive };
};
