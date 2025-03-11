import React from "react";
import styles from "./Section.module.css";

interface Item {
  id: number;
  image: string;
  title: string;
  description: string;
}

const Section: React.FC = () => {
  const items: Item[] = [
    {
      id: 1,
      image: "/images/Fotos_sección_pre-blog-04.jpg",
      title: "DIGITALIZAMOS TU CLOSET",
      description: "Accede a tu guardarropa desde cualquier lugar con nuestro sistema digital.",
    },
    {
      id: 2,
      image: "/images/Fotos_sección_pre-blog-05.jpg",
      title: "ELEVAMOS TU ESTILO",
      description: "De la mano de tu estilista personal, creamos looks que reflejan quién sos y potencian tu mejor versión.",
    },
    {
      id: 3,
      image: "/images/Fotos_sección_pre-blog-06.jpg",
      title: "EMPODERAMOS TU IMAGEN",
      description: "Te ayudamos a proyectar confianza y seguridad a través de un estilo auténtico y único.",
    },
  ];

  return (
    <div className={styles.sectionContainer}>
      <h2>
        En <span className={styles.silk}>SILK</span> creamos más que looks:<br />
        <em>construimos confianza.</em>
      </h2>
      <div className={styles.sectionGrid}>
        {items.map((item) => (
          <div key={item.id} className={styles.sectionItem}>
            <img src={item.image} alt={item.title} className={styles.sectionImage} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
