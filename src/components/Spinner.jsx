export default function Spinner({ texto = 'Cargando…' }) {
  return (
    <div
      className="flex items-center justify-center gap-3 py-12"
      role="status"
      aria-live="polite"
    >
      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-ocean-50 dark:border-ocean-600 border-t-ocean-500 dark:border-t-ocean-100" />
      <span className="text-sm text-ocean-600 dark:text-ocean-200">
        {texto}
      </span>
    </div>
  );
}
