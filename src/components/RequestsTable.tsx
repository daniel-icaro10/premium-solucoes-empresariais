import { Link } from 'react-router-dom';
import { findModule, type ServiceRequest } from '../data/modules';
import StatusBadge from './StatusBadge';

export default function RequestsTable({ rows, showModule = true }: { rows: ServiceRequest[]; showModule?: boolean }) {
  if (rows.length === 0) return <div className="empty">Nenhuma solicitação encontrada.</div>;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Solicitação</th>
            {showModule && <th>Serviço</th>}
            <th>Cliente</th>
            <th>Status</th>
            <th>Atualizado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>
                <div className="cell-main">{r.title}</div>
                <div className="cell-sub">{r.id}</div>
              </td>
              {showModule && <td><Link to={`/servicos/${r.module}`}>{findModule(r.module)?.name}</Link></td>}
              <td>{r.client}</td>
              <td><StatusBadge status={r.status} /></td>
              <td className="mono">{r.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
