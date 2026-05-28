import { useEffect } from 'react';
import EmptyState from '../components/EmptyState';
import IncidenciaList from '../components/IncidenciaList';
import Spinner from '../components/Spinner';
import { useIncidencias } from '../hooks/useIncidencias';
import { notificarError } from '../utils/alerts';

export default function Dashboard() {
  const { incidencias, cargando, error, recargar } = useIncidencias();

  useEffect(() => {
    if (error) {
      notificarError(error);
    }
  }, [error]);

  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Incidencias
          </h2>
          <p className="text-sm text-slate-500">
            Reportes de errores registrados por el equipo de soporte
          </p>
        </div>
      </div>

      {cargando && <Spinner texto="Cargando incidencias…" />}

      {!cargando && error && (
        <EmptyState
          titulo="No se pudieron cargar las incidencias"
          mensaje={error}
          accion={
            <button
              type="button"
              onClick={() => recargar()}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Reintentar
            </button>
          }
        />
      )}

      {!cargando && !error && incidencias.length === 0 && (
        <EmptyState
          titulo="Aún no hay incidencias"
          mensaje="Cuando se registre la primera, aparecerá aquí."
        />
      )}

      {!cargando && !error && incidencias.length > 0 && (
        <IncidenciaList incidencias={incidencias} />
      )}
    </section>
  );
}
