import Spline from '@splinetool/react-spline';

import styles from '@/components/blocks/Spline/Cube/Cube.module.scss';
import { useEffect, useState } from 'react';

const Cube = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <Spline
          className={styles.cube}
          scene="https://prod.spline.design/giBkLdc6FzOi8hap/scene.splinecode"
        />
      ) : (
        <Spline
          className={styles.cube}
          scene="https://prod.spline.design/lYohsDW92YxjJ02p/scene.splinecode"
        />
      )}
    </>
  );
};

export default Cube;
