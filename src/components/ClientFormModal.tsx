import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES, MODULES } from '../data/modules';
import { useUsers, type User } from '../data/users';
import { useToast } from './Toast';

interface Props {
  /** null = novo cliente */
  client: User | null;
  onClose: () => void;
}

const EMPTY: User = { id: '', role: 'cliente', name: '', email: '', password: '', company: '', cnpj: '', modules: [], active: true };

export default function ClientFormModal({ client, onClose }: Props) {
  const toast = useToast();
  const { users, upsert } = useUsers();
  const [form, setForm] = useState<User>(client ? { ...client, password: '' } : EMPTY);
  const [error, setError] = useState('');
  const isNew = !client;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = <K extends keyof User>(key: K, value: User[K]) => setForm((f) => ({ ...f, [key]: value }));
  const toggleModule = (slug: string) =>
    set('modules', form.modules.includes(slug) ? form.modules.filter((s) => s !== slug) : [...form.modules, slug]);
  const allSelected = form.modules.length === MODULES.length;

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form
        className="modal modal--wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-form-title"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const email = form.email.trim().toLowerCase();
          if (!form.company.trim() || !form.name.trim()) return setError('Preencha empresa e nome do responsável.');
          if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Informe um e-mail válido.');
          if (users.some((u) => u.email.toLowerCase() === email && u.id !== form.id)) return setError('Já existe um acesso com este e-mail.');
          if ((isNew || form.password) && form.password.length < 6) return setError('A senha deve ter pelo menos 6 caracteres.');
          upsert({
            ...form,
            id: form.id || `c-${Date.now()}`,
            email,
            name: form.name.trim(),
            company: form.company.trim(),
            password: form.password || client?.password || '',
          });
          toast(isNew ? 'Cliente cadastrado' : 'Cliente atualizado');
          onClose();
        }}
      >
        <div className="modal__head">
          <div>
            <h2 id="client-form-title">{isNew ? 'Novo cliente' : 'Editar cliente'}</h2>
            <p>Dados de acesso e módulos que o cliente poderá ver.</p>
          </div>
          <button type="button" className="icon-btn" aria-label="Fechar" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal__body">
          <div className="form-grid">
            <div className="field">
              <label htmlFor="cf-company">Empresa</label>
              <input id="cf-company" className="input" value={form.company} onChange={(e) => set('company', e.target.value)} autoFocus />
            </div>
            <div className="field">
              <label htmlFor="cf-cnpj">CNPJ</label>
              <input id="cf-cnpj" className="input" placeholder="Opcional" value={form.cnpj} onChange={(e) => set('cnpj', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="cf-name">Responsável</label>
              <input id="cf-name" className="input" value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="cf-email">E-mail de acesso</label>
              <input id="cf-email" type="email" className="input" value={form.email} onChange={(e) => set('email', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="cf-password">{isNew ? 'Senha' : 'Nova senha'}</label>
              <input
                id="cf-password"
                type="text"
                className="input"
                autoComplete="new-password"
                placeholder={isNew ? 'Mínimo de 6 caracteres' : 'Deixe em branco para manter'}
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Status</label>
              <div className="segmented">
                <button type="button" className={form.active ? 'on' : ''} onClick={() => set('active', true)}>Ativo</button>
                <button type="button" className={!form.active ? 'on' : ''} onClick={() => set('active', false)}>Inativo</button>
              </div>
            </div>
          </div>

          <fieldset className="module-picker">
            <legend>
              Módulos liberados <span className="cell-sub">({form.modules.length} de {MODULES.length})</span>
            </legend>
            <button type="button" className="module-picker__all" onClick={() => set('modules', allSelected ? [] : MODULES.map((m) => m.slug))}>
              {allSelected ? 'Desmarcar todos' : 'Selecionar todos'}
            </button>
            {CATEGORIES.map((cat) => (
              <div key={cat} className="module-picker__group">
                <div className="module-picker__cat">{cat}</div>
                <div className="module-picker__grid">
                  {MODULES.filter((m) => m.category === cat).map((m) => (
                    <label key={m.slug} className={`check ${form.modules.includes(m.slug) ? 'on' : ''}`}>
                      <input type="checkbox" checked={form.modules.includes(m.slug)} onChange={() => toggleModule(m.slug)} />
                      {m.name}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>

          {error && <div className="field-error" role="alert">{error}</div>}
        </div>

        <div className="modal__foot">
          <button type="button" className="btn btn--ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn--primary">{isNew ? 'Cadastrar cliente' : 'Salvar alterações'}</button>
        </div>
      </form>
    </div>
  );
}
