import { http } from './http';

const RECURSO = '/incidencias';

export function listarIncidencias(opts) {
  return http.get(`${RECURSO}?_sort=createdAt&_order=desc`, opts);
}

export function crearIncidencia(datos) {
  return http.post(RECURSO, {
    ...datos,
    createdAt: new Date().toISOString(),
  });
}

export function actualizarIncidencia(id, cambios) {
  return http.patch(`${RECURSO}/${id}`, cambios);
}

export function eliminarIncidencia(id) {
  return http.delete(`${RECURSO}/${id}`);
}
