import React from "react";
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
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/images/silk_logo-02.png" alt="Logo de Estudiosilk" />
        </Link>
      </div>

      <div className={styles.divider}></div>

      <nav>
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
