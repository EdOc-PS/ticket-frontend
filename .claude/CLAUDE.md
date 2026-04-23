# ticket-frontend — Contexto do Projeto

## Visão Geral

**Trabalho I IHC - 2026**: Plataforma de venda de ingressos para eventos (cinema, shows, etc).
Aplicação front-end pura, sem backend. Todos os dados são mockados no próprio front-end.
Deve aplicar as **10 Heurísticas de Nielsen** em toda a implementação.

**Data de entrega:** 04/05/2026  
**Valor:** 25 pontos  
**Pode ser em duplas**

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

## Requisitos Funcionais (Trabalho IHC)

1. **Autenticação**
   - Login na plataforma
   - Registro de usuário (opcional)

2. **Busca e Escolha de Eventos**
   - Listar eventos disponíveis para compra de ingressos
   - Filtrar/buscar eventos

3. **Compra de Ingressos**
   - Escolher categorias de ingressos (ex: normal, VIP, camarote)
   - Selecionar lugares (mapa de assentos com ocupação visual)
   - Simular pagamento e confirmação

4. **Perfil do Usuário**
   - Listar eventos adquiridos
   - Mostrar em ordem cronológica
   - Separar eventos já passados dos futuros
   - Disponibilizar ingresso digital com QR-Code

5. **Design & UX**
   - Aplicar as 10 Heurísticas de Nielsen
   - Design minimalista, Liquid Glass
   - Responsivo

## Heurísticas de Nielsen (Obrigatórias)

1. Visibilidade do status do sistema
2. Compatibilidade entre sistema e mundo real
3. Controle e liberdade do usuário
4. Consistência e padrões
5. Prevenção de erros
6. Reconhecimento em vez de memorização
7. Flexibilidade e eficiência de uso
8. Design estético e minimalista
9. Ajudar usuários a reconhecer, diagnosticar e recuperar-se de erros
10. Ajuda e documentação

## Roteamento

```
/                      → redireciona para /auth/login
/auth/login            → Login.vue
/auth/register         → Register.vue
/home                  → Home.vue (listagem de eventos, protegida)
/event/:id             → EventDetail.vue (detalhes, escolha categoria, mapa de assentos)
/checkout              → Checkout.vue (carrinho, pagamento simulado)
/profile               → Profile.vue (ingressos adquiridos, QR-Code)
/ticket/:id            → TicketDetail.vue (ingresso digital com QR-Code)
```

## Dados Mockados

Todos os dados devem ser definidos em `src/mocks/` como objetos TypeScript exportados. Sem chamadas HTTP reais.

**Estruturas de dados esperadas:**

```
src/mocks/
├── users.ts           # Usuários (credenciais de demo)
├── events.ts          # Eventos e dados de cinema
├── tickets.ts         # Ingressos adquiridos (carrinho/histórico)
└── seats.ts           # Mapa de assentos por evento
```

**Credencial de demo:**
- E-mail: `usuario@ticket.com`
- Senha: `123456`

**Dados esperados em `events.ts`:**
- ID do evento
- Nome (ex: "Homem-Aranha: Sem Volta para Casa")
- Data/hora de início
- Local/sala de cinema
- Descrição
- Imagem/poster
- Categorias de ingresso (normal R$50, VIP R$80, etc) com preços
- Disponibilidade

**Dados esperados em `seats.ts`:**
- Mapa de assentos por evento (matriz ocupada/livre)
- Preço por categoria de assento

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
