import { ReactSVG } from 'react-svg';

import topLeft from '@/assets/icons/top-left.svg';
import topRight from '@/assets/icons/top-right.svg';
import bottomRight from '@/assets/icons/bot-right.svg';
import bottomLeft from '@/assets/icons/bot-left.svg';
import styles from '@/components/blocks/InsightsUpdatesCard/InsightsUpdatesCard.module.scss';
import OptimizedImage from '../../OptimizedImage';
import { NavLink } from 'react-router';

const InsightsUpdatesCard = ({ card }) => {
  return (
    <NavLink
      to={`/blog/${encodeURIComponent(card.slug)}`}
      key={card.id}
      style={{ textDecoration: 'none' }}
      className={styles.card}
    >
      <OptimizedImage
        className={styles.image}
        src={card.image}
        width="100%"
        height="auto"
        alt="image"
      />
      <div className={styles.content}>
        <p className={styles.title}>{card.title}</p>
        <p className={styles.description}>{card.description}</p>
      </div>
      <ReactSVG
        className={`${styles.iconBorder} ${styles.iconBorderTl}`}
        src={topLeft}
      />
      <ReactSVG
        className={`${styles.iconBorder} ${styles.iconBorderTr}`}
        src={topRight}
      />
      <ReactSVG
        className={`${styles.iconBorder} ${styles.iconBorderBr}`}
        src={bottomRight}
      />
      <ReactSVG
        className={`${styles.iconBorder} ${styles.iconBorderBl}`}
        src={bottomLeft}
      />
    </NavLink>
  );
};

export default InsightsUpdatesCard;
