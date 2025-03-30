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

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const formattedCountries = data
          .filter((country: any) => country.idd?.root)
          .map((country: any) => ({
            name: country.name.common,
            cca2: country.cca2,
            idd: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`,
            flag: country.flags?.emoji || "🏳",
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>ANÁLISIS DE COLOR HECHO POR EXPERTOS</h2>
        <p className={styles.subTitle}>
          ¿Estás usando los colores que realmente te favorecen?
        </p>
        <p className={styles.description}>
          TOMÁ EL PRIMER PASO: DESCUBRÍ TU TONO DE PIEL Y TU PALETA PARA DESBLOQUEAR ESOS COLORES QUE TE HACEN BRILLAR.
        </p>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Nombre*</label>
            <input type="text" required placeholder="Ingresa tu nombre" />
          </div>

          <div className={styles.formGroup}>
            <label>Apellido*</label>
            <input type="text" required placeholder="Ingresa tu apellido" />
          </div>

          <div className={styles.emailPhoneGroup}>
            <div className={styles.formGroup}>
              <label>Email*</label>
              <input type="email" required placeholder="tu@email.com" />
            </div>
            <div className={styles.formGroup}>
              <label>Teléfono*</label>
              <div className={styles.phoneInput}>
                <select>
                  {countries.length > 0 ? (
                    countries.map((country) => (
                      <option key={country.cca2} value={country.idd}>
                        {country.flag} {country.idd} ({country.name})
                      </option>
                    ))
                  ) : (
                    <option>Cargando códigos...</option>
                  )}
                </select>
                <input type="tel" required placeholder="Número de teléfono" />
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Presupuesto en ropa y accesorios*</label>
            <select required>
              <option>Seleccionar</option>
              <option>Menos de $100</option>
              <option>$100 - $500</option>
              <option>Más de $500</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>¿Cuándo te gustaría empezar?*</label>
            <select required>
              <option>Seleccionar</option>
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
