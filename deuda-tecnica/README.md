# Documentación Técnica Detallada — Portfolio Personal

> Este archivo contiene la documentación técnica completa movida desde el README principal.

---

## 🛠️ Stack Tecnológico

### Frontend (Producción)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **HTML5** | Living Standard | Estructura semántica, SEO, accesibilidad |
| **CSS3** | Living Standard | Variables CSS, Grid, Flexbox, animaciones |
| **Bootstrap** | 5.3.2 | Componentes UI, utilidades, responsive |
| **JavaScript** | ES2022+ | Lógica interactiva (tema, formulario, scroll) |
| **EmailJS** | v4 (CDN) | Envío de emails serverless |

### Herramientas y Servicios

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| **Git** | 2.40+ | Control de versiones |
| **GitHub Pages** | — | Hosting estático + CDN global |
| **Google Fonts** | — | Tipografía (Inter, Poppins) |
| **Font Awesome** | 6.4.0 (CDN) | Iconografía |

### Metodologías

| Metodología | Implementación |
|-------------|----------------|
| **Mobile-first** | Breakpoints: 320px, 576px, 768px, 992px, 1200px, 1400px |
| **Accesibilidad (a11y)** | WCAG 2.1 AA — ARIA, contraste 4.5:1, foco visible, navegación teclado |
| **SEO** | Open Graph, Twitter Cards, Schema.org (Person, WebSite), sitemap.xml |
| **Performance** | Lazy loading nativo (`loading="lazy"`), `preconnect`, minificación CSS/JS |

---

## ✨ Funcionalidades Detalladas

### 1. Tema Claro/Oscuro (`js/theme.js`)

```javascript
// Persistencia en localStorage
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-bs-theme', theme);

// Toggle con transiciones suaves
themeToggle.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
```

- **Persistencia:** `localStorage` — sobrevive a recargas y sesiones
- **Transiciones:** CSS `transition: background-color 0.3s, color 0.3s` en `:root`
- **Detección sistema:** `prefers-color-scheme` como fallback inicial

### 2. Formulario de Contacto (`js/form.js`)

```javascript
// Validación en tiempo real
const validateField = (field) => {
  const value = field.value.trim();
  const rules = field.dataset.rules?.split('|') || [];
  // required, email, minLength, maxLength
};

// Envío via EmailJS
emailjs.send('service_id', 'template_id', formData, 'public_key')
  .then(() => showToast('Mensaje enviado'))
  .catch(() => showToast('Error al enviar'));
```

**Validaciones implementadas:**
- `required` — campo obligatorio
- `email` — formato RFC 5322 simplificado
- `minLength:N` / `maxLength:N` — longitud
- `pattern:regex` — regex personalizado

**Estados visuales:**
- `is-valid` / `is-invalid` (Bootstrap)
- Mensajes de error dinámicos bajo cada campo
- Toast de éxito/error con auto-dismiss (3s)

### 3. Scroll Spy + Navegación Activa

```javascript
// Bootstrap ScrollSpy nativo
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#navbar',
  offset: 100
});

// Resalta link activo en navbar según sección visible
```

### 4. Lazy Loading de Imágenes

```html
<!-- Nativo — sin JS adicional -->
<img src="media/imagen.jpg" loading="lazy" alt="..." width="800" height="600">
```

- `loading="lazy"` nativo (soportado en todos los navegadores modernos)
- `width`/`height` explícitos para evitar CLS (Cumulative Layout Shift)
- `preconnect` a dominios externos (Google Fonts, Font Awesome)

### 5. SEO Optimizado

```html
<!-- Open Graph -->
<meta property="og:title" content="Isaac Acevedo — Portfolio">
<meta property="og:description" content="Desarrollador Web Junior">
<meta property="og:image" content="https://.../media/og-image.jpg">
<meta property="og:url" content="https://isaacjesusacevedo.github.io/Portfolio/">
<meta property="og:type" content="website">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">

<!-- Schema.org (Person) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Isaac Acevedo",
  "jobTitle": "Desarrollador Web Junior",
  "url": "https://isaacjesusacevedo.github.io/Portfolio/",
  "email": "isaac.acevedor1610@gmail.com"
}
</script>
```

### 6. Accesibilidad (WCAG 2.1 AA)

| Criterio | Implementación |
|----------|----------------|
| **Contraste** | 4.5:1 mínimo (texto), 3:1 (UI) — verificado en ambos temas |
| **Navegación teclado** | `tabindex`, `:focus-visible`, `skip link` oculto |
| **ARIA** | `aria-label`, `aria-expanded`, `aria-controls` en dropdowns/modals |
| **Alt text** | Todas las imágenes con `alt` descriptivo |
| **Formularios** | `label` asociado, `aria-describedby` para errores, `required` |
| **Idioma** | `lang="es"` en `<html>` |

---

## 📂 Secciones del Portfolio

| Sección | ID | Contenido | Tecnologías destacadas |
|---------|-----|-----------|------------------------|
| **Hero** | `#inicio` | Nombre, título, stack, CTAs | Bootstrap Hero, CSS variables |
| **Sobre mí** | `#sobre-mi` | Perfil, motivación, stack en formación | Grid, Card |
| **Experiencia** | `#experiencia` | Tutor Programación (Instituto Tupac Amaru) + Operario (Toxic Shine) | Timeline, Badges |
| **Tecnologías** | `#habilidades` | Grid visual de skills con nivel (básico/intermedio/avanzado) | CSS Grid, Filter |
| **Proyectos** | `#proyectos` | Tarjetas con capturas, descripción técnica, links demo/repo | Modal, Carousel |
| **Educación** | `#educacion` | Analista en Sistemas (3er año) + Curso Municipalidad | Card, List group |
| **Contacto** | `#contacto` | Formulario funcional + links email/LinkedIn/GitHub | EmailJS, Validación |

---

## ⚙️ Configuración EmailJS

### Credenciales Requeridas (Netlify / GitHub Pages Environment Variables)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `EMAILJS_SERVICE_ID` | ID del servicio (Gmail, Outlook, etc.) | `service_abc123` |
| `EMAILJS_TEMPLATE_ID` | ID de la plantilla de email | `template_xyz789` |
| `EMAILJS_PUBLIC_KEY` | Clave pública (client-side) | `user_abcdefghijklmnop` |

### Plantilla de Email (EmailJS Dashboard)

```html
<!-- Asunto: Nuevo mensaje de {{from_name}} desde Portfolio -->
De: {{from_name}} ({{from_email}})
Asunto: {{subject}}

Mensaje:
{{message}}

---
Enviado desde: https://isaacjesusacevedo.github.io/Portfolio/
```

---

## 🚀 Despliegue en GitHub Pages

### Workflow Automático (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Configuración Repositorio

1. **Settings → Pages → Source:** GitHub Actions
2. **Custom Domain (opcional):** `isaacacevedo.dev` → CNAME en repo
3. **HTTPS:** Forzado automático por GitHub Pages
4. **Variables de entorno:** Settings → Secrets → Actions → `EMAILJS_*`

---

## 📦 Stack Tecnológico — Versiones Exactas

```json
{
  "bootstrap": "5.3.2",
  "bootstrap-icons": "1.11.1",
  "emailjs-com": "3.2.0",
  "font-awesome": "6.4.0",
  "google-fonts": "Inter (300,400,500,600,700), Poppins (400,500,600,700)"
}
```

### CDN vs Local

| Recurso | Origen | Motivo |
|---------|--------|--------|
| Bootstrap CSS/JS | CDN (jsDelivr) | Cache global, versión fija |
| Font Awesome | CDN (jsDelivr) | Cache global, solo icons usados |
| Google Fonts | CDN (fonts.googleapis.com) | `preconnect` + `display=swap` |
| EmailJS | CDN (cdn.jsdelivr.net) | Sin build step, serverless |
| CSS/JS custom | Local | Control total, versionado en repo |

---

## 🎯 Metodologías de Desarrollo

### Responsive Design

```css
/* Breakpoints Bootstrap 5.3 */
--bs-breakpoint-xs: 0;
--bs-breakpoint-sm: 576px;
--bs-breakpoint-md: 768px;
--bs-breakpoint-lg: 992px;
--bs-breakpoint-xl: 1200px;
--bs-breakpoint-xxl: 1400px;

/* Mobile-first: estilos base para móvil, media queries ascendentes */
@media (min-width: 576px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 992px) { /* lg */ }
@media (min-width: 1200px) { /* xl */ }
@media (min-width: 1400px) { /* xxl */ }
```

### Variables CSS (Design System)

```css
:root {
  /* Colores */
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  
  /* Fondos */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  
  /* Texto */
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  
  /* Espaciado (scale 4px) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 1rem;     /* 16px */
  --space-4: 1.5rem;   /* 24px */
  --space-5: 2rem;     /* 32px */
  --space-6: 3rem;     /* 48px */
  
  /* Tipografía */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-heading: 'Poppins', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  
  /* Radio */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  /* Transiciones */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}

/* Tema oscuro */
[data-bs-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
}
```

---

## 📝 Historial de Versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **v2.0** | 2026-03 | Rediseño completo: tema oscuro, EmailJS, Schema.org, a11y, CI/CD |
| **v1.0** | 2025-11 | Versión inicial: HTML/CSS/JS vanilla, Bootstrap 5, GitHub Pages |

---

## 📋 Checklist de Calidad (Pre-Deploy)

```bash
# Validación HTML
npx html-validate index.html

# Lint CSS
npx stylelint "css/**/*.css"

# Lint JS
npx eslint js/**/*.js

# Accesibilidad
# axe-core en DevTools → 0 violations

# Performance
# Lighthouse CI → Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90

# SEO
# Verificar: meta tags, structured data, sitemap.xml, robots.txt
```

---

## 🔗 Enlaces de Referencia

- **Demo en vivo:** https://isaacjesusacevedo.github.io/Portfolio/
- **Repositorio:** https://github.com/Isaacjesusacevedo/Portfolio
- **EmailJS Docs:** https://www.emailjs.com/docs/
- **Bootstrap 5.3:** https://getbootstrap.com/docs/5.3/
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **Schema.org Person:** https://schema.org/Person