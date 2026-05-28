import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { esOscuro, alternar } = useTheme();

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={esOscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={esOscuro ? 'Modo claro' : 'Modo oscuro'}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-ocean-50 dark:border-ocean-600 bg-white dark:bg-ocean-800 text-ocean-800 dark:text-ocean-100 hover:bg-ocean-50/60 dark:hover:bg-ocean-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 dark:focus:ring-offset-ocean-900"
    >
      {esOscuro ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
