import React from "react";
import styles from "./Bloggers.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { blogItems } from "../data/blogData"; // Importamos los datos

const Bloggers: React.FC = () => {
  return (
    <div className={styles.bloggersPage}>
      <Header />
      <div className={styles.bloggers}>
        <h2 className={styles.bloggersTitle}>Bloggers</h2>
        <div className={styles.bloggersList}>
          {blogItems.map((blogger, index) => (
            <div key={index} className={styles.bloggerItem}>
              <img
                src={blogger.img}
                alt={blogger.title}
                className={styles.bloggerImage}
              />
              <div className={styles.bloggerInfo}>
                <h3 className={styles.bloggerTitle}>{blogger.title}</h3>
                <p className={styles.bloggerAuthor}>{blogger.author}</p>
                {blogger.date && <p className={styles.bloggerDate}>{blogger.date}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bloggers;
