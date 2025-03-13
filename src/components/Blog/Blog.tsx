import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";
import { blogItems } from "../data/blogData";

const Blog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      blogItems.length <= itemsPerPage ? 0 : (prevIndex + 1) % blogItems.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      blogItems.length <= itemsPerPage ? 0 : (prevIndex - 1 + blogItems.length) % blogItems.length
    );
  };

  return (
    <div className={styles.blog}>
      <h2>
        Lo <em>último</em> de nuestro blog
      </h2>
      <div className={styles.blogCarousel} aria-live="polite">
        <button
          className={styles.carouselButton}
          onClick={prevSlide}
          aria-label="Ver artículos anteriores"
        >
          &lt;
        </button>

        {blogItems.slice(currentIndex, currentIndex + itemsPerPage).map((blog) => (
          <Link key={blog.id} to={`/bloggers/${blog.id}`} className={styles.blogLink}>
            <div className={styles.blogItem}>
              <img src={blog.img} alt={blog.title} />
              <div className={styles.blogCategory}>{blog.category}</div>
              <h3>{blog.title}</h3>
              <p>{blog.author}</p>
            </div>
          </Link>
        ))}

        <button
          className={styles.carouselButton}
          onClick={nextSlide}
          aria-label="Ver artículos siguientes"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Blog;
