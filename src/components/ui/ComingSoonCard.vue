<script setup lang="ts">
interface Movie {
  id: number
  title: string
  genre: string
  releaseDate?: string
  poster: string
}

defineProps<{ movie: Movie }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <div
    class="shrink-0 w-44 snap-start cursor-pointer group"
    @click="$emit('click')"
  >
    <div class="relative rounded-xl overflow-hidden mb-3 aspect-2/3 bg-neutral-200">
      <img
        :src="movie.poster"
        :alt="movie.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 saturate-50 group-hover:saturate-100"
      />
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <!-- Release date badge -->
      <div class="absolute bottom-3 left-0 right-0 text-center">
        <span
          class="text-white text-xs font-bold tracking-wide px-2 py-1 rounded-full"
          style="background: rgba(255,255,255,0.2); backdrop-filter: blur(8px);"
        >{{ movie.releaseDate }}</span>
      </div>
    </div>

    <h3 class="font-heading font-bold text-sm text-neutral-900 leading-tight truncate">{{ movie.title }}</h3>
    <p class="text-xs text-neutral-500 mt-0.5">{{ movie.genre }}</p>
  </div>
</template>
