import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
                  <option>+54</option>
                  <option>+1</option>
                  <option>+34</option>
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
