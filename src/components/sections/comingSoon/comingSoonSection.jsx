import styles from '@/components/sections/comingSoon/comingSoonSection.module.scss';
import SocialMedia from '@/components/ui/SocialMedia/SocialMedia.jsx';
import Navigation from '@/components/ui/Navigation/Navigation.jsx';
import ecosystemMain1 from '../../../assets/images/ecosystemMain1.png';
import ecosystemMain2 from '../../../assets/images/ecosystemMain2.png';
import ecosystemMain3 from '../../../assets/images/ecosystemMain3.png';
import ecosystemMain4 from '../../../assets/images/ecosystemMain4.png';
import ecosystemMain5 from '../../../assets/images/ecosystemMain5.png';
import ecosystemMain6 from '../../../assets/images/ecosystemMain6.png';
import cubBigBlog from '../../../assets/images/cubBigBlog.png';
import cubBlog from '../../../assets/images/cubBlog.png';

const mainApps = () => {
  return (
    <section id="mainApps-section" className={styles.section}>
      <img src={cubBlog} className={styles.cubAppsLeft} />
      <img src={cubBigBlog} className={styles.cubAppsBlogLeft} />
      <img src={ecosystemMain1} className={styles.keyAppsLeft1} />
      <img src={ecosystemMain2} className={styles.keyAppsLeft2} />
      <img src={ecosystemMain3} className={styles.keyAppsLeft3} />
      <img src={cubBigBlog} className={styles.cubAppsBlogCenter} />
      <img src={cubBlog} className={styles.cubAppsCenter} />
      <img src={cubBigBlog} className={styles.cubAppsBlogCenter2} />
      <img src={cubBlog} className={styles.cubAppsCenter2} />
      <img src={ecosystemMain4} className={styles.keyAppsRight4} />
      <img src={ecosystemMain5} className={styles.keyAppsRight5} />
      <img src={ecosystemMain6} className={styles.keyAppsRight6} />
      <img src={cubBigBlog} className={styles.cubAppsBlogRight} />
      <img src={cubBlog} className={styles.cubAppsRight} />

      <div className={styles.texts}>
        <div className={styles.title}>
          <span className={styles.titleLine}>Coming Soon</span>
        </div>
      </div>

      <Navigation />
      <div className={styles.socialMedia}>
        <SocialMedia />
      </div>
    </section>
  );
};

export default mainApps;
