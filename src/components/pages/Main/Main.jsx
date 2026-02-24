import { useAutoScrollToSection } from '@/utils/hooks/useAutoScrollToSection.js';
import Cube from '@/components/sections/Cube/Cube.jsx';
import Benefits from '@/components/sections/Benefits/Benefits.jsx';
import Features from '@/components/sections/Features/Features.jsx';
import WhoIsItFor from '@/components/sections/WhoIsItFor/WhoIsItFor.jsx';
import HowItWorks from '@/components/sections/HowItWorks/HowItWorks.jsx';
import FAQ from '@/components/sections/FAQ/FAQ.jsx';
import EcosystemSection from '@/components/sections/EcosystemSection/EcosystemSection.jsx';
import InsightsUpdates from '@/components/sections/InsightsUpdates/InsightsUpdates.jsx';
import ReadyToExperience from '@/components/sections/ReadyToExperience/ReadyToExperience.jsx';
import styles from '@/components/pages/Main/Main.module.scss';

const Main = () => {
  const sectionsRef = useAutoScrollToSection();

  return (
    <main className={`${styles.main} container`}>
      <div ref={(el) => (sectionsRef.current[0] = el)}>
        <Cube />
      </div>
      <div ref={(el) => (sectionsRef.current[1] = el)}>
        <Benefits />
      </div>
      <div ref={(el) => (sectionsRef.current[2] = el)}>
        <Features />
      </div>
      <div ref={(el) => (sectionsRef.current[3] = el)}>
        <WhoIsItFor />
      </div>
      <HowItWorks />
      <FAQ />
      <EcosystemSection />
      <InsightsUpdates />
      <ReadyToExperience />
    </main>
  );
};

export default Main;
