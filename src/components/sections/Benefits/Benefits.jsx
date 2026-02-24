import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReactSVG } from 'react-svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import 'swiper/css';

import BenefitsCard from '@/components/blocks/BenefitsCard/BenefitsCard.jsx';
import Button from '@/components/ui/Button/Button.jsx';
import { SLIDES, SLIDESGSAP } from '@/data/benefits.js';
import borderCounter from '@/assets/icons/top-left.svg';
import arrow from '@/assets/icons/arrow-white.svg';
import styles from '@/components/sections/Benefits/Benefits.module.scss';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Benefits = () => {
  const [activeIndexTab, setActiveIndexTab] = useState(0);
  const [activeIndexCard, setActiveIndexCard] = useState(0);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const infoRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;
    const section = sectionRef.current;
    const content = gsap.utils.toArray(contentRef.current.children);
    const cardWidth = content[0].offsetWidth;
    const gap = 56;
    const restCards = content.length - 1;

    gsap.set(content, {
      x: 0,
      opacity: 1,
      duration: 1,
    });

    triggerRef.current = gsap.to(content, {
      x: () => `-=${(cardWidth + gap) * (content.length - 1)}`,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: section,
        scrub: 1,
        start: 'top+=5 top',
        end: `+=${(cardWidth + gap) * content.length + 2000}`,
        ease: 'power2.out',
        snap: {
          duration: 0.1,
          immediateRender: true,
          snapTo: (value) => Math.round(value * restCards) / restCards,
        },
        onUpdate: ({ progress }) => {
          const activeIndex = Math.round(progress * restCards);
          setActiveIndexCard(activeIndex);

          content.forEach((card, index) => {
            gsap.to(card, {
              opacity: index < activeIndex ? 0 : 1,
              duration: 0.8,
              ease: 'power2.out',
            });
          });
        },
      },
    });

    return () => {
      triggerRef.current.kill();
    };
  }, []);

  const handleArrowClick = (direction) => {
    const content = gsap.utils.toArray(contentRef.current.children);
    const cardWidth = content[0].offsetWidth;
    const leftBlockWidth = infoRef.current.offsetWidth;

    const initialOffset =
      (cardWidth * (content.length - 1)) / (content.length - 1) +
      leftBlockWidth +
      500;

    const scrollOffset = direction === 1 ? initialOffset : -initialOffset;

    window.scrollBy({
      top: scrollOffset,
      behavior: 'smooth',
    });
  };

  const handleTabClick = (index) => {
    if (activeIndexTab === index) return;

    setActiveIndexTab(index);

    if (window.innerWidth <= 768) {
      setActiveIndexCard(0);
    }
  };

  return (
    <section ref={sectionRef} id="benefits-section" className={styles.section}>
      <div ref={infoRef} className={styles.info}>
        <div className={styles.content}>
          <h1 className={styles.title}>Benefits, that you’ll have</h1>
          <p className={styles.description}>
            Plan B is an EVM-compatible blockchain that uses BTC as gas,
            supports staking, dApps, and fast transactions
          </p>
        </div>
        <div className={styles.navigation}>
          <Button
            type="slider"
            icon={arrow}
            onClick={() => handleArrowClick(-1)}
            isReverse
            isDisabled={activeIndexCard === 0}
          />
          <Button
            icon={arrow}
            type="slider"
            onClick={() => handleArrowClick(1)}
            isDisabled={
              activeIndexCard === SLIDES[activeIndexTab].items.length - 1
            }
          />
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.tabs}>
          {SLIDES.map((item, index) => (
            <button
              key={item.title}
              className={`${styles.tab} ${activeIndexTab === index ? styles.tabActive : styles.tabDeactivated}`}
              onClick={() => handleTabClick(index)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div ref={contentRef} className={styles.list}>
          {SLIDESGSAP.map((card, index) => (
            <BenefitsCard
              key={index}
              className={styles.card}
              card={card[activeIndexTab]}
              isActive={activeIndexCard === index}
            />
          ))}
        </div>

        <div className={styles.slider}>
          <Swiper
            key={activeIndexTab}
            className={styles.swiper}
            effect="slide"
            centeredSlides={true}
            slidesPerView={'auto'}
            speed={500}
            spaceBetween={96}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndexCard(swiper.activeIndex)}
          >
            {SLIDES[activeIndexTab].items.map((card, index) => (
              <SwiperSlide key={card.name} className={styles.card}>
                <BenefitsCard
                  card={card}
                  isActive={index === activeIndexCard}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.bottom}>
          <Button
            type="slider"
            className={styles.buttonMobile}
            icon={arrow}
            isReverse
            onClick={() => swiperRef.current?.slidePrev()}
            isDisabled={activeIndexCard === 0}
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
            <p className={styles.number}>0{activeIndexCard + 1}</p>
          </div>
          <Button
            icon={arrow}
            className={styles.buttonMobile}
            type="slider"
            onClick={() => swiperRef.current?.slideNext()}
            isDisabled={
              activeIndexCard === SLIDES[activeIndexTab].items.length - 1
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Benefits;
