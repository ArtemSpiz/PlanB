import styles from '@/components/sections/appsSections/apps/Apps.module.scss';
import categories from '../../../../assets/images/categories.png';
import arrow from '../../../../assets/images/catarow.png';
import tags from '../../../../assets/images/Tags.png';
import Search from '../../../../assets/images/Search.png';
import cardImage from '../../../../assets/images/cardImage.png';
import { useEffect, useState } from 'react';
import { AppsGateway } from '../../../../api/blog/apps-gateway';
import OptimizedImage from '../../../OptimizedImage';

const Apps = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [showTags, setShowTags] = useState(false);

  const [apps, setApps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const appsData = await AppsGateway.getPostsPreview();
        setApps(Array.isArray(appsData) ? appsData : []);
      } catch (error) {
        console.error('Failed to fetch apps:', error);
        setError(error.message);
        setApps([]);
      }
    };

    fetchApps();
  }, []);

  const handleSearch = () => {
    setFilter(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length === 0 || value.length >= 3) {
      setFilter(value);
    }
    setSelectedCategory('');
    setSelectedTag('');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedTag('');
    setSearchTerm('');
    setShowCategories(false);
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setSelectedCategory('');
    setSearchTerm('');
    setShowTags(false);
  };

  const categoriesList = [
    ...new Set(
      apps.flatMap((card) =>
        Array.isArray(card.category) ? card.category : [card.category]
      )
    ),
  ];

  const tagsList = [
    ...new Set(
      apps.flatMap((card) =>
        Array.isArray(card.tags) ? card.tags : [card.tags]
      )
    ),
  ];

  const filteredCards = apps.filter((card) => {
    const lowerCaseFilter = filter.toLowerCase();

    if (selectedCategory) {
      return Array.isArray(card.category)
        ? card.category.includes(selectedCategory)
        : card.category === selectedCategory;
    }
    if (selectedTag) {
      return Array.isArray(card.tags)
        ? card.tags.includes(selectedTag)
        : card.tags === selectedTag;
    }
    if (filter) {
      return card.title.toLowerCase().includes(lowerCaseFilter);
    }

    return true;
  });

  if (error) {
    return <div>Error loading blogs: {error}</div>;
  }

  return (
    <section id="Apps-section" className={styles.section}>
      <div className={styles.appsContainer}>
        <div className={styles.filter}>
          <div className={styles.filterDropDown}>
            <div className={styles.categories}>
              <div className={styles.left}>
                <img
                  className={styles.categoriesImg}
                  src={categories}
                  alt="categories"
                />
                <div className={styles.text}>Categories</div>
              </div>
              <img
                className={`${styles.arrowImg} ${showCategories ? styles.rotated : ''}`}
                src={arrow}
                alt="arrow"
                onClick={() => setShowCategories(!showCategories)}
              />

              {showCategories && (
                <div className={styles.dropdown}>
                  {categoriesList.map((cat, index) => (
                    <div
                      className={styles.dropdownTitle}
                      key={index}
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.categories}>
              <div className={styles.left}>
                <img className={styles.categoriesImg} src={tags} alt="tags" />
                <div className={styles.text}>Tags</div>
              </div>
              <img
                className={`${styles.arrowImg} ${showTags ? styles.rotated : ''}`}
                src={arrow}
                alt="arrow"
                onClick={() => setShowTags(!showTags)}
              />

              {showTags && (
                <div className={styles.dropdown}>
                  {tagsList.map((tag, index) => (
                    <div
                      className={styles.dropdownTitle}
                      key={index}
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.Search}>
            <img
              className={styles.SearchImg}
              src={Search}
              alt="search"
              onClick={handleSearch}
            />
            <input
              className={styles.textInput}
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className={styles.cards}>
          {filteredCards.map((card, index) => (
            <a
              className={styles.card}
              key={index}
              href={card.links}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.cardImageLeft}
                src={cardImage}
                alt="left"
              />
              <div className={styles.cardContainer}>
                <div className={styles.cardContainerContent}>
                  <OptimizedImage
                    className={styles.cardImg}
                    src={card.logo}
                    alt={card.title}
                    width="100%"
                    height="auto"
                  />

                  <div className={styles.texts}>
                    <div className={styles.title}>{card.title}</div>
                    <div className={styles.text}>{card.description}</div>
                  </div>
                </div>
                <div className={styles.btns}>
                  <div className={styles.leftBtn}>{card.tags}</div>
                  <div className={styles.rightBtn}>{card.category}</div>
                </div>
              </div>
              <img
                className={styles.cardImageRight}
                src={cardImage}
                alt="right"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Apps;
