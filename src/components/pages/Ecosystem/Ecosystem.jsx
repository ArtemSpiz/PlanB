import Main from '@/components/sections/appsSections/mainApps/mainApps.jsx';
import Apps from '@/components/sections/appsSections/apps/Apps.jsx';
import ReadyToExperience from '@/components/sections/ReadyToExperience/ReadyToExperience.jsx';

import styles from '@/components/pages/Ecosystem/Ecosystem.module.scss';

const EcosystemPage = () => {
  return (
    <div className={`${styles.ecosystem} container`}>
      <Main />
      <Apps />
      <ReadyToExperience />
    </div>
  );
};

export default EcosystemPage;
