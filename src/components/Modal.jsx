import { useEffect } from 'react';

export default function Modal({ abierto, titulo, onCerrar, children }) {
  useEffect(() => {
    if (!abierto) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onCerrar?.();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ocean-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCerrar?.();
      }}
    >
      <div className="w-full sm:max-w-lg bg-white dark:bg-ocean-800 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col border border-transparent dark:border-ocean-600/40">
        <header className="flex items-center justify-between gap-4 px-5 py-4 border-b border-ocean-50 dark:border-ocean-600/40">
          <h3
            id="modal-titulo"
            className="text-base font-semibold text-ocean-800 dark:text-ocean-50"
          >
            {titulo}
          </h3>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="rounded-md p-1 text-ocean-600 dark:text-ocean-200 hover:bg-ocean-50/60 dark:hover:bg-ocean-700 hover:text-ocean-800 dark:hover:text-ocean-50 focus:outline-none focus:ring-2 focus:ring-ocean-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </header>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
