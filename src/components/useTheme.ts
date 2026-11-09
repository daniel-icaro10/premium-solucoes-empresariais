import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

// A mesma chave é lida pelo script em index.html, que aplica o tema antes da página aparecer.
const KEY = 'premium:theme';
const listeners = new Set<() => void>();

/** Escolha salva do usuário; sem escolha, começa no modo claro. */
function saved(): Theme {
  try {
    return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

document.documentElement.dataset.theme = saved();

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* armazenamento indisponível: vale só nesta aba */
  }
  document.documentElement.dataset.theme = theme;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme as Theme);
  return { theme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') };
}
