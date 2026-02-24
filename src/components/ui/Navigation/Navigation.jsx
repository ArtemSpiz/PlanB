import { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import { SECTIONS } from '@/data/sections.js';
import arrowDown from '@/assets/icons/arrow-black.svg';
import arrowUp from '@/assets/icons/arrow-black.svg';
import styles from '@/components/ui/Navigation/Navigation.module.scss';

const Navigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map((id) => document.getElementById(id)).filter(
        Boolean
      );

      const index = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight;
      });

      if (index !== -1) {
        setCurrentSectionIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (direction) => {
    const sections = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    let targetIndex;

    if (direction === 'down') {
      targetIndex = currentSectionIndex + 1;
    } else if (direction === 'up') {
      targetIndex = currentSectionIndex - 1;
    }

    if (targetIndex >= 0 && targetIndex < sections.length) {
      const targetSection = sections[targetIndex];
      console.log(targetSection);
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setCurrentSectionIndex(targetIndex);
    }
  };

  return (
    <div className={styles.navigation}>
      <ReactSVG
        className={`${styles.icon} ${currentSectionIndex === 0 ? styles.iconDisabled : ''}`}
        style={{ marginTop: '10px', transform: 'rotate(270deg)' }}
        src={arrowUp}
        onClick={() => handleScrollToSection('up')}
      />

      <ReactSVG
        className={`${styles.icon} ${
          currentSectionIndex === SECTIONS.length - 1 ? styles.iconDisabled : ''
        }`}
        style={{ marginBottom: '10px', transform: 'rotate(90deg)' }}
        src={arrowDown}
        onClick={() => handleScrollToSection('down')}
      />
    </div>
  );
};

export default Navigation;
