const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// cargar tema guardado
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light");
  toggleBtn.textContent = "☀️";
}

// cambiar tema
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light");

  const isLight = body.classList.contains("light");

  toggleBtn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
