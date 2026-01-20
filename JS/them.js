console.log("Archivo theme.js cargado correctamente");

const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

if (!toggleBtn) {
    console.error("ERROR: No se encontró el botón con ID 'theme-toggle'");
} else {
    // 1. Cargar tema inicial
    const savedTheme = localStorage.getItem("theme") || "light";
    body.classList.add(savedTheme);
    toggleBtn.textContent = savedTheme === "light" ? "☀️" : "🌙";
    console.log("Tema inicial cargado:", savedTheme);

    // 2. Evento Click
    toggleBtn.addEventListener("click", () => {
        console.log("Botón presionado");
        
        if (body.classList.contains("light")) {
            body.classList.remove("light");
            body.classList.add("dark");
            localStorage.setItem("theme", "dark");
            toggleBtn.textContent = "🌙";
            console.log("Cambiado a dark");
        } else {
            body.classList.remove("dark");
            body.classList.add("light");
            localStorage.setItem("theme", "light");
            toggleBtn.textContent = "☀️";
            console.log("Cambiado a light");
        }
    });
}