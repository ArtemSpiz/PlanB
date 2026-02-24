import styles from '@/components/sections/blogCategorySections/blogCategory/blogCategory.module.scss';
import SocialMedia from '@/components/ui/SocialMedia/SocialMedia.jsx';
import BlogCategoryMain from '@/components/sections/blogCategorySections/blogCategoryMain/blogCategoryMain.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlogGateway } from '../../../../api/blog/blog-gateway';

const BlogCategoryContent = () => {
  const { slug } = useParams();
  const [blogItem, setBlogItem] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('blog-main');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setError('No category slug provided');
      setLoading(false);
      return;
    }

    BlogGateway.getPost(slug)
      .then((data) => {
        if (!data) {
          setError('No blog data received');
        } else {
          setBlogItem(data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch blog post:', err);
        setError('Failed to fetch blog post');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (!blogItem?.content) return;

    try {
      const headingRegex = /<(h[1-3])[^>]*>(.*?)<\/\1>/gi;
      const extractedHeadings = [];
      let match;

      const tempDiv = document.createElement('div');

      while ((match = headingRegex.exec(blogItem.content)) !== null) {
        tempDiv.innerHTML = match[2];
        const headingText = tempDiv.textContent.trim();

        if (headingText && headingText.length > 1) {
          const index = extractedHeadings.length;
          const headerId = `section-${index}-${headingText.toLowerCase().replace(/\s+/g, '-')}`;

          extractedHeadings.push({
            id: headerId,
            title: headingText,
          });
        }
      }

      setHeadings(extractedHeadings);
    } catch (err) {
      console.error('Error extracting headings:', err);
      setError('Failed to process content');
    }
  }, [blogItem]);

  useEffect(() => {
    if (headings.length === 0) return;

    const contentWithIds = headings.reduce((content, heading) => {
      const headingRegex = new RegExp(
        `<(h[1-3])[^>]*>(${heading.title})</\\1>`,
        'i'
      );
      return content.replace(headingRegex, `<$1 id="${heading.id}">$2</$1>`);
    }, blogItem?.content || '');

    if (contentWithIds !== blogItem?.content && blogItem) {
      const contentElement = document.querySelector(`.${styles.content}`);
      if (contentElement) {
        contentElement.innerHTML = contentWithIds;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeaders = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleHeaders.length > 0) {
          setActiveId(visibleHeaders[0].target.id);
        } else if (window.scrollY < 200) {
          setActiveId('blog-main');
        }
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    // Observe the main section and all heading sections
    const mainElement = document.getElementById('blog-main');
    if (mainElement) observer.observe(mainElement);

    // Observe heading elements once they're in the DOM
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings, blogItem]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="blogCategory">Loading...</div>;
  if (error) return <div className="blogCategory">Error: {error}</div>;
  if (!blogItem) return <div className="blogCategory">No blog item found</div>;

  return (
    <div className={styles.blogCategoryItem}>
      <div id="blog-main">
        <BlogCategoryMain blogItem={blogItem} />
      </div>

      <section id="blogCategory-section" className={styles.section}>
        <div className={styles.blogCategory}>
          <div className={styles.scroll}>
            <div className={styles.scrollContainer}>
              <div className={styles.title}>Table of Content</div>
              <hr className={styles.line} />

              <div className={styles.subtitles}>
                <div
                  className={`${styles.subtitle} ${activeId === 'blog-main' ? styles.activeSubtitle : ''}`}
                  onClick={() => {
                    setActiveId('blog-main');
                    scrollToSection('blog-main');
                  }}
                >
                  {blogItem.title}
                </div>

                {headings.map(({ id, title }) => (
                  <div
                    className={`${styles.subtitle} ${activeId === id ? styles.activeSubtitle : ''}`}
                    key={id}
                    onClick={() => scrollToSection(id)}
                  >
                    {title}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: blogItem.content }}
          ></div>
        </div>

        <div className={styles.socialMedia}>
          <SocialMedia />
        </div>
      </section>
    </div>
  );
};

export default BlogCategoryContent;
