import Badge from './Badge';
import { COLORES_ESTADO, COLORES_PRIORIDAD } from '../utils/constants';

function formatearFecha(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function IncidenciaCard({ incidencia, onEditar, onEliminar }) {
  const { titulo, descripcion, estado, prioridad, createdAt } = incidencia;

  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900 leading-snug">
          {titulo}
        </h3>
      </div>

      <p className="mt-2 text-sm text-slate-600 line-clamp-3">{descripcion}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge className={COLORES_ESTADO[estado] || ''}>{estado}</Badge>
        <Badge className={COLORES_PRIORIDAD[prioridad] || ''}>
          Prioridad {prioridad?.toLowerCase()}
        </Badge>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400">
          {formatearFecha(createdAt)}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEditar?.(incidencia)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onEliminar?.(incidencia)}
            className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
