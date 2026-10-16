import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { findModule } from '../data/modules';
import { useModuleLinks } from '../components/useModuleLinks';

/** Destino do "Abrir módulo" quando o módulo ainda não tem link cadastrado. */
export default function NoLink() {
  const { slug = '' } = useParams();
  const module = findModule(slug);
  const { links } = useModuleLinks();
  const url = module && links[module.slug];

  useEffect(() => {
    if (url) window.location.replace(url);
  }, [url]);

  if (!module) return <Navigate to="/" replace />;
  if (url) return null;

  return (
    <div className="no-link">
      <div className="no-link__card">
        <div className="eyebrow">{module.name}</div>
        <h1>Nenhum link cadastrado</h1>
        <p>Este módulo ainda não possui um link de direcionamento.</p>
        <div className="no-link__actions">
          <Link to="/" className="btn btn--ghost">Voltar</Link>
          <Link to="/configuracoes" className="btn btn--primary">Cadastrar link</Link>
        </div>
      </div>
    </div>
  );
}
