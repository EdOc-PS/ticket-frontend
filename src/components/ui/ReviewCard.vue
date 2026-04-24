<script setup lang="ts">
import { PhStar } from '@phosphor-icons/vue'

interface Review {
  eventId: number
  rating: number
  text: string
  date: string
}

interface Event {
  title: string
}

defineProps<{
  review: Review
  event?: Event
}>()
</script>

<template>
  <div class="bg-white rounded-3xl border border-neutral-100 p-5">
    <div class="flex items-start justify-between mb-3">
      <div>
        <h3 class="font-heading font-bold text-sm text-neutral-900">
          {{ event?.title ?? 'Evento removido' }}
        </h3>
        <p class="text-xs text-neutral-400 mt-0.5">{{ review.date }}</p>
      </div>
      <div class="flex items-center gap-0.5">
        <PhStar
          v-for="i in 5"
          :key="i"
          weight="duotone"
          :class="i <= review.rating ? 'text-yellow-400' : 'text-neutral-200'"
          :size="15"
        />
      </div>
    </div>
    <p class="text-sm text-neutral-600 leading-relaxed">
      {{ review.text }}
    </p>
  </div>
</template>
