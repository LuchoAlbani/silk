import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Bloggers.module.css";
import { getBlogs, Blog } from "../../services/blogService";

const Bloggers: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await getBlogs();
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  return (
    <div className={styles.bloggersPage}>
      <div className={styles.bloggers}>
        <h2 className={styles.bloggersTitle}>Bloggers</h2>
        <div className={styles.bloggersList}>
          {blogs.map((blogger) => (
            <Link to={`/bloggers/${blogger.id}`} key={blogger.id} className={styles.bloggerItem}>
              <div className={styles.imageWrapper}>
                <img src={blogger.img} alt={blogger.title} className={styles.bloggerImage} />
                {blogger.category && <div className={styles.bloggerCategory}>{blogger.category}</div>}
              </div>
              <div className={styles.bloggerInfo}>
                <h3 className={styles.bloggerTitle}>{blogger.title}</h3>
                <p className={styles.bloggerAuthor}>{blogger.author}</p>
                {blogger.date && <p className={styles.bloggerDate}>{blogger.date}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bloggers;
