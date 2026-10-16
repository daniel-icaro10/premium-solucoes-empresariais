import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { MODULES } from '../data/modules';
import { useToast } from '../components/Toast';
import { isValidUrl, useModuleLinks, type ModuleLinks } from '../components/useModuleLinks';

const PREFS = [
  { key: 'email', title: 'Notificações por e-mail', desc: 'Receba atualizações de status das solicitações.' },
  { key: 'cert', title: 'Alertas de vencimento', desc: 'Avisos de certificados digitais e apólices próximos do vencimento.' },
  { key: 'weekly', title: 'Resumo semanal', desc: 'Relatório consolidado toda segunda-feira.' },
];

export default function Settings() {
  const toast = useToast();
  const { hash } = useLocation();
  const { links, save } = useModuleLinks();
  const [draft, setDraft] = useState<ModuleLinks>(links);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ email: true, cert: true, weekly: false });

  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  const invalid = MODULES.filter((m) => !isValidUrl((draft[m.slug] ?? '').trim()));
  const configured = MODULES.filter((m) => links[m.slug]).length;

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Conta</div>
          <h1>Configurações</h1>
          <p>Links dos sistemas, dados da empresa e preferências de notificação.</p>
        </div>
      </div>

      <div className="settings-grid" style={{ maxWidth: 960 }}>
        <form
          id="links"
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (invalid.length) return;
            save(draft);
            toast('Links dos módulos salvos');
          }}
        >
          <div className="panel__head">
            <div>
              <h2>Links dos módulos</h2>
              <p className="cell-sub" style={{ fontSize: 13 }}>
                Cada módulo direciona para o sistema informado aqui. Deixe em branco para usar a página interna do módulo.
              </p>
            </div>
            <span className="badge badge--plain">{configured} de {MODULES.length} configurados</span>
          </div>

          {MODULES.map((m) => {
            const Icon = m.icon;
            const value = draft[m.slug] ?? '';
            const bad = !isValidUrl(value.trim());
            return (
              <div key={m.slug} className="link-row">
                <label className="link-row__name" htmlFor={`link-${m.slug}`}>
                  <span className="module-icon"><Icon size={17} strokeWidth={1.8} /></span>
                  {m.name}
                </label>
                <div>
                  <input
                    id={`link-${m.slug}`}
                    type="url"
                    inputMode="url"
                    className={`input ${bad ? 'invalid' : ''}`}
                    placeholder="https://sistema.exemplo.com.br"
                    value={value}
                    onChange={(e) => setDraft((d) => ({ ...d, [m.slug]: e.target.value }))}
                  />
                  {bad && <div className="field-error">Informe uma URL começando com http:// ou https://</div>}
                </div>
                <div className="link-row__actions">
                  <a
                    className="btn btn--ghost btn--sm"
                    href={value.trim() && !bad ? value.trim() : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!value.trim() || bad}
                    style={!value.trim() || bad ? { opacity: 0.45, pointerEvents: 'none' } : undefined}
                  >
                    Testar <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}

          <div className="panel__foot">
            <span className="cell-sub">Os links abrem em uma nova aba.</span>
            <button className="btn btn--primary" type="submit" disabled={invalid.length > 0}>
              Salvar links
            </button>
          </div>
        </form>

        <form
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            toast('Alterações salvas');
          }}
        >
          <div className="panel__head"><h2>Dados da empresa</h2></div>
          <div className="panel__body form-grid">
            <div className="field"><label>Razão social</label><input className="input" defaultValue="Premium Soluções Empresariais Ltda." /></div>
            <div className="field"><label>CNPJ</label><input className="input" defaultValue="00.000.000/0001-00" /></div>
            <div className="field"><label>E-mail de contato</label><input className="input" defaultValue="contato@premiumsolucoes.com.br" /></div>
            <div className="field"><label>Telefone</label><input className="input" defaultValue="(11) 4000-0000" /></div>
          </div>
          <div className="panel__foot" style={{ justifyContent: 'flex-end' }}>
            <button className="btn btn--primary" type="submit">Salvar alterações</button>
          </div>
        </form>

        <section className="panel">
          <div className="panel__head"><h2>Notificações</h2></div>
          <div className="panel__body" style={{ paddingTop: 4, paddingBottom: 4 }}>
            {PREFS.map((p) => (
              <div key={p.key} className="toggle-row">
                <div>
                  <p>{p.title}</p>
                  <small>{p.desc}</small>
                </div>
                <button
                  role="switch"
                  aria-checked={prefs[p.key]}
                  aria-label={p.title}
                  className={`switch ${prefs[p.key] ? 'on' : ''}`}
                  onClick={() => setPrefs((s) => ({ ...s, [p.key]: !s[p.key] }))}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
