emailjs.init("0n9-YVjZlzuWekevB");

const form = document.getElementById("formulario-contacto");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_jmso01m", "template_as1kicz", this)
    .then(() => {
      alert("Mensaje enviado con éxito.");
      form.reset();
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      alert("Ocurrió un error al enviar. Intentalo más tarde.");
    });
});