import { ReactSVG } from 'react-svg';
import styles from '@/components/ui/Button/Button.module.scss';

const Button = ({
  name,
  type = 'primary',
  className = '',
  onClick,
  isReverse = false,
  isDisabled = false,
  icon = null,
  ...props
}) => {
  const buttonClass = `
    ${styles.btn} 
    ${styles[`btn--${type}`]} 
    ${isDisabled ? styles.btnDisabled : ''}
    ${className}
  `;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={isDisabled}
      style={{ transform: isReverse ? 'rotate(180deg)' : 'none' }}
      {...props}
    >
      {icon && <ReactSVG className={styles.icon} src={icon} />}
      {name}
    </button>
  );
};

export default Button;
