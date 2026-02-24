import { ReactSVG } from 'react-svg';
import { useState, useRef } from 'react';
import Button from '@/components/ui/Button/Button';
import SocialMedia from '@/components/ui/SocialMedia/SocialMedia';
import { useModal } from '@/context/ModalContext.jsx';
import { MENU } from '@/data/header.js';
import { FormGateway } from '../../../api/form/form-gateway';
import envelope from '@/assets/icons/envelope.svg';
import logo from '@/assets/icons/logo.svg';
import styles from '@/components/layouts/Footer/Footer.module.scss';

const Footer = () => {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [error, setError] = useState(null);

  const formOpenTime = useRef(Date.now());
  const formRef = useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleHoneypotChange = (e) => {
    setHoneypot(e.target.value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const metadata = {
        formOpenTime: formOpenTime.current,
        honeypot: honeypot,
      };

      await FormGateway.subscribeToNewsletter(email, metadata);
      setSubscribeSuccess(true);
      setEmail('');

      setTimeout(() => {
        setSubscribeSuccess(false);
      }, 5000);
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to subscribe. Please try again later.');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <ReactSVG className={styles.logo} src={logo} />
        <SocialMedia
          styles={{
            position: 'relative',
            flexDirection: 'row',
            right: 0,
            top: 0,
            justifyContent: 'start',
          }}
        />
      </div>
      <div className={styles.navigation}>
        {MENU.map((menuItem, index) => (
          <div key={index}>
            <h3 className={styles.name}>{menuItem.name}</h3>
            <ul className={styles.list}>
              {menuItem.subMenu
                ? menuItem.subMenu.map((subItem, subIndex) => (
                    <li className={styles.item} key={subIndex}>
                      <a className={styles.link} href={subItem.link}>
                        {subItem.name}
                      </a>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.info}>
        <div className={styles.content}>
          <h3 className={styles.title}>Subscribe to our newsletters!</h3>
          <form
            ref={formRef}
            onSubmit={handleSubscribe}
            className={styles.subscribeForm}
          >
            <div className={styles.field}>
              <input
                className={styles.input}
                type="email"
                placeholder="Your email"
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting || subscribeSuccess}
              />
              <Button
                icon={envelope}
                type={'primary'}
                className={styles.button}
                onClick={handleSubscribe}
                disabled={isSubmitting || subscribeSuccess}
              />
            </div>

            <div style={{ display: 'none' }}>
              <input
                type="text"
                name="url"
                value={honeypot}
                onChange={handleHoneypotChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {error && <div className={styles.subscribeError}>{error}</div>}
            {subscribeSuccess && (
              <div className={styles.subscribeSuccess}>
                Successfully subscribed to newsletter!
              </div>
            )}
          </form>
        </div>
        <div className={styles.terms}>
          <div className={styles.links}>
            <span onClick={() => openModal('termsAndConditions')}>
              Terms of Use
            </span>
            <span>|</span>
            <span onClick={() => openModal('privacyPolicy')}>
              Privacy Policy
            </span>
          </div>
          <h4 className={styles.copyright}>©Plan B 2025</h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
