import { useSearchParams } from 'react-router-dom';
import { Search, SearchX } from 'lucide-react';
import { MODULES } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import { usePinned } from '../components/usePinned';
import { useModuleLinks } from '../components/useModuleLinks';

const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export default function Services() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const { pinned, toggle } = usePinned();
  const { links } = useModuleLinks();
  const results = MODULES.filter((m) => normalize(`${m.name} ${m.description} ${m.features.join(' ')}`).includes(normalize(q)));

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Catálogo</div>
          <h1>Serviços</h1>
          <p>Todos os {MODULES.length} módulos oferecidos pela Premium Soluções Empresariais.</p>
        </div>
        <div className="search-input" style={{ width: 'min(320px, 100%)' }}>
          <Search size={16} />
          <input
            className="input"
            placeholder="Filtrar serviços…"
            value={q}
            onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
          />
        </div>
      </div>

      {results.length ? (
        <div className="module-grid">
          {results.map((m) => (
            <ModuleCard key={m.slug} module={m} pinned={pinned.includes(m.slug)} onTogglePin={toggle} url={links[m.slug]} />
          ))}
        </div>
      ) : (
        <div className="panel empty">
          <SearchX size={28} />
          <p>Nenhum serviço encontrado para “{q}”.</p>
        </div>
      )}
    </>
  );
}
