import { useState } from 'react';
import { ESTADOS, PRIORIDADES } from '../utils/constants';

const valoresPorDefecto = {
  titulo: '',
  descripcion: '',
  estado: ESTADOS[0],
  prioridad: PRIORIDADES[1],
};

const claseInput =
  'w-full rounded-lg border border-ocean-50 dark:border-ocean-600 bg-white dark:bg-ocean-900 text-ocean-800 dark:text-ocean-50 px-3 py-2.5 text-sm placeholder:text-ocean-600/60 dark:placeholder:text-ocean-200/60 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500';

const claseLabel =
  'block text-sm font-medium text-ocean-800 dark:text-ocean-50 mb-1.5';

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
        <label htmlFor="titulo" className={claseLabel}>
          Título
        </label>
        <input
          id="titulo"
          type="text"
          value={valores.titulo}
          onChange={actualizar('titulo')}
          autoFocus
          className={claseInput}
        />
        {errores.titulo && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errores.titulo}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="descripcion" className={claseLabel}>
          Descripción
        </label>
        <textarea
          id="descripcion"
          rows={4}
          value={valores.descripcion}
          onChange={actualizar('descripcion')}
          className={claseInput}
        />
        {errores.descripcion && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errores.descripcion}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="estado" className={claseLabel}>
            Estado
          </label>
          <select
            id="estado"
            value={valores.estado}
            onChange={actualizar('estado')}
            className={claseInput}
          >
            {ESTADOS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="prioridad" className={claseLabel}>
            Prioridad
          </label>
          <select
            id="prioridad"
            value={valores.prioridad}
            onChange={actualizar('prioridad')}
            className={claseInput}
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
          className="rounded-lg border border-ocean-50 dark:border-ocean-600 bg-white dark:bg-ocean-900 px-4 py-2 text-sm font-medium text-ocean-800 dark:text-ocean-50 hover:bg-ocean-50/50 dark:hover:bg-ocean-700 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-500/90 hover:to-ocean-800 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-ocean-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {enviando ? 'Guardando…' : textoBotonEnviar}
        </button>
      </div>
    </form>
  );
}
