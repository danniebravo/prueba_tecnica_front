const CLASES_BASE =
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium';

const CLASES_ESTADO = {
  Pendiente:
    'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  'En Progreso':
    'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300',
  Resuelto:
    'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300',
};

const CLASES_PRIORIDAD = {
  Baja: 'bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300',
  Media:
    'bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300',
  Alta: 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300',
};

const CLASES_NEUTRO =
  'bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300';

export default function Badge({
  estado,
  prioridad,
  children,
  className = '',
}) {
  let clasesColor = CLASES_NEUTRO;
  let contenido = children;

  if (estado) {
    clasesColor = CLASES_ESTADO[estado] ?? CLASES_NEUTRO;
    contenido = children ?? estado;
  } else if (prioridad) {
    clasesColor = CLASES_PRIORIDAD[prioridad] ?? CLASES_NEUTRO;
    contenido = children ?? `Prioridad ${prioridad.toLowerCase()}`;
  }

  return (
    <span className={`${CLASES_BASE} ${clasesColor} ${className}`}>
      {contenido}
    </span>
  );
}
