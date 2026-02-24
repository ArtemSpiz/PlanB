import styles from '@/components/sections/blogSections/BlogsSection/BlogsSection.module.scss';
import React, { useEffect, useState } from 'react';
import cardImage from '../../../../assets/images/blogImage.png';
import OptimizedImage from '../../../OptimizedImage';
import { NavLink } from 'react-router';
import { BlogGateway } from '../../../../api/blog/blog-gateway';

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const blogData = await BlogGateway.getPostsPreview();
        setBlogs(Array.isArray(blogData) ? blogData : []);
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setError(error.message);
        setBlogs([]);
      }
    };

    fetchNews();
  }, []);

  const categories = ['Blockchain', 'DeFi', 'Contracts', 'Crypto', 'Trends'];

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const date = blogs.date_created;

  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const filteredBlogs = activeCategory
    ? blogs.filter((blog) => blog.category?.includes(activeCategory))
    : blogs;

  if (error) {
    return <div className="blogs-section">Error loading blogs: {error}</div>;
  }
  return (
    <>
      <section id="BlogsSection-section" className={styles.section}>
        <div className={styles.sectionContainer}>
          <div className={styles.filter}>
            {categories.map((category, id) => (
              <div
                key={id}
                className={`${styles.category} ${category === activeCategory ? styles.activeCategory : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>

          <div className={styles.blogs}>
            {filteredBlogs.map(
              (blog) =>
                blog &&
                blog.slug && (
                  <NavLink
                    to={`/blog/${encodeURIComponent(blog.slug)}`}
                    state={{ blog: blogs }}
                    key={blog.slug}
                    className={styles.blog}
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      className={styles.blogImageLeft}
                      src={cardImage}
                      alt="left"
                    />
                    <div className={styles.blogContent}>
                      <div className={styles.blogImage}>
                        <div className={styles.category}>{blog.category}</div>

                        <OptimizedImage
                          className={styles.blogImg}
                          src={blog.image}
                          width="100%"
                          height="auto"
                          alt="blogImage"
                        />
                      </div>
                      <div className={styles.info}>
                        <div className={styles.texts}>
                          <div className={styles.title}>{blog.title}</div>
                          <div className={styles.text}>{blog.description}</div>
                        </div>

                        <div className={styles.date}>
                          <div className={styles.time}>{formatted}</div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="4"
                            height="5"
                            viewBox="0 0 4 5"
                            fill="none"
                          >
                            <circle cx="2" cy="2.5" r="2" fill="#363F45" />
                          </svg>
                          <div className={styles.time}>{blog.timeToRead}</div>
                        </div>
                      </div>
                    </div>
                    <img
                      className={styles.blogImageRight}
                      src={cardImage}
                      alt="right"
                    />
                  </NavLink>
                )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogsSection;
