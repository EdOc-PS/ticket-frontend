<script setup lang="ts">
import {
  PhMagnifyingGlass,
  PhBell,
  PhUser,
  PhFilmSlate,
} from '@phosphor-icons/vue'
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-4">
    <nav
      class="w-full max-w-5xl flex items-center justify-between px-2 py-2 rounded-full"
      style="background: rgba(255,255,255,0.5); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 4px 24px rgba(0,0,0,0.08);"
    >
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <PhFilmSlate weight="duotone" class="text-white" :size="18" />
        </div>
        <span class="font-heading font-bold text-neutral-900 text-lg tracking-tight">CineTicket</span>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <router-link to="/home#inicio" class="text-sm text-neutral-800 font-medium hover:text-blue-500 transition-colors duration-200">Filmes</router-link>
        <router-link to="/home#em-cartaz" class="text-sm text-neutral-800 hover:text-blue-500 transition-colors duration-200">Em Cartaz</router-link>
        <router-link to="/home#em-breve" class="text-sm text-neutral-800 hover:text-blue-500 transition-colors duration-200">Em Breve</router-link>
        <router-link to="/home#festivais" class="text-sm text-neutral-800 hover:text-blue-500 transition-colors duration-200">Festivais</router-link>
      </div>

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
