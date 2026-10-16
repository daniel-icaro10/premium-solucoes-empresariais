# Premium Soluções Empresariais — Central de Serviços

Protótipo de front-end (React + Vite + TypeScript) baseado em `referencia.jpeg`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
```

- `src/styles/global.css` — design system (tokens de cor, tipografia, componentes)
- `src/data/modules.ts` — módulos, clientes e solicitações (dados de demonstração)
- `src/pages/` — Início, Serviços, Detalhe do módulo, Clientes, Relatórios, Configurações

## Links dos módulos

Em **Configurações → Links dos módulos** o cliente cadastra a URL do sistema de cada módulo.
Com o link cadastrado, "Abrir módulo" abre esse sistema em nova aba; sem link, abre a página interna do módulo.
Neste protótipo os links ficam salvos no navegador (`localStorage`); em produção devem ir para a API/banco.

## Perfis e acessos de demonstração

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | admin@premiumsolucoes.com.br | admin123 |
| Cliente (Alfa Engenharia: Contabilidade, BPO Financeiro, Seguros) | cliente@alfaeng.com.br | cliente123 |

- **Administrador** vê todos os módulos e as telas de Clientes, Relatórios e Configurações.
- Em **Clientes**, o administrador cadastra cada cliente e marca os módulos que ele pode acessar.
- **Cliente** vê apenas os módulos liberados; os demais não aparecem e as rotas são bloqueadas.
- Protótipo: usuários e senhas ficam no navegador (). Em produção, mover para API com senhas criptografadas.
