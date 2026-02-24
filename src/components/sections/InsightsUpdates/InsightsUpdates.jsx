import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import InsightsUpdatesCard from '@/components/blocks/InsightsUpdatesCard/InsightsUpdatesCard.jsx';
import Button from '@/components/ui/Button/Button.jsx';
import { INSIGHTSUPDATES } from '@/data/insights-updates.js';
import arrow from '@/assets/icons/arrow-white.svg';
import styles from '@/components/sections/InsightsUpdates/InsightsUpdates.module.scss';
import { BlogGateway } from '../../../api/blog/blog-gateway';
import { useNavigate } from 'react-router';

const InsightsUpdates = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const blogData = await BlogGateway.getPostsPreview();
        setBlogs(Array.isArray(blogData) ? blogData : []);
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setBlogs([]);
      }
    };

    fetchNews();
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/blog');
  };

  return (
    <section id="insights-updates-section" className={styles.section}>
      <div className={styles.info}>
        <div className={styles.content}>
          <h1 className={styles.title}>Insights & Updates</h1>
          <p className={styles.description}>
            Stay ahead with the latest insights on blockchain trends and
            innovation.
          </p>
        </div>
        <Button
          className={styles.button}
          onClick={handleClick}
          name="See all"
        />
      </div>
      <div className={styles.slider}>
        <Swiper
          className={styles.swiper}
          effect={'coverflow'}
          observer={true}
          observeParents={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          allowTouchMove={false}
          spaceBetween={30}
          speed={800}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 3,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Navigation]}
          watchSlidesProgress={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {blogs.map((card, index) => (
            <SwiperSlide
              key={index}
              className={`insights-updates-slide ${styles.slide} ${activeIndex === index ? styles.slideActive : styles.slideDeactive}`}
            >
              <InsightsUpdatesCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.navigation}>
        <Button
          type="slider"
          icon={arrow}
          onClick={() => swiperRef.current?.slidePrev()}
          isReverse
        />
        <Button
          type="slider"
          icon={arrow}
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </section>
  );
};

export default InsightsUpdates;
