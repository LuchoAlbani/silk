import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";
import { getBlogs } from "../../services/blogService";
import type { Blog } from "../../services/blogService";

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const blogRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await getBlogs();
      setBlogs(blogsData);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (blogRef.current) {
      observer.observe(blogRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + blogs.length) % blogs.length);
  };

  const getVisibleBlogs = () => {
    if (blogs.length <= itemsPerPage) return blogs;

    const visible = [];
    for (let i = 0; i < itemsPerPage; i++) {
      visible.push(blogs[(currentIndex + i) % blogs.length]);
    }
    return visible;
  };

  return (
    <div ref={blogRef} className={`${styles.blog} ${isVisible ? styles.fadeIn : ""}`}>
      <h2>
        <span style={{ fontFamily: "VeryVogueText" }}>Lo</span>{" "}
        <em style={{ fontFamily: "VeryVogueTextItalic" }}>último</em>{" "}
        <span style={{ fontFamily: "VeryVogueText" }}>de nuestro blog</span>
      </h2>

      <div className={styles.blogCarousel} aria-live="polite">
        <button className={styles.carouselButton} onClick={prevSlide} aria-label="Ver anteriores">
          ◀
        </button>

        {getVisibleBlogs().map((blog) => (
          <Link key={blog.id} to={`/bloggers/${blog.id}`} className={styles.blogLink}>
            <div className={styles.blogItem}>
              <img src={blog.img} alt={blog.title} />
              <div className={styles.blogCategory}>{blog.category}</div>
              <h3>{blog.title}</h3>
              <p className={styles.blogAuthor}>BY {blog.author.toUpperCase()}</p>
            </div>
          </Link>
        ))}

        <button className={styles.carouselButton} onClick={nextSlide} aria-label="Ver siguientes">
          ▶
        </button>
      </div>
    </div>
  );
};

export default Blog;
