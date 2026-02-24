import { useModal } from '@/context/ModalContext.jsx';
import styles from '@/components/ui/Forms/PrivacyPolicy/PrivacyPolicy.module.scss';

const PrivacyPolicy = () => {
  const { closeModal } = useModal();

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.form}>
        <div className={styles.top}>
          <h2 className={styles.title}>Privacy Policy</h2>
          <span className={styles.closeIcon} onClick={closeModal}>
            X
          </span>
        </div>
        <div>
          <ul className={styles.content}>
            <li>
              <span className={styles.name}>Introduction</span>
              <p className={styles.subTitle}>
                Welcome to Plan B Sable ("we," "our," or "us"). Your privacy is
                important to us. This Privacy Policy outlines how we collect,
                use, and protect your personal information when you use our
                website https://planb-labs.com/ (the "Website").
              </p>
            </li>
            <li>
              <span className={styles.name}>Information We Collect</span>
              <p className={styles.subTitle}>
                We may collect the following types of information:
              </p>
              <ul className={styles.list}>
                <li className={styles.description}>
                  Personal Information: Name, email address, phone number, and
                  other contact details when you voluntarily provide them.
                </li>
                <li className={styles.description}>
                  Usage Data: Information about your interaction with our
                  Website, including IP address, browser type, pages visited,
                  and time spent.
                </li>
                <li className={styles.description}>
                  Cookies and Tracking Technologies: We use cookies and similar
                  technologies to enhance your experience and analyze usage
                  patterns.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>How We Use Your Information</span>
              <p className={styles.subTitle}>
                We use the collected information to:
              </p>
              <ul className={styles.list}>
                <li className={styles.description}>
                  Provide, maintain, and improve our services.
                </li>
                <li className={styles.description}>
                  Communicate with you regarding inquiries or updates
                </li>
                <li className={styles.description}>
                  Personalize user experience and optimize Website
                  functionality.
                </li>
                <li className={styles.description}>
                  Analyze trends and improve security measures.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>Sharing of Information</span>
              <p className={styles.subTitle}>
                We do not sell, rent, or trade your personal information.
                However, we may share it in the following circumstances:
              </p>
              <ul className={styles.list}>
                <li className={styles.description}>
                  Service Providers: Third-party vendors assisting us with
                  Website functionality, analytics, or customer support.
                </li>
                <li className={styles.description}>
                  Legal Compliance: If required by law or to protect our rights
                  and the safety of users.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>Data Security</span>
              <p className={styles.subTitle}>
                We implement appropriate technical and organizational measures
                to safeguard your personal information. However, no method of
                transmission over the Internet is 100% secure.
              </p>
            </li>
            <li>
              <span className={styles.name}>Third-Party Links</span>
              <p className={styles.subTitle}>
                Our Website may contain links to third-party websites. We are
                not responsible for their privacy practices, and we encourage
                you to review their privacy policies.
              </p>
            </li>
            <li>
              <span className={styles.name}>Your Rights</span>
              <p className={styles.subTitle}>
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className={styles.list}>
                <li className={styles.description}>
                  Access, correct, or delete your personal data.
                </li>
                <li className={styles.description}>
                  Opt out of certain data processing activities.
                </li>
                <li className={styles.description}>
                  Withdraw consent where applicable.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>
                Changes to This Privacy Policy
              </span>
              <p className={styles.subTitle}>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated effective date.
              </p>
            </li>
            <li>
              <span className={styles.name}>Contact Us</span>
              <p className={styles.subTitle}>
                If you have any questions about this Privacy Policy, please
                contact us at contact@planb-labs.com..
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
