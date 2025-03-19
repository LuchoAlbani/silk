import React from "react";
import styles from "./Quiz.module.css";

const Quiz: React.FC = () => {
  return (
    <div className={styles.quizContainer}>
      {/* Nuevo fondo del cuadro */}
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

      {/* Sección de imágenes */}
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
