import React from "react";
import { Link } from "react-router-dom"; // Importamos Link
import styles from "./Bloggers.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { blogItems } from "../data/blogData";

const Bloggers: React.FC = () => {
  return (
    <div className={styles.bloggersPage}>
      <Header />
      <div className={styles.bloggers}>
        <h2 className={styles.bloggersTitle}>Bloggers</h2>
        <div className={styles.bloggersList}>
          {blogItems.map((blogger) => (
            <Link to={`/bloggers/${blogger.id}`} key={blogger.id} className={styles.bloggerItem}>
              <div className={styles.imageWrapper}>
                <img
                  src={blogger.img}
                  alt={blogger.title}
                  className={styles.bloggerImage}
                />
                {blogger.category && (
                  <div className={styles.bloggerCategory}>{blogger.category}</div>
                )}
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
      <Footer />
    </div>
  );
};

export default Bloggers;
