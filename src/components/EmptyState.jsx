export default function EmptyState({ titulo, mensaje, accion }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
      <h3 className="text-base font-medium text-slate-800">{titulo}</h3>
      {mensaje && <p className="mt-1 text-sm text-slate-500">{mensaje}</p>}
      {accion && <div className="mt-4">{accion}</div>}
    </div>
  );
}
