import Spline from '@splinetool/react-spline';

import styles from '@/components/blocks/Spline/Slider/Slider.module.scss';

export const Slider = () => {
  return (
    <Spline
      className={styles.slider}
      scene="https://prod.spline.design/LVHfoXNCsnO1sLKo/scene.splinecode"
    />
  );
};
