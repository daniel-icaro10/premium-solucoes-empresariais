import { useEffect } from 'react';
import { X } from 'lucide-react';
import { MODULES } from '../data/modules';
import { useUsers } from '../data/users';
import { useToast } from './Toast';

interface Props {
  moduleSlug?: string;
  onClose: () => void;
}

export default function NewRequestModal({ moduleSlug, onClose }: Props) {
  const toast = useToast();
  const clients = useUsers().users.filter((u) => u.role === 'cliente');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        onSubmit={(e) => {
          e.preventDefault();
          toast('Solicitação criada com sucesso');
          onClose();
        }}
      >
        <div className="modal__head">
          <div>
            <h2>Nova solicitação</h2>
            <p>Abra um chamado para um dos serviços disponíveis.</p>
          </div>
          <button type="button" className="icon-btn" aria-label="Fechar" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal__body">
          <div className="field">
            <label htmlFor="req-module">Serviço</label>
            <select id="req-module" className="input" defaultValue={moduleSlug ?? MODULES[0].slug}>
              {MODULES.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="req-client">Cliente</label>
            <select id="req-client" className="input">
              {clients.map((c) => <option key={c.id}>{c.company}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="req-title">Assunto</label>
            <input id="req-title" className="input" required placeholder="Ex.: Apuração de impostos de outubro" />
          </div>
          <div className="field">
            <label htmlFor="req-desc">Detalhes</label>
            <textarea id="req-desc" className="input" rows={3} placeholder="Descreva o que precisa…" />
          </div>
        </div>
        <div className="modal__foot">
          <button type="button" className="btn btn--ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn--primary">Criar solicitação</button>
        </div>
      </form>
    </div>
  );
}
