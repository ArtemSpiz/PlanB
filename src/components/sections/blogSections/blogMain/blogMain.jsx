import styles from '@/components/sections/blogSections/blogMain/blogMain.module.scss';
import cubBigBlog from '../../../../assets/images/cubBigBlog.png';
import cubBlog from '../../../../assets/images/cubBlog.png';
import leftCardBlog from '../../../../assets/images/leftCardBlog.png';
import leftBigCardBlog from '../../../../assets/images/leftBigCardBlog.png';

import SocialMedia from '@/components/ui/SocialMedia/SocialMedia.jsx';
import Navigation from '@/components/ui/Navigation/Navigation.jsx';

const blogMain = () => {
  const images = [
    { className: styles.cubLeft, src: cubBlog },
    { className: styles.bigCubLeft, src: cubBigBlog },
    { className: styles.cubLeftBot, src: cubBlog },
    { className: styles.cardLeft, src: leftCardBlog },
    { className: styles.bigCardLeft, src: leftBigCardBlog },
    { className: styles.cubCenter, src: cubBlog },
    { className: styles.bigCubCenter, src: cubBigBlog },
    { className: styles.bigCardRight, src: leftBigCardBlog },
    { className: styles.cardRight, src: leftCardBlog },
    { className: styles.cubRight, src: cubBlog },
    { className: styles.bigCubRight, src: cubBigBlog },
    { className: styles.bigCubRightMob, src: cubBigBlog },
    { className: styles.cubRightSec, src: cubBlog },
  ];
  return (
    <section id="blogMain-section" className={styles.section}>
      {images.map((img, index) => (
        <img key={index} className={img.className} src={img.src} />
      ))}
      <div className={styles.texts}>
        <div className={styles.title}>Blockchain Insights</div>
        <div className={styles.subtitle}>
          Explore a secure ecosystem and discover projects harnessing Plan B
          Accounts
        </div>
      </div>

      <Navigation />
      <div className={styles.socialMedia}>
        <SocialMedia />
      </div>
    </section>
  );
};

export default blogMain;
