# Sprint — Plataforma de Venda de Ingressos

**Data de entrega:** 04/05/2026  
**Status:** Fases 1 e 2 completas ✅

---

## Fases de Desenvolvimento

### Fase 1: Fundação & Dados Mockados ✅
**Objetivo:** Estruturar dados e componentes base

- [x] Criar arquivo `src/mocks/users.ts` com usuários e credenciais
- [x] Criar arquivo `src/mocks/events.ts` com lista de eventos de cinema
  - Incluir: ID, nome, data, local, imagem, descrição
  - Mínimo 5 eventos (com alguns já passados para perfil)
- [x] Criar arquivo `src/mocks/tickets.ts` para ingressos adquiridos
- [x] Criar arquivo `src/mocks/seats.ts` com mapas de assentos por evento
  - Estrutura: matriz de ocupação + preços por categoria

### Fase 2: Autenticação ✅
**Objetivo:** Fluxo de login funcional

- [x] Melhorar página `Login.vue` com validação
  - Validar e-mail/senha contra mock
  - Mostrar mensagens de erro claras (Heurística 9)
  - Implementar "Lembrar-me" (Heurística 7)
- [x] Página `Register.vue` (opcional, mas recomendado)
- [x] Implementar contexto/store de autenticação (usuário logado)
- [x] Proteger rotas autenticadas

### Fase 3: Listagem de Eventos
**Objetivo:** Exibir eventos disponíveis

- [ ] Criar `Home.vue` (listagem de eventos)
  - Grid/lista de filmes com poster, título, data, preço mínimo
  - Filtros: data, categoria, preço (Heurística 7)
  - Status visual de "Disponível" vs "Passado" (Heurística 1)
  - Links para detalhe do evento
- [ ] Componente `EventCard.vue` (exibição padronizada)

### Fase 4: Detalhes do Evento & Escolha de Categoria ✅
**Objetivo:** Selecionar tipo de ingresso

- [x] Criar `EventDetail.vue`
  - Poster grande, sinopse, data/hora, local
  - Descrição das categorias: normal, VIP, camarote
  - Preços por categoria (Heurística 4 - consistência)
  - Botão "Escolher assento" → vai para mapa de assentos (Heurística 3)

### Fase 5: Mapa de Assentos & Carrinho ✅
**Objetivo:** Selecionar lugares e confirmar pedido

- [x] Criar `SeatMap.vue` (mapa interativo de assentos) — integrado no EventDetail.vue
  - Grid visual com assentos (ocupado, livre, selecionado)
  - Cores intuitivas: cinza (ocupado), branco (livre), azul (selecionado)
  - Mostrar preço total conforme seleção (Heurística 1 - visibilidade)
  - Botão "Continuar para pagamento"
- [x] Armazenar seleção em query params da rota

### Fase 6: Pagamento Simulado
**Objetivo:** Simular checkout e confirmação

- [ ] Criar `Checkout.vue`
  - Resumo dos ingressos selecionados
  - Endereço de entrega (auto-preenchido com dados do usuário)
  - Formulário de pagamento simulado (campos básicos, sem validação real)
  - Botão "Confirmar Compra"
  - Mensagem de sucesso com número de pedido (Heurística 1 & 9)
- [ ] Salvar compra no mock de `tickets.ts`

### Fase 7: Perfil do Usuário
**Objetivo:** Listar ingressos adquiridos

- [ ] Criar `Profile.vue`
  - Dados do usuário
  - Abas/seções: "Ingressos Futuros" vs "Ingressos Passados" (Heurística 4)
  - Ordenar por data cronológica (Heurística 4)
  - Card para cada ingresso com evento, data, assentos, ação "Ver Ingresso Digital"
- [ ] Componente `PurchasedTicketCard.vue`

### Fase 8: Ingresso Digital & QR-Code
**Objetivo:** Exibir ingresso com QR-Code

- [ ] Criar `TicketDetail.vue`
  - Exibir ingresso completo (evento, data, assentos)
  - Gerar e exibir QR-Code (usar lib `qrcode`)
  - Design de "cartão" com dados legíveis
  - Botão "Salvar/Compartilhar" (simulado)

### Fase 9: Componentes Auxiliares
**Objetivo:** Criar componentes necessários para navegação e UX

- [ ] Criar `Header.vue` (navbar com logo, menu, logout)
  - Mostrar usuário logado
  - Link para profile
  - Botão de logout
- [ ] Atualizar `Footer.vue` se necessário
- [ ] Componente `LoadingSpinner.vue` (para estados de carregamento)
- [ ] Componente `Modal.vue` (confirmações)

### Fase 10: Heurísticas de Nielsen
**Objetivo:** Validar e aplicar as 10 heurísticas em toda a interface

- [ ] **H1 - Visibilidade do status:**
  - Indicar carregamento durante seleção
  - Mostrar status de cada passo (carrinho, pagamento, confirmação)
  - Feedback visual de ações (botões com hover/active)

- [ ] **H2 - Compatibilidade com mundo real:**
  - Usar termos: "Cinema", "Assentos", "Ingresso", "QR-Code"
  - Fluxo real de compra: evento → categoria → assento → pagamento → ingresso

- [ ] **H3 - Controle e liberdade:**
  - Botões "Voltar" em todas as páginas
  - Permitir deselecionar assentos
  - Histórico navegável

- [ ] **H4 - Consistência e padrões:**
  - Mesmos botões, cores, tipografia em toda app
  - Layout consistente (header, footer, conteúdo)
  - Ordenação sempre cronológica para eventos

- [ ] **H5 - Prevenção de erros:**
  - Validar campos (email válido, senha mínima 6 caracteres)
  - Confirmar antes de comprar (modal de confirmação)
  - Desabilitar botão "Comprar" se nenhum assento selecionado

- [ ] **H6 - Reconhecimento vs memorização:**
  - Ícones claros (home, profile, logout)
  - Labels claros para todas as ações
  - Status visual óbvio (assento ocupado é cinza, não precisa pensar)

- [ ] **H7 - Flexibilidade e eficiência:**
  - Atalhos de teclado (Enter para confirmar, Esc para voltar)
  - Filtros rápidos em eventos
  - "Lembrar-me" na autenticação

- [ ] **H8 - Design estético e minimalista:**
  - Aplicar Liquid Glass + cores neutras
  - Espaço em branco generoso
  - Sem clutter

- [ ] **H9 - Ajudar na recuperação de erros:**
  - Mensagens de erro claras em português
  - Sugerir ações (ex: "Email não encontrado. Criar conta?")
  - Não permitir estados inválidos

- [ ] **H10 - Ajuda e documentação:**
  - Tooltips em seleções complexas (mapa de assentos)
  - FAQ breve no footer (opcional)
  - Descrições de categorias de ingresso claras

### Fase 11: Responsividade
**Objetivo:** Funcionar bem em mobile e desktop

- [ ] Testar em mobile (iPhone SE, 375px)
- [ ] Testar em tablet (iPad, 768px)
- [ ] Testar em desktop (1280px)
- [ ] Ajustar layout de mapa de assentos para mobile (scroll horizontal se necessário)
- [ ] Botões com tamanho adequado (min 44x44px em mobile)

### Fase 12: Testes & Polimento
**Objetivo:** Garantir qualidade antes de entregar

- [ ] Testar fluxo completo: login → escolher evento → assentos → pagamento → perfil → ingresso
- [ ] Verificar sem console.log no código final
- [ ] Verificar TypeScript sem `any` explícito
- [ ] Performance: nenhuma tela lenta
- [ ] Acessibilidade: teclado navegável (Tab funciona)

### Fase 13: Documentação & Entrega
**Objetivo:** Preparar arquivos para entrega

- [ ] Gerar relatório PDF com:
  - Identificação dos alunos
  - Objetivos do sistema
  - Screenshots de cada tela
  - Para cada Heurística de Nielsen: explicar como foi aplicada com exemplos
- [ ] Gravar vídeo de demonstração (30-60s mostrando fluxo completo)
  - Não precisa áudio explicativo
  - Mostra: login → evento → assentos → pagamento → ingresso
- [ ] Garantir código fonte está limpo e bem organizado
- [ ] Commit final com mensagem clara

---

## Prioridades

**Alta prioridade (Fase 1-6):** Funcionalidade básica de compra
**Média prioridade (Fase 7-10):** Perfil e heurísticas de Nielsen
**Baixa prioridade (Fase 11-13):** Polimento e entrega

---

## Notas Importantes

- **Sem persistência em BD:** Dados mocados resetam ao recarregar página (aceitável para trabalho)
- **Sem backend:** Todas as validações acontecem no front
- **IA permitida:** Pode usar para gerar código durante desenvolvimento (mas **não** mencionar no relatório PDF)
- **Design Liquid Glass:** Mantém o padrão já definido no CLAUDE.md
