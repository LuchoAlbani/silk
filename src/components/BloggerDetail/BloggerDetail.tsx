import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./BloggerDetail.module.css";
import { getBlogById, Blog } from "../../services/blogService";

const BloggerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {

    window.scrollTo(0, 0); // Desplaza al tope de la página

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
        <div className={styles.content}>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bloggerDetail}>
      <div className={styles.container}>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.author}><span className={styles.by}>BY</span> {blog.author}</p>
        <p className={styles.subtitle}>{blog.description}</p>
        <p className={styles.meta}>{blog.date}</p>

        <img src={blog.img} alt={blog.title} className={styles.image} />
        <p className={styles.text}>{blog.content1}</p>
        {blog.img2 && (
          <>
            <img src={blog.img2} alt="Imagen 2" className={styles.image} />
          </>
        )}
        <p className={styles.text}>{blog.content2}</p>
        {blog.img3 && (
          <>
            <img src={blog.img3} alt="Imagen 3" className={styles.image} />
          </>
        )}
      </div>
    </div>
  );
};

export default BloggerDetail;
