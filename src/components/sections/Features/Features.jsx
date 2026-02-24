import { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import EnergyLiquid from '@/components/blocks/Spline/EnergyLiquid/EnergyLiquid.jsx';
import FeaturesCard from '@/components/blocks/FeaturesCard/FeaturesCard.jsx';
import Button from '@/components/ui/Button/Button.jsx';
import { FEATURES } from '@/data/features.js';
import borderCounter from '@/assets/icons/top-left.svg';
import arrow from '@/assets/icons/arrow-white.svg';
import circle from '@/assets/icons/circle.svg';
import line from '@/assets/icons/line.svg';
import styles from '@/components/sections/Features/Features.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [spaceBetween, setSpaceBetween] = useState(16);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const triggerRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;
    const section = sectionRef.current;
    const content = contentRef.current;
    const cards = gsap.utils.toArray(content.children);
    const cardHeight = cards[0].offsetHeight;
    const gap = 16;
    const startScroll = window.innerHeight / 2 - cardHeight / 2;
    const endScroll = window.innerHeight / 2 + gap * (cards.length - 1);

    triggerRef.current = gsap.timeline({
      paused: true,
      scrollTrigger: {
        id: 'features-section',
        trigger: section,
        start: 'top+=5 top',
        end: `bottom+=${cards.length * 1000} center`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const activeIndex = Math.floor(self.progress * cards.length);
          setActiveIndex(activeIndex);
        },
      },
    });

    triggerRef.current
      .set(content, {
        y: startScroll,
      })
      .to(content, {
        y: -endScroll,
        ease: 'power1.inOut',
      });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      triggerRef.current.kill();
    };
  }, []);

  useEffect(() => {
    const updateSpaceBetween = () => {
      if (window.innerWidth <= 768) {
        setSpaceBetween(16);
      } else if (window.innerWidth <= 1024) {
        setSpaceBetween(80);
      }
    };

    updateSpaceBetween();
    window.addEventListener('resize', updateSpaceBetween);
    return () => window.removeEventListener('resize', updateSpaceBetween);
  }, []);

  return (
    <section id="features-section" ref={sectionRef} className={styles.section}>
      <div className={styles.info}>
        <div className={styles.content}>
          <h2 className={styles.title}>Features Overview</h2>
          <p className={styles.description}>
            Key Aspects include cross-chain compatibility, efficient growth,
            fast processing, and strong protection
          </p>
        </div>
        <Button name="Start Exploring" className={styles.button} />
      </div>
      <div className={styles.center}>
        {FEATURES.map((card, index) => (
          <div
            key={card.title}
            className={styles.point}
            onClick={() => {
              if (window.innerWidth > 1024) return;
              setActiveIndex(index);
              swiperRef.current?.slideTo(index);
            }}
          >
            <span
              className={`${styles.pointTitle} ${index === activeIndex ? styles.activeTitle : ''}`}
            >
              {card.title}
            </span>
            <ReactSVG
              className={`${styles.icon} ${index === activeIndex ? styles.activeIcon : ''}`}
              src={circle}
            />
            <ReactSVG
              className={`${styles.line} ${index === activeIndex ? styles.activeLine : ''}`}
              src={line}
            />
          </div>
        ))}
        <div className={styles.energyLiquid}>
          <EnergyLiquid />
        </div>
      </div>
      <div ref={contentRef} className={styles.list}>
        {FEATURES.map((card, index) => (
          <FeaturesCard
            key={card.title}
            card={card}
            isActive={index === activeIndex}
          />
        ))}
      </div>
      <div className={styles.slider}>
        <Swiper
          className={styles.swiper}
          effect="slide"
          speed={500}
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={spaceBetween}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {FEATURES.map((card, index) => (
            <SwiperSlide key={card.title} className={styles.card}>
              <FeaturesCard card={card} isActive={index === activeIndex} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.navigation}>
          <Button
            type="slider"
            icon={arrow}
            isReverse
            onClick={() => swiperRef.current?.slidePrev()}
            isDisabled={activeIndex === 0}
          />
          <div className={styles.counter}>
            <ReactSVG
              className={`${styles.border} ${styles.borderLeftTop}`}
              src={borderCounter}
            />
            <ReactSVG
              className={`${styles.border} ${styles.borderLeftBottom}`}
              src={borderCounter}
            />
            <ReactSVG
              className={`${styles.border} ${styles.borderRightTop}`}
              src={borderCounter}
            />
            <ReactSVG
              className={`${styles.border} ${styles.borderRightBottom}`}
              src={borderCounter}
            />
            <span className={styles.number}>{activeIndex + 1}</span>
          </div>
          <Button
            icon={arrow}
            type="slider"
            onClick={() => swiperRef.current?.slideNext()}
            isDisabled={activeIndex === FEATURES.length - 1}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
