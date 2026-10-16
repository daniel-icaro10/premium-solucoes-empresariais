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
