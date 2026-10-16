import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { MODULES, type Module } from '../data/modules';

interface Props {
  module: Module;
  pinned: boolean;
  onTogglePin: (slug: string) => void;
  url?: string;
}

export default function ModuleCard({ module, pinned, onTogglePin, url }: Props) {
  const num = String(MODULES.indexOf(module) + 1).padStart(2, '0');
  return (
    <article className="module-card">
      <div className="module-card__top">
        <span className="module-card__num">{num}</span>
        <button
          className={`pin-btn ${pinned ? 'on' : ''}`}
          aria-label={pinned ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={pinned}
          onClick={() => onTogglePin(module.slug)}
        >
          <Star size={16} fill={pinned ? 'currentColor' : 'none'} />
        </button>
      </div>
      <h3>{module.name}</h3>
      <div className="module-card__foot">
        {/* Com link cadastrado abre o sistema externo; sem link, a página de aviso. */}
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="module-card__link">
            Abrir módulo <ArrowRight size={14} />
          </a>
        ) : (
          <Link to={`/servicos/${module.slug}`} className="module-card__link">
            Abrir módulo <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </article>
  );
}
