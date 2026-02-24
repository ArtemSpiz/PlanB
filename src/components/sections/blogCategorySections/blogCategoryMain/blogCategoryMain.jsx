import styles from "@/components/sections/blogCategorySections/blogCategoryMain/blogCategoryMain.module.scss";

const blogCategoryMain = ({ blogItem }) => {
  if (!blogItem) return null;

  return (
    <section id="blogCategoryMain-section" className={styles.section}>
      <div
        className={styles.blogCategoryMain}
        style={{
          backgroundImage: `url(${blogItem.categoryImage})`,
          backgroundPosition: "center",
        }}
      >
        <div className={styles.texts}>
          <div className={styles.subtitles}>
            <div className={styles.category}>{blogItem.category}</div>
            <div className={styles.time}>{blogItem.timeToRead}</div>
          </div>
          <div className={styles.title}>{blogItem.title}</div>
        </div>
      </div>
    </section>
  );
};

export default blogCategoryMain;
