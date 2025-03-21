import React, { useEffect, useRef, useState } from "react";
import styles from "./Quiz.module.css";

const Quiz: React.FC = () => {
  const quizRef = useRef<HTMLDivElement>(null);
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

    if (quizRef.current) {
      observer.observe(quizRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={quizRef} className={`${styles.quizContainer} ${isVisible ? styles.fadeIn : ""}`}>
      <div className={styles.quizBox}>
        <img
          src="/images/Bloque QUIZ sin boton-100.jpg"
          alt="Quiz"
          className={styles.quizBackground}
        />
        <button className={styles.quizButton}>
          HACER EL QUIZ <span className={styles.arrow}> {'>'} </span>
        </button>
      </div>

      <div className={styles.quizImages}>
        {[
          "Gorra - Cher.png",
          "Sandalias - Battlo.png",
          "Anita Ko - Pinky Zodiac Ring.png",
          "Adidas - Beige Sambas.png",
          "Bottega Veneta - Large Hop Black Bag.png"
        ].map((image, index) => (
          <div key={index} className={styles.quizImageContainer}>
            <img src={`/images/${image}`} alt={`Prenda ${index + 1}`} className={styles.quizImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
