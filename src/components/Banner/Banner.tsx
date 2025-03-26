import React, { useEffect, useRef, useState } from "react";
import styles from "./Banner.module.css";

const images = [
  "/images/Banner 1_1.png",
  "/images/Banner 2_1.png",
  "/images/Banner 3_1.png",
  "/images/Banner 4_1.png",
  "/images/Banner 5_1.png",
];

interface BannerProps {
  onOpenModal: () => void; // Nueva prop para abrir el modal
}

const Banner: React.FC<BannerProps> = ({ onOpenModal }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={bannerRef} className={`${styles.bannerContainer} ${isVisible ? styles.fadeIn : ""}`}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className={`${styles.bannerImage} ${index === currentImage ? styles.active : ""}`}
        />
      ))}

      <div className={styles.overlay}>
        <div className={styles.overlayBackground}></div>

        <img src="/images/Banner solo texto_2@2x-8.png" alt="Texto del banner" className={styles.overlayText} />

        <button className={styles.bannerButton} onClick={onOpenModal}>
          COMENZAR
        </button>
      </div>
    </div>
  );
};

export default Banner;
