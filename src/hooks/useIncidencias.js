import { useCallback, useEffect, useState } from 'react';
import {
  actualizarIncidencia,
  crearIncidencia,
  eliminarIncidencia,
  listarIncidencias,
} from '../services/incidenciasService';

export function useIncidencias() {
  const [incidencias, setIncidencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async ({ signal } = {}) => {
    setCargando(true);
    setError(null);
    try {
      const datos = await listarIncidencias({ signal });
      setIncidencias(datos);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    cargar({ signal: controller.signal });
    return () => controller.abort();
  }, [cargar]);

  const crear = useCallback(async (datos) => {
    const nueva = await crearIncidencia(datos);
    setIncidencias((prev) => [nueva, ...prev]);
    return nueva;
  }, []);

  const actualizar = useCallback(async (id, cambios) => {
    const actualizada = await actualizarIncidencia(id, cambios);
    setIncidencias((prev) =>
      prev.map((i) => (i.id === id ? actualizada : i)),
    );
    return actualizada;
  }, []);

  const eliminar = useCallback(async (id) => {
    await eliminarIncidencia(id);
    setIncidencias((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return {
    incidencias,
    cargando,
    error,
    recargar: cargar,
    crear,
    actualizar,
    eliminar,
  };
}
