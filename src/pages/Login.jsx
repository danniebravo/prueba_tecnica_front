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
    <div className="min-h-screen grid place-items-center px-4 py-8 bg-slate-50 dark:bg-base-dark relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-brand-600 text-white items-center justify-center font-bold text-xl mb-4 shadow-lg shadow-brand-600/30">
            IT
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
            Issue Tracker
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Ingresa tus datos para acceder al panel
          </p>
        </div>

        <form
          onSubmit={enviar}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 p-6 sm:p-8 space-y-5"
          noValidate
        >
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5"
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
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2.5 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow"
            />
          </div>

          <div>
            <label
              htmlFor="rol"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5"
            >
              Rol
            </label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
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
              className="text-sm text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-500/15 border border-red-200 dark:border-red-500/30 rounded-md px-3 py-2"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-300 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-base-dark"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
          Sesión simulada con almacenamiento local del navegador
        </p>
      </div>
    </div>
  );
}
