import React, { useState } from "react";
import styles from "./Servicios.module.css";

const servicios = [
  {
    id: 1,
    image: "/images/Personal Shopping Card@2x-8.png",
  },
  {
    id: 2,
    image: "/images/Asesoramiento Card@2x-8.png",
  },
  {
    id: 3,
    image: "/images/Coaching Card@2x-8.png",
  },
];

const opciones = [
  {
    id: "incluye",
    titulo: "¿QUÉ INCLUYE?",
    contenido: "Entrevista inicial para fijar objetivos de compra, estilo y presupuesto.",
  },
  {
    id: "para-quien",
    titulo: "¿PARA QUIÉN ES?",
    contenido: "Para quienes buscan mejorar su imagen personal y potenciar su confianza.",
  },
  {
    id: "inversion",
    titulo: "LA INVERSIÓN",
    contenido: "Consulta los planes y precios disponibles según tu necesidad.",
  },
];

const Servicios: React.FC = () => {
  const [activo, setActivo] = useState<{ servicioId: number; opcionId: string } | null>(null);

  const toggleOpcion = (servicioId: number, opcionId: string) => {
    if (activo?.servicioId === servicioId && activo?.opcionId === opcionId) {
      setActivo(null); // Cierra la opción si ya está abierta
    } else {
      setActivo({ servicioId, opcionId }); // Abre la nueva opción
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.subheading}>NUESTROS SERVICIOS</p>
      <h2 className={styles.heading}>
        “Un armario que <em>te inspira</em>.” <br />
        “Una imagen que <em>te representa</em>.” <br />
        “Una confianza que <em>transforma realidades</em>.”
      </h2>

      <div className={styles.grid}>
        {servicios.map((servicio) => (
          <div key={servicio.id} className={styles.card}>
            <img src={servicio.image} alt={`Servicio ${servicio.id}`} className={styles.image} />

            <div className={styles.opciones}>
              {opciones.map((opcion) => (
                <div key={opcion.id} className={styles.opcion}>
                  <button
                    className={styles.opcionTitulo}
                    onClick={() => toggleOpcion(servicio.id, opcion.id)}
                  >
                    {activo?.servicioId === servicio.id && activo?.opcionId === opcion.id ? "▼" : "▶"} {opcion.titulo}
                  </button>

                  {activo?.servicioId === servicio.id && activo?.opcionId === opcion.id && (
                    <p className={styles.opcionContenido}>{opcion.contenido}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className={styles.button}>COMENZÁ HOY</button>
    </div>
  );
};

export default Servicios;
