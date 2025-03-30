import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

interface NavLinkType {
  to: string;
  label: string;
  isExternal?: boolean;
}

const navLinks: NavLinkType[] = [
  { to: "/blog", label: "BLOG" },
  { to: "#quiz", label: "QUIZ", isExternal: true },
  { to: "/servicios", label: "SERVICIOS" },
  { to: "#we-are", label: "NOSOTROS", isExternal: true },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.shrink : ""}`}>
      <div className={styles.logo}>
        <Link to="/" onClick={scrollToTop}>
          <img src="/images/silk_logo-02.png" alt="Logo de Estudiosilk" />
        </Link>
      </div>

      <div className={styles.divider}></div>

      <nav className={`${styles.nav} ${isScrolled ? styles.hidden : ""}`}>
        <ul className={styles.navList}>
          {navLinks.map((link, index) => {
            // Identificar si la ruta actual es "/servicios" o "/blog" para aplicar la clase 'active'
            const isActive = location.pathname === link.to;

            return (
              <li key={index}>
                {link.isExternal ? (
                  <a href={link.to} className={styles.navLink}>
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
