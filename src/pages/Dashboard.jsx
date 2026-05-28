import { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState';
import IncidenciaForm from '../components/IncidenciaForm';
import IncidenciaList from '../components/IncidenciaList';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { useIncidencias } from '../hooks/useIncidencias';
import { notificarError, notificarExito } from '../utils/alerts';

export default function Dashboard() {
  const { incidencias, cargando, error, recargar, crear } = useIncidencias();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (error) {
      notificarError(error);
    }
  }, [error]);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => {
    if (enviando) return;
    setModalAbierto(false);
  };

  const guardar = async (datos) => {
    setEnviando(true);
    try {
      await crear(datos);
      notificarExito('Incidencia creada');
      setModalAbierto(false);
    } catch (err) {
      notificarError(err.message);
    } finally {
      setEnviando(false);
    }
  };

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
        <button
          type="button"
          onClick={abrirModal}
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          <span className="text-lg leading-none">+</span>
          Nueva incidencia
        </button>
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
          mensaje="Crea la primera para empezar a hacer seguimiento."
          accion={
            <button
              type="button"
              onClick={abrirModal}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Crear incidencia
            </button>
          }
        />
      )}

      {!cargando && !error && incidencias.length > 0 && (
        <IncidenciaList incidencias={incidencias} />
      )}

      <Modal
        abierto={modalAbierto}
        titulo="Nueva incidencia"
        onCerrar={cerrarModal}
      >
        <IncidenciaForm
          enviando={enviando}
          onCancelar={cerrarModal}
          onEnviar={guardar}
          textoBotonEnviar="Crear incidencia"
        />
      </Modal>
    </section>
  );
}
