import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';
import styles from '@/components/blocks/Spline/Keyboard/Keyboard.module.scss';
import { useModal } from '@/context/ModalContext.jsx';

export const Keyboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { openModal } = useModal();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setTimeout(() => {
      openModal('community');
    }, 200);
  };

  return (
    <>
      {isMobile ? (
        <Spline
          className={styles.keyboard}
          scene="https://prod.spline.design/LmkxcIucC7FVhr3a/scene.splinecode"
          onClick={handleClick}
        />
      ) : (
        <Spline
          className={styles.keyboard}
          scene="https://prod.spline.design/kJDgjQTlYoVwMb4d/scene.splinecode"
          onClick={handleClick}
        />
      )}
    </>
  );
};
