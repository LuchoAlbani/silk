// components/modals/ModalCondiciones.tsx
import React from 'react';
import styles from './ModalCondiciones.module.css';

interface ModalCondicionesProps {
  isOpen: boolean;
  onClose: () => void; // Función para cerrar el modal (equivalente a "cancelar")
  onAccept: () => void; // Nueva función para manejar la aceptación
}

const ModalCondiciones: React.FC<ModalCondicionesProps> = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) {
    return null; // No renderiza nada si el modal no está abierto
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>Términos y condiciones y política de privacidad</h2>
        <div className={styles.modalBody}>
          <p>
            Al marcar esta casilla y enviar este formulario, declarás que has leído, comprendido y aceptado los términos y condiciones del servicio, así como la política de privacidad. Aceptás que los datos personales que brindás serán utilizados con el fin de contactarte, brindarte asesoramiento personalizado y ofrecerte servicios acordes a tu interés. Estos datos serán tratados de manera confidencial y no serán compartidos con terceros sin tu consentimiento, salvo obligación legal.
          </p>
          <p>
            También confirmás que comprendés que la información brindada no sustituye el asesoramiento profesional especializado cuando corresponda, y que la participación en los servicios ofrecidos es completamente voluntaria.
          </p>
          <p>
            Podés acceder, corregir o eliminar tu información en cualquier momento, comunicándote a través de los canales indicados en la política de privacidad.
          </p>
        </div>
        <div className={styles.modalActions}> {/* Contenedor para los botones */}
          <button className={styles.acceptButton} onClick={onAccept}>
            He leído y acepto
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCondiciones;