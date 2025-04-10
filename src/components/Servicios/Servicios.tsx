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
        contenido: (
          <ul>
            <li>• Entrevista inicial para fijar objetivos de compra, estilo y presupuesto.</li>
            <li>• <span className={styles.boldItalic}>Presencial:</span> Acompañamiento en tiendas x 3hs + coffee break.</li>
            <li>• <span className={styles.boldItalic}>Online:</span> Guía de Shopping (con tips y sugerencias) + Lista de compras personalizada (marcas, tiendas y productos con link de compra).</li>
            <li>• <span className={`${styles.boldItalic} ${styles.noBoldItalic}`}>Guía post-shopping:</span> Armado de outfits con las compras realizadas para que nunca te quedes sin ideas.</li>
          </ul>
        ),
      },
      {
        id: "para-quien",
        titulo: "¿PARA QUIÉN ES?",
        contenido: (
          <ul>
            <li>• Personas que deseen un armario resolutivo, eficaz y adaptado a su estilo, ya sea para el día a día o para un evento particular.</li>
            <li> Elegí la modalidad online si…</li>
            <li>• Viajás y querés renovar tu closet en el exterior.</li>
            <li>• No te gusta o no tenés tiempo para ir de shopping.</li>
            <li>• Vivís fuera de CABA o AMBA.</li>
          </ul>
        ),
      },
      {
        id: "inversion",
        titulo: "LA INVERSIÓN",
        contenido: (
          <p>
            Cada uno de nuestros clientes tiene necesidades diferentes, por lo que el precio se ajusta según lo que requieras. ¡Agendá una llamada con nosotros y armemos algo a tu medida!
          </p>
        ),
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
        contenido: (
          <ul>
            <li>• 2 sesiones de asesoramiento por Zoom (o más si es necesario)</li>
            <li>• Análisis de figura, rostro y estilo.</li>
            <li>• Colorimetría: Tu paleta ideal y cómo combinarla.</li>
            <li>• Sugerencias de estilismo, cabello y make-up.</li>
            <li>• Armado de un armario cápsula con 12 outfits.</li>
            <li>• Lista de compras con links a tiendas.</li>
          </ul>
        ),
      },
      {
        id: "para-quien",
        titulo: "¿PARA QUIÉN ES?",
        contenido: (
          <ul>
            <li>• Personas que deseen construir su estilo personal desde cero.</li>
            <li>• Quienes buscan alinear su guardarropa con sus objetivos.</li>
            <li>• Personas en cambios de vida (embarazo, ascenso, mudanza).</li>
            <li>• Quienes quieran perfeccionar su estilo y conocer sus colores ideales.</li>
          </ul>
        ),
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
    image: "/images/Coaching Card_1@2x-8.png",
    opciones: [
      {
        id: "incluye",
        titulo: "¿QUÉ INCLUYE?",
        contenido: (
          <ul>
            <li>• <span className={`${styles.boldItalic} ${styles.noBoldItalic}`}>Sesión 1</span> : Entrevista inicial. Autoconocimiento y fijación de objetivos.</li>
            <li>• <span className={`${styles.boldItalic} ${styles.noBoldItalic}`}>Sesión 2</span> : Trabajo sobre la percepción corporal y estilismo.</li>
            <li>• <span className={`${styles.boldItalic} ${styles.noBoldItalic}`}>Sesión 3</span> : Uso del color, análisis de colorimetría y combinaciones.</li>
            <li>• <span className={`${styles.boldItalic} ${styles.noBoldItalic}`}>Sesión 4</span> : Entrega de dossier con recomendaciones personalizadas.</li>


          </ul>
        ),
      },
      {
        id: "para-quien",
        titulo: "¿PARA QUIÉN ES?",
        contenido: (
          <ul>
            <li>• Personas que buscan desarrollar confianza a través de su imagen.</li>
            <li>• Quienes desean mejorar su relación con el espejo y su autoestima.</li>
            <li>• Personas en busca de evolución y transformación personal.</li>
          </ul>
        ),
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
        <span className={styles.line}>"Un armario que <em className={styles.italic}>te inspira</em>.</span> <br />
        <span className={styles.line}>Una imagen que <em className={styles.italic}>te representa</em>.</span> <br />
        <span className={styles.line}>Una confianza que <em className={styles.italic}>transforma realidades</em>."</span>
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
                    className={`${styles.opcionContenido} ${activo?.servicioId === servicio.id && activo?.opcionId === opcion.id ? styles.mostrar : ""}`}
                  >
                    {opcion.contenido}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className={styles.button} onClick={() => navigate("/servicios-interno")}>
        COMENZÁ HOY
      </button>

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
