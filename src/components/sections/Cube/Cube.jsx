import { useRef, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-scroll';

import CubeSpline from '@/components/blocks/Spline/Cube/Cube.jsx';
import bitcoin from '@/assets/icons/bitcoin.svg';
import buttonScroll from '@/assets/icons/button-scroll.svg';
import styles from '@/components/sections/Cube/Cube.module.scss';
import SocialMedia from '@/components/ui/SocialMedia/SocialMedia.jsx';
import Navigation from '@/components/ui/Navigation/Navigation.jsx';

const items = [
  { title: 'Potential TVL', description: '10K BTC' },
  { title: 'Average transaction cost', description: '$ 0.10' },
  { title: 'Transactions Per Second', description: '7 TPS' },
  { title: 'Total Value Locked', description: 'Soon TVL' },
];

const Cube = () => {
  const sectionRef = useRef(null);

  const adjustSectionHeight = () => {
    const section = sectionRef.current;
    const height = window.innerHeight;
    section.style.height = `${height}px`;
  };

  useEffect(() => {
    adjustSectionHeight();
  }, []);

  return (
    <section id="cube-section" ref={sectionRef} className={styles.section}>
      <div className={styles.info}>
        <p className={styles.description}>
          A fast and secure Layer 1 blockchain designed for real-world use.
        </p>
      </div>
      <div className={styles.center}>
        <h3 className={styles.title}>Build. Transact. Scale.</h3>
        <div className={styles.cube}>
          <CubeSpline />
        </div>
        <ReactSVG className={styles.bitcoin} src={bitcoin} />

        <Link to="benefits-section" smooth={true} offset={0} duration={500}>
          <ReactSVG src={buttonScroll} className={styles.button} />
        </Link>
      </div>

      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.title} className={styles.item}>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>

      <Link
        to="benefits-section"
        smooth={true}
        offset={0}
        duration={500}
        className={styles.buttonMobile}
      >
        <ReactSVG src={buttonScroll} />
      </Link>
      <Navigation />
      <div className={styles.socialMedia}>
        <SocialMedia />
      </div>
    </section>
  );
};

export default Cube;
