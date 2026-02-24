import { useEffect, useRef } from 'react';

export const useAutoScrollToSection = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;
    sectionsRef.current = sectionsRef.current.slice(0, 7);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const scrollPosition =
              entry.boundingClientRect.top > 0
                ? entry.target.offsetTop + 100
                : entry.target.offsetTop +
                  entry.target.offsetHeight -
                  window.innerHeight;

            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth',
            });
          }
        });
      },
      { threshold: 0.01 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return sectionsRef;
};
