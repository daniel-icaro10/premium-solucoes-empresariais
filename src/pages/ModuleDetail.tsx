import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Check, ChevronRight, ExternalLink, FileText, Link2, Plus, Upload } from 'lucide-react';
import { REQUESTS, findModule } from '../data/modules';
import NewRequestModal from '../components/NewRequestModal';
import RequestsTable from '../components/RequestsTable';
import { useModuleLinks } from '../components/useModuleLinks';

const DOCS = ['Contrato de prestação de serviços.pdf', 'Procuração eletrônica.pdf', 'Checklist de documentos.xlsx'];

export default function ModuleDetail() {
  const { slug = '' } = useParams();
  const module = findModule(slug);
  const [tab, setTab] = useState<'solicitacoes' | 'documentos'>('solicitacoes');
  const [modalOpen, setModalOpen] = useState(false);
  const { links } = useModuleLinks();
  if (!module) return <Navigate to="/servicos" replace />;

  const Icon = module.icon;
  const url = links[module.slug];
  const requests = REQUESTS.filter((r) => r.module === module.slug);

  return (
    <>
      <nav className="breadcrumb">
        <Link to="/servicos">Serviços</Link>
        <ChevronRight size={14} />
        <span>{module.name}</span>
      </nav>

      <div className="page-head">
        <div className="detail-hero">
          <div className="module-icon module-icon--lg"><Icon size={26} strokeWidth={1.7} /></div>
          <div>
            <div className="eyebrow">{module.category}</div>
            <h1>{module.name}</h1>
            <p style={{ maxWidth: 640 }}>{module.description}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn--ghost" onClick={() => setModalOpen(true)}>
            <Plus size={16} /> Nova solicitação
          </button>
          {url && (
            <a className="btn btn--primary" href={url} target="_blank" rel="noopener noreferrer">
              Acessar sistema <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {!url && (
        <div className="callout">
          <Link2 size={18} />
          <p>Este módulo ainda não tem o link do sistema cadastrado. Cadastre a URL para que <b>Abrir módulo</b> direcione direto para ele.</p>
          <Link to="/configuracoes#links" className="btn btn--ghost btn--sm">Cadastrar link</Link>
        </div>
      )}

      <div className="detail-grid">
        <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
          <section className="panel">
            <div className="panel__head"><h2>O que está incluso</h2></div>
            <div className="panel__body feature-list">
              {module.features.map((f) => (
                <div key={f} className="feature"><Check size={16} /> {f}</div>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="tabs" role="tablist">
              <button role="tab" aria-selected={tab === 'solicitacoes'} className={`tab ${tab === 'solicitacoes' ? 'active' : ''}`} onClick={() => setTab('solicitacoes')}>
                Solicitações
              </button>
              <button role="tab" aria-selected={tab === 'documentos'} className={`tab ${tab === 'documentos' ? 'active' : ''}`} onClick={() => setTab('documentos')}>
                Documentos
              </button>
            </div>
            {tab === 'solicitacoes' ? (
              <RequestsTable rows={requests} showModule={false} />
            ) : (
              <div>
                {DOCS.map((d) => (
                  <div key={d} className="doc-row">
                    <FileText size={18} />
                    <span style={{ flex: 1 }}>{d}</span>
                    <button className="btn btn--ghost btn--sm">Baixar</button>
                  </div>
                ))}
                <div className="doc-row">
                  <button className="btn btn--ghost btn--sm"><Upload size={14} /> Enviar documento</button>
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="panel" style={{ alignSelf: 'start' }}>
          <div className="panel__head"><h3>Resumo</h3></div>
          <div className="panel__body">
            <div className="kv"><span>Solicitações abertas</span><b>{module.openRequests}</b></div>
            <div className="kv"><span>Link do sistema</span>{url ? <a href={url} target="_blank" rel="noopener noreferrer" className="badge badge--success">Configurado</a> : <span className="badge badge--warning">Não configurado</span>}</div>
            <div className="kv"><span>SLA de atendimento</span><b>48 h úteis</b></div>
            <div className="kv"><span>Responsável</span><b>Equipe {module.category}</b></div>
            <div className="kv"><span>Status do módulo</span><span className="badge badge--success">Ativo</span></div>
          </div>
        </aside>
      </div>

      {modalOpen && <NewRequestModal moduleSlug={module.slug} onClose={() => setModalOpen(false)} />}
    </>
  );
}
