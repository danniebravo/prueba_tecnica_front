import { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState';
import IncidenciaForm from '../components/IncidenciaForm';
import IncidenciaList from '../components/IncidenciaList';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { useIncidencias } from '../hooks/useIncidencias';
import {
  confirmarEliminacion,
  notificarError,
  notificarExito,
} from '../utils/alerts';

export default function Dashboard() {
  const {
    incidencias,
    cargando,
    error,
    recargar,
    crear,
    actualizar,
    eliminar,
  } = useIncidencias();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [incidenciaEnEdicion, setIncidenciaEnEdicion] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (error) {
      notificarError(error);
    }
  }, [error]);

  const abrirParaCrear = () => {
    setIncidenciaEnEdicion(null);
    setModalAbierto(true);
  };

  const abrirParaEditar = (incidencia) => {
    setIncidenciaEnEdicion(incidencia);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    if (enviando) return;
    setModalAbierto(false);
    setIncidenciaEnEdicion(null);
  };

  const confirmarYEliminar = async (incidencia) => {
    const resultado = await confirmarEliminacion(incidencia.titulo);
    if (!resultado.isConfirmed) return;
    try {
      await eliminar(incidencia.id);
      notificarExito('Incidencia eliminada');
    } catch (err) {
      notificarError(err.message);
    }
  };

  const guardar = async (datos) => {
    setEnviando(true);
    try {
      if (incidenciaEnEdicion) {
        await actualizar(incidenciaEnEdicion.id, datos);
        notificarExito('Incidencia actualizada');
      } else {
        await crear(datos);
        notificarExito('Incidencia creada');
      }
      setModalAbierto(false);
      setIncidenciaEnEdicion(null);
    } catch (err) {
      notificarError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  const total = incidencias.length;

  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
              Incidencias
            </h2>
            {!cargando && !error && (
              <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full bg-brand-500/15 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                {total}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Reportes de errores registrados por el equipo de soporte
          </p>
        </div>
        <button
          type="button"
          onClick={abrirParaCrear}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-300 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-base-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
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
              className="rounded-lg bg-brand-600 hover:bg-brand-700 px-4 py-2 text-sm font-medium text-white"
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
              onClick={abrirParaCrear}
              className="rounded-lg bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-300 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/20"
            >
              Crear incidencia
            </button>
          }
        />
      )}

      {!cargando && !error && incidencias.length > 0 && (
        <IncidenciaList
          incidencias={incidencias}
          onEditar={abrirParaEditar}
          onEliminar={confirmarYEliminar}
        />
      )}

      <Modal
        abierto={modalAbierto}
        titulo={incidenciaEnEdicion ? 'Editar incidencia' : 'Nueva incidencia'}
        onCerrar={cerrarModal}
      >
        <IncidenciaForm
          inicial={incidenciaEnEdicion ?? undefined}
          enviando={enviando}
          onCancelar={cerrarModal}
          onEnviar={guardar}
          textoBotonEnviar={
            incidenciaEnEdicion ? 'Guardar cambios' : 'Crear incidencia'
          }
        />
      </Modal>
    </section>
  );
}
