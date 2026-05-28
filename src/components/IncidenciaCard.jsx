import Badge from './Badge';

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
  const tieneAcciones = Boolean(onEditar || onEliminar);

  return (
    <article className="group flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-500 transition-all duration-200">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 leading-snug">
        {titulo}
      </h3>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
        {descripcion}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge estado={estado} />
        <Badge prioridad={prioridad} />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatearFecha(createdAt)}
        </span>
        {tieneAcciones && (
          <div className="flex items-center gap-2">
            {onEditar && (
              <button
                type="button"
                onClick={() => onEditar(incidencia)}
                className="inline-flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label="Editar incidencia"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Editar
              </button>
            )}
            {onEliminar && (
              <button
                type="button"
                onClick={() => onEliminar(incidencia)}
                className="inline-flex items-center gap-1 rounded-md bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Eliminar incidencia"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
