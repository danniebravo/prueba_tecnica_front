const PERMISOS = {
  Administrador: { crear: true, editar: true, eliminar: true },
  Soporte: { crear: true, editar: true, eliminar: false },
  Desarrollador: { crear: false, editar: true, eliminar: false },
  Analista: { crear: false, editar: false, eliminar: false },
};

const SIN_PERMISOS = { crear: false, editar: false, eliminar: false };

export function permisosDe(rol) {
  return PERMISOS[rol] ?? SIN_PERMISOS;
}

export function puede(rol, accion) {
  return permisosDe(rol)[accion] === true;
}

export function esSoloLectura(rol) {
  const p = permisosDe(rol);
  return !p.crear && !p.editar && !p.eliminar;
}
