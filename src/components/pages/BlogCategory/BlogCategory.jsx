import ReadyToExperience from '@/components/sections/ReadyToExperience/ReadyToExperience.jsx';

import BlogCategoryContent from '@/components/sections/blogCategorySections/blogCategory/blogCategoryContent.jsx';
import AnotherBlogs from '@/components/sections/blogCategorySections/anotherBlogs/anotherBlogs.jsx';

const BlogCategory = () => {
  return (
    <div className={`container`}>
      <BlogCategoryContent />
      <AnotherBlogs />
      <ReadyToExperience />
    </div>
  );
};

export default BlogCategory;
