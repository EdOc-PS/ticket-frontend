<script setup lang="ts">
import {
  PhFilmSlate,
  PhInstagramLogo,
  PhTwitterLogo,
  PhYoutubeLogo,
  PhFacebookLogo,
} from '@phosphor-icons/vue'
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
            <span class="font-heading font-bold text-white text-lg">CineTicket</span>
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

      <div class="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-neutral-500 text-sm">© 2026 CineTicket. Todos os direitos reservados.</p>
        <p class="text-neutral-600 text-xs">Feito com ❤️ para os amantes de cinema</p>
      </div>
    </div>
  </footer>
</template>
