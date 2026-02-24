const getRateLimitData = () => {
  try {
    return JSON.parse(localStorage.getItem('formSubmissionLimits')) || {};
  } catch (e) {
    console.log(e);
    return;
  }
};

const updateRateLimit = (key) => {
  try {
    const now = Date.now();
    const data = getRateLimitData();

    if (!data[key]) {
      data[key] = { count: 1, timestamp: now };
    } else {
      if (now - data[key].timestamp > 3600000) {
        data[key] = { count: 1, timestamp: now };
      } else {
        data[key].count += 1;
        data[key].timestamp = now;
      }
    }

    localStorage.setItem('formSubmissionLimits', JSON.stringify(data));
    return data[key].count;
  } catch (e) {
    console.error('Rate limit error:', e);
    return 1;
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  const disposableDomains = [
    'tempmail.com',
    'throwawaymail.com',
    'mailinator.com',
    'guerrillamail.com',
    'yopmail.com',
    'temp-mail.org',
  ];

  const domain = email.split('@')[1].toLowerCase();
  return !disposableDomains.includes(domain);
};

async function submitCommunityForm(formData, metadata = {}) {
  if (!validateEmail(formData.email)) {
    throw new Error('Please enter a valid email address');
  }

  if (metadata.honeypot && metadata.honeypot.length > 0) {
    throw new Error('Form submission failed');
  }

  if (metadata.formOpenTime && Date.now() - metadata.formOpenTime < 2000) {
    throw new Error('Your submission was too quick. Please try again.');
  }

  const submissionCount = updateRateLimit('community_form');
  if (submissionCount > 5) {
    throw new Error('Submission limit reached. Please try again later.');
  }

  try {
    const payload = {
      email: formData.email,
      name: formData.name,
      country: formData.country,
      interests: formData.interests.join(', '),
      subscribe_to_marketing: formData.agreeMarketing,
      submitted_at: new Date().toISOString(),
      form_submit_speed: metadata.formOpenTime
        ? Date.now() - metadata.formOpenTime
        : null,
      user_agent: navigator.userAgent,
      submission_count: submissionCount,
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id: Date.now(), ...payload };
  } catch (error) {
    console.error('Error submitting community form:', error);
    throw error;
  }
}

async function subscribeToNewsletter(email, metadata = {}) {
  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address');
  }

  if (metadata.honeypot && metadata.honeypot.length > 0) {
    throw new Error('Form submission failed');
  }

  const submissionCount = updateRateLimit('newsletter');
  if (submissionCount > 3) {
    throw new Error('Subscription limit reached. Please try again later.');
  }

  try {
    const payload = {
      email: email,
      subscribed_at: new Date().toISOString(),
      form_submit_speed: metadata.formOpenTime
        ? Date.now() - metadata.formOpenTime
        : null,
      user_agent: navigator.userAgent,
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id: Date.now(), ...payload };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}

export const FormGateway = { submitCommunityForm, subscribeToNewsletter };
