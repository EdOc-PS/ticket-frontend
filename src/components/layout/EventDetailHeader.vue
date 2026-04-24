<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  PhMagnifyingGlass,
  PhBell,
  PhUser,
  PhFilmSlate,
  PhCaretLeft,
} from '@phosphor-icons/vue'

const router = useRouter()
const isScrolled = ref(false)

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
}

const headerClass = computed(() => ({
  'backdrop-blur-lg': isScrolled.value,
  'bg-white/80': isScrolled.value,
  'shadow-sm': isScrolled.value,
}))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 flex justify-center px-6 pt-4 transition-all duration-300"
    :class="headerClass"
  >
    <nav
      class="w-full max-w-5xl flex items-center justify-between px-2 py-2"
    >
      <!-- Botão Voltar (Esquerda) -->
      <button
        @click="router.back()"
        class="flex items-center justify-center w-9 h-9 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
      >
        <PhCaretLeft weight="bold" :size="20" />
      </button>

      <!-- Logo CineTicket (Centro) -->
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <PhFilmSlate weight="duotone" class="text-white" :size="18" />
        </div>
        <span class="font-heading font-bold text-neutral-900 text-lg tracking-tight">CineTicket</span>
      </div>

      <!-- Ações (Direita) -->
      <div class="flex items-center gap-3">
        <button class="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-700 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200">
          <PhMagnifyingGlass weight="duotone" :size="20" />
        </button>
        <button class="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-700 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200">
          <PhBell weight="duotone" :size="20" />
        </button>
        <button class="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-blue-500 hover:text-white transition-all duration-200">
          <PhUser weight="duotone" :size="20" />
        </button>
      </div>
    </nav>
  </header>
</template>
