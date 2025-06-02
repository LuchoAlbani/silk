import React, { useState, useEffect } from "react";
import styles from "./ServiciosInterno.module.css"; // Se usa correctamente

const ServiciosInterno: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    localidad: "",
    // 'telefono' ya no se guarda directamente aquí, se gestiona con 'phoneNumber'
    servicio: [] as string[],
    presupuesto: "",
    inicio: "",
    referencia: "",
    aceptaTerminos: false,
    recibirEmails: false,
    otroServicio: "",
  });

  const [countries, setCountries] = useState<any[]>([]); // Almacenamos los países
  const [selectedCountryCode, setSelectedCountryCode] = useState(""); // Para almacenar el código seleccionado
  const [phoneNumber, setPhoneNumber] = useState(""); // Nuevo estado para el número de teléfono puro
  const [loadingCountries, setLoadingCountries] = useState(true); // Para estado de carga de países
  const [countryError, setCountryError] = useState(false); // Para errores al cargar países

  // Fetch de países para obtener el código de teléfono
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) { // Verifica si la respuesta HTTP es exitosa
          throw new Error(`Error HTTP! Status: ${response.status}`);
        }
        const data = await response.json();

        const formattedCountries = data
          .filter((country: any) => country.idd?.root)
          .map((country: any) => ({
            name: country.name.common,
            cca2: country.cca2,
            idd: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`,
            flag: country.flags?.emoji || "🏳",
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error al cargar países:", error);
        setCountryError(true); // Marcar que hubo un error
      } finally {
        setLoadingCountries(false); // Finalizar estado de carga
      }
    };

    fetchCountries();
  }, []);

  // Manejo de cambios en inputs y selects (excepto el número de teléfono puro)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Manejo de cambios para el input del número de teléfono (solo el número)
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  // Manejo de cambios en checkboxes de servicios
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      servicio: checked
        ? [...prevState.servicio, value]
        : prevState.servicio.filter((s) => s !== value),
    }));
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    // --- Validaciones adicionales ---
    if (formData.servicio.length === 0) {
      alert("Por favor, seleccioná al menos un servicio.");
      return;
    }

    if (formData.servicio.includes("Otro") && !formData.otroServicio.trim()) {
      alert("Por favor, especificá el otro servicio.");
      return;
    }

    // Validar que si hay un código de país, el número no esté vacío y viceversa
    if (selectedCountryCode && !phoneNumber.trim()) {
        alert("Por favor, ingresá tu número de teléfono.");
        return;
    }
    if (!selectedCountryCode && phoneNumber.trim()) {
        alert("Por favor, seleccioná el código de país para tu teléfono.");
        return;
    }

    // Concatenar el código de país y el número antes de enviar
    const fullPhoneNumber = selectedCountryCode ? `${selectedCountryCode} ${phoneNumber}` : phoneNumber;

    console.log("Formulario enviado:", {
      ...formData,
      telefono: fullPhoneNumber, // El número de teléfono completo
    });

    // Aquí iría tu lógica para enviar los datos al backend
    // Por ejemplo, con fetch:
    /*
    fetch('/api/submitForm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, telefono: fullPhoneNumber })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la red: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert('Formulario enviado con éxito!');
      // Opcional: Resetear el formulario después del envío exitoso
      setFormData({
        nombre: "", apellido: "", email: "", localidad: "",
        servicio: [], presupuesto: "", inicio: "", referencia: "",
        aceptaTerminos: false, recibirEmails: false, otroServicio: "",
      });
      setPhoneNumber("");
      setSelectedCountryCode("");
    })
    .catch(error => {
      console.error('Error al enviar formulario:', error);
      alert('Hubo un error al enviar el formulario. Por favor, intentá de nuevo.');
    });
    */
  };

  // Campos de texto configurables para mayor flexibilidad y accesibilidad
  const textFields = [
    { name: "nombre", label: "Nombre*", type: "text" },
    { name: "apellido", label: "Apellido*", type: "text" },
    { name: "email", label: "Email*", type: "email" }, // Usar type="email"
    { name: "localidad", label: "Localidad*", type: "text" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>LET’S WORK TOGETHER</h2>
        <h1 className={styles.subtitle}>
          Lo que vestís <em>refleja</em> quién sos. <br />
          Potenciemos tu <em>imagen</em>.
        </h1>

        <form className={styles.form} onSubmit={submitForm}>
          {/* Campos de texto */}
          {textFields.map((field) => (
            <div className={styles.formGroup} key={field.name}>
              <label htmlFor={field.name}>{field.label}</label> {/* Label asociado */}
              <input
                id={field.name} // ID para asociar con el label
                type={field.type}
                name={field.name}
                placeholder={field.label.replace('*', '')}
                value={formData[field.name as keyof typeof formData] as string}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          ))}

          {/* Teléfono - Mejorado con estados separados */}
          <div className={styles.formGroup}>
            <label htmlFor="phoneCountryCode">Teléfono*</label>
            <div className={styles.phoneInput}>
              <select
                id="phoneCountryCode" // ID para asociar con el label
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                required
                className={styles.select}
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
                name="phoneNumber" // Usar un nombre que refleje que es solo el número
                required
                placeholder="Número de teléfono"
                value={phoneNumber} // Vinculado al nuevo estado 'phoneNumber'
                onChange={handlePhoneNumberChange}
                className={styles.input}
              />
            </div>
          </div>

          {/* Checkboxes de Servicios (NO USAN customCheckboxLabel) */}
          <fieldset className={styles.checkboxGroup} style={{ border: "none", padding: 0, margin: 0 }}>
            <legend className={styles.checkboxTitle}>
              ¿Qué servicio te interesa? Elegí 1 o más*
            </legend>
            {["Personal Shopping", "Closet Detox", "Transformá tu Imagen (Asesoramiento)", "No estoy seguro/a, quiero asesoramiento", "Otro"].map((servicio, index) => (
              <label key={index} className={styles.checkboxLabel}> {/* Usa la clase original */}
                <input
                  type="checkbox"
                  name="servicio"
                  value={servicio}
                  checked={formData.servicio.includes(servicio)}
                  onChange={handleCheckboxChange}
                  // La validación de al menos uno se hará en submitForm
                />
                <span>{servicio}</span> {/* ¡IMPORTANTE!: Texto dentro de un span */}
              </label>
            ))}
            {formData.servicio.includes("Otro") && (
              <div className={styles.formGroup}>
                <label htmlFor="otroServicio" className="sr-only">Especificar otro servicio</label>
                <input
                  id="otroServicio"
                  type="text"
                  name="otroServicio"
                  placeholder="Especificar..."
                  value={formData.otroServicio}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            )}
          </fieldset>

          {/* Selects de presupuesto, inicio y referencia */}
          <div className={styles.selectWrapper}>
            <label htmlFor="presupuesto" className={styles.selectLabel}>¿Cuál sería tu presupuesto para invertir en ropa y accesorios?*</label>
            <select
              id="presupuesto"
              name="presupuesto"
              value={formData.presupuesto}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Seleccionar</option>
              <option value="rango1">$0 - $100.000 ARS</option>
              <option value="rango2">$100.000 - $250.000</option>
              <option value="rango3">$250.000 - $500.000</option>
              <option value="rango4">$500.000 - $1.000.000</option>
              <option value="rango5">Más de $1.000.000</option>
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <label htmlFor="inicio" className={styles.selectLabel}>¿Cuándo te gustaría empezar?*</label>
            <select
              id="inicio"
              name="inicio"
              value={formData.inicio}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Seleccionar</option>
              <option value="inmediato">Inmediatamente</option>
              <option value="proximoMes">El próximo mes</option>
              <option value="futuro">Más adelante</option>
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <label htmlFor="referencia" className={styles.selectLabel}>¿Cómo nos conociste?*</label>
            <select
              id="referencia"
              name="referencia"
              value={formData.referencia}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Seleccionar</option>
              <option value="redes">Instagram</option>
              <option value="amigos">TikTok</option>
              <option value="busqueda">Facebook</option>
              <option value="otro">Google</option>
              <option value="personal">Personal</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Checkbox de términos (USA customCheckboxLabel para personalización) */}
          <label htmlFor="aceptaTerminos" className={styles.customCheckboxLabel}> {/* <--- CAMBIO AQUÍ */}
            <input
              id="aceptaTerminos"
              type="checkbox"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
              required
            />
            <span> {/* ¡IMPORTANTE!: Texto dentro de un span */}
              Acepto los{" "}
              <a href="/terminos" target="_blank" rel="noopener noreferrer">
                términos y condiciones y la política de privacidad
              </a>.
            </span>
          </label>

          {/* Checkbox de recibir emails (USA customCheckboxLabel para personalización) */}
          <label htmlFor="recibirEmails" className={styles.customCheckboxLabel}> {/* <--- CAMBIO AQUÍ */}
            <input
              id="recibirEmails"
              type="checkbox"
              name="recibirEmails"
              checked={formData.recibirEmails}
              onChange={handleChange}
            />
            <span>Quiero recibir novedades, recomendaciones y contenido exclusivo en mi correo.</span> {/* ¡IMPORTANTE!: Texto dentro de un span */}
          </label>

          <p className={styles.finalText}>
            (Nos ponemos en contacto con vos dentro de las próximas 24 hs.)
          </p>

          {/* Botón de enviar */}
          <button type="submit" className={styles.submitButton}>
            ENVIAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiciosInterno;