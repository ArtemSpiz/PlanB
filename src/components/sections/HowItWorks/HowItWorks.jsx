import { useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/ui/Button/Button.jsx';
import { HOWITWORKS } from '@/data/how-it-works.js';
import slider from '@/assets/images/how-it-works-slider.png';
import borderCounter from '@/assets/icons/top-left.svg';
import ellipse from '@/assets/icons/ellipse.svg';
import styles from '@/components/sections/HowItWorks/HowItWorks.module.scss';

const HowItWorks = () => {
  const [activeIndexTab, setActiveIndexTab] = useState(0);
  const [activeIndexCard, setActiveIndexCard] = useState(0);
  const swiperRef = useRef(null);

  const handleTabClick = (index) => {
    if (activeIndexTab === index) return;
    setActiveIndexTab(index);
    setActiveIndexCard(0);
  };

  return (
    <section id="how-it-works-section" className={styles.section}>
      <div className={styles.left}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          {HOWITWORKS[activeIndexTab].items.map((card, index) => (
            <button
              key={index}
              className={`${styles.step} ${activeIndexCard === index ? styles.stepActive : ''}`}
            >
              <div
                className={styles.counter}
                onClick={() => {
                  setActiveIndexCard(index);
                  swiperRef.current?.slideTo(index);
                }}
              >
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
                <div className={styles.number}>0{index + 1}</div>
              </div>
              <span className={styles.icon}>Step</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.tabs}>
          {HOWITWORKS.map((card, index) => (
            <button
              key={index}
              className={`${styles.tab} ${activeIndexTab === index ? styles.tabActive : styles.tabDeactivated}`}
              onClick={() => handleTabClick(index)}
            >
              {card.tab}
            </button>
          ))}
        </div>
        <div className={styles.slider}>
          <img src={slider} alt="image" />
          <ReactSVG src={ellipse} className={styles.ellipseTopLeft} />
          <ReactSVG src={ellipse} className={styles.ellipseTopLeftSmall} />
          <ReactSVG src={ellipse} className={styles.ellipseBottomLeft} />
          <ReactSVG src={ellipse} className={styles.ellipseBottomLeftSmall} />
          <ReactSVG src={ellipse} className={styles.ellipseBottomRight} />
          <ReactSVG src={ellipse} className={styles.ellipseBottomRightSmall} />
          <ReactSVG src={ellipse} className={styles.ellipseTopRight} />
          <ReactSVG src={ellipse} className={styles.ellipseTopRightSmall} />
        </div>
        <div className={styles.sliderMobile}>
          <img src={slider} alt="image" />
          {/*<ReactSVG src={sliderMobile} />*/}
        </div>
        <div className={styles.swiper}>
          <Swiper
            key={activeIndexTab}
            effect="slide"
            centeredSlides={1}
            slidesPerView={1}
            speed={500}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndexCard(swiper.activeIndex)}
          >
            {HOWITWORKS[activeIndexTab].items.map((card, index) => (
              <SwiperSlide key={index} className={styles.card}>
                <p className={styles.cardTitle}>0{index + 1}</p>
                <p className={styles.cardTitle}>{card.title}</p>
                {card.description && (
                  <p className={styles.cardDescription}>{card.description}</p>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.progress}>
            {HOWITWORKS[activeIndexTab].items.map((card, index) => (
              <div
                className={`${styles.point} ${activeIndexCard >= index ? styles.pointActive : ''}`}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.icons}>
          {HOWITWORKS[activeIndexTab].icons.map((icon, index) => (
            <ReactSVG key={index} src={icon} />
          ))}
        </div>
        <div className={styles.content}>
          <h4 className={styles.title}>{HOWITWORKS[activeIndexTab].title}</h4>
          <p className={styles.description}>
            {HOWITWORKS[activeIndexTab].description}
          </p>
          <Button
            className={styles.button}
            name={HOWITWORKS[activeIndexTab].buttonName}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
