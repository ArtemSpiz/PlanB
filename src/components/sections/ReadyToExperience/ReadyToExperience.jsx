import { ReactSVG } from 'react-svg';

import { Keyboard } from '@/components/blocks/Spline/Keyboard/Keyboard.jsx';
import styles from '@/components/sections/ReadyToExperience/ReadyToExperience.module.scss';
import bitcoin from '@/assets/icons/bitcoin.svg';
import unionLeft from '@/assets/icons/union-left.svg';
import unionRight from '@/assets/icons/union-right.svg';

const ReadyToExperience = () => {
  return (
    <section id="ready-to-experience-section" className={styles.section}>
      <div className={styles.text}>
        <h1 className={styles.title}>
          Ready to Experience the Future of Blockchain?
        </h1>
        <p className={styles.description}>Let’s Start Exploring</p>
      </div>
      <ReactSVG className={styles.bitcoin} src={bitcoin} />
      <ReactSVG className={styles.unionLeft} src={unionLeft} />
      <ReactSVG className={styles.unionRight} src={unionRight} />
      <div className={styles.keyboard}>
        <Keyboard />
      </div>
    </section>
  );
};

export default ReadyToExperience;
