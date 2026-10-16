import { useCallback, useEffect, useState } from 'react';
import { MODULES } from './modules';

export type Role = 'admin' | 'cliente';

export interface User {
  id: string;
  role: Role;
  name: string;
  email: string;
  // Protótipo: senha em texto puro no navegador. Em produção, autenticação e hash no servidor.
  password: string;
  company: string;
  cnpj: string;
  /** Módulos liberados para o cliente. O administrador sempre vê todos. */
  modules: string[];
  active: boolean;
}

export const ROLE_LABEL: Record<Role, string> = { admin: 'Administrador', cliente: 'Cliente' };

const KEY = 'premium:users';
const EVENT = 'premium:users-changed';

const SEED: User[] = [
  { id: 'u-admin', role: 'admin', name: 'Administrador', email: 'admin@premiumsolucoes.com.br', password: 'admin123', company: 'Premium Soluções Empresariais', cnpj: '', modules: [], active: true },
  { id: 'c1', role: 'cliente', name: 'Marina Costa', email: 'cliente@alfaeng.com.br', password: 'cliente123', company: 'Alfa Engenharia Ltda.', cnpj: '12.345.678/0001-90', modules: ['contabilidade', 'bpo-financeiro', 'seguros'], active: true },
  { id: 'c2', role: 'cliente', name: 'João Pereira', email: 'joao@bomgrao.com.br', password: 'cliente123', company: 'Café Bom Grão ME', cnpj: '23.456.789/0001-01', modules: ['certificado-digital', 'softwares'], active: true },
  { id: 'c3', role: 'cliente', name: 'Ricardo Alves', email: 'ricardo@rotasul.com.br', password: 'cliente123', company: 'Transportes Rota Sul', cnpj: '34.567.890/0001-12', modules: ['linhas-credito', 'consultoria', 'consorcio'], active: true },
  { id: 'c4', role: 'cliente', name: 'Paula Mendes', email: 'paula@vidaplena.med.br', password: 'cliente123', company: 'Clínica Vida Plena', cnpj: '45.678.901/0001-23', modules: ['bpo-financeiro', 'consorcio'], active: true },
  { id: 'c5', role: 'cliente', name: 'Paulo Lima', email: 'paulo@torquemax.com.br', password: 'cliente123', company: 'Oficina Torque Máximo', cnpj: '78.901.234/0001-56', modules: ['contabilidade'], active: false },
];

export function readUsers(): User[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* armazenamento indisponível */
  }
  return SEED;
}

function writeUsers(users: User[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(users));
  } catch {
    /* armazenamento indisponível */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Módulos que o usuário pode ver, na ordem do catálogo. */
export const modulesFor = (user: User | null) =>
  !user ? [] : user.role === 'admin' ? MODULES : MODULES.filter((m) => user.modules.includes(m.slug));

export function useUsers() {
  const [users, setUsers] = useState<User[]>(readUsers);

  useEffect(() => {
    const sync = () => setUsers(readUsers());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const upsert = useCallback((user: User) => {
    const current = readUsers();
    const exists = current.some((u) => u.id === user.id);
    writeUsers(exists ? current.map((u) => (u.id === user.id ? user : u)) : [...current, user]);
  }, []);

  const remove = useCallback((id: string) => writeUsers(readUsers().filter((u) => u.id !== id)), []);

  return { users, upsert, remove };
}
