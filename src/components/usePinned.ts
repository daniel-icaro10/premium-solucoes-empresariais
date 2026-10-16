import { useCallback, useEffect, useState } from 'react';

const KEY = 'premium:pinned-modules';

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function usePinned() {
  const [pinned, setPinned] = useState<string[]>(read);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(pinned));
    } catch {
      /* armazenamento indisponível */
    }
  }, [pinned]);

  const toggle = useCallback(
    (slug: string) => setPinned((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug])),
    [],
  );

  return { pinned, toggle };
}
