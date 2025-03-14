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
      <div className={styles.container}>
        {/* ✅ Título del blog */}
        <h1 className={styles.title}>{blogger.title}</h1>
        <p className={styles.subtitle}>
          {blogger.description}
        </p>
        <p className={styles.meta}>
          {blogger.date} • Por {blogger.author}
        </p>

        {/* ✅ Primera imagen */}
        <img src={blogger.img} alt={blogger.title} className={styles.image} />

        {/* ✅ Contenido del blog */}
        <p className={styles.text}>
          {blogger.content1}
        </p>

        {/* ✅ Segunda imagen con numeración */}
        {blogger.img2 && (
          <>
            <p className={styles.imageNumber}>1 / 2</p>
            <img src={blogger.img2} alt="Imagen 2" className={styles.image} />
          </>
        )}

        {/* ✅ Más texto */}
        <p className={styles.text}>
          {blogger.content2}
        </p>

        {/* ✅ Tercera imagen con numeración */}
        {blogger.img3 && (
          <>
            <p className={styles.imageNumber}>2 / 2</p>
            <img src={blogger.img3} alt="Imagen 3" className={styles.image} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BloggerDetail;
