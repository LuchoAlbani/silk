import React from "react";
import styles from "./Quiz.module.css";

const Quiz: React.FC = () => {
  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizBox}>
        <div className={styles.quizContent}>
          <h2>¿Todavía no encontraste tu estilo?</h2>
          <p>
            Descubrí tu estilo ideal con nuestro <strong className={styles.semibold}>quiz</strong> personalizado.  
            Es rápido, práctico y el primer paso para transformar tu guardarropa.
          </p>

          <button className={styles.quizButton}>
            HACER EL QUIZ <span className={styles.arrow}>→</span>
          </button>
        </div>
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
