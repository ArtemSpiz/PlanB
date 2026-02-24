import { useModal } from '@/context/ModalContext.jsx';
import styles from '@/components/ui/Forms/TermsAndConditions/TermsAndConditions.module.scss';

const TermsAndConditions = () => {
  const { closeModal } = useModal();

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.form}>
        <div className={styles.top}>
          <h2 className={styles.title}>Terms and Conditions</h2>
          <span className={styles.closeIcon} onClick={closeModal}>
            X
          </span>
        </div>
        <div>
          <ul className={styles.content}>
            <li>
              <span className={styles.name}>Introduction</span>
              <p className={styles.subTitle}>
                Welcome to Plan B Labs ("we," "our," or "us"). These Terms and
                Conditions ("Terms") govern your use of our website
                https://planb-labs.com/ (the "Website"). By accessing or using
                the Website, you agree to comply with and be bound by these
                Terms.
              </p>
            </li>
            <li>
              <span className={styles.name}>Use of the Website</span>
              <ul className={styles.list}>
                <li className={styles.description}>
                  You agree to use the Website only for lawful purposes and in
                  compliance with applicable laws and regulations.
                </li>
                <li className={styles.description}>
                  Unauthorized use, including attempting to gain unauthorized
                  access to the Website, is strictly prohibited.
                </li>
                <li className={styles.description}>
                  We reserve the right to suspend or terminate access to users
                  engaging in activities that violate these Terms.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>Intellectual Property</span>
              <ul className={styles.list}>
                <li className={styles.description}>
                  All content on the Website, including text, images, logos, and
                  graphics, is owned or licensed by us and protected under
                  intellectual property laws.
                </li>
                <li className={styles.description}>
                  You may not reproduce, distribute, or modify any content
                  without our prior written consent.
                </li>
                <li className={styles.description}>
                  Any unauthorized use of our intellectual property may result
                  in legal action.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>Limitation of Liability</span>
              <ul className={styles.list}>
                <li className={styles.description}>
                  We provide the Website on an "as-is" basis and make no
                  warranties regarding its availability, accuracy, or
                  reliability.
                </li>
                <li className={styles.description}>
                  To the fullest extent permitted by law, we disclaim any
                  liability for damages arising from your use of the Website.
                </li>
                <li className={styles.description}>
                  We are not responsible for any direct, indirect, incidental,
                  or consequential damages resulting from your access to or use
                  of the Website.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>Third-Party Links</span>
              <ul className={styles.list}>
                <li className={styles.description}>
                  The Website may contain links to third-party websites. We are
                  not responsible for their content, privacy practices, or any
                  damages resulting from their use.
                </li>
                <li className={styles.description}>
                  The Website may contain links to third-party websites. We are
                  not responsible for their content, privacy practices, or any
                  damages resulting from their use.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>User Responsibilities</span>
              <ul className={styles.list}>
                <li className={styles.description}>
                  Users must ensure that any information provided on the Website
                  is accurate and up to date.
                </li>
                <li className={styles.description}>
                  Any misuse of the Website, including spamming, hacking, or
                  spreading malicious content, is strictly prohibited.
                </li>
                <li className={styles.description}>
                  We reserve the right to take legal action against users
                  violating these terms.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>Termination</span>
              <ul className={styles.list}>
                <li className={styles.description}>
                  We reserve the right to terminate or suspend access to the
                  Website at our discretion, without prior notice, for any
                  violation of these Terms.
                </li>
                <li className={styles.description}>
                  Users who repeatedly violate the Terms may be permanently
                  banned from accessing the Website.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>Changes to These Terms</span>
              <ul className={styles.list}>
                <li className={styles.description}>
                  We may update these Terms from time to time. Any changes will
                  be posted on this page with an updated effective date.
                </li>
                <li className={styles.description}>
                  Continued use of the Website after changes are made
                  constitutes acceptance of the revised Terms.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>Governing Law</span>
              <ul className={styles.list}>
                <li className={styles.description}>
                  These Terms shall be governed by and construed in accordance
                  with the laws of [Your Jurisdiction].
                </li>
                <li className={styles.description}>
                  Any disputes arising from these Terms shall be resolved in the
                  appropriate courts within our jurisdiction.
                </li>
              </ul>
            </li>
            <li>
              <span className={styles.name}>Contact Us</span>
              <p className={styles.subTitle}>
                If you have any questions about these Terms, please contact us
                at contact@planb-labs.com.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
