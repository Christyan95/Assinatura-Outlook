<div align="center">

# ASSINATURA OUTLOOK HUB
**Portal de Autoatendimento para Gerenciamento e Padronização de Assinaturas Corporativas**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)

*"A consistência da identidade visual é o reflexo da maturidade de uma marca no ambiente digital."*

</div>

---

## 📋 Índice

- [💎 Visão Estratégica](#-visão-estratégica)
- [🏛️ Arquitetura de Design](#%EF%B8%8F-arquitetura-de-design)
- [🚀 Stack Tecnológica de Elite](#-stack-tecnológica-de-elite)
- [🔐 Segurança & Integridade de Marca](#-segurança--integridade-de-marca)
- [🏗 Estrutura do Projeto](#-estrutura-do-projeto)
- [🏢 Gestão Multi-Tenant](#-gestão-multi-tenant)
- [⚙️ Configuração de Ambiente](#%EF%B8%8F-configuração-de-ambiente)
- [🛠 Instalação & Deployment](#-instalação--deployment)

---

## 💎 Visão Estratégica

O **Assinatura-Outlook-Hub** é um ecossistema de identidade visual projetado para garantir que 100% dos colaboradores de um grupo empresarial utilizem assinaturas de e-mail padronizadas, profissionais e tecnicamente otimizadas. Desenvolvido integralmente por **Christyan Silva**, o sistema resolve o caos das assinaturas fragmentadas através de:

- **Padronização Absoluta** — Layouts rigorosamente validados para renderização perfeita no Microsoft Outlook (Desktop e Web).
- **Autoatendimento (Self-Service)** — O colaborador gera sua própria assinatura em segundos, sem necessidade de suporte da TI ou do Marketing.
- **Ecossistema Multi-Marca** — Suporte nativo para múltiplas unidades de negócio (Tivor, HortSoy, CleanFarm, Jee) com identidades visuais isoladas e dinâmicas.

A solução elimina a necessidade de manuais de "como configurar assinatura", reduzindo drasticamente o tempo de onboarding de novos colaboradores e garantindo a **proteção da marca** em todas as comunicações externas.

---

## 🏛️ Arquitetura de Design

O sistema utiliza um modelo de **Renderização de Alta Fidelidade (Rich HTML)**, onde cada elemento da assinatura é construído para sobreviver aos algoritmos de filtragem de CSS do Outlook:

```
┌─────────────────────────────────────────────────────┐
│                  CAMADA 1 — IDENTIDADE              │
│        Seletor de Marca (Multi-Tenant) → Config UI  │
├─────────────────────────────────────────────────────┤
│                  CAMADA 2 — INTERAÇÃO               │
│        Live Preview (Framer Motion) → Feedback Real │
├─────────────────────────────────────────────────────┤
│                  CAMADA 3 — RENDERIZAÇÃO            │
│        HTML Inline (Tables Based) → Outlook Friendly│
├─────────────────────────────────────────────────────┤
│                  CAMADA 4 — TRANSFERÊNCIA           │
│        Clipboard API (Rich Text) → Cópia Perfeita   │
├─────────────────────────────────────────────────────┤
│                  CAMADA 5 — GOVERNANÇA              │
│        Validação de Campo + DOMPurify → Segurança   │
└─────────────────────────────────────────────────────┘
```

**Zero degradação visual.** O sistema utiliza tabelas HTML aninhadas e estilos _inline_ explícitos, garantindo que o design permaneça intacto mesmo em clients de e-mail que removem blocos `<style>` ou classes CSS.

---

## 🚀 Stack Tecnológica de Elite

### Frontend & Core
- **Next.js 16.2** (App Router): Roteamento dinâmico e performance extrema com Server-Side Rendering (SSR).
- **React 19:** Utilização de Hooks modernos e arquitetura componentizada para reatividade fluida.
- **Tailwind CSS v4:** O novo padrão industrial para estilos atômicos e sistemas de design ultra-performáticos.
- **Framer Motion:** Animações de micro-interação, transições de estado e efeitos de levitação nos cards.
- **Lucide React:** Iconografia premium, minimalista e altamente customizável.

### Design Experience (UX/UI)
- **Glassmorphism:** Interface com transparências, desfoque de fundo (blur) e bordas finas para um visual "premium tech".
- **Dynamic Theming:** Suporte completo a Dark/Light mode com persistência de preferência via `next-themes`.
- **Responsive-First:** Adaptabilidade total para dispositivos móveis, permitindo a geração da assinatura em qualquer lugar.

### Engenharia de Software
- **TypeScript Strict Mode:** Tipagem rigorosa em todo o fluxo de dados, eliminando erros em tempo de execução.
- **DOMPurify 3.x:** Sanitização OWASP contra XSS e injeção de HTML.
- **Multi-Tenant Engine:** Arquitetura que permite adicionar novas marcas em minutos apenas via arquivo de configuração.

---

## 🔐 Segurança & Integridade de Marca

Segurança corporativa implementada em camadas técnicas:

- **Sanitização de Input (DOMPurify):** Todos os campos de texto possuem sanitização para prevenir XSS e injeções que poderiam quebrar o layout da assinatura.
- **Validação em 2 Camadas:** Validação de cliente + validação de negócio para garantir que apenas dados válidos sejam processados.
- **Mascaramento Dinâmico:** Telefones formatados em tempo real com validação de DDD brasileiro (11-99).
- **Asset Integrity:** Imagens servidas via caminhos absolutos e hospedagem otimizada para garantir que o logo nunca apareça como "bloqueado" ou "não encontrado".
- **Isolation Routing:** Cada unidade de negócio opera em sua própria rota isolada, mas consome o mesmo kernel de geração de código.
- **Audit & Compliance:** Estrutura pronta para rastreamento de assinaturas por usuário e histórico de eventos.

---

## 🏗 Estrutura do Projeto

Arquitetura modular focada em escalabilidade e manutenção simplificada:

```
Assinatura-Outlook-Hub/
├── src/
│   ├── app/
│   │   ├── [company]/page.tsx      # Rota Dinâmica Master (Otimizado)
│   │   ├── layout.tsx              # Setup global (Theme, Fontes, SEO)
│   │   ├── page.tsx                # Landing: Portal de Seleção de Marca
│   │   ├── globals.css             # Design System (Tailwind v4)
│   │   └── not-found.tsx           # Fallback 404
│   ├── components/
│   │   ├── SignatureGenerator.tsx  # Core: Motor de Renderização HTML
│   │   ├── CompanyCard.tsx         # UI: Card interativo da home
│   │   └── ThemeProvider.tsx       # Injector de tema (Next-Themes)
│   ├── config/
│   │   └── companies.ts            # Central de Configuração das Marcas
│   ├── utils/
│   │   ├── sanitizer.ts            # DOMPurify wrapper + máscaras
│   │   ├── validation.ts           # Validadores de negócio
│   │   ├── constants.ts            # Constantes globais
│   │   └── classnames.ts           # cn() utility
│   ├── types/
│   │   └── index.ts                # Tipos TypeScript centralizados
│   └── public/
│       └── assets/                 # Logos, ícones e backgrounds
├── next.config.ts                  # Otimizações de headers
├── tsconfig.json                   # TypeScript strict mode
└── package.json                    # Dependencies (Next 16, React 19)
```

---

## 🏢 Gestão Multi-Tenant

Adicionar uma nova unidade de negócio é um processo de **Zero Code Modification** no motor principal:

1. **Definição de Atributos:** Adicione o objeto da empresa no arquivo `src/config/companies.ts`.
2. **Setup Visual:** Insira os assets (logo e background) na pasta `public/assets/`.
3. **Deploy:** O sistema cria a rota e o card na home automaticamente via roteamento dinâmico.

| Marca | Rota | Cor de Identidade | Website |
|---|---|---|---|
| **Tivor** | `/tivor` | `#054bbd` | `www.tivor.com.br` |
| **HortSoy** | `/hortsoy` | `#15803d` | `www.hortsoy.com.br` |
| **CleanFarm** | `/cleanfarm` | `#059669` | `www.cleanfarm.com.br` |
| **Jee** | `/jee` | `#000000` | `www.jeecompany.com.br` |

---

## ⚙️ Configuração de Ambiente

Configure as variáveis de ambiente necessárias para garantir a integridade dos assets:

```env
# URL base para os links absolutos de imagens na assinatura (Essencial para Outlook)
NEXT_PUBLIC_ASSET_URL=https://assinaturas.suaempresa.com.br
```

---

## 🛠 Instalação & Deployment

### Desenvolvimento
```bash
# Instalação de dependências
npm install

# Iniciar servidor local
npm run dev

# Verificar qualidade do código
npm run lint

# Build para produção
npm run build
```

### Produção
```bash
# Build otimizado
npm run build

# Start do servidor de produção
npm start

# Verificar vulnerabilidades de segurança
npm audit
```

### Deploy em Vercel (Recomendado)
```bash
npm i -g vercel
vercel --prod
```

### Deploy em Docker
```bash
docker build -t assinatura-outlook .
docker run -p 3000:3000 assinatura-outlook
```

---

## 👤 Autor & Arquiteto

**Christyan Silva**
