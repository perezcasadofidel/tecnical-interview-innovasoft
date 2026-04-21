# Prueba Técnica - Desarrollador React JS

Este proyecto es una aplicación web desarrollada en React + TypeScript para la gestión de clientes, autenticación y carga de imágenes, cumpliendo los requisitos de la prueba técnica.

## Características principales

- Login y registro de usuarios.
- Listado, creación, edición y eliminación de clientes.
- Formulario de clientes con validación de datos y carga opcional de imagen.
- Manejo de intereses asociados a cada cliente.
- Consumo de APIs protegidas con autenticación JWT.
- Lógica de carga de imágenes en base64 con límite de tamaño.

## Estructura del proyecto

- **src/pages/**: Páginas principales (Login, Registro, Home, Clientes, Formulario de Cliente, 404).
- **src/api/**: Lógica de consumo de APIs (clientes, autenticación).
- **src/context/**: Contexto global de autenticación.
- **src/layouts/**: Layout principal de la app.
- **src/routes/**: Rutas protegidas.
- **src/schemas/**: Esquemas de validación con Zod.
- **src/types/**: Tipos TypeScript para entidades y requests.
- **src/utils/**: Utilidades generales (fechas, archivos, errores).

## Instalación y ejecución

1. Instala las dependencias:
   ```bash
   npm install
   # o
   pnpm install
   ```
2. Crea un archivo `.env` con la variable `REACT_APP_API_BASE_URL` apuntando a la URL de la API backend.
3. Ejecuta la app en modo desarrollo:
   ```bash
   npm start
   # o
   pnpm start
   ```
4. Accede a [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

- `start`: Ejecuta la app en modo desarrollo.
- `build`: Genera la build de producción en la carpeta `build`.
- `test`: Ejecuta los tests.

## Flujo de clientes y manejo de imágenes

El formulario de clientes permite adjuntar una imagen opcional. La imagen se convierte automáticamente a base64 antes de ser enviada al backend.

**Restricciones importantes:**

- El tamaño máximo permitido para la imagen es de 600 KB (en base64).
- Si la imagen supera este límite, el sistema mostrará un mensaje de error y no permitirá cargarla.
- Si no se selecciona imagen, el campo se enviará vacío.

**Cómo funciona:**

- Al seleccionar una imagen, el archivo se convierte a base64 en el frontend.
- Antes de guardar la imagen en el formulario, se valida que el string base64 no supere los 600 KB.
- Si la validación es exitosa, la imagen se incluye en el payload enviado al backend.
- Si la validación falla, se muestra un mensaje y la imagen no se carga.

## Autenticación

El sistema utiliza JWT para proteger las rutas y las peticiones a la API. El token se almacena en localStorage y se envía automáticamente en cada request.

## Validaciones

Se utiliza Zod para validar los formularios tanto en login/registro como en la gestión de clientes. Los mensajes de error se muestran en la UI.

## Dependencias principales

- React, React DOM, React Router DOM
- TypeScript
- Material UI (MUI)
- React Hook Form
- Zod
- Axios

## Notas adicionales

- El proyecto está preparado para ser extendido fácilmente con nuevas entidades o funcionalidades.
- El código está modularizado y tipado para facilitar el mantenimiento.

---

Desarrollado para la prueba técnica de Innovasoft.
