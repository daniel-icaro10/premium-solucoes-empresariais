import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { CATEGORIES, REQUESTS, type Category } from '../data/modules';
import { modulesFor, useUsers } from '../data/users';
import ModuleCard from '../components/ModuleCard';
import NewRequestModal from '../components/NewRequestModal';
import RequestsTable from '../components/RequestsTable';
import { usePinned } from '../components/usePinned';
import { useModuleLinks } from '../components/useModuleLinks';
import { useSession } from '../components/useAuth';

const today = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());

export default function Home() {
  const session = useSession();
  const { users } = useUsers();
  const [category, setCategory] = useState<Category | 'Todos'>('Todos');
  const [modalOpen, setModalOpen] = useState(false);
  const { pinned, toggle } = usePinned();
  const { links } = useModuleLinks();
  const isAdmin = session?.role === 'admin';

  const available = modulesFor(session);
  const categories = CATEGORIES.filter((c) => available.some((m) => m.category === c));
  const visible = available
    .filter((m) => category === 'Todos' || m.category === category)
    .sort((a, b) => Number(pinned.includes(b.slug)) - Number(pinned.includes(a.slug)));

  const open = REQUESTS.filter((r) => r.status === 'Aberta').length;
  const progress = REQUESTS.filter((r) => r.status === 'Em andamento' || r.status === 'Aguardando cliente').length;
  const done = REQUESTS.filter((r) => r.status === 'Concluída').length;
  const clients = users.filter((u) => u.role === 'cliente');

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">{today}</div>
          <h1>Bem-vindo(a), {session?.name.split(' ')[0]}</h1>
          <p>{isAdmin ? 'Acesse os módulos disponíveis e acompanhe as solicitações dos clientes.' : `Acesse os serviços contratados por ${session?.company}.`}</p>
        </div>
        {isAdmin && (
          <button className="btn btn--primary" onClick={() => setModalOpen(true)}>
            <Plus size={16} /> Nova solicitação
          </button>
        )}
      </div>

      {isAdmin && (
        <div className="stats">
          <Stat label="Solicitações abertas" value={open + 27} delta="+4 esta semana" />
          <Stat label="Em andamento" value={progress + 18} delta="Prazo médio 3,2 dias" />
          <Stat label="Concluídas no mês" value={done + 41} delta="+12% vs. set" />
          <Stat label="Clientes ativos" value={clients.filter((c) => c.active).length} delta={`${clients.length} cadastrados`} />
        </div>
      )}

      <div className="section-head">
        <div>
          <h2>{isAdmin ? 'Módulos de serviço' : 'Seus módulos'}</h2>
          <p>Marque com estrela os que você mais usa para fixá-los no topo.</p>
        </div>
        {categories.length > 1 && (
          <div className="chips" role="tablist">
            {(['Todos', ...categories] as const).map((c) => (
              <button key={c} role="tab" aria-selected={category === c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {available.length ? (
        <div className="module-grid">
          {visible.map((m) => (
            <ModuleCard key={m.slug} module={m} pinned={pinned.includes(m.slug)} onTogglePin={toggle} url={links[m.slug]} />
          ))}
        </div>
      ) : (
        <div className="panel empty">
          <p>Nenhum módulo liberado para o seu acesso. Fale com o administrador.</p>
        </div>
      )}

      {isAdmin && (
        <div className="two-col">
          <section className="panel">
            <div className="panel__head">
              <h2>Solicitações recentes</h2>
              <Link to="/relatorios" className="btn btn--ghost btn--sm">Ver todas</Link>
            </div>
            <RequestsTable rows={REQUESTS.slice(0, 5)} showModule={false} />
          </section>

          <section className="panel">
            <div className="panel__head">
              <h2>Atividade</h2>
            </div>
            <ul className="activity">
              {REQUESTS.slice(0, 5).map((r) => (
                <li key={r.id}>
                  <span className="activity__dot" />
                  <div>
                    <p><b>{r.client}</b> · {r.title}</p>
                    <small>{r.status} · {r.updatedAt}</small>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {modalOpen && <NewRequestModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function Stat({ label, value, delta }: { label: string; value: number; delta: string }) {
  return (
    <div className="stat">
      <div className="stat__label">{label}</div>
      <div className="stat__value">{value}</div>
      <div className="stat__delta">{delta}</div>
    </div>
  );
}
