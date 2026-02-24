import { ReactSVG } from 'react-svg';

import { MEDIA } from '@/components/ui/SocialMedia/socialMedia.data';
import styles from '@/components/ui/SocialMedia/SocialMedia.module.scss';

const SocialMedia = ({ styles: customStyles }) => {
  return (
    <div className={styles.socialMedia} style={customStyles}>
      {MEDIA.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ReactSVG src={item.icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
