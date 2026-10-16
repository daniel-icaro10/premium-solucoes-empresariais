import type { RequestStatus } from '../data/modules';

const VARIANT: Record<RequestStatus | 'Ativo' | 'Inativo', string> = {
  Aberta: 'badge--info',
  'Em andamento': 'badge--info',
  'Aguardando cliente': 'badge--warning',
  Concluída: 'badge--success',
  Ativo: 'badge--success',
  Inativo: '',
};

export default function StatusBadge({ status }: { status: RequestStatus | 'Ativo' | 'Inativo' }) {
  return <span className={`badge ${VARIANT[status]}`}>{status}</span>;
}
