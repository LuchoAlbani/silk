import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

interface NavLinkType {
  to: string;
  label: string;
  isExternal?: boolean;
}

const navLinks: NavLinkType[] = [
  { to: "/blog", label: "BLOG" },
  { to: "#quiz", label: "QUIZ", isExternal: true },
  { to: "#services", label: "SERVICIOS", isExternal: true },
  { to: "#we-are", label: "NOSOTROS", isExternal: true },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.isExternal ? (
                <a href={link.to}>{link.label}</a>
              ) : (
                <Link to={link.to}>{link.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
