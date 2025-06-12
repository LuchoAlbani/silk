// src/components/ListaEsperaModal/ListaEsperaModal.tsx
import React, { useState, useEffect } from "react";
import styles from "./ListaEsperaModal.module.css"; // Crear este archivo CSS

interface ListaEsperaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListaEsperaModal: React.FC<ListaEsperaModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countryError, setCountryError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Cargar países
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // *** CAMBIO CLAVE AQUÍ: Filtrando los campos para la API v3.1 ***
        // Solo pide los campos que realmente necesitas: name, cca2, idd, flags.
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags");
        
        if (!response.ok) {
          console.error(
            "Error al obtener los países:",
            response.status,
            response.statusText
          );
          throw new Error(`Error HTTP! Status: ${response.status}`);
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
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error al cargar países en modal:", error);
        setCountryError(true);
      } finally {
        setLoadingCountries(false);
      }
    };
    
    // Solo cargar si el modal está abierto y los países no están cargados o hubo un error previo
    if (isOpen && (countries.length === 0 || countryError)) { 
      setLoadingCountries(true); // Reinicia el estado de carga al intentar de nuevo
      setCountryError(false); // Reinicia el estado de error
      fetchCountries();
    }
  }, [isOpen, countries.length, countryError]); // Agregué countryError como dependencia

  // Resetear formulario cuando el modal se abre/cierra
  useEffect(() => {
    if (isOpen) {
      setFormData({ nombre: "", email: "", telefono: "" });
      setSelectedCountryCode("");
      setPhoneNumber("");
      setSubmitMessage("");
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Validaciones del formulario del modal
    if (!formData.nombre.trim() || !formData.email.trim()) {
      setSubmitMessage("Por favor, completá todos los campos obligatorios.");
      setIsSubmitting(false);
      return;
    }

    if (selectedCountryCode && !phoneNumber.trim()) {
        setSubmitMessage("Por favor, ingresá tu número de teléfono.");
        setIsSubmitting(false);
        return;
    }
    if (!selectedCountryCode && phoneNumber.trim()) {
        setSubmitMessage("Por favor, seleccioná el código de país para tu teléfono.");
        setIsSubmitting(false);
        return;
    }

    const fullPhoneNumber = selectedCountryCode ? `${selectedCountryCode} ${phoneNumber}` : (phoneNumber || "N/A"); // Si no hay número, enviar N/A

    const dataToSend = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: fullPhoneNumber,
    };

    console.log("Enviando a /lista-espera-coach:", dataToSend);

    try {
      const response = await fetch("http://localhost:3001/lista-espera-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error en el servidor: ${response.statusText} - ${errorData}`);
      }

      const result = await response.text();
      console.log("Respuesta del servidor:", result);
      setSubmitMessage("¡Gracias! Te has unido a la lista de espera. Revisa tu correo.");

    } catch (error) {
      console.error("Error al enviar formulario de lista de espera:", error);
      setSubmitMessage("Hubo un error al enviar tu solicitud. Por favor, intentá de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>¡Únete a la lista de espera!</h2>
        <p className={styles.modalSubtitle}>
          Sé el primero en enterarte cuando el servicio de Coach de Imagen esté disponible.
          Recibirás una guía gratuita de "Cómo utilizar el color a tu favor".
        </p>
        <form className={styles.modalForm} onSubmit={submitForm}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre">Nombre*</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tu email"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phoneCountryCode">Teléfono (opcional)</label> {/* Opcional aquí */}
            <div className={styles.phoneInput}>
              <select
                id="phoneCountryCode"
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className={styles.select}
                disabled={loadingCountries || countryError}
              >
                <option value="">Seleccioná</option>
                {loadingCountries && <option disabled>Cargando códigos...</option>}
                {countryError && <option disabled>Error al cargar países.</option>}
                {!loadingCountries && !countryError && countries.length > 0 ? (
                  countries.map((country) => (
                    <option key={country.cca2} value={country.idd}>
                      {country.flag} {country.idd} ({country.name})
                    </option>
                  ))
                ) : null}
              </select>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Número de teléfono"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className={styles.input}
              />
            </div>
          </div>

          {submitMessage && (
            <p className={styles.message}>
              {submitMessage}
            </p>
          )}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "UNIRME A LA LISTA"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListaEsperaModal;