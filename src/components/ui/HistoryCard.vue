<script setup lang="ts">
import { PhTicket, PhFilmSlate, PhCheck } from '@phosphor-icons/vue'

interface Event {
  title: string
  poster: string
}

interface Ticket {
  id: string
  eventId: number
  category: string
  seats: string[]
  price: number
  purchaseDate: Date
  event?: Event
}

const props = defineProps<{
  ticket: Ticket
}>()

const emit = defineEmits<{
  viewTicket: [ticket: Ticket]
}>()

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="bg-white rounded-3xl border border-neutral-100 p-5">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
        <img
          v-if="ticket.event"
          :src="ticket.event.poster"
          :alt="ticket.event?.title"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <PhFilmSlate weight="duotone" :size="20" class="text-neutral-400" />
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="font-heading font-bold text-sm text-neutral-900">
              {{ ticket.event?.title ?? 'Evento removido' }}
            </h3>
            <p class="text-xs text-neutral-400 mt-0.5">
              {{ formatDate(ticket.purchaseDate) }}
            </p>
          </div>
          <span class="flex-shrink-0 text-sm font-bold text-neutral-900">
            R$ {{ ticket.price.toFixed(2) }}
          </span>
        </div>
        <div class="flex items-center gap-3 mt-3">
          <span class="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full font-medium">
            {{ ticket.category.toUpperCase() }}
          </span>
          <span class="text-xs text-neutral-500">{{ ticket.seats.join(', ') }}</span>
          <span class="ml-auto flex items-center gap-1 text-xs text-green-600 font-medium">
            <PhCheck weight="bold" :size="11" />
            Confirmado
          </span>
        </div>
      </div>
    </div>
    <div class="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
      <span class="text-xs text-neutral-400 font-mono">{{ ticket.id }}</span>
      <button
        @click="emit('viewTicket', ticket)"
        class="text-xs cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors flex items-center gap-1"
      >
        <PhTicket weight="duotone" :size="12" />
        Ver ingresso
      </button>
    </div>
  </div>
</template>
