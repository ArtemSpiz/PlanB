import { ReactSVG } from 'react-svg';

import bottomLeft from '@/assets/icons/bot-left.svg';
import bottomRight from '@/assets/icons/bot-right.svg';
import topLeft from '@/assets/icons/top-left.svg';
import topRight from '@/assets/icons/top-right.svg';
import cardTop from '@/assets/icons/faq-card-top.svg';
import cardBottom from '@/assets/icons/faq-card-bottom.svg';
import cardSmall from '@/assets/icons/faq-card-small.svg';
import cardSmallActive from '@/assets/icons/faq-card-small-active.svg';
import styles from '@/components/blocks/FAQCard/FAQCard.module.scss';

const FAQCard = ({ card, isActive, isSmall }) => {
  const getCardClass = () => {
    if (isSmall) {
      return isActive ? styles.cardSmallActive : styles.cardSmall;
    }

    return isActive ? styles.cardActive : styles.card;
  };

  return (
    <div className={getCardClass()}>
      <h3 className={styles.question}>{card.question}</h3>
      {isSmall && (
        <>
          <ReactSVG className={styles.cardSmallBg} src={cardSmall} />
          {isActive && (
            <ReactSVG className={styles.cardSmallBg} src={cardSmallActive} />
          )}
        </>
      )}

      {!isSmall && (
        <>
          <ReactSVG className={styles.cardBgTop} src={cardTop} />
          <ReactSVG className={styles.cardBgBottom} src={cardBottom} />
          <div className={styles.block}>
            <p className={styles.answer}>{card.answer}</p>
            <ReactSVG className={styles.blockIconTl} src={topLeft} />
            <ReactSVG className={styles.blockIconTr} src={topRight} />
            <ReactSVG className={styles.blockIconBr} src={bottomRight} />
            <ReactSVG className={styles.blockIconBl} src={bottomLeft} />
          </div>
          <h5 className={styles.type}>FAQ</h5>
        </>
      )}
    </div>
  );
};

export default FAQCard;
