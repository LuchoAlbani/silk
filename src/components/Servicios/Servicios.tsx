import React, { useState } from "react";
import styles from "./Servicios.module.css";
import { useNavigate } from "react-router-dom";

const servicios = [
  {
    id: 1,
    image: "/images/Personal Shopping Card@2x-8.png",
    opciones: [
      {
        id: "incluye",
        titulo: "¿QUÉ INCLUYE?",
        contenido: `• Entrevista inicial para fijar objetivos de compra, estilo y presupuesto.
• Presencial: Acompañamiento en tiendas x 3hs + coffee break.
• Online: Guía de Shopping (tips y sugerencias) + Lista de compras personalizada (marcas, tiendas y productos con link de compra).
• Guía post-shopping: Armado de outfits con las compras realizadas para que nunca te quedes sin ideas.`,
      },
      {
        id: "para-quien",
        titulo: "¿PARA QUIÉN ES?",
        contenido: `Personas que deseen un armario resolutivo, eficaz y adaptado a su estilo, ya sea para el día a día o para un evento particular.

Elegí la modalidad online si…
• Viajás y querés renovar tu closet en el exterior.
• No te gusta o no tenés tiempo para ir de shopping.
• Vivís fuera de CABA o AMBA.`,
      },
      {
        id: "inversion",
        titulo: "LA INVERSIÓN",
        contenido: "Cada uno de nuestros clientes tiene necesidades diferentes, por lo que el precio se ajusta según lo que requieras. ¡Agendá una llamada con nosotros y armemos algo a tu medida!",
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
        contenido: `• 2 sesiones de asesoramiento por Zoom (o más si es necesario)
• Análisis de figura, rostro y estilo.
• Colorimetría: Tu paleta ideal y cómo combinarla.
• Sugerencias de estilismo, cabello y make-up.
• Armado de un armario cápsula con 12 outfits.
• Lista de compras con links a tiendas.`,
      },
      {
        id: "para-quien",
        titulo: "¿PARA QUIÉN ES?",
        contenido: `• Personas que deseen construir su estilo personal desde cero.
• Quienes buscan alinear su guardarropa con sus objetivos.
• Personas en cambios de vida (embarazo, ascenso, mudanza).
• Quienes quieran perfeccionar su estilo y conocer sus colores ideales.`,
      },
      {
        id: "inversion",
        titulo: "LA INVERSIÓN",
        contenido: "A partir de ARS$490.000 | USD$500",
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
        contenido: `• Sesión 1: Entrevista inicial. Autoconocimiento y fijación de objetivos.
• Sesión 2: Trabajo sobre la percepción corporal y estilismo.
• Sesión 3: Uso del color, análisis de colorimetría y combinaciones.
• Sesión 4: Entrega de dossier con recomendaciones personalizadas.`,
      },
      {
        id: "para-quien",
        titulo: "¿PARA QUIÉN ES?",
        contenido: `• Personas que buscan desarrollar confianza a través de su imagen.
• Quienes desean mejorar su relación con el espejo y su autoestima.
• Personas en busca de evolución y transformación personal.`,
      },
      {
        id: "inversion",
        titulo: "LA INVERSIÓN",
        contenido: (
          <>
            <p>
              ¡Próximamente! Anotate en la lista de espera y obtené una guía gratis de{" "}
              Cómo utilizar el color a tu favor.
            </p>
            <button className={styles.listaEsperaButton}>Lista de Espera</button>
          </>
        ),
      },
    ],
  },
];

const preguntasFrecuentes = [
  {
    id: 1,
    pregunta: "¿CÓMO SÉ QUÉ SERVICIO ES EL ADECUADO PARA MÍ?",
    respuesta:
      "Cada servicio está diseñado para diferentes necesidades. Si no estás seguro, completá el formulario de contacto y te ayudamos a elegir el mejor para vos.",
  },
  {
    id: 2,
    pregunta: "¿EL SERVICIO DE PERSONAL SHOPPER INCLUYE EL COSTO DE LAS PRENDAS?",
    respuesta:
      "No, el costo de las prendas no está incluido en la tarifa del servicio. Te ayudamos a elegir lo mejor según tu presupuesto.",
  },
  {
    id: 3,
    pregunta: "¿QUÉ PASA SI NO ME GUSTA LO QUE PREPARARON?",
    respuesta:
      "Eso es imposible, porque trabajamos en cada detalle hasta que estés 100% conforme. Durante la segunda consulta, te presentamos un primer borrador para que des tu feedback y podamos hacer ajustes. Nuestro trabajo no termina hasta que estés feliz y enamorado del resultado.",
  },
  {
    id: 4,
    pregunta: "¿CUÁLES SON LAS FORMAS DE PAGO?",
    respuesta: "Aceptamos efectivo, transferencias y cripto (ARS, USD & USDT).",
  },
  {
    id: 5,
    pregunta: "¿TRABAJAN CON HOMBRES Y MUJERES?",
    respuesta:
      "Sí, nuestros servicios están diseñados para cualquier persona que quiera mejorar su imagen personal.",
  },
  {
    id: 6,
    pregunta: "¿VAN A PERSONALIZAR TODO SEGÚN MI TIPO DE CUERPO Y PREFERENCIAS?",
    respuesta:
      "¡Por supuesto! Todo el servicio está diseñado para vos. Cada recomendación se adapta a tu tipo de cuerpo, estilo de vida y gustos personales. Nada es impuesto, vos tenés la última palabra en cada elección.",
  },
  {
    id: 7,
    pregunta: "¿CUÁNTO PRESUPUESTO NECESITO PARA ROPA?",
    respuesta:
      "Ofrecemos asesoramiento para clientes de cualquier parte de Argentina y del exterior. Trabajamos de manera virtual mediante encuentros por Zoom o presencialmente a domicilio (viáticos no incluidos).",
  },
  {
    id: 8,
    pregunta: "¿TRABAJAN SOLO EN CABA?",
    respuesta:
      "¡Por supuesto! Todo el servicio está diseñado para vos. Cada recomendación se adapta a tu tipo de cuerpo, estilo de vida y gustos personales. Nada es impuesto, vos tenés la última palabra en cada elección.",
  },
];

const Servicios: React.FC = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const [activo, setActivo] = useState<{ servicioId: number; opcionId: string } | null>(null);
  const [preguntaActiva, setPreguntaActiva] = useState<number | null>(null);

  const toggleOpcion = (servicioId: number, opcionId: string) => {
    setActivo((prev) => (prev?.servicioId === servicioId && prev?.opcionId === opcionId ? null : { servicioId, opcionId }));
  };

  const togglePregunta = (id: number) => {
    setPreguntaActiva((prev) => (prev === id ? null : id));
  };



  return (
    <div className={styles.container}>
      <p className={styles.subheading}>NUESTROS SERVICIOS</p>
      <h2 className={styles.heading}>
        “Un armario que <em>te inspira</em>. <br />
        Una imagen que <em>te representa</em>. <br />
        Una confianza que <em>transforma realidades</em>.”
      </h2>

      <div className={styles.grid}>
        {servicios.map((servicio) => (
          <div key={servicio.id} className={styles.card}>
            <img src={servicio.image} alt={`Servicio ${servicio.id}`} className={styles.image} />

            <div className={styles.opciones}>
              {servicio.opciones.map((opcion) => (
                <div key={opcion.id} className={styles.opcion}>
                  <button
                    className={`${styles.opcionTitulo} ${activo?.servicioId === servicio.id && activo?.opcionId === opcion.id ? styles.activo : ""
                      }`}
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

      {/* Botón actualizado para redirigir a ServiciosInterno */}
      <button className={styles.button} onClick={() => navigate("/servicios-interno")}>
        COMENZÁ HOY
      </button>

      {/* Preguntas Frecuentes en dos columnas */}
      <div className={styles.faq}>
        <h3>Preguntas Frecuentes</h3>
        <div className={styles.preguntasContainer}>
          <div className={styles.columna}>
            {preguntasFrecuentes.slice(0, 4).map((item) => (
              <div key={item.id} className={styles.pregunta}>
                <button
                  onClick={() => togglePregunta(item.id)}
                  className={`${styles.preguntaTitulo} ${preguntaActiva === item.id ? styles.abierta : ""}`}
                >
                  {item.pregunta}
                </button>

                <p className={`${styles.preguntaRespuesta} ${preguntaActiva === item.id ? styles.mostrar : ""}`}>
                  {item.respuesta}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.columna}>
            {preguntasFrecuentes.slice(4, 8).map((item) => (
              <div key={item.id} className={styles.pregunta}>
                <button
                  onClick={() => togglePregunta(item.id)}
                  className={`${styles.preguntaTitulo} ${preguntaActiva === item.id ? styles.abierta : ""}`}
                >
                  {item.pregunta}
                </button>

                <p className={`${styles.preguntaRespuesta} ${preguntaActiva === item.id ? styles.mostrar : ""}`}>
                  {item.respuesta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
