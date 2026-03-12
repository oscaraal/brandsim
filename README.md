# BrandSim

Versión adaptada para Render que conserva la selección Alumno/Profesor y la contraseña del profesor del HTML original, cambiando únicamente la capa de almacenamiento por una API local del mismo servicio.

## Estructura

- `public/index.html`
- `server.js`
- `package.json`
- `render.yaml`

## Despliegue en Render

- Build Command: `npm install`
- Start Command: `npm start`

## Nota

Las salas se guardan en memoria del servicio. Sirve para pruebas y demos; si el servicio se reinicia, las salas se pierden.
