<script setup lang="ts">
import { PhMapPin, PhHeart } from '@phosphor-icons/vue'

interface Event {
  id: number
  title: string
  location: string
  classification: string
  poster: string
}

defineProps<{ event: Event }>()
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
    @click="$emit('click')"
    class="bg-white rounded-3xl border border-neutral-100 p-4 flex items-center gap-4 cursor-pointer hover:border-blue-200 hover:bg-white transition-all duration-200 group"
  >
    <div class="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
      <img
        :src="event.poster"
        :alt="event.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-0.5">
        <span
          class="px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
          :class="classificationColor[event.classification] || 'bg-neutral-500'"
        >
          {{ event.classification }}
        </span>
        <h3 class="font-heading font-bold text-sm text-neutral-900 truncate">
          {{ event.title }}
        </h3>
      </div>
      <p class="text-xs text-neutral-500 flex items-center gap-1">
        <PhMapPin weight="duotone" :size="11" />
        {{ event.location }}
      </p>
    </div>
    <PhHeart weight="duotone" class="text-red-400 flex-shrink-0" :size="18" />
  </div>
</template>
