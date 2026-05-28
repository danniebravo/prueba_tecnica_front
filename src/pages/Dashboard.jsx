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
          onClick={abrirParaCrear}
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
              onClick={abrirParaCrear}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
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
