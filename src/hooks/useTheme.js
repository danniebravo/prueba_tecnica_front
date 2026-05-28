import { useCallback, useEffect, useState } from 'react';

const THEME_KEY = 'itracker.theme';
const TEMAS_VALIDOS = ['light', 'dark'];

function obtenerTemaInicial() {
  if (typeof window === 'undefined') return 'light';
  const guardado = localStorage.getItem(THEME_KEY);
  if (TEMAS_VALIDOS.includes(guardado)) return guardado;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function useTheme() {
  const [tema, setTema] = useState(obtenerTemaInicial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', tema === 'dark');
    localStorage.setItem(THEME_KEY, tema);
  }, [tema]);

  const alternar = useCallback(() => {
    setTema((actual) => (actual === 'dark' ? 'light' : 'dark'));
  }, []);

  return { tema, esOscuro: tema === 'dark', alternar };
}
