import { useCallback, useEffect, useState } from 'react';

const KEY = 'premium:module-links';
const EVENT = 'premium:module-links-changed';

export type ModuleLinks = Record<string, string>;

function read(): ModuleLinks {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}');
  } catch {
    return {};
  }
}

export const isValidUrl = (value: string) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

/** URLs dos sistemas externos de cada módulo, cadastradas em Configurações. */
export function useModuleLinks() {
  const [links, setLinks] = useState<ModuleLinks>(read);

  useEffect(() => {
    const sync = () => setLinks(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const save = useCallback((next: ModuleLinks) => {
    const clean = Object.fromEntries(Object.entries(next).map(([k, v]) => [k, v.trim()]).filter(([, v]) => v));
    try {
      localStorage.setItem(KEY, JSON.stringify(clean));
    } catch {
      /* armazenamento indisponível */
    }
    setLinks(clean);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { links, save };
}
