# Sprint — Plataforma de Venda de Ingressos

**Data de entrega:** 04/05/2026  
**Status:** Fases 1-11 completas ✅ | Fases 12-13 pendentes 🎯

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

### Fase 3: Listagem de Eventos ✅
**Objetivo:** Exibir eventos disponíveis

- [x] Criar `Home.vue` (listagem de eventos)
  - [x] Slider de filmes destacados com navegação e autoplay
  - [x] Cards de filmes: Em Cartaz, Em Breve, Festivais
  - [x] Status visual de "Disponível" vs "Passado" vs "Em Breve"
  - [x] Links para detalhe do evento
- [x] Componentes `NowPlayingCard.vue`, `ComingSoonCard.vue`, `FestivalCard.vue`

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

### Fase 6: Pagamento Simulado ✅
**Objetivo:** Simular checkout e confirmação

- [x] Criar `Checkout.vue`
  - Resumo dos ingressos selecionados no sidebar (sticky)
  - 3 métodos de pagamento: PIX (QR Code), Cartão (crédito/débito), Boleto
  - Validação de campos do cartão
  - Estados: pagamento → processando → sucesso
  - Número de pedido gerado automaticamente (Heurística 1 & 9)
- [x] Salvar compra no mock de `tickets.ts`
- [x] Rota `/checkout` protegida por autenticação

### Fase 7: Perfil do Usuário ✅
**Objetivo:** Listar ingressos adquiridos

- [x] Criar `Profile.vue` (completo)
  - [x] Header do perfil com avatar, nome, email, data de membro
  - [x] Abas: Meus Dados, Favoritos, Avaliações, Histórico (Heurística 4)
  - [x] Histórico de ingressos com status de compra
  - [x] Botão "Ver ingresso" dispara modal com detalhes
  - [x] Estatísticas: ingressos, favoritos, avaliações
- [x] Componente `HistoryCard.vue` (card de ingresso no histórico)
- [x] Componente `FavoriteCard.vue` (filmes favoritos)
- [x] Componente `ReviewCard.vue` (avaliações do usuário)

### Fase 8: Ingresso Digital & QR-Code ✅
**Objetivo:** Exibir ingresso com QR-Code

- [x] Criar `TicketModal.vue` (modal com ingresso digital)
  - [x] Design de "cartão" de ingresso tipo cinema ticket
  - [x] Poster do filme + gradient overlay
  - [x] Separador perfurado (dashed line)
  - [x] QR-Code gerado dinamicamente (SVG) baseado no ID do ingresso
  - [x] Detalhes: data, horário, local, assentos, categoria, preço
  - [x] Botões: Compartilhar (Web Share API), Salvar (simulado)
  - [x] Status "Confirmado" com checkmark

### Fase 9: Componentes Auxiliares ✅
**Objetivo:** Criar componentes necessários para navegação e UX

- [x] Criar `Header.vue` (navbar principal)
  - [x] Logo clicável (navega para /home)
  - [x] Links de navegação (Filmes, Em Cartaz, Em Breve, Festivais)
  - [x] Busca com histórico de eventos
  - [x] Notificações (dropdown com lista)
  - [x] Menu de perfil (Ver perfil, Favoritos, Sair)
  - [x] Logout modal
- [x] Criar `EventDetailHeader.vue` (header alternativo para detalhes)
  - [x] Botão voltar (caret left)
  - [x] Logo clicável
  - [x] Notificações, Perfil, Logout
- [x] Atualizar `Footer.vue`
  - [x] Links de navegação
  - [x] Suporte, Legal, Redes sociais
  - [x] Copyright com branding
- [x] Componente `NotificationDropdown.vue` (notificações reutilizável)
- [x] Componente `LogoutModal.vue` (confirmação de logout)

### Fase 10: Heurísticas de Nielsen ⚠️ (Parcialmente)
**Objetivo:** Validar e aplicar as 10 heurísticas em toda a interface

- [x] **H1 - Visibilidade do status:** ✅
  - [x] Spinner de processamento no checkout (estado "processando")
  - [x] Status de cada passo visual (payment → processing → success)
  - [x] Feedback visual de ações (botões com hover/active/disabled)
  - [x] Assentos mudam cor ao selecionar (azul)

- [x] **H2 - Compatibilidade com mundo real:** ✅
  - [x] Termos corretos: "Cinema", "Assentos", "Ingresso", "QR-Code", "Ingressos"
  - [x] Fluxo real: evento → categoria → assento → pagamento → ingresso
  - [x] Nomes realistas de cinemas e filmes

- [x] **H3 - Controle e liberdade:** ✅
  - [x] Botão "Voltar" em EventDetailHeader
  - [x] Possibilidade de deselecionar assentos (clique para toggle)
  - [x] Voltar por clique na logo

- [x] **H4 - Consistência e padrões:** ✅
  - [x] Design Liquid Glass em toda app
  - [x] Mesmos botões (blue primary, ghost secondary)
  - [x] Tipografia consistente (Inter body, Manrope headings)
  - [x] Cores neutras e azul primário
  - [x] Layouts com header/footer consistentes

- [x] **H5 - Prevenção de erros:** ✅
  - [x] Validação de email e senha no Login
  - [x] Botão "Continuar" desabilitado se nenhum assento selecionado
  - [x] Validação de campos do cartão em tempo real
  - [x] Spinner no checkout confirma intenção

- [x] **H6 - Reconhecimento vs memorização:** ✅
  - [x] Ícones claros (PhUser, PhHeart, PhTicket, PhMapPin, etc)
  - [x] Labels explícitos em todos os botões
  - [x] Status visual óbvio (assento cinza=ocupado, branco=livre, azul=selecionado)

- [x] **H7 - Flexibilidade e eficiência:** ✅
  - [x] "Lembrar-me" funcional na autenticação (localStorage)
  - [x] Busca rápida de filmes no header
  - [x] Links de navegação rápida (logo, menu)
  - [ ] Atalhos de teclado (Enter, Esc) — TODO

- [x] **H8 - Design estético e minimalista:** ✅
  - [x] Liquid Glass em todo projeto
  - [x] Cores neutras + azul primário
  - [x] Espaço em branco generoso
  - [x] Sem elementos decorativos desnecessários
  - [x] Sombras removidas para minimalismo

- [x] **H9 - Ajudar na recuperação de erros:** ✅
  - [x] Mensagens de erro em português claro
  - [x] Email/senha inválidos com feedback
  - [x] Assentos indisponíveis bloqueados visualmente
  - [x] Modal de sucesso com número de pedido

- [ ] **H10 - Ajuda e documentação:**
  - [ ] Tooltips em mapa de assentos
  - [ ] FAQ no footer (opcional)
  - [x] Descrições de categorias de ingresso claras

### Fase 11: Responsividade ✅ (COMPLETA)
**Objetivo:** Funcionar bem em mobile e desktop

- [x] Testar em mobile (iPhone SE, 375px) — Responsivo e funcional
- [x] Testar em tablet (iPad, 768px) — Responsivo e funcional
- [x] Testar em desktop (1280px) — Responsivo e funcional
- [x] Ajustar layout de mapa de assentos para mobile (scroll horizontal se necessário) — Otimizado com overflow-x-auto
- [x] Botões com tamanho adequado (min 44x44px em mobile) — Todos os botões agora com min-h-[44px]
- [x] Verificar breakpoints Tailwind (sm, md, lg) — Aplicados em todas as páginas

**Mudanças implementadas:**
- Home.vue: Hero ajustado para mobile (h-[70vh] → h-[90vh]), text responsivo, botões 44px+
- EventDetail.vue: Padding responsivo (px-4 md:px-8), categoria e assentos otimizados
- Checkout.vue: Layout responsivo, botões com tamanho mínimo, promo card adaptável
- Profile.vue: Sidebar transformada em full-width em mobile (lg:w-64), tabs responsivos
- Todas as páginas: Tipografia escalonada, gaps responsivos, controls acessíveis

### Fase 12: Testes & Polimento ❌ (NÃO INICIADA)
**Objetivo:** Garantir qualidade antes de entregar

- [ ] Testar fluxo completo: login → escolher evento → assentos → pagamento → perfil → ingresso
- [ ] Verificar sem console.log no código final
- [ ] Verificar TypeScript sem `any` explícito
- [ ] Performance: nenhuma tela lenta
- [ ] Acessibilidade: teclado navegável (Tab funciona)
- [ ] Validar formulários em todos os estados
- [ ] Teste cross-browser (Chrome, Firefox, Safari)

### Fase 13: Documentação & Entrega ❌ (NÃO INICIADA)
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
