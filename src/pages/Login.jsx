import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState(ROLES[0]);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const enviar = (e) => {
    e.preventDefault();
    const valor = nombre.trim();
    if (valor.length < 2) {
      setError('Ingresa un nombre de al menos 2 caracteres.');
      return;
    }
    setError('');
    login({ nombre: valor, rol });
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 py-8 bg-gradient-to-br from-[#f5f8fb] via-ocean-100/50 to-ocean-50/60 dark:from-ocean-900 dark:via-ocean-800 dark:to-ocean-900 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-600 text-white items-center justify-center font-bold text-xl mb-4 shadow-lg shadow-ocean-500/30">
            IT
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-ocean-800 dark:text-ocean-50 tracking-tight">
            Issue Tracker
          </h1>
          <p className="text-sm text-ocean-600 dark:text-ocean-200 mt-1.5">
            Ingresa tus datos para acceder al panel
          </p>
        </div>

        <form
          onSubmit={enviar}
          className="bg-white dark:bg-ocean-800 border border-ocean-50 dark:border-ocean-600/50 rounded-2xl shadow-xl shadow-ocean-500/10 dark:shadow-black/30 p-6 sm:p-8 space-y-5"
          noValidate
        >
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-ocean-800 dark:text-ocean-50 mb-1.5"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Daniel Bravo"
              autoFocus
              className="w-full rounded-lg border border-ocean-50 dark:border-ocean-600 bg-white dark:bg-ocean-900 text-ocean-800 dark:text-ocean-50 px-3 py-2.5 text-sm placeholder:text-ocean-600/60 dark:placeholder:text-ocean-200/60 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 transition-shadow"
            />
          </div>

          <div>
            <label
              htmlFor="rol"
              className="block text-sm font-medium text-ocean-800 dark:text-ocean-50 mb-1.5"
            >
              Rol
            </label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full rounded-lg border border-ocean-50 dark:border-ocean-600 bg-white dark:bg-ocean-900 text-ocean-800 dark:text-ocean-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p
              className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-md px-3 py-2"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-500/90 hover:to-ocean-800 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-ocean-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 dark:focus:ring-offset-ocean-900"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-xs text-ocean-600 dark:text-ocean-200 mt-4">
          Sesión simulada con almacenamiento local del navegador
        </p>
      </div>
    </div>
  );
}
