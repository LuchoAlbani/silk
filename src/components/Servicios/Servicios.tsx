import React, { useState } from "react";
import styles from "./Servicios.module.css";

const servicios = [
  {
    id: 1,
    image: "/images/Personal Shopping Card@2x-8.png",
    opciones: [
      {
        id: "incluye",
        titulo: "¿QUÉ INCLUYE?",
        contenido: `
• Entrevista inicial para fijar objetivos de compra, estilo y presupuesto.
• Presencial: Acompañamiento en tiendas x 3hs + coffee break.
• Online: Guía de Shopping (tips y sugerencias) + Lista de compras personalizada (marcas, tiendas y productos con link de compra).
• Guía post-shopping: Armado de outfits con las compras realizadas para que nunca te quedes sin ideas.`,
      },
      {
        id: "para-quien",
        titulo: "¿PARA QUIÉN ES?",
        contenido: `
Personas que deseen un armario resolutivo, eficaz y adaptado a su estilo, ya sea para el día a día o para un evento particular.

Elegí la modalidad online si…
• Viajás y querés renovar tu closet en el exterior.
• No te gusta o no tenés tiempo para ir de shopping.
• Vivís fuera de CABA o AMBA.`,
      },
      {
        id: "inversion",
        titulo: "LA INVERSIÓN",
        contenido: `Cada uno de nuestros clientes tiene necesidades diferentes, por lo que el precio se ajusta según lo que requieras.

¡Agendá una llamada con nosotros y armemos algo a tu medida!`,
      },
    ],
  },
  {
    id: 2,
    image: "/images/Asesoramiento Card@2x-8.png",
    opciones: [
      {
        id: "incluye",
        titulo: "¿QUÉ INCLUYE?",
        contenido: `
• 2 sesiones de asesoramiento por Zoom (o más si es necesario)
• Análisis de figura, rostro y estilo.
• Colorimetría: Tu paleta ideal y cómo combinarla.
• Sugerencias de estilismo, cabello y make-up.
• Armado de un armario cápsula con 12 outfits.
• Lista de compras con links a tiendas.`,
      },
      {
        id: "para-quien",
        titulo: "¿PARA QUIÉN ES?",
        contenido: `
• Personas que deseen construir su estilo personal desde cero.
• Quienes buscan alinear su guardarropa con sus objetivos.
• Personas en cambios de vida (embarazo, ascenso, mudanza).
• Quienes quieran perfeccionar su estilo y conocer sus colores ideales.`,
      },
      {
        id: "inversion",
        titulo: "LA INVERSIÓN",
        contenido: `A partir de ARS$490.000 | UDS$500`,
      },
    ],
  },
  {
    id: 3,
    image: "/images/Coaching Card@2x-8.png",
    opciones: [
      {
        id: "incluye",
        titulo: "¿QUÉ INCLUYE?",
        contenido: `
• Sesión 1: Entrevista inicial. Autoconocimiento y fijación de objetivos.
• Sesión 2: Trabajo sobre la percepción corporal y estilismo.
• Sesión 3: Uso del color, análisis de colorimetría y combinaciones.
• Sesión 4: Entrega de dossier con recomendaciones personalizadas.`,
      },
      {
        id: "para-quien",
        titulo: "¿PARA QUIÉN ES?",
        contenido: `
• Personas que buscan desarrollar confianza a través de su imagen.
• Quienes desean mejorar su relación con el espejo y su autoestima.
• Personas en busca de evolución y transformación personal.`,
      },
      {
        id: "inversion",
        titulo: "LA INVERSIÓN",
        contenido: `¡Próximamente! Anotate en la lista de espera y obtené una guía gratis de Cómo utilizar el color a tu favor.`,
      },
    ],
  },
];

const Servicios: React.FC = () => {
  const [activo, setActivo] = useState<{ servicioId: number; opcionId: string } | null>(null);

  const toggleOpcion = (servicioId: number, opcionId: string) => {
    setActivo((prev) =>
      prev?.servicioId === servicioId && prev?.opcionId === opcionId ? null : { servicioId, opcionId }
    );
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
              {servicio.opciones.map((opcion) => (
                <div key={opcion.id} className={styles.opcion}>
                  <button
                    className={`${styles.opcionTitulo} ${activo?.servicioId === servicio.id && activo?.opcionId === opcion.id ? styles.activo : ""}`}
                    onClick={() => toggleOpcion(servicio.id, opcion.id)}
                    aria-expanded={activo?.servicioId === servicio.id && activo?.opcionId === opcion.id}
                  >
                    {opcion.titulo}
                  </button>


                  <div
                    className={`${styles.opcionContenido} ${activo?.servicioId === servicio.id && activo?.opcionId === opcion.id ? styles.mostrar : ""
                      }`}
                  >
                    {opcion.contenido}
                  </div>
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
