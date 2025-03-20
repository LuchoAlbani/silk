import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./BloggerDetail.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getBlogById, Blog } from "../../services/blogService";

const BloggerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        const blogData = await getBlogById(id);
        setBlog(blogData);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
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
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.subtitle}>{blog.description}</p>
        <p className={styles.meta}>{blog.date} • Por {blog.author}</p>
        <img src={blog.img} alt={blog.title} className={styles.image} />
        <p className={styles.text}>{blog.content1}</p>
        {blog.img2 && (
          <>
            <p className={styles.imageNumber}>1 / 2</p>
            <img src={blog.img2} alt="Imagen 2" className={styles.image} />
          </>
        )}
        <p className={styles.text}>{blog.content2}</p>
        {blog.img3 && (
          <>
            <p className={styles.imageNumber}>2 / 2</p>
            <img src={blog.img3} alt="Imagen 3" className={styles.image} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BloggerDetail;
