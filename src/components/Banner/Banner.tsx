import React, { useState, useEffect } from "react";
import styles from "./Banner.module.css";

const images = [
  "/images/Banner 1_1.png",
  "/images/Banner 2_1.png",
  "/images/Banner 3_1.png",
  "/images/Banner 4_1.png",
  "/images/Banner 5_1.png",
];

const Banner: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.bannerContainer}>
      {/* Imágenes de fondo con efecto fade */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className={`${styles.bannerImage} ${index === currentImage ? styles.active : ""}`}
        />
      ))}

      {/* Overlay con el texto y el botón */}
      <div className={styles.overlay}>
        <img src="/images/Texto de banner.png" alt="Texto del banner" className={styles.overlayText} />
        <button className={styles.bannerButton}>COMENZAR</button>
      </div>
    </div>
  );
};

export default Banner;
