emailjs.init("0n9-YVjZlzuWekevB");

const form = document.getElementById("formulario-contacto");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Activa los estilos de validación de Bootstrap
  form.classList.add("was-validated");

  if (!form.checkValidity()) {
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  emailjs.sendForm("service_jmso01m", "template_as1kicz", this)
    .then(() => {
      alert("Mensaje enviado con éxito.");
      form.reset();
      form.classList.remove("was-validated");
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      alert("Ocurrió un error al enviar. Intentalo más tarde.");
    })
    .finally(() => {
      if (submitBtn) submitBtn.disabled = false;
    });
});