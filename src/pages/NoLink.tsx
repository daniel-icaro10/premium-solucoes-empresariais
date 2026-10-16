import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { modulesFor } from '../data/users';
import { useModuleLinks } from '../components/useModuleLinks';
import { useSession } from '../components/useAuth';

/** Destino do "Abrir módulo" quando o módulo ainda não tem link cadastrado. */
export default function NoLink() {
  const { slug = '' } = useParams();
  const session = useSession();
  const module = modulesFor(session).find((m) => m.slug === slug);
  const { links } = useModuleLinks();
  const url = module && links[module.slug];

  useEffect(() => {
    if (url) window.location.replace(url);
  }, [url]);

  // Módulo inexistente ou não liberado para este usuário.
  if (!module) return <Navigate to="/" replace />;
  if (url) return null;

  const isAdmin = session?.role === 'admin';
  return (
    <div className="no-link">
      <div className="no-link__card">
        <div className="eyebrow">{module.name}</div>
        <h1>Nenhum link cadastrado</h1>
        <p>{isAdmin ? 'Este módulo ainda não possui um link de direcionamento.' : 'Este módulo ainda não está disponível. Fale com o administrador.'}</p>
        <div className="no-link__actions">
          <Link to="/" className="btn btn--ghost">Voltar</Link>
          {isAdmin && <Link to="/configuracoes" className="btn btn--primary">Cadastrar link</Link>}
        </div>
      </div>
    </div>
  );
}
