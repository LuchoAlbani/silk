import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Country {
  name: string;
  cca2: string;
  idd: string;
  flag: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  // ESTOS useState VAN AQUÍ, DENTRO DEL COMPONENTE:
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigoPais, setCodigoPais] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [inicio, setInicio] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // *** CAMBIO CLAVE AQUÍ: Filtrando los campos para la API v3.1 ***
        // Solo pide los campos que realmente necesitas para evitar errores.
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags"
        );

        if (!response.ok) {
          // Verifica si la respuesta HTTP fue exitosa
          console.error(
            "Error al obtener los países:",
            response.status,
            response.statusText
          );
          // Puedes lanzar un error o establecer un estado para mostrar un mensaje al usuario
          return;
        }

        const data = await response.json();

        const formattedCountries = data
          .filter((country: any) => country.idd?.root) // Asegura que 'idd.root' exista
          .map((country: any) => {
            const root = country.idd.root;
            const suffix = country.idd.suffixes && country.idd.suffixes.length > 0
              ? country.idd.suffixes[0]
              : "";
            
            return {
              name: country.name.common,
              cca2: country.cca2,
              idd: `${root}${suffix}`, // Combina root y el primer sufijo si existe
              flag: country.flags?.emoji || "🏳", // Usa emoji si existe, sino bandera genérica
            };
          })
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error al cargar los países:", error);
      }
    };

    if (isOpen) { // Solo si el modal está abierto, para evitar llamadas innecesarias
      fetchCountries();
    }
  }, [isOpen]); // Dependencia 'isOpen' para que se ejecute cuando el modal se abre

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>ANÁLISIS DE COLOR HECHO POR EXPERTOS</h2>
        <p className={styles.subTitle}>
          ¿Estás usando los colores que realmente te favorecen?
        </p>
        <p className={styles.description}>
          TOMÁ EL PRIMER PASO: DESCUBRÍ TU TONO DE PIEL Y TU PALETA PARA
          DESBLOQUEAR ESOS COLORES QUE TE HACEN BRILLAR.
        </p>

        <form
          className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              const response = await fetch("http://localhost:3001/frente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  nombre,
                  apellido,
                  localidad,
                  email,
                  telefono: `${codigoPais} ${telefono}`,
                  presupuesto,
                  inicio,
                }),
              });

              const data = await response.text();
              alert(data);
              onClose(); // Cierra modal si todo OK
            } catch (error) {
              console.error("Error al enviar formulario:", error);
              alert("Hubo un error al enviar tus datos.");
            }
          }}
        >
          <div className={styles.formGroup}>
            <label>Nombre*</label>
            <input
              type="text"
              required
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Apellido*</label>
            <input
              type="text"
              required
              placeholder="Ingresa tu apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Localidad*</label>
            <input
              type="text"
              required
              placeholder="Ingresa tu localidad"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
            />
          </div>

          <div className={styles.emailPhoneGroup}>
            <div className={styles.formGroup}>
              <label>Email*</label>
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Teléfono*</label>
              <div className={styles.phoneInput}>
                <select
                  required
                  value={codigoPais}
                  onChange={(e) => setCodigoPais(e.target.value)}
                >
                  <option value="">Seleccioná</option>
                  {countries.length > 0 ? (
                    countries.map((country) => (
                      <option key={country.cca2} value={country.idd}>
                        {country.flag} {country.idd} ({country.name})
                      </option>
                    ))
                  ) : (
                    <option disabled>Cargando códigos...</option> // Deshabilitar la opción de carga
                  )}
                </select>
                <input
                  type="tel"
                  required
                  placeholder="Número de teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Presupuesto en ropa y accesorios*</label>
            <select
              required
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="rango1">$0 - $100.000 ARS</option>
              <option value="rango2">$100.000 - $250.000</option>
              <option value="rango3">$250.000 - $500.000</option>
              <option value="rango4">$500.000 - $1.000.000</option>
              <option value="rango5">Más de $1.000.000</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>¿Cuándo te gustaría empezar?*</label>
            <select
              required
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option>Inmediatamente</option>
              <option>En un mes</option>
              <option>No estoy seguro</option>
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>
            COMENZÁ YA
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;