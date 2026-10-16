import type { LucideIcon } from 'lucide-react';
import {
  Calculator,
  Wallet,
  BadgeCheck,
  TrendingUp,
  Stamp,
  MonitorSmartphone,
  CreditCard,
  Landmark,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

export type Category = 'Gestão' | 'Financeiro' | 'Jurídico' | 'Tecnologia';

export interface Module {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  category: Category;
  features: string[];
  openRequests: number;
}

export const CATEGORIES: Category[] = ['Gestão', 'Financeiro', 'Jurídico', 'Tecnologia'];

export const MODULES: Module[] = [
  {
    slug: 'contabilidade',
    name: 'Contabilidade',
    short: 'Escrituração, balanços e obrigações fiscais.',
    description:
      'Gestão contábil completa: escrituração, apuração de impostos, balanços, folha de pagamento e entrega de obrigações acessórias.',
    icon: Calculator,
    category: 'Gestão',
    features: ['Apuração de impostos', 'Folha de pagamento', 'Balanço e DRE', 'Obrigações acessórias'],
    openRequests: 12,
  },
  {
    slug: 'bpo-financeiro',
    name: 'BPO Financeiro',
    short: 'Terceirização das rotinas financeiras.',
    description:
      'Contas a pagar e a receber, conciliação bancária, fluxo de caixa e relatórios gerenciais operados pela nossa equipe.',
    icon: Wallet,
    category: 'Financeiro',
    features: ['Contas a pagar e receber', 'Conciliação bancária', 'Fluxo de caixa', 'Relatórios gerenciais'],
    openRequests: 8,
  },
  {
    slug: 'certificado-digital',
    name: 'Certificado Digital',
    short: 'Emissão e renovação de e-CNPJ e e-CPF.',
    description:
      'Emissão, renovação e gestão de vencimentos de certificados digitais A1 e A3 para empresas e pessoas físicas.',
    icon: BadgeCheck,
    category: 'Tecnologia',
    features: ['e-CNPJ A1 / A3', 'e-CPF A1 / A3', 'Alertas de vencimento', 'Validação por vídeo'],
    openRequests: 5,
  },
  {
    slug: 'consultoria',
    name: 'Consultoria Financeira e Empresarial',
    short: 'Planejamento, reestruturação e crescimento.',
    description:
      'Diagnóstico financeiro, planejamento tributário, valuation e apoio estratégico para decisões de crescimento.',
    icon: TrendingUp,
    category: 'Gestão',
    features: ['Diagnóstico financeiro', 'Planejamento tributário', 'Valuation', 'Plano de negócios'],
    openRequests: 3,
  },
  {
    slug: 'marcas-patentes',
    name: 'Registro de Marcas e Patentes',
    short: 'Proteção da propriedade intelectual no INPI.',
    description:
      'Busca de anterioridade, depósito e acompanhamento de processos de marcas, patentes e desenhos industriais no INPI.',
    icon: Stamp,
    category: 'Jurídico',
    features: ['Busca de anterioridade', 'Depósito no INPI', 'Acompanhamento de processo', 'Renovações'],
    openRequests: 4,
  },
  {
    slug: 'softwares',
    name: 'Venda de Softwares',
    short: 'ERP, gestão e automação comercial.',
    description:
      'Licenciamento, implantação e suporte de softwares de gestão, ERP, emissão fiscal e automação comercial.',
    icon: MonitorSmartphone,
    category: 'Tecnologia',
    features: ['ERP e gestão', 'Emissor de notas', 'Implantação', 'Suporte técnico'],
    openRequests: 6,
  },
  {
    slug: 'maquinas-cartao',
    name: 'Venda de Máquinas de Cartão',
    short: 'Maquininhas com as melhores taxas.',
    description:
      'Comparativo de adquirentes, negociação de taxas e fornecimento de máquinas de cartão e link de pagamento.',
    icon: CreditCard,
    category: 'Financeiro',
    features: ['Comparativo de taxas', 'POS e smart POS', 'Link de pagamento', 'Antecipação de recebíveis'],
    openRequests: 7,
  },
  {
    slug: 'linhas-credito',
    name: 'Linhas de Crédito',
    short: 'Capital de giro e financiamentos.',
    description:
      'Análise de perfil e intermediação de capital de giro, financiamento de equipamentos e linhas governamentais.',
    icon: Landmark,
    category: 'Financeiro',
    features: ['Capital de giro', 'Financiamento de equipamentos', 'Linhas BNDES', 'Análise de crédito'],
    openRequests: 9,
  },
  {
    slug: 'seguros',
    name: 'Seguros',
    short: 'Proteção patrimonial, vida e frota.',
    description:
      'Cotação e gestão de apólices empresariais: patrimonial, responsabilidade civil, vida em grupo, saúde e frota.',
    icon: ShieldCheck,
    category: 'Financeiro',
    features: ['Seguro empresarial', 'Vida em grupo', 'Frota', 'Responsabilidade civil'],
    openRequests: 2,
  },
  {
    slug: 'consorcio',
    name: 'Consórcio',
    short: 'Imóveis, veículos e equipamentos.',
    description:
      'Planejamento de aquisição via consórcio para imóveis, veículos pesados, máquinas e equipamentos sem juros.',
    icon: UsersRound,
    category: 'Financeiro',
    features: ['Imóveis', 'Veículos e pesados', 'Máquinas e equipamentos', 'Simulação de lances'],
    openRequests: 1,
  },
];

export const findModule = (slug: string) => MODULES.find((m) => m.slug === slug);

export type RequestStatus = 'Aberta' | 'Em andamento' | 'Aguardando cliente' | 'Concluída';

export interface ServiceRequest {
  id: string;
  module: string;
  client: string;
  title: string;
  status: RequestStatus;
  updatedAt: string;
}

export const REQUESTS: ServiceRequest[] = [
  { id: 'SOL-1042', module: 'contabilidade', client: 'Alfa Engenharia Ltda.', title: 'Apuração do Simples – Setembro', status: 'Em andamento', updatedAt: 'Hoje, 09:42' },
  { id: 'SOL-1041', module: 'certificado-digital', client: 'Café Bom Grão ME', title: 'Renovação e-CNPJ A1', status: 'Aguardando cliente', updatedAt: 'Hoje, 08:15' },
  { id: 'SOL-1040', module: 'linhas-credito', client: 'Transportes Rota Sul', title: 'Capital de giro – R$ 250 mil', status: 'Aberta', updatedAt: 'Ontem, 17:30' },
  { id: 'SOL-1039', module: 'bpo-financeiro', client: 'Clínica Vida Plena', title: 'Conciliação bancária mensal', status: 'Concluída', updatedAt: 'Ontem, 14:02' },
  { id: 'SOL-1038', module: 'marcas-patentes', client: 'Studio Norte Design', title: 'Depósito de marca mista', status: 'Em andamento', updatedAt: '14 out' },
  { id: 'SOL-1037', module: 'maquinas-cartao', client: 'Mercado Bairro Novo', title: '3 maquininhas smart POS', status: 'Concluída', updatedAt: '13 out' },
  { id: 'SOL-1036', module: 'seguros', client: 'Alfa Engenharia Ltda.', title: 'Cotação seguro patrimonial', status: 'Aberta', updatedAt: '12 out' },
  { id: 'SOL-1035', module: 'softwares', client: 'Café Bom Grão ME', title: 'Implantação do ERP', status: 'Em andamento', updatedAt: '11 out' },
  { id: 'SOL-1034', module: 'consultoria', client: 'Transportes Rota Sul', title: 'Planejamento tributário 2027', status: 'Em andamento', updatedAt: '10 out' },
  { id: 'SOL-1033', module: 'consorcio', client: 'Clínica Vida Plena', title: 'Consórcio de equipamento médico', status: 'Concluída', updatedAt: '08 out' },
];

export type ClientStatus = 'Ativo' | 'Onboarding' | 'Inativo';

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  email: string;
  services: string[];
  status: ClientStatus;
}

export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Alfa Engenharia Ltda.', cnpj: '12.345.678/0001-90', contact: 'Marina Costa', email: 'marina@alfaeng.com.br', services: ['contabilidade', 'seguros', 'bpo-financeiro'], status: 'Ativo' },
  { id: 'c2', name: 'Café Bom Grão ME', cnpj: '23.456.789/0001-01', contact: 'João Pereira', email: 'joao@bomgrao.com.br', services: ['certificado-digital', 'softwares'], status: 'Ativo' },
  { id: 'c3', name: 'Transportes Rota Sul', cnpj: '34.567.890/0001-12', contact: 'Ricardo Alves', email: 'ricardo@rotasul.com.br', services: ['linhas-credito', 'consultoria', 'consorcio'], status: 'Onboarding' },
  { id: 'c4', name: 'Clínica Vida Plena', cnpj: '45.678.901/0001-23', contact: 'Dra. Paula Mendes', email: 'paula@vidaplena.med.br', services: ['bpo-financeiro', 'consorcio'], status: 'Ativo' },
  { id: 'c5', name: 'Studio Norte Design', cnpj: '56.789.012/0001-34', contact: 'Lucas Ferreira', email: 'lucas@studionorte.com', services: ['marcas-patentes'], status: 'Ativo' },
  { id: 'c6', name: 'Mercado Bairro Novo', cnpj: '67.890.123/0001-45', contact: 'Ana Souza', email: 'ana@bairronovo.com.br', services: ['maquinas-cartao', 'contabilidade'], status: 'Ativo' },
  { id: 'c7', name: 'Oficina Torque Máximo', cnpj: '78.901.234/0001-56', contact: 'Paulo Lima', email: 'paulo@torquemax.com.br', services: ['contabilidade'], status: 'Inativo' },
];

export const MONTHLY = [
  { month: 'Mai', value: 38 },
  { month: 'Jun', value: 44 },
  { month: 'Jul', value: 41 },
  { month: 'Ago', value: 52 },
  { month: 'Set', value: 58 },
  { month: 'Out', value: 47 },
];

export interface Notification {
  id: string;
  title: string;
  time: string;
  unread: boolean;
}

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Certificado digital de Café Bom Grão vence em 15 dias', time: 'há 20 min', unread: true },
  { id: 'n2', title: 'Nova solicitação de crédito – Transportes Rota Sul', time: 'há 2 h', unread: true },
  { id: 'n3', title: 'Documentos recebidos – Alfa Engenharia', time: 'há 5 h', unread: true },
  { id: 'n4', title: 'Conciliação de setembro concluída – Clínica Vida Plena', time: 'ontem', unread: false },
];
