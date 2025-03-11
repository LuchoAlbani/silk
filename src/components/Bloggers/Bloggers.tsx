import React from "react";
import styles from "./Bloggers.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface Blogger {
  img: string;
  title: string;
  author: string;
  date: string;
}

const Bloggers: React.FC = () => {
  const bloggers: Blogger[] = [
    {
      img: "/images/blog_prueba_1.jpg",
      title: "Butter Yellow is hot!",
      author: "BY LUCAS CONTARDI",
      date: "August 16, 2016",
    },
    {
      img: "/images/blog_prueba_2.jpg",
      title: "Title Censored",
      author: "BY MAGGIE CRUZ FREZZINI",
      date: "May 24, 2016",
    },
    {
      img: "/images/blog_prueba_3.jpg",
      title: "Taylor Swift vistiendo Versace",
      author: "BY LUCAS CONTARDI",
      date: "May 24, 2016",
    },
  ];

  return (
    <div className={styles.bloggersPage}>
      <Header />
      <div className={styles.bloggers}>
        <h2 className={styles.bloggersTitle}>Bloggers</h2>
        <div className={styles.bloggersList}>
          {bloggers.map((blogger, index) => (
            <div key={index} className={styles.bloggerItem}>
              <img
                src={blogger.img}
                alt={blogger.title}
                className={styles.bloggerImage}
              />
              <div className={styles.bloggerInfo}>
                <h3 className={styles.bloggerTitle}>{blogger.title}</h3>
                <p className={styles.bloggerAuthor}>{blogger.author}</p>
                <p className={styles.bloggerDate}>{blogger.date}</p>
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
