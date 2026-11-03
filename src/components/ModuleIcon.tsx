import {
  Award, Calculator, ChartColumn, Check, CircleDollarSign, CodeXml, CreditCard, FileText,
  Landmark, Lightbulb, Monitor, Shield, ShieldCheck, Smartphone, TrendingUp, Users,
  type LucideIcon,
} from 'lucide-react';

// Ícone principal (azul) + detalhe opcional (dourado), como na referência visual.
interface IconSpec {
  main: LucideIcon;
  badge?: LucideIcon;
  mark?: string; // letra desenhada dentro do ícone principal
  gold?: boolean; // ícone principal em dourado
}

const ICONS: Record<string, IconSpec> = {
  contabilidade: { main: Calculator, badge: ChartColumn },
  'bpo-financeiro': { main: CircleDollarSign, gold: true },
  'certificado-digital': { main: Award, badge: Check },
  consultoria: { main: TrendingUp, badge: Lightbulb },
  'marcas-patentes': { main: Shield, mark: 'R' },
  softwares: { main: Monitor, badge: CodeXml },
  'maquinas-cartao': { main: Smartphone, badge: CreditCard },
  'linhas-credito': { main: Landmark, badge: CircleDollarSign },
  seguros: { main: ShieldCheck },
  consorcio: { main: Users, badge: FileText },
};

export default function ModuleIcon({ slug }: { slug: string }) {
  const spec = ICONS[slug];
  if (!spec) return null;
  const { main: Main, badge: Badge, mark, gold } = spec;
  return (
    <div className="module-icon" aria-hidden="true">
      <Main size={38} strokeWidth={1.7} className={gold ? 'module-icon__main gold' : 'module-icon__main'} />
      {mark && <span className="module-icon__mark">{mark}</span>}
      {Badge && (
        <span className="module-icon__badge">
          <Badge size={15} strokeWidth={2.2} />
        </span>
      )}
    </div>
  );
}
