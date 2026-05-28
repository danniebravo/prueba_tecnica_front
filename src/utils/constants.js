export const ROLES = ['Administrador', 'Soporte', 'Desarrollador', 'Analista'];

export const ESTADOS = ['Pendiente', 'En Progreso', 'Resuelto'];

export const PRIORIDADES = ['Baja', 'Media', 'Alta'];

export const COLORES_ESTADO = {
  Pendiente:
    'bg-amber-100 text-amber-800 ring-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30',
  'En Progreso':
    'bg-sky-100 text-sky-800 ring-sky-600/20 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/30',
  Resuelto:
    'bg-emerald-100 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30',
};

export const COLORES_PRIORIDAD = {
  Baja: 'bg-slate-100 text-slate-700 ring-slate-500/20 dark:bg-slate-700/40 dark:text-slate-300 dark:ring-slate-500/30',
  Media:
    'bg-orange-100 text-orange-800 ring-orange-600/20 dark:bg-orange-500/15 dark:text-orange-300 dark:ring-orange-500/30',
  Alta: 'bg-red-100 text-red-800 ring-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/30',
};
