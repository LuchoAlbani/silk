import React, { useState, useEffect } from "react";
import styles from "./ServiciosInterno.module.css"; // ✅ Se usa correctamente

const ServiciosInterno: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    localidad: "",
    telefono: "",
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

  // Fetch de países para obtener el código de teléfono
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
          .sort((a: any, b: any) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Manejo de cambios en inputs y selects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Manejo de cambios en el teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      telefono: `${selectedCountryCode} ${e.target.value}`, // Concatenar el código con el número
    }));
  };

  // ✅ Manejo de cambios en checkboxes de servicios
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
    console.log("Formulario enviado:", formData);
  };

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
          {["nombre", "apellido", "email", "localidad"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1) + "*"}
              value={formData[field as keyof typeof formData] as string}
              onChange={handleChange}
              className={styles.input}
              required
            />
          ))}

          {/* Teléfono - Formato similar al modal */}
          <div className={styles.emailPhoneGroup}>
            <div className={styles.formGroup}>
              <label>Teléfono*</label>
              <div className={styles.phoneInput}>
                <select
                  onChange={(e) => setSelectedCountryCode(e.target.value)} // Actualizamos el código del país seleccionado
                  required
                >
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
                <input
                  type="tel"
                  name="telefono"
                  required
                  placeholder="Número de teléfono"
                  value={formData.telefono}
                  onChange={handlePhoneChange}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* ✅ Servicios - Checkboxes */}
          <fieldset className={styles.checkboxGroup} style={{ border: "none", padding: 0, margin: 0 }}>
            <legend className={styles.checkboxTitle}>
              ¿Qué servicio te interesa? Elegí 1 o más*
            </legend>
            {[ "Personal Shopping", "Closet Detox", "Transformá tu Imagen (Asesoramiento)", "No estoy seguro/a, quiero asesoramiento", "Otro" ].map((servicio, index) => (
              <label key={index} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="servicio"
                  value={servicio}
                  checked={formData.servicio.includes(servicio)}
                  onChange={handleCheckboxChange}
                />
                <span>{servicio}</span>
              </label>
            ))}
            {formData.servicio.includes("Otro") && (
              <input
                type="text"
                name="otroServicio"
                placeholder="Especificar..."
                value={formData.otroServicio}
                onChange={handleChange}
                className={styles.input}
                required
              />
            )}
          </fieldset>

          {/* Selects y demás campos */}
          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>¿Cuál sería tu presupuesto para invertir en ropa y accesorios?*</label>
            <select
              name="presupuesto"
              value={formData.presupuesto}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Seleccionar</option>
              <option value="bajo">Menos de $50.000</option>
              <option value="medio">$50.000 - $150.000</option>
              <option value="alto">Más de $150.000</option>
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>¿Cuándo te gustaría empezar?*</label>
            <select
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
            <label className={styles.selectLabel}>¿Cómo nos conociste?*</label>
            <select
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

          {/* Checkbox de términos */}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
              required
            />
            <span>
              Acepto los{" "}
              <a href="/terminos" target="_blank" rel="noopener noreferrer">
                términos y condiciones y la política de privacidad
              </a>.
            </span>
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="recibirEmails"
              checked={formData.recibirEmails}
              onChange={handleChange}
            />
            <span>Quiero recibir novedades, recomendaciones y contenido exclusivo en mi correo.</span>
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
