export default function Spinner({ texto = 'Cargando…' }) {
  return (
    <div
      className="flex items-center justify-center gap-3 py-12"
      role="status"
      aria-live="polite"
    >
      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-200 dark:border-slate-700 border-t-brand-600 dark:border-t-brand-300" />
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {texto}
      </span>
    </div>
  );
}
