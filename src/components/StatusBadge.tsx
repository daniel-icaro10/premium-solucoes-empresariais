import type { ClientStatus, RequestStatus } from '../data/modules';

const VARIANT: Record<RequestStatus | ClientStatus, string> = {
  Aberta: 'badge--info',
  'Em andamento': 'badge--info',
  'Aguardando cliente': 'badge--warning',
  Concluída: 'badge--success',
  Ativo: 'badge--success',
  Onboarding: 'badge--warning',
  Inativo: '',
};

export default function StatusBadge({ status }: { status: RequestStatus | ClientStatus }) {
  return <span className={`badge ${VARIANT[status]}`}>{status}</span>;
}
