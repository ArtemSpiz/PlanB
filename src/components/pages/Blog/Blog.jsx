import BlogMain from '@/components/sections/blogSections/blogMain/blogMain.jsx';
import BlogsSection from '@/components/sections/blogSections/BlogsSection/BlogsSection.jsx';
import ReadyToExperience from '@/components/sections/ReadyToExperience/ReadyToExperience.jsx';

import styles from '@/components/pages/Blog/Blog.module.scss';

const Blog = () => {
  return (
    <div className={`${styles.blog} container`}>
      <BlogMain />
      <BlogsSection />
      <ReadyToExperience />
    </div>
  );
};

export default Blog;
