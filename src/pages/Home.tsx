import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock3, FileText, Inbox, Plus, Users } from 'lucide-react';
import { CATEGORIES, CLIENTS, MODULES, REQUESTS, findModule, type Category } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import NewRequestModal from '../components/NewRequestModal';
import RequestsTable from '../components/RequestsTable';
import { usePinned } from '../components/usePinned';
import { useModuleLinks } from '../components/useModuleLinks';

const today = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());

export default function Home() {
  const [category, setCategory] = useState<Category | 'Todos'>('Todos');
  const [modalOpen, setModalOpen] = useState(false);
  const { pinned, toggle } = usePinned();
  const { links } = useModuleLinks();

  const visible = MODULES.filter((m) => category === 'Todos' || m.category === category).sort(
    (a, b) => Number(pinned.includes(b.slug)) - Number(pinned.includes(a.slug)),
  );

  const open = REQUESTS.filter((r) => r.status === 'Aberta').length;
  const progress = REQUESTS.filter((r) => r.status === 'Em andamento' || r.status === 'Aguardando cliente').length;
  const done = REQUESTS.filter((r) => r.status === 'Concluída').length;

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">{today}</div>
          <h1>Bem-vindo(a) de volta</h1>
          <p>Acesse os módulos disponíveis e acompanhe as solicitações da sua empresa.</p>
        </div>
        <button className="btn btn--primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Nova solicitação
        </button>
      </div>

      <div className="stats">
        <Stat icon={Inbox} label="Solicitações abertas" value={open + 27} delta="+4 esta semana" />
        <Stat icon={Clock3} label="Em andamento" value={progress + 18} delta="Prazo médio 3,2 dias" />
        <Stat icon={CheckCircle2} label="Concluídas no mês" value={done + 41} delta="+12% vs. set" />
        <Stat icon={Users} label="Clientes ativos" value={CLIENTS.filter((c) => c.status === 'Ativo').length + 120} delta="2 em onboarding" />
      </div>

      <div className="section-head">
        <div>
          <h2>Módulos de serviço</h2>
          <p>Marque com estrela os que você mais usa para fixá-los no topo.</p>
        </div>
        <div className="chips" role="tablist">
          {(['Todos', ...CATEGORIES] as const).map((c) => (
            <button key={c} role="tab" aria-selected={category === c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="module-grid">
        {visible.map((m) => (
          <ModuleCard key={m.slug} module={m} pinned={pinned.includes(m.slug)} onTogglePin={toggle} url={links[m.slug]} />
        ))}
      </div>

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
            {REQUESTS.slice(0, 5).map((r) => {
              const Icon = findModule(r.module)?.icon ?? FileText;
              return (
                <li key={r.id}>
                  <span className="activity__icon"><Icon size={16} /></span>
                  <div>
                    <p><b>{r.client}</b> · {r.title}</p>
                    <small>{r.status} · {r.updatedAt}</small>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {modalOpen && <NewRequestModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function Stat({ icon: Icon, label, value, delta }: { icon: typeof Inbox; label: string; value: number; delta: string }) {
  return (
    <div className="stat">
      <div className="stat__label"><Icon size={16} /> {label}</div>
      <div className="stat__value">{value}</div>
      <div className="stat__delta">{delta}</div>
    </div>
  );
}
