import { useUsers, type User } from '../data/users';

const KEY = 'premium:session';

// "Manter conectado" grava em localStorage; sem ele, em sessionStorage (some ao fechar o navegador).
function sessionId(): string | null {
  try {
    return localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** Usuário logado, lido do cadastro a cada render para refletir mudanças de acesso. */
export function useSession(): User | null {
  const { users } = useUsers();
  const id = sessionId();
  const user = users.find((u) => u.id === id);
  return user && user.active ? user : null;
}

export function signIn(users: User[], email: string, password: string, remember: boolean): string | null {
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || user.password !== password) return 'E-mail ou senha incorretos.';
  if (!user.active) return 'Este acesso está desativado. Fale com o administrador.';
  try {
    signOut();
    (remember ? localStorage : sessionStorage).setItem(KEY, user.id);
  } catch {
    /* armazenamento indisponível */
  }
  return null;
}

export function signOut() {
  try {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
  } catch {
    /* armazenamento indisponível */
  }
}
