import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import { MODULES, type Module } from '../data/modules';

interface Props {
  module: Module;
  pinned: boolean;
  onTogglePin: (slug: string) => void;
  url?: string;
}

export default function ModuleCard({ module, pinned, onTogglePin, url }: Props) {
  const Icon = module.icon;
  const num = String(MODULES.indexOf(module) + 1).padStart(2, '0');
  return (
    <article className="module-card">
      <div className="module-card__top">
        <div className="module-icon">
          <Icon size={22} strokeWidth={1.7} />
        </div>
        <button
          className={`pin-btn ${pinned ? 'on' : ''}`}
          aria-label={pinned ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={pinned}
          onClick={() => onTogglePin(module.slug)}
        >
          <Star size={16} fill={pinned ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="module-card__body">
        <span className="module-card__num">{num}</span>
        <h3>{module.name}</h3>
        <p>{module.short}</p>
      </div>
      <div className="module-card__foot">
        {/* Com link cadastrado, o módulo abre o sistema externo; sem link, abre a página do módulo. */}
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="module-card__link">
            Abrir módulo <ExternalLink size={14} />
          </a>
        ) : (
          <Link to={`/servicos/${module.slug}`} className="module-card__link">
            Abrir módulo <ArrowRight size={14} />
          </Link>
        )}
        {module.openRequests > 0 && (
          <span className="badge badge--plain">
            {module.openRequests} {module.openRequests === 1 ? 'aberta' : 'abertas'}
          </span>
        )}
      </div>
    </article>
  );
}
