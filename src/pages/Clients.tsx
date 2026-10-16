import { useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { findModule } from '../data/modules';
import { useUsers, type User } from '../data/users';
import StatusBadge from '../components/StatusBadge';
import ClientFormModal from '../components/ClientFormModal';
import { useToast } from '../components/Toast';

export default function Clients() {
  const toast = useToast();
  const { users, remove } = useUsers();
  const [q, setQ] = useState('');
  // undefined = fechado, null = novo cliente, User = edição
  const [editing, setEditing] = useState<User | null | undefined>(undefined);

  const clients = users.filter((u) => u.role === 'cliente');
  const rows = clients.filter((c) => `${c.company} ${c.cnpj} ${c.name} ${c.email}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Carteira</div>
          <h1>Clientes</h1>
          <p>Cadastre clientes e defina quais módulos cada um pode acessar.</p>
        </div>
        <button className="btn btn--primary" onClick={() => setEditing(null)}><Plus size={16} /> Novo cliente</button>
      </div>

      <section className="panel">
        <div className="panel__head">
          <h2>{rows.length} {rows.length === 1 ? 'cliente' : 'clientes'}</h2>
          <div className="search-input" style={{ width: 'min(300px, 100%)' }}>
            <Search size={16} />
            <input className="input" placeholder="Buscar por empresa, CNPJ ou contato…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        {rows.length === 0 ? (
          <div className="empty">Nenhum cliente encontrado.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Empresa</th><th>Acesso</th><th>Módulos liberados</th><th>Status</th><th aria-label="Ações" /></tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span className="avatar" style={{ background: 'var(--brand-50)', color: 'var(--brand-800)' }}>
                          {c.company.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
                        </span>
                        <div>
                          <div className="cell-main">{c.company}</div>
                          <div className="cell-sub mono">{c.cnpj || 'Sem CNPJ'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{c.name}</div>
                      <div className="cell-sub">{c.email}</div>
                    </td>
                    <td>
                      <div className="module-tags">
                        {c.modules.length === 0 && <span className="cell-sub">Nenhum</span>}
                        {c.modules.slice(0, 3).map((s) => <span key={s} className="badge badge--plain">{findModule(s)?.name}</span>)}
                        {c.modules.length > 3 && <span className="badge badge--plain">+{c.modules.length - 3}</span>}
                      </div>
                    </td>
                    <td><StatusBadge status={c.active ? 'Ativo' : 'Inativo'} /></td>
                    <td>
                      <div className="row-actions">
                        <button className="icon-btn" aria-label={`Editar ${c.company}`} onClick={() => setEditing(c)}><Pencil size={16} /></button>
                        <button
                          className="icon-btn"
                          aria-label={`Excluir ${c.company}`}
                          onClick={() => {
                            if (!window.confirm(`Excluir o cliente ${c.company}? O acesso dele será removido.`)) return;
                            remove(c.id);
                            toast('Cliente excluído');
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editing !== undefined && <ClientFormModal client={editing} onClose={() => setEditing(undefined)} />}
    </>
  );
}
