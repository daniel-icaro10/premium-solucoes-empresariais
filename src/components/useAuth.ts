import { useUsers, type User } from '../data/users';

const KEY = 'premium:session';

function sessionId(): string | null {
  try {
    return localStorage.getItem(KEY);
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

export function signIn(users: User[], email: string, password: string): string | null {
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || user.password !== password) return 'E-mail ou senha incorretos.';
  if (!user.active) return 'Este acesso está desativado. Fale com o administrador.';
  try {
    localStorage.setItem(KEY, user.id);
  } catch {
    /* armazenamento indisponível */
  }
  return null;
}

export function signOut() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* armazenamento indisponível */
  }
}
