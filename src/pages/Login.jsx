import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen grid place-items-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-xl bg-slate-900 text-white items-center justify-center font-bold text-lg mb-3">
            IT
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Issue Tracker
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ingresa tus datos para acceder al panel
          </p>
        </div>

        <form
          onSubmit={enviar}
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8 space-y-5"
          noValidate
        >
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-slate-700 mb-1"
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
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>

          <div>
            <label
              htmlFor="rol"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Rol
            </label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4">
          Sesión simulada con almacenamiento local del navegador
        </p>
      </div>
    </div>
  );
}
