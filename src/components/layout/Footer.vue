<script setup lang="ts">
import { ref } from 'vue'
import {
  PhFilmSlate,
  PhInstagramLogo,
  PhTwitterLogo,
  PhYoutubeLogo,
  PhFacebookLogo,
  PhCaretDown,
} from '@phosphor-icons/vue'

const faqs = [
  { q: 'Como compro ingressos?', a: 'Selecione um filme, escolha a categoria de ingresso, selecione seus assentos e realize o pagamento. Seus ingressos aparecem no perfil!' },
  { q: 'Posso trocar meu ingresso?', a: 'Entre em contato com nosso suporte. Trocas são permitidas se houver sessões disponíveis.' },
  { q: 'Quais são os métodos de pagamento?', a: 'Aceitamos PIX, Cartão de Crédito/Débito e Boleto. Todos os pagamentos são seguros e criptografados.' },
  { q: 'Meu ingresso é digital?', a: 'Sim! Você recebe um QR-Code que pode usar diretamente no seu celular no cinema.' },
  { q: 'Posso compartilhar meu ingresso?', a: 'Sim, você pode compartilhar seu ingresso digital através de qualquer aplicativo de mensagem.' },
]

const openFaq = ref<number | null>(null)
</script>

<template>
  <footer class="bg-neutral-950 text-white">
    <div class="max-w-5xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div class="md:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <PhFilmSlate weight="duotone" class="text-white" :size="18" />
            </div>
            <span class="font-heading font-bold text-white text-lg">Cinematica</span>
          </div>
          <p class="text-neutral-400 text-sm leading-relaxed">
            A melhor plataforma para comprar ingressos de cinema com comodidade e segurança.
          </p>
          <div class="flex items-center gap-3 mt-6">
            <a href="#" class="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-blue-500 hover:text-white transition-all duration-200">
              <PhInstagramLogo weight="duotone" :size="18" />
            </a>
            <a href="#" class="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-blue-500 hover:text-white transition-all duration-200">
              <PhTwitterLogo weight="duotone" :size="18" />
            </a>
            <a href="#" class="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-red-500 hover:text-white transition-all duration-200">
              <PhYoutubeLogo weight="duotone" :size="18" />
            </a>
            <a href="#" class="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-blue-600 hover:text-white transition-all duration-200">
              <PhFacebookLogo weight="duotone" :size="18" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-heading font-bold text-sm text-white mb-4 uppercase tracking-wide">Filmes</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Em Cartaz</a></li>
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Em Breve</a></li>
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Festivais</a></li>
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Mais Bem Avaliados</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-heading font-bold text-sm text-white mb-4 uppercase tracking-wide">Suporte</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Central de Ajuda</a></li>
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Meus Ingressos</a></li>
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Política de Reembolso</a></li>
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Fale Conosco</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-heading font-bold text-sm text-white mb-4 uppercase tracking-wide">Legal</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Termos de Uso</a></li>
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Privacidade</a></li>
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Cookies</a></li>
            <li><a href="#" class="text-sm text-neutral-400 hover:text-white transition-colors duration-200">Acessibilidade</a></li>
          </ul>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="border-t border-neutral-800 pt-12 mb-12">
        <h3 class="font-heading font-bold text-xl text-white mb-6">Perguntas Frequentes</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            v-for="(faq, index) in faqs"
            :key="index"
            @click="openFaq = openFaq === index ? null : index"
            class="text-left bg-neutral-900 rounded-lg p-4 hover:bg-neutral-800 transition-colors duration-200"
          >
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-semibold text-white">{{ faq.q }}</p>
              <PhCaretDown
                weight="bold"
                :size="16"
                class="text-neutral-400 flex-shrink-0 transition-transform duration-200"
                :style="{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }"
              />
            </div>
            <Transition name="faq">
              <p v-if="openFaq === index" class="text-xs text-neutral-400 mt-3 leading-relaxed">
                {{ faq.a }}
              </p>
            </Transition>
          </button>
        </div>
      </div>

      <div class="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-neutral-500 text-sm">© 2026 Cinematica. Todos os direitos reservados.</p>
        <p class="text-neutral-600 text-xs">Feito com ❤️ para os amantes de cinema</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.faq-enter-active,
.faq-leave-active {
  transition: opacity 0.2s ease, max-height 0.2s ease;
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  max-height: 0;
}

.faq-enter-to,
.faq-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
