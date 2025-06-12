import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Bloggers.module.css";
import { getBlogs, Blog } from "../../services/blogService";

const Bloggers: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await getBlogs();
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) handlePageClick(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageClick(currentPage + 1);
  };

  return (
    <div className={styles.bloggersPage}>
      <div className={styles.bloggers}>
        <h2 className={styles.bloggersTitle}>Blog</h2>
        <div className={styles.bloggersList}>
          {currentBlogs.map((blogger) => (
            <div key={blogger.id} className={styles.bloggerItem}>
  <Link to={`/bloggers/${blogger.id}`} className={styles.imageWrapper}>
    <img src={blogger.img} alt={blogger.title} className={styles.bloggerImage} />
    {blogger.category && (
      <div className={styles.bloggerCategory}>{blogger.category}</div>
    )}
  </Link>

  <div className={styles.bloggerInfo}>
    <Link to={`/bloggers/${blogger.id}`} className={styles.bloggerTextLink}>
      <h3 className={styles.bloggerTitle}>{blogger.title}</h3>
      <p className={styles.bloggerAuthor}>
        <span className={styles.by}>BY</span> {blogger.author}
      </p>
      {blogger.date && <p className={styles.bloggerDate}>{blogger.date}</p>}
    </Link>
  </div>
</div>

          ))}
        </div>

        {/* Números de página con flechas */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              ◀
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageClick(i + 1)}
                className={`${styles.pageButton} ${
                  currentPage === i + 1 ? styles.active : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bloggers;
