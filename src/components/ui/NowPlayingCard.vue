<script setup lang="ts">
import { PhStar } from '@phosphor-icons/vue'

interface Movie {
  id: number
  title: string
  genre: string
  rating: string
  classification: string
  poster: string
}

defineProps<{ movie: Movie }>()
defineEmits<{ click: [] }>()

const classificationColor: Record<string, string> = {
  L: 'bg-green-500',
  '10': 'bg-blue-500',
  '12': 'bg-yellow-500',
  '14': 'bg-orange-500',
  '16': 'bg-red-500',
  '18': 'bg-red-800',
}
</script>

<template>
  <div
    class="shrink-0 w-44 snap-start cursor-pointer group"
    @click="$emit('click')"
  >
    <div class="relative rounded-3xl overflow-hidden mb-3 aspect-2/3 bg-neutral-200">
      <img
        :src="movie.poster"
        :alt="movie.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <!-- Gradient hover overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <!-- Classification badge -->
      <div class="absolute top-2 left-2">
        <span
          class="px-1.5 py-0.5 rounded text-xs font-bold text-white"
          :class="classificationColor[movie.classification] || 'bg-neutral-500'"
        >{{ movie.classification }}</span>
      </div>

      <!-- Buy button on hover -->
      <div class="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button class="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors">
          Comprar
        </button>
      </div>
    </div>

    <h3 class="font-heading font-bold text-sm text-neutral-900 leading-tight truncate">{{ movie.title }}</h3>
    <p class="text-xs text-neutral-500 mt-0.5">{{ movie.genre }}</p>
    <div class="flex items-center gap-1 mt-1">
      <PhStar weight="duotone" class="text-yellow-400" :size="12" />
      <span class="text-xs text-neutral-600 font-medium">{{ movie.rating }}</span>
    </div>
  </div>
</template>
