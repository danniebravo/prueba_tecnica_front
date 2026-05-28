# Sistema de Gestión de Incidencias

**Demo en producción:** https://frabjous-sunshine-ac57b7.netlify.app

SPA en React + Vite para que un equipo de soporte técnico gestione reportes de errores (incidencias). Permite registrar, listar, editar y eliminar incidencias contra una API mock, con autenticación simulada por LocalStorage.

Proyecto desarrollado como prueba técnica para **CESDE**.

## Características

- **Autenticación simulada** con nombre y rol, persistida en LocalStorage.
- **Rutas protegidas**: redirige a `/login` si no hay sesión.
- **CRUD completo** de incidencias contra una API mock local.
- **SweetAlert2** para la confirmación de eliminación y los toasts de éxito/error.
- **UI responsiva** con Tailwind CSS (mobile y desktop).
- **Modo claro y oscuro** con toggle y preferencia persistida en LocalStorage (respeta el tema del sistema en la primera visita).
- **Permisos por rol**: cada rol del login tiene un conjunto distinto de acciones permitidas (ver tabla más abajo).
- **Manejo de carga y errores** en cada petición HTTP, con feedback amigable al usuario.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 |
| Build | Vite |
| Enrutamiento | react-router-dom |
| Estilos | Tailwind CSS v4 |
| Alertas | SweetAlert2 |
| API mock | JSON Server |
| HTTP | `fetch` nativo |
| Sesión | LocalStorage |
| Control de versiones | Git + GitHub (GitFlow + Conventional Commits) |

## Estructura del proyecto

```
src/
├── components/      Componentes reutilizables (Layout, Modal, IncidenciaCard, …)
├── pages/           Vistas de ruta (Login, Dashboard)
├── services/        Capa HTTP y servicios de dominio (authService, incidenciasService, http)
├── hooks/           Hooks de estado y ciclo de vida (useAuth, useIncidencias)
└── utils/           Constantes y wrappers de SweetAlert2
```

## Requisitos

- Node.js **18 o superior**
- npm

## Cómo correrlo en local

Necesitas dos terminales: una para la API mock y otra para el frontend.

```bash
# 1. Instalar dependencias
npm install

# 2. En una terminal, levantar la API mock (puerto 3001)
npm run api

# 3. En otra terminal, levantar el frontend (puerto 5173)
npm run dev
```

La app se abrirá automáticamente en `http://localhost:5173`. La API queda disponible en `http://localhost:3001/incidencias`.

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo de Vite. |
| `npm run build` | Genera el build de producción en `dist/`. |
| `npm run preview` | Sirve el build de producción para revisión local. |
| `npm run api` | Levanta JSON Server con `db.json` en el puerto 3001. |

## Flujo de uso

1. Acceder a `http://localhost:5173` → redirige a `/login`.
2. Ingresar un nombre y elegir un rol → se guarda la sesión y redirige a `/dashboard`.
3. En el dashboard:
   - Se listan todas las incidencias en tarjetas, ordenadas por fecha de creación descendente.
   - **Nueva incidencia** abre un modal con el formulario.
   - **Editar** abre el mismo modal con los datos precargados.
   - **Eliminar** pide confirmación con SweetAlert2 antes de borrar.
4. El botón **Cerrar sesión** limpia el LocalStorage y vuelve al login.

## Permisos por rol

| Rol | Crear | Editar | Eliminar |
|---|:---:|:---:|:---:|
| Administrador | ✅ | ✅ | ✅ |
| Soporte | ✅ | ✅ | ❌ |
| Desarrollador | ❌ | ✅ | ❌ |
| Analista | ❌ | ❌ | ❌ (solo lectura) |

La matriz vive en `src/utils/permisos.js`. La UI esconde los botones que el rol no puede usar y bloquea la acción aunque el handler se llame directamente.

## Modelo de incidencia

```json
{
  "id": "1",
  "titulo": "Error 500 al guardar perfil",
  "descripcion": "Detalle del problema reportado.",
  "estado": "Pendiente | En Progreso | Resuelto",
  "prioridad": "Baja | Media | Alta",
  "createdAt": "2026-05-20T14:30:00.000Z"
}
```

## Flujo de Git

El proyecto sigue **GitFlow**:

- `main` — código estable y funcional.
- `develop` — rama de integración.
- `feature/*` — una rama por funcionalidad, nacida de `develop` y mergeada de vuelta con `--no-ff`.

Los commits siguen el estándar **Conventional Commits** (`feat:`, `fix:`, `chore:`, `style:`, `docs:`…).

## Despliegue

El frontend está desplegado en Netlify: https://frabjous-sunshine-ac57b7.netlify.app

Cada push a `main` regenera el deploy automáticamente.
