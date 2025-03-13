import React from "react";
import { useParams } from "react-router-dom";
import styles from "./BloggerDetail.module.css";
import { blogItems } from "../data/blogData";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const BloggerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blogger = blogItems.find((b) => b.id === id);

  if (!blogger) {
    return (
      <div className={styles.bloggerDetail}>
        <Header />
        <div className={styles.content}>
          <h2>Blogger no encontrado</h2>
          <p>Lo sentimos, no pudimos encontrar este blogger.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.bloggerDetail}>
      <Header />
      <div className={styles.content}>
        <img src={blogger.img} alt={blogger.title} className={styles.image} />
        <div className={styles.info}>
          <h2>{blogger.title}</h2>
          <p className={styles.author}>{blogger.author}</p>
          {blogger.date && <p className={styles.date}>{blogger.date}</p>}
          {/* Mostrar description solo si existe */}
          {blogger.description && <p className={styles.description}>{blogger.description}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BloggerDetail;
