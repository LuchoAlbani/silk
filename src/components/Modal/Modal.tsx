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
      <option value="+54">🇦🇷 +54</option>
      <option value="+55">🇧🇷 +55</option>
      <option value="+1">🇨🇦 +1</option>
      <option value="+56">🇨🇱 +56</option>
      <option value="+57">🇨🇴 +57</option>
      <option value="+593">🇪🇨 +593</option>
      <option value="+1">🇺🇸 +1</option>
      <option value="+52">🇲🇽 +52</option>
      <option value="+507">🇵🇦 +507</option>
      <option value="+51">🇵🇪 +51</option>
      <option value="+1">🇩🇴 +1</option>
      <option value="+598">🇺🇾 +598</option>
      <option value="+58">🇻🇪 +58</option>
      <option value="+49">🇩🇪 +49</option>
      <option value="+43">🇦🇹 +43</option>
      <option value="+32">🇧🇪 +32</option>
      <option value="+45">🇩🇰 +45</option>
      <option value="+34">🇪🇸 +34</option>
      <option value="+33">🇫🇷 +33</option>
      <option value="+30">🇬🇷 +30</option>
      <option value="+39">🇮🇹 +39</option>
      <option value="+31">🇳🇱 +31</option>
      <option value="+351">🇵🇹 +351</option>
      <option value="+44">🇬🇧 +44</option>
      <option value="+41">🇨🇭 +41</option>
      <option value="+46">🇸🇪 +46</option>
      <option value="+86">🇨🇳 +86</option>
      <option value="+82">🇰🇷 +82</option>
      <option value="+971">🇦🇪 +971</option>
      <option value="+91">🇮🇳 +91</option>
      <option value="+62">🇮🇩 +62</option>
      <option value="+972">🇮🇱 +972</option>
      <option value="+81">🇯🇵 +81</option>
      <option value="+60">🇲🇾 +60</option>
      <option value="+7">🇷🇺 +7</option>
      <option value="+966">🇸🇦 +966</option>
      <option value="+65">🇸🇬 +65</option>
      <option value="+90">🇹🇷 +90</option>
      <option value="+63">🇵🇭 +63</option>
      <option value="+66">🇹🇭 +66</option>
      <option value="+27">🇿🇦 +27</option>
      <option value="+20">🇪🇬 +20</option>
      <option value="+234">🇳🇬 +234</option>
      <option value="+254">🇰🇪 +254</option>
      <option value="+212">🇲🇦 +212</option>
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
