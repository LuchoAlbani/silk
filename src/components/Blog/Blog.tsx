import React, { useState } from "react";
import styles from "./Blog.module.css";
import { blogItems } from "../data/blogData";

const Blog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= blogItems.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(blogItems.length - itemsPerPage, 0) : prevIndex - 1
    );
  };

  return (
    <div className={styles.blog}>
      <h2>
        Lo <em>último</em> de nuestro blog
      </h2>
      <div className={styles.blogCarousel}>
        <button className={styles.carouselButton} onClick={prevSlide}>
          &lt;
        </button>

        {blogItems
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map((blog, index) => (
            <div key={index} className={styles.blogItem}>
              <img src={blog.img} alt={blog.title} />
              <div className={styles.blogCategory}>{blog.category}</div>
              <h3>{blog.title}</h3>
              <p>{blog.author}</p>
            </div>
          ))}

        <button className={styles.carouselButton} onClick={nextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Blog;
