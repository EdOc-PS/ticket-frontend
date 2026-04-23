# ticket-frontend — Contexto do Projeto

## Visão Geral

Aplicação front-end de gestão de tickets, sem backend. Todos os dados são mockados no próprio front-end.

## Stack Tecnológica

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Tipografia:** Inter (primária), Manrope (headings) — via Google Fonts
- **Ícones:** Phosphor Icons (`@phosphor-icons/vue`) com `weight="duotone"`
- **Roteamento:** Vue Router v5
- **Build:** Vite

## Identidade Visual

### Estilo
- **Minimalista** — sem elementos decorativos desnecessários; espaço em branco é parte do design.
- **Liquid Glass** — superfícies semitransparentes com `backdrop-blur-xl`, bordas sutis, sombras suaves. Inspirado no design system da Apple (apple.com).
- Fundo claro: `#f5f5f7` (neutral Apple) — não escuro.
- A sensação geral é leve, aérea e moderna, como vidro fosco sobre fundo claro.

### Cores
- **Primária:** blue-500 (`#3b82f6`) — usada em CTAs, estados ativos, ícones em foco, bordas de focus.
- **Neutros:** Paleta neutral (gray-scale) para fundos, bordas e textos.
- **Semântica:** red-500 para erros, com background `red-50`.

### Tipografia
- **Inter:** Corpo (body, labels, placeholders) — fonte sans-serif limpa e legível.
- **Manrope:** Títulos (h1-h6) — fonte moderna, bold, com personalidade.
- Hierarquia: h1 (2xl bold) → subtítulo (sm neutral-500) → label (xs uppercase) → body (sm).

### Ícones
- Sempre usar `weight="duotone"` nos ícones Phosphor.
- Cor padrão: `text-neutral-400`.
- No foco do input: transição para `text-blue-500` com duração 200ms.

## Padrões de Arquitetura

```
src/
├── assets/           # Arquivos estáticos
├── components/
│   ├── ui/           # Componentes atômicos reutilizáveis (Button, Input, etc.)
│   └── layout/       # Componentes de estrutura de página (futuro)
├── view/
│   ├── Home.vue
│   └── auth/
│       ├── Login.vue
│       └── Register.vue
├── routes/
│   └── index.ts
├── App.vue
├── main.ts
└── style.css
```

## Padrões de Componentes

- Usar `<script setup lang="ts">` em todos os componentes.
- Props tipadas com `defineProps<{}>()`.
- Emits tipados com `defineEmits<{}>()`.
- Sem Options API.
- Sem comentários óbvios; apenas WHY quando não óbvio.

## Componentes UI Base

### `Input.vue`
- Props: `label`, `type`, `placeholder`, `modelValue`, `icon` (componente Phosphor)
- Emite: `update:modelValue`
- Estilo: fundo `bg-white`, borda `border-neutral-200`, foco em `border-blue-500`
- Ícone muda cor no foco: `text-neutral-400` → `text-blue-500` com transição suave
- Usa `weight="duotone"` nos ícones

### `Button.vue`
- Props: `label`, `variant` (`primary` | `ghost`), `loading`, `type`
- Primário: `bg-blue-500` com hover `bg-blue-600`, scale ativo `0.98`
- Ghost: fundo `transparent` com borda `border-neutral-300`, hover `bg-neutral-100`
- Estado `loading` mostra spinner SVG com texto "Aguarde..."

## Roteamento

```
/                → redireciona para /auth/login
/auth/login      → Login.vue
/auth/register   → Register.vue
/home            → Home.vue (protegida, em desenvolvimento)
```

## Dados Mockados

Todos os dados de usuário, tickets, etc. devem ser definidos em arquivos dentro de `src/mocks/` como objetos TypeScript exportados. Sem chamadas HTTP reais.

**Credencial de demo:**
- E-mail: `usuario@ticket.com`
- Senha: `123456`

## Convenções

- Nomes de arquivos de view: PascalCase.
- Nomes de arquivos de componentes: PascalCase.
- Classes Tailwind: ordem lógica (layout → spacing → colors → effects → interaction).
- Uso de `font-heading` para Manrope em títulos; padrão é `font-sans` (Inter).
- Sem `any` explícito no TypeScript.
- Sem `console.log` no código final.
- Transições: `transition-all duration-200` para interações suaves.

## Tailwind Config

Arquivo `tailwind.config.js` estende o Tailwind com:
- `font-sans`: Inter (padrão global)
- `font-heading`: Manrope (titulos)

Importação de fontes via Google Fonts em `style.css`.
