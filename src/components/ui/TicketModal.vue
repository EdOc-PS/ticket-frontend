<script setup lang="ts">
import { computed } from 'vue'
import {
  PhX,
  PhMapPin,
  PhCalendar,
  PhClock,
  PhArmchair,
  PhShareNetwork,
  PhDownloadSimple,
  PhFilmSlate,
  PhCheckCircle,
} from '@phosphor-icons/vue'
import { getEventById } from '../../mocks/events'

interface Ticket {
  id: string
  eventId: number
  category: string
  seats: string[]
  price: number
  purchaseDate: Date
  qrCode: string
}

const props = defineProps<{
  ticket: Ticket | null
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const event = computed(() => props.ticket ? getEventById(props.ticket.eventId) : null)

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatPurchaseDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Gera padrão QR code baseado no ID do ingresso (SVG determinístico)
function qrPattern(id: string) {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const rows: boolean[][] = []
  for (let r = 0; r < 21; r++) {
    const row: boolean[] = []
    for (let c = 0; c < 21; c++) {
      // Cantos fixos (finder patterns)
      const corner = (
        (r < 7 && c < 7) ||
        (r < 7 && c >= 14) ||
        (r >= 14 && c < 7)
      )
      if (corner) {
        const inner = (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
                      (r >= 2 && r <= 4 && c >= 16 && c <= 18) ||
                      (r >= 16 && r <= 18 && c >= 2 && c <= 4)
        const border = (r === 0 || r === 6 || c === 0 || c === 6) ||
                       (r === 0 || r === 6 || c >= 14 && (c === 14 || c === 20)) ||
                       (r >= 14 && (r === 14 || r === 20) && (c === 0 || c === 6))
        row.push(inner || border || (r <= 6 && c <= 6) || (r <= 6 && c >= 14) || (r >= 14 && c <= 6))
      } else {
        row.push(((hash * (r + 1) * (c + 1) + r * 7 + c * 13) % 3) !== 0)
      }
    }
    rows.push(row)
  }
  return rows
}

const qrRows = computed(() => props.ticket ? qrPattern(props.ticket.id) : [])

const categoryColor: Record<string, string> = {
  normal: 'bg-neutral-600',
  vip: 'bg-blue-500',
  camarote: 'bg-yellow-500',
}

function handleShare() {
  if (navigator.share) {
    navigator.share({
      title: `Ingresso — ${event.value?.title}`,
      text: `Meu ingresso para ${event.value?.title} — ${props.ticket?.id}`,
    }).catch(() => {})
  }
}
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="open && ticket"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      style="background: rgba(0,0,0,0.5); backdrop-filter: blur(8px);"
      @click.self="emit('close')"
    >
      <Transition name="modal-slide">
        <div
          v-if="open"
          class="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden"
          style="box-shadow: 0 32px 80px rgba(0,0,0,0.25);"
        >

          <!-- Botão fechar -->
          <button
            @click="emit('close')"
            class="absolute cursor-pointer top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style="background: rgba(0,0,0,0.3); backdrop-filter: blur(8px);"
          >
            <PhX weight="bold" class="text-white" :size="15" />
          </button>

          <!-- Header: Poster do filme -->
          <div class="relative h-44 overflow-hidden">
            <img
              v-if="event?.poster"
              :src="event.poster"
              :alt="event.title"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-neutral-800 flex items-center justify-center">
              <PhFilmSlate weight="duotone" class="text-neutral-500" :size="48" />
            </div>

            <!-- Gradient overlay -->
            <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);" />

            <!-- Título sobre o poster -->
            <div class="absolute bottom-4 left-5 right-12">
              <span
                class="inline-block text-[10px] font-bold text-white px-1.5 py-0.5 rounded mb-1.5"
                :class="categoryColor[ticket.category] ?? 'bg-neutral-600'"
              >{{ ticket.category.toUpperCase() }}</span>
              <h2 class="font-heading font-bold text-white text-lg leading-tight">
                {{ event?.title ?? 'Evento' }}
              </h2>
            </div>
          </div>

          <!-- Separador estilo ticket perfurado -->
          <div class="relative flex items-center px-0 py-0 bg-white" style="height: 0;">
            <div class="absolute -left-3 w-6 h-6 rounded-full bg-[#f5f5f7]" />
            <div class="flex-1 mx-6 border-t-2 border-dashed border-neutral-200" style="margin-left: 24px; margin-right: 24px;" />
            <div class="absolute -right-3 w-6 h-6 rounded-full bg-[#f5f5f7]" />
          </div>

          <!-- Corpo do ingresso -->
          <div class="px-6 pt-5 pb-6">

            <!-- QR Code -->
            <div class="flex justify-center mb-5">
              <div class="p-3 bg-white rounded-2xl border border-neutral-100">
                <svg
                  :viewBox="`0 0 ${21 * 8} ${21 * 8}`"
                  class="w-36 h-36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect :width="21 * 8" :height="21 * 8" fill="white" />
                  <template v-for="(row, r) in qrRows" :key="r">
                    <template v-for="(cell, c) in row" :key="c">
                      <rect
                        v-if="cell"
                        :x="c * 8 + 1"
                        :y="r * 8 + 1"
                        :width="6"
                        :height="6"
                        :rx="1"
                        fill="#111111"
                      />
                    </template>
                  </template>
                </svg>
              </div>
            </div>

            <!-- ID do ingresso -->
            <p class="text-center text-xs font-mono text-neutral-400 mb-5 tracking-widest">
              {{ ticket.id }}
            </p>

            <!-- Detalhes -->
            <div class="space-y-3 mb-5">

              <div class="flex items-start gap-2.5">
                <PhCalendar weight="duotone" class="text-blue-400 mt-0.5 flex-shrink-0" :size="15" />
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Data do evento</p>
                  <p class="text-sm text-neutral-800 font-medium capitalize">
                    {{ event ? formatDate(event.date) : '—' }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-2.5">
                <PhClock weight="duotone" class="text-blue-400 mt-0.5 flex-shrink-0" :size="15" />
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Horário</p>
                  <p class="text-sm text-neutral-800 font-medium">{{ event?.time ?? '—' }}</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5">
                <PhMapPin weight="duotone" class="text-blue-400 mt-0.5 flex-shrink-0" :size="15" />
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Local</p>
                  <p class="text-sm text-neutral-800 font-medium">{{ event?.location ?? '—' }}</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5">
                <PhArmchair weight="duotone" class="text-blue-400 mt-0.5 flex-shrink-0" :size="15" />
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Assentos</p>
                  <div class="flex flex-wrap gap-1 mt-0.5">
                    <span
                      v-for="seat in ticket.seats"
                      :key="seat"
                      class="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[11px] font-mono font-semibold"
                    >{{ seat }}</span>
                  </div>
                </div>
              </div>

            </div>

            <!-- Total + status -->
            <div class="flex items-center justify-between py-3 px-4 bg-neutral-50 rounded-2xl mb-5">
              <div>
                <p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Total pago</p>
                <p class="font-heading font-bold text-lg text-neutral-900">R$ {{ ticket.price.toFixed(2) }}</p>
              </div>
              <div class="flex items-center gap-1.5 text-green-600">
                <PhCheckCircle weight="duotone" :size="18" />
                <span class="text-xs font-semibold">Confirmado</span>
              </div>
            </div>

            <!-- Comprado em -->
            <p class="text-center text-[10px] text-neutral-300 mb-4">
              Comprado em {{ formatPurchaseDate(ticket.purchaseDate) }}
            </p>

            <!-- Ações -->
            <div class="flex gap-2">
              <button
                @click="handleShare"
                class="flex-1 flex cursor-pointer items-center justify-center gap-1.5 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition-all duration-200 active:scale-[0.98]"
              >
                <PhShareNetwork weight="duotone" :size="15" />
                Compartilhar
              </button>
              <button
                class="flex-1 cursor-pointer flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-all duration-200 active:scale-[0.98]"
              >
                <PhDownloadSimple weight="duotone" :size="15" />
                Salvar
              </button>
            </div>

          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
}
</style>
