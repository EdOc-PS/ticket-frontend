<script setup lang="ts">
import { PhStar } from '@phosphor-icons/vue'

interface Movie {
  id: number
  title: string
  genre: string
  rating: string
  festival?: string
  poster: string
}

defineProps<{ movie: Movie }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <div
    class="shrink-0 w-52 snap-start cursor-pointer group"
    @click="$emit('click')"
  >
    <div class="relative rounded-xl overflow-hidden mb-3 aspect-2/3 bg-neutral-200">
      <img
        :src="movie.poster"
        :alt="movie.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      <!-- Rating badge (top right) -->
      <div class="absolute top-2 right-2">
        <div
          class="flex items-center gap-1 px-2 py-1 rounded-full"
          style="background: rgba(234,179,8,0.2); backdrop-filter: blur(8px); border: 1px solid rgba(234,179,8,0.4);"
        >
          <PhStar weight="duotone" class="text-yellow-400" :size="12" />
          <span class="text-yellow-400 text-xs font-bold">{{ movie.rating }}</span>
        </div>
      </div>

      <!-- Festival badge (bottom) -->
      <div class="absolute bottom-3 left-3 right-3">
        <span class="text-white/80 text-xs">🏆 {{ movie.festival }}</span>
      </div>
    </div>

    <h3 class="font-heading font-bold text-sm text-neutral-900 leading-tight truncate">{{ movie.title }}</h3>
    <p class="text-xs text-neutral-500 mt-0.5">{{ movie.genre }}</p>
  </div>
</template>
