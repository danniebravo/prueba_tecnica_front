export default function EmptyState({ titulo, mensaje, accion }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-ocean-50 dark:border-ocean-600/50 bg-white/50 dark:bg-ocean-800/40 p-10 text-center">
      <h3 className="text-base font-medium text-ocean-800 dark:text-ocean-50">
        {titulo}
      </h3>
      {mensaje && (
        <p className="mt-1 text-sm text-ocean-600 dark:text-ocean-200">
          {mensaje}
        </p>
      )}
      {accion && <div className="mt-4">{accion}</div>}
    </div>
  );
}
