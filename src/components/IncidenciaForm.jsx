import { useState } from 'react';
import { ESTADOS, PRIORIDADES } from '../utils/constants';

const valoresPorDefecto = {
  titulo: '',
  descripcion: '',
  estado: ESTADOS[0],
  prioridad: PRIORIDADES[1],
};

export default function IncidenciaForm({
  inicial,
  enviando = false,
  onCancelar,
  onEnviar,
  textoBotonEnviar = 'Guardar',
}) {
  const [valores, setValores] = useState(() => ({
    ...valoresPorDefecto,
    ...inicial,
  }));
  const [errores, setErrores] = useState({});

  const actualizar = (campo) => (e) => {
    setValores((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const validar = () => {
    const e = {};
    if (valores.titulo.trim().length < 3) {
      e.titulo = 'El título debe tener al menos 3 caracteres.';
    }
    if (valores.descripcion.trim().length < 5) {
      e.descripcion = 'La descripción debe tener al menos 5 caracteres.';
    }
    return e;
  };

  const enviar = (e) => {
    e.preventDefault();
    const errs = validar();
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;
    onEnviar({
      titulo: valores.titulo.trim(),
      descripcion: valores.descripcion.trim(),
      estado: valores.estado,
      prioridad: valores.prioridad,
    });
  };

  return (
    <form onSubmit={enviar} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="titulo"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Título
        </label>
        <input
          id="titulo"
          type="text"
          value={valores.titulo}
          onChange={actualizar('titulo')}
          autoFocus
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
        />
        {errores.titulo && (
          <p className="mt-1 text-xs text-red-600">{errores.titulo}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="descripcion"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          rows={4}
          value={valores.descripcion}
          onChange={actualizar('descripcion')}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
        />
        {errores.descripcion && (
          <p className="mt-1 text-xs text-red-600">{errores.descripcion}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Estado
          </label>
          <select
            id="estado"
            value={valores.estado}
            onChange={actualizar('estado')}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
          >
            {ESTADOS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="prioridad"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Prioridad
          </label>
          <select
            id="prioridad"
            value={valores.prioridad}
            onChange={actualizar('prioridad')}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
          >
            {PRIORIDADES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancelar}
          disabled={enviando}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={enviando}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {enviando ? 'Guardando…' : textoBotonEnviar}
        </button>
      </div>
    </form>
  );
}
