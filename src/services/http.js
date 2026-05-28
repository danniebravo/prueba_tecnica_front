export const API_BASE_URL = 'http://localhost:3001';

async function request(path, { method = 'GET', body, signal } = {}) {
  const opciones = {
    method,
    headers: { 'Content-Type': 'application/json' },
    signal,
  };
  if (body !== undefined) {
    opciones.body = JSON.stringify(body);
  }

  let respuesta;
  try {
    respuesta = await fetch(`${API_BASE_URL}${path}`, opciones);
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error(
      'No se pudo contactar con el servidor. Verifica que la API esté corriendo (npm run api).',
    );
  }

  if (!respuesta.ok) {
    throw new Error(
      `Solicitud fallida (${respuesta.status} ${respuesta.statusText}).`,
    );
  }

  if (respuesta.status === 204) return null;
  return respuesta.json();
}

export const http = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) =>
    request(path, { ...opts, method: 'PATCH', body }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};
