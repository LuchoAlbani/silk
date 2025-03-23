import React from "react";
import styles from "./Footer.module.css";

interface FooterLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  imgSrc: string;
  alt: string;
}

const footerLinks: FooterLink[] = [
  { href: "#nosotros", label: "NOSOTROS" },
  { href: "#contacto", label: "CONTACTO" },
];

const legalLinks: FooterLink[] = [
  { href: "#terms", label: "Términos & Condiciones" },
  { href: "#privacy", label: "Privacy Policy" },
];

const socialLinks: SocialLink[] = [
  { href: "https://www.instagram.com/estudiosilk/", imgSrc: "/images/instagram.png", alt: "Instagram" },
  { href: "https://www.facebook.com/profile.php?id=61565777219419", imgSrc: "/images/facebook.png", alt: "Facebook" },
  { href: "https://www.tiktok.com/@estudiosilk", imgSrc: "/images/tik-tok.png", alt: "TikTok" },
];

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <img src="/images/silk_logo-02.png" alt="Logo de Estudiosilk footer" />
          <p>
            Combinamos creatividad y estrategia para transformar tu estilo en una herramienta de confianza y autenticidad, ayudándote a proyectar tu mejor versión cada día.
          </p>
        </div>

        <div className={styles.footerRedes}>
          <div className={styles.footerLinks}>
            {footerLinks.map((link, index) => (
              <React.Fragment key={index}>
                <a href={link.href}>{link.label}</a>
                {index < footerLinks.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>

          <div className={styles.footerSocials}>
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                <img src={social.imgSrc} alt={social.alt} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.dividerLine}></div>

        <div className={styles.footerLegal}>
          <p>©2025 ESTUDIOSILK. TODOS LOS DERECHOS RESERVADOS</p>
          <div className={styles.footerLinks}>
            {legalLinks.map((link, index) => (
              <a key={index} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
