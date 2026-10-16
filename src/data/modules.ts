export type Category = 'Gestão' | 'Financeiro' | 'Jurídico' | 'Tecnologia';

export interface Module {
  slug: string;
  name: string;
  category: Category;
  openRequests: number;
}

export const CATEGORIES: Category[] = ['Gestão', 'Financeiro', 'Jurídico', 'Tecnologia'];

export const MODULES: Module[] = [
  {
    slug: 'contabilidade',
    name: 'Contabilidade',
    category: 'Gestão',
    openRequests: 12,
  },
  {
    slug: 'bpo-financeiro',
    name: 'BPO Financeiro',
    category: 'Financeiro',
    openRequests: 8,
  },
  {
    slug: 'certificado-digital',
    name: 'Certificado Digital',
    category: 'Tecnologia',
    openRequests: 5,
  },
  {
    slug: 'consultoria',
    name: 'Consultoria Financeira e Empresarial',
    category: 'Gestão',
    openRequests: 3,
  },
  {
    slug: 'marcas-patentes',
    name: 'Registro de Marcas e Patentes',
    category: 'Jurídico',
    openRequests: 4,
  },
  {
    slug: 'softwares',
    name: 'Venda de Softwares',
    category: 'Tecnologia',
    openRequests: 6,
  },
  {
    slug: 'maquinas-cartao',
    name: 'Venda de Máquinas de Cartão',
    category: 'Financeiro',
    openRequests: 7,
  },
  {
    slug: 'linhas-credito',
    name: 'Linhas de Crédito',
    category: 'Financeiro',
    openRequests: 9,
  },
  {
    slug: 'seguros',
    name: 'Seguros',
    category: 'Financeiro',
    openRequests: 2,
  },
  {
    slug: 'consorcio',
    name: 'Consórcio',
    category: 'Financeiro',
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
