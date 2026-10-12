emailjs.init("0n9-YVjZlzuWekevB");

const form = document.getElementById("formulario-contacto");

if (form) {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showFieldError = (field, message) => {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    const feedback = field.parentElement.querySelector(".invalid-feedback");
    if (feedback && message) feedback.textContent = message;
  };

  const clearFieldError = (field) => {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  };

  const validateField = (field) => {
    const value = field.value.trim();
    if (field.hasAttribute("required") && !value) {
      showFieldError(field);
      return false;
    }
    if (field.type === "email" && value && !emailRe.test(value)) {
      showFieldError(field, "Ingresá un email válido.");
      return false;
    }
    if (value) clearFieldError(field);
    return true;
  };

  // Validación en tiempo real
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("blur", () => {
      if (field.value.trim() || field.classList.contains("is-invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.classList.add("was-validated");

    const fields = Array.from(form.querySelectorAll("input:not([type='hidden']), textarea"));
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      showToast("Revisá los campos marcados en el formulario.", "error");
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    emailjs.sendForm("service_jmso01m", "template_as1kicz", this)
      .then(() => {
        showToast("Mensaje enviado con éxito. ¡Gracias por contactarme!");
        form.reset();
        form.classList.remove("was-validated");
        form.querySelectorAll(".is-valid").forEach((f) => f.classList.remove("is-valid"));
      })
      .catch((error) => {
        console.error("Error al enviar:", error);
        showToast("Ocurrió un error al enviar. Intentalo más tarde.", "error");
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
}
