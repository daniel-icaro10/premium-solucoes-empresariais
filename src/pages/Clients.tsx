import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { CLIENTS, findModule } from '../data/modules';
import StatusBadge from '../components/StatusBadge';

export default function Clients() {
  const [q, setQ] = useState('');
  const rows = CLIENTS.filter((c) => `${c.name} ${c.cnpj} ${c.contact}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Carteira</div>
          <h1>Clientes</h1>
          <p>Empresas atendidas e os serviços contratados por cada uma.</p>
        </div>
        <button className="btn btn--primary"><Plus size={16} /> Novo cliente</button>
      </div>

      <section className="panel">
        <div className="panel__head">
          <h2>{rows.length} clientes</h2>
          <div className="search-input" style={{ width: 'min(300px, 100%)' }}>
            <Search size={16} />
            <input className="input" placeholder="Buscar por nome, CNPJ ou contato…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Empresa</th><th>Contato</th><th>Serviços contratados</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="avatar" style={{ background: 'var(--brand-50)', color: 'var(--brand-800)' }}>
                        {c.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                      </span>
                      <div>
                        <div className="cell-main">{c.name}</div>
                        <div className="cell-sub mono">{c.cnpj}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{c.contact}</div>
                    <div className="cell-sub">{c.email}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {c.services.map((s) => <span key={s} className="badge badge--plain">{findModule(s)?.name}</span>)}
                    </div>
                  </td>
                  <td><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
