import React from "react";
import styles from "./Blog.module.css";

interface BlogItemType {
  img: string;
  category: string;
  title: string;
  author: string;
}

const blogItems: BlogItemType[] = [
  {
    img: "/images/blog_prueba_1.jpg",
    category: "STYLE",
    title: "Butter Yellow is hot!",
    author: "BY LUCAS CONTARDI",
  },
  {
    img: "/images/blog_prueba_2.jpg",
    category: "BEAUTY",
    title: "Title Censored",
    author: "BY MAGGIE CRUZ FREZZINI",
  },
  {
    img: "/images/blog_prueba_3.jpg",
    category: "CELEBRITY",
    title: "Taylor Swift vistiendo Versace",
    author: "BY LUCAS CONTARDI",
  },
];

const Blog: React.FC = () => {
  return (
    <div className={styles.blog}>
      <h2>
        Lo <em>último</em> de nuestro blog
      </h2>
      <div className={styles.blogCarousel}>
        <button className={styles.carouselButton}>&lt;</button>

        {blogItems.map((blog, index) => (
          <div key={index} className={styles.blogItem}>
            <img src={blog.img} alt={blog.title} />
            <div className={styles.blogCategory}>{blog.category}</div>
            <h3>{blog.title}</h3>
            <p>{blog.author}</p>
          </div>
        ))}

        <button className={styles.carouselButton}>&gt;</button>
      </div>
    </div>
  );
};

export default Blog;
