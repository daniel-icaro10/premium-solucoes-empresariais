import { Download } from 'lucide-react';
import { MODULES, MONTHLY, REQUESTS, findModule } from '../data/modules';
import RequestsTable from '../components/RequestsTable';

/** Baixa as solicitações em CSV (separador ";" para abrir direto no Excel em pt-BR). */
function exportCsv() {
  const header = ['Código', 'Solicitação', 'Serviço', 'Cliente', 'Status', 'Atualizado'];
  const rows = REQUESTS.map((r) => [r.id, r.title, findModule(r.module)?.name ?? '', r.client, r.status, r.updatedAt]);
  const csv = [header, ...rows].map((row) => row.map((v) => `"${v.replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: 'solicitacoes.csv' });
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revogar só depois que o navegador iniciar o download.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Reports() {
  const max = Math.max(...MONTHLY.map((m) => m.value));
  const byModule = [...MODULES].sort((a, b) => b.openRequests - a.openRequests);
  const maxOpen = byModule[0].openRequests;

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Indicadores</div>
          <h1>Relatórios</h1>
          <p>Volume de solicitações e desempenho por serviço.</p>
        </div>
        <button className="btn btn--ghost" onClick={exportCsv}><Download size={16} /> Exportar</button>
      </div>

      <div className="two-col" style={{ marginTop: 0 }}>
        <section className="panel">
          <div className="panel__head">
            <h2>Solicitações por mês</h2>
            <span className="cell-sub">Últimos 6 meses</span>
          </div>
          <div className="panel__body">
            <div className="bar-chart">
              <div className="bar-chart__grid"><span /><span /><span /><span /></div>
              {MONTHLY.map((m, i) => {
                const h = `${(m.value / max) * 100}%`;
                return (
                  <div
                    key={m.month}
                    className={`bar-col ${i === MONTHLY.length - 1 ? 'current' : ''}`}
                    tabIndex={0}
                    aria-label={`${m.month}: ${m.value} solicitações`}
                    style={{ ['--h' as string]: h }}
                  >
                    <div className="bar" style={{ height: h }} />
                    <div className="bar-tip">{m.month} · <b>{m.value}</b> solicitações</div>
                  </div>
                );
              })}
            </div>
            <div className="bar-labels">{MONTHLY.map((m) => <span key={m.month}>{m.month}</span>)}</div>
          </div>
        </section>

        <section className="panel">
          <div className="panel__head"><h2>Abertas por serviço</h2></div>
          <div className="panel__body hbar-list">
            {byModule.slice(0, 6).map((m) => (
              <div key={m.slug}>
                <div className="hbar__row"><span>{m.name}</span><b>{m.openRequests}</b></div>
                <div className="hbar__track"><div className="hbar__fill" style={{ width: `${(m.openRequests / maxOpen) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel" style={{ marginTop: 16 }}>
        <div className="panel__head"><h2>Todas as solicitações</h2></div>
        <RequestsTable rows={REQUESTS} />
      </section>
    </>
  );
}
