import React, { useEffect, useRef, useState } from "react";
import styles from "./Section.module.css";

interface Item {
  id: number;
  image: string;
  title: string;
  description: string;
}

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

const Section: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Deja de observar después de activarse
        }
      },
      { threshold: 0.2 } // Detecta cuando el 20% de la sección es visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={`${styles.sectionContainer} ${isVisible ? styles.fadeIn : ""}`}>
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
