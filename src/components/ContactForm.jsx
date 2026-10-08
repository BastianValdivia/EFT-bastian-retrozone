import { useState } from 'react';

// Validación simple de formato de email. Esto es validación de frontend, sin backend detrás.
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * ContactForm
 * Formulario controlado con useState para cada campo y para los
 * errores. Como esta asignatura es solo de frontend, no hay backend
 * que reciba el mensaje: al validar correctamente, se simula el
 * envío mostrando "Mensaje enviado" y se limpia el formulario.
 */
function ContactForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function validar() {
    const erroresEncontrados = {};

    if (!nombre.trim()) {
      erroresEncontrados.nombre = 'El nombre es obligatorio.';
    }

    if (!email.trim()) {
      erroresEncontrados.email = 'El email es obligatorio.';
    } else if (!PATRON_EMAIL.test(email.trim())) {
      erroresEncontrados.email = 'Ingresá un email válido.';
    }

    if (!mensaje.trim()) {
      erroresEncontrados.mensaje = 'El mensaje es obligatorio.';
    } else if (mensaje.trim().length < 10) {
      erroresEncontrados.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    return erroresEncontrados;
  }

  function manejarSubmit(evento) {
    evento.preventDefault();

    const erroresEncontrados = validar();
    setErrores(erroresEncontrados);

    // Renderizado condicional: si no hay errores, "enviamos" el
    // mensaje (simulado) y limpiamos el formulario.
    if (Object.keys(erroresEncontrados).length === 0) {
      setEnviado(true);
      setNombre('');
      setEmail('');
      setMensaje('');
    } else {
      setEnviado(false);
    }
  }

  return (
    <section id="contacto" className="my-5">
      <h2 className="h4 mb-3">Contacto</h2>

      <form
        onSubmit={manejarSubmit}
        noValidate
        className="col-12 col-md-6 mx-auto"
      >
        <div className="mb-3">
          <label htmlFor="contacto-nombre" className="form-label">
            Nombre
          </label>
          <input
            id="contacto-nombre"
            type="text"
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
          />
          {errores.nombre && (
            <div className="invalid-feedback">{errores.nombre}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="contacto-email" className="form-label">
            Email
          </label>
          <input
            id="contacto-email"
            type="email"
            className={`form-control ${errores.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
          />
          {errores.email && (
            <div className="invalid-feedback">{errores.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="contacto-mensaje" className="form-label">
            Mensaje
          </label>
          <textarea
            id="contacto-mensaje"
            className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
            rows="4"
            value={mensaje}
            onChange={(evento) => setMensaje(evento.target.value)}
          ></textarea>
          {errores.mensaje && (
            <div className="invalid-feedback">{errores.mensaje}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar mensaje
        </button>

        {/* Renderizado condicional: mensaje de éxito solo tras un
            envío válido. */}
        {enviado && (
          <div className="alert alert-success mt-3" role="alert">
            Mensaje enviado. ¡Gracias por escribirnos!
          </div>
        )}
      </form>
    </section>
  );
}

export default ContactForm;
