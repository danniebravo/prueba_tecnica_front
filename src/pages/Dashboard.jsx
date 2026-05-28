export default function Dashboard() {
  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Incidencias
          </h2>
          <p className="text-sm text-slate-500">
            Listado de reportes de errores
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">
          El listado de incidencias se conectará en la siguiente etapa.
        </p>
      </div>
    </section>
  );
}
