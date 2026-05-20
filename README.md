TechFix — Landing + Form de Ingreso de Equipos

Descripción
- Sitio estático para la empresa TechFix: página principal (`index.html`) y una página de ingreso de equipos (`ingreso.html`) con CSS y validaciones en `validaciones.js`.

Características principales
- Formulario multi-sección (A-D) con campos condicionales (Empresa, Otro dispositivo, Otra marca, Garantía, Reparación previa, Retiro a domicilio).
- Validaciones cliente (Stage 3): se validan solo los campos visibles; mensajes inline por campo; resumen de errores al tope; scroll al primer error.
- Pantalla de confirmación al enviar correctamente con datos clave y número de orden generado.
- Contadores en tiempo real para textareas (umbrales naranja/rojo) y feedback visual (`campo-error` / `campo-ok`).

Archivos clave
- `index.html` — Landing (home).
- `ingreso.html` — Formulario de ingreso de equipos.
- `style.css`, `ingreso.css` — Estilos generales y del formulario.
- `validaciones.js` — Lógica de validación, toggles y confirmación.

Cómo probar localmente
1. Abrir `ingreso.html` en un navegador (doble clic o `Live Server`).
2. Probar flujos: cambiar "Tipo de cliente", "Tipo dispositivo" a "Otro", marcar garantía, marcar "Reparado antes" y probar contadores y validaciones.
3. Intentar enviar con errores -> ver resumen y scroll al primer error.
4. Enviar correctamente -> ver pantalla de confirmación y probar "Ingresar otro equipo".

Notas
- Todas las interacciones y validaciones son client-side (JavaScript).
- Si quieres que agregue estilos para el banner de errores o la tarjeta de confirmación, lo hago a continuación.

Autor: TechFix (implementado como ejercicio)
