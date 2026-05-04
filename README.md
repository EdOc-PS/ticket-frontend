# 🎟️ Ticket System | Front-end

> Plataforma moderna de venda de ingressos de cinema e eventos, desenvolvida para a disciplina de Interação Humano-Computador (IHC) - 2026.

Um sistema web front-end puro focado na experiência do usuário (UX), aplicando rigorosamente as **10 Heurísticas de Usabilidade de Nielsen**. Todo o fluxo de dados, autenticação e checkout é simulado (mockado) diretamente no cliente, sem a necessidade de um servidor back-end.

## ✨ Funcionalidades

- **Autenticação Simulada:** Fluxo de login com validação e feedback visual.
- **Catálogo de Eventos:** Listagem de filmes em cartaz, em breve e festivais.
- **Seleção de Assentos:** Mapa interativo de poltronas (livres, ocupadas e selecionadas) com cálculo dinâmico de preços.
- **Checkout:** Simulação de pagamento (Pix, Cartão, Boleto) com resumo do pedido fixo na tela.
- **Perfil do Usuário:** Histórico de compras separando eventos passados e futuros.
- **Ingresso Digital:** Geração de um ticket com visual realista (estilo papel perfurado) e QR-Code dinâmico.

## 🎨 Identidade Visual (Liquid Glass)

O design da interface baseia-se no conceito **Liquid Glass**, proporcionando uma experiência leve, fluida e minimalista.
- **Fundo:** Claro e neutro (`#f5f5f7`).
- **Superfícies:** Semitransparentes com efeitos de desfoque no fundo (`backdrop-blur-xl`) e bordas sutis.
- **Tipografia:** Hierarquia clara utilizando Inter (corpo) e Manrope (títulos).
- **Acessibilidade & Minimalismo:** Foco absoluto no conteúdo, sem elementos decorativos desnecessários.

## 🚀 Tecnologias e Ferramentas

- **[Vue 3](https://vuejs.org/)** (Composition API / `<script setup>`)
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite](https://vitejs.dev/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[Phosphor Icons](https://phosphoricons.com/)** (Duotone)
- **Vue Router v5**

## 📦 Estrutura de Diretórios

Os dados simulados da aplicação estão isolados na pasta `src/mocks/` para manter a arquitetura limpa.
```bash
src/
├── assets/           # Arquivos estáticos globais
├── components/       # Componentes reaproveitáveis (Button, Input, Layout)
├── mocks/            # Dados simulados (users.ts, events.ts, seats.ts)
├── routes/           # Configuração do Vue Router
├── view/             # Telas principais (Home, Login, Checkout, Profile)
├── App.vue           # Componente raiz
└── main.ts           # Ponto de entrada da aplicação
