export default function EmptyState({ titulo, mensaje, accion }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/40 p-10 text-center">
      <h3 className="text-base font-medium text-slate-800 dark:text-slate-100">
        {titulo}
      </h3>
      {mensaje && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {mensaje}
        </p>
      )}
      {accion && <div className="mt-4">{accion}</div>}
    </div>
  );
}
