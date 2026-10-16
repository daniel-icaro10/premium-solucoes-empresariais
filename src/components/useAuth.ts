const KEY = 'premium:session';

export interface Session {
  name: string;
  email: string;
}

// Protótipo: a sessão fica no navegador. Em produção, trocar por autenticação no servidor.
export function getSession(): Session | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? 'null');
  } catch {
    return null;
  }
}

export function signIn(email: string) {
  const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  try {
    localStorage.setItem(KEY, JSON.stringify({ name, email }));
  } catch {
    /* armazenamento indisponível */
  }
}

export function signOut() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* armazenamento indisponível */
  }
}
