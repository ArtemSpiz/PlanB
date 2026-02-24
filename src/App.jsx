import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/layouts/Header/Header.jsx';
import Main from '@/components/pages/Main/Main.jsx';

import Footer from '@/components/layouts/Footer/Footer.jsx';
import Community from '@/components/ui/Forms/Community/Community.jsx';
import PrivacyPolicy from '@/components/ui/Forms/PrivacyPolicy/PrivacyPolicy.jsx';
import TermsAndConditions from '@/components/ui/Forms/TermsAndConditions/TermsAndConditions.jsx';
import { useModal } from '@/context/ModalContext.jsx';
import EcosystemPage from './components/pages/Ecosystem/Ecosystem';
import Blog from './components/pages/Blog/Blog';
import BlogCategory from '@/components/pages/BlogCategory/BlogCategory.jsx';
import ComingSoon from './components/pages/ComingSoon/ComingSoon';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/blog" element={<Blog />} index />
        <Route path="/blog/:slug" element={<BlogCategory />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
      <Footer />
      <ModalWrapper />
    </>
  );
}

const ModalWrapper = () => {
  const { modalType, closeModal } = useModal();
  if (!modalType) return null;

  const MODAL_COMPONENTS = {
    community: Community,
    privacyPolicy: PrivacyPolicy,
    termsAndConditions: TermsAndConditions,
  };

  const ModalComponent = MODAL_COMPONENTS[modalType];

  return ModalComponent ? <ModalComponent onClose={closeModal} /> : null;
};

export default App;
