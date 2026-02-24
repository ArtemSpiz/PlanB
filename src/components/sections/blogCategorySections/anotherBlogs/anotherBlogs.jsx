import styles from '@/components/sections/blogCategorySections/anotherBlogs/anotherBlogs.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cardImage from '../../../../assets/images/blogImage.png';
import { useNavigate } from 'react-router-dom';
import { BlogGateway } from '../../../../api/blog/blog-gateway';
import OptimizedImage from '../../../OptimizedImage';
import { NavLink } from 'react-router';

const AnotherBlogs = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
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

  const date = blogs.date_created;

  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const currentBlog = blogs.find(
    (blog) => blog.slug?.toLowerCase() === slug?.toLowerCase()
  );

  const category = currentBlog?.category;

  const relatedBlogs = currentBlog
    ? blogs
        .filter(
          (blog) =>
            blog.slug !== slug &&
            Array.isArray(blog.category) &&
            blog.category.some((cat) => category.includes(cat))
        )
        .slice(0, 3)
    : [];

  if (error) {
    return <div className="blogs-section">Error loading blogs: {error}</div>;
  }

  if (!currentBlog) {
    return <div className="blogs-section">Loading...</div>;
  }

  return (
    <section id="anotherBlogs-section" className={styles.section}>
      <div className={styles.anotherBlogs}>
        {relatedBlogs.map((blog) => (
          <NavLink
            to={`/blog/${encodeURIComponent(blog.slug)}`}
            state={{ blog: blogs }}
            key={blog.slug}
            style={{ textDecoration: 'none' }}
            className={styles.blog}
          >
            <img className={styles.blogImageLeft} src={cardImage} alt="left" />
            <div className={styles.blogContent}>
              <div className={styles.blogImage}>
                <div className={styles.category}>{blog.category}</div>
                <OptimizedImage
                  className={styles.blogImg}
                  src={blog.image?.url || blog.image || ''}
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
        ))}
      </div>
    </section>
  );
};

export default AnotherBlogs;
