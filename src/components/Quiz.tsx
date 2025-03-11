import React from "react";
import styles from "./Quiz.module.css";

const Quiz: React.FC = () => {
  return (
    <div className={styles.quizContainer} style={{ backgroundImage: "url('/images/pixelcut-export.jpg')" }}>
      <div className={styles.quizBox} style={{ backgroundImage: "url('/images/Quiz_assets-08.png')" }}>
        <div className={styles.quizContent}>
          <h2>¿Todavía no encontraste tu estilo?</h2>
          <p>
            Descubrí tu estilo ideal con nuestro <strong className={styles.semibold}>quiz</strong> personalizado. Es rápido, práctico y el primer paso para transformar tu guardarropa.
          </p>

          <button className={styles.quizButton}>HACER EL QUIZ</button>
        </div>
      </div>
      <div className={styles.quizImages}>
        {["model_4.png", "model_3.png", "model_2.png", "model_1.png", "model_5.png"].map((image, index) => (
          <div key={index} className={styles.quizImageContainer}>
            <img src={`/images/${image}`} alt={`Model ${index + 1}`} className={styles.quizImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
