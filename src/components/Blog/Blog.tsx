import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";
import { getBlogs } from "../../services/blogService";

import type { Blog } from "../../services/blogService"; // Importamos la interfaz

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await getBlogs();
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      blogs.length <= itemsPerPage ? 0 : (prevIndex + 1) % blogs.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      blogs.length <= itemsPerPage ? 0 : (prevIndex - 1 + blogs.length) % blogs.length
    );
  };

  return (
    <div className={styles.blog}>
      <h2>
        Lo <em>último</em> de nuestro blog
      </h2>
      <div className={styles.blogCarousel} aria-live="polite">
        <button className={styles.carouselButton} onClick={prevSlide} aria-label="Ver anteriores">
          &lt;
        </button>

        {blogs.slice(currentIndex, currentIndex + itemsPerPage).map((blog) => (
          <Link key={blog.id} to={`/bloggers/${blog.id}`} className={styles.blogLink}>
            <div className={styles.blogItem}>
              <img src={blog.img} alt={blog.title} />
              <div className={styles.blogCategory}>{blog.category}</div>
              <h3>{blog.title}</h3>
              <p>{blog.author}</p>
            </div>
          </Link>
        ))}

        <button className={styles.carouselButton} onClick={nextSlide} aria-label="Ver siguientes">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Blog;
