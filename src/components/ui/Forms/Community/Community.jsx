import { useState, useEffect, useRef } from 'react';
import { useModal } from '@/context/ModalContext.jsx';
import Button from '@/components/ui/Button/Button.jsx';
import { FormGateway } from '../../../../api/form/form-gateway';
import styles from '@/components/ui/Forms/Community/Community.module.scss';

const interests = [
  'DeFi',
  'Gaming',
  'Art & Culture',
  'Development',
  'Events',
  'Venture Capital',
  'Enterprise',
  'Policy',
  'Other',
];

const Community = () => {
  const { closeModal } = useModal();
  const formOpenTime = useRef(Date.now());
  const hasInteracted = useRef(false);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    country: '',
    interests: [],
    agreeMarketing: false,
    agreePrivacy: false,
  });

  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleInteraction = () => {
      hasInteracted.current = true;
    };

    form.addEventListener('mousemove', handleInteraction);
    form.addEventListener('click', handleInteraction);
    form.addEventListener('keydown', handleInteraction);

    return () => {
      form.removeEventListener('mousemove', handleInteraction);
      form.removeEventListener('click', handleInteraction);
      form.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'website') {
      setHoneypot(value);
      return;
    }

    if (type === 'checkbox' && name === 'interests') {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((interest) => interest !== value),
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const metadata = {
        formOpenTime: formOpenTime.current,
        hasUserInteraction: hasInteracted.current,
        honeypot: honeypot,
      };

      await FormGateway.submitCommunityForm(formData, metadata);
      setSubmitSuccess(true);

      setFormData({
        email: '',
        name: '',
        country: '',
        interests: [],
        agreeMarketing: false,
        agreePrivacy: false,
      });

      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to submit form. Please try again later.');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <form
        ref={formRef}
        className={styles.communityForm}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.top}>
          <h2 className={styles.title}>Join the community</h2>
          <span className={styles.closeIcon} onClick={closeModal}>
            X
          </span>
        </div>

        {submitSuccess ? (
          <div className={styles.successMessage}>
            <h3>Thank you for joining our community!</h3>
            <p>We`ve received your information and will be in touch soon.</p>
          </div>
        ) : (
          <div>
            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Main information</h4>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className={styles.input}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name or Pseudonym"
                className={styles.input}
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className={styles.input}
              />

              <div style={{ display: 'none' }}>
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={handleChange}
                  placeholder="Website"
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Interests</h4>
              <div className={styles.checkboxGrid}>
                {interests.map((interest) => (
                  <label key={interest} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleChange}
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.section}>
              <h4 className={styles.titleSuccess}>
                By checking the box below, you agree to receive marketing emails
                from the Plan B Chain.
              </h4>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onChange={handleChange}
                />
                I agree to receive marketing emails from The Plan B Chain.
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  required
                />
                I have reviewed the privacy policy and agree to allow The Plan B
                Chain to store and process my personal data.
              </label>
            </div>
          </div>
        )}

        {!submitSuccess && (
          <Button
            className={styles.subscribeBtn}
            name={isSubmitting ? 'Submitting...' : 'Subscribe'}
            disabled={isSubmitting}
          />
        )}
      </form>
    </div>
  );
};

export default Community;
