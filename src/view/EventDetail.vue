<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  PhCaretLeft,
  PhCaretRight,
  PhMapPin,
  PhClock,
  PhCalendar,
  PhFilmSlate,
  PhStar,
  PhTicket,
  PhArmchair,
  PhWarning,
} from '@phosphor-icons/vue'
import { getEventById } from '../mocks/events'
import { getSeatMapByEventId } from '../mocks/seats'
import type { Event } from '../mocks/events'
import type { Seat } from '../mocks/seats'
import EventDetailHeader from '../components/layout/EventDetailHeader.vue'
import Footer from '../components/layout/Footer.vue'

const route = useRoute()
const router = useRouter()

const event = ref<Event | null>(null)
const seatMapData = ref(getSeatMapByEventId(0))
const selectedSeats = ref<string[]>([])
const selectedCategory = ref<string>('')
const showSeatMap = ref(false)

// Slide
const currentSlide = ref(0)
const currentCommentSlide = ref(0)
const slides = computed(() => {
  if (!event.value) return []
  return [event.value.poster, event.value.poster, event.value.poster]
})

const comments = ref([
  {
    id: 1,
    author: 'Maria Silva',
    rating: 5,
    text: 'Filme incrível! A cinematografia é de tirar o fôlego. Recomendo muito!',
    date: '2 dias atrás'
  },
  {
    id: 2,
    author: 'João Santos',
    rating: 4,
    text: 'Muito bom, história envolvente do início ao fim. Apenas alguns momentos lentos no meio.',
    date: '5 dias atrás'
  },
  {
    id: 3,
    author: 'Ana Costa',
    rating: 5,
    text: 'Perfeito! Emocionante, bem dirigido e com um elenco impecável. Merece todos os prêmios!',
    date: '1 semana atrás'
  },
  {
    id: 4,
    author: 'Pedro Oliveira',
    rating: 4,
    text: 'Gostei bastante. Alguns efeitos visuais são impressionantes, mas o final deixou a desejar.',
    date: '1 semana atrás'
  },
  {
    id: 5,
    author: 'Lucia Ferreira',
    rating: 5,
    text: 'Um dos melhores filmes que já vi! Voltaria a assistir novamente com os olhos fechados.',
    date: '2 semanas atrás'
  }
])

const averageRating = computed(() => {
  if (comments.value.length === 0) return 0
  const sum = comments.value.reduce((acc, c) => acc + c.rating, 0)
  return parseFloat((sum / comments.value.length).toFixed(1))
})

const eventStatus = computed(() => {
  if (!event.value) return 'current'
  const eventDate = new Date(event.value.date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (eventDate < today) return 'past'

  const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  // Eventos com mais de 45 dias são considerados "Em Breve" (lançamentos futuros)
  if (daysUntil > 45) return 'coming-soon'

  return 'current'
})

const isAvailable = computed(() => eventStatus.value !== 'past')

// Comentário do usuário
const userRating = ref(5)
const userComment = ref('')
const showCommentForm = ref(false)

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

function prevCommentSlide() {
  currentCommentSlide.value = (currentCommentSlide.value - 1 + comments.value.length) % comments.value.length
}
function nextCommentSlide() {
  currentCommentSlide.value = (currentCommentSlide.value + 1) % comments.value.length
}

function submitComment() {
  if (!userComment.value.trim()) return

  const newComment = {
    id: Math.max(...comments.value.map(c => c.id), 0) + 1,
    author: 'Você',
    rating: userRating.value,
    text: userComment.value,
    date: 'Agora'
  }

  comments.value.unshift(newComment)
  userComment.value = ''
  userRating.value = 5
  showCommentForm.value = false
}

const formattedDate = computed(() => {
  if (!event.value) return ''
  const date = new Date(event.value.date)
  return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
})

const classificationColor: Record<string, string> = {
  L: 'bg-green-500',
  '10': 'bg-blue-500',
  '12': 'bg-yellow-500',
  '14': 'bg-orange-500',
  '16': 'bg-red-500',
  '18': 'bg-red-800',
}

const classificationLabel: Record<string, string> = {
  L: 'Livre para todos os públicos',
  '10': 'Não recomendado para menores de 10 anos',
  '12': 'Não recomendado para menores de 12 anos',
  '14': 'Não recomendado para menores de 14 anos',
  '16': 'Não recomendado para menores de 16 anos',
  '18': 'Não recomendado para menores de 18 anos',
}

const minPrice = computed(() => {
  if (!event.value) return 0
  return Math.min(...event.value.categories.map(c => c.price))
})

const totalPrice = computed(() => {
  if (!event.value || !selectedCategory.value) return 0
  const cat = event.value.categories.find(c => c.id === selectedCategory.value)
  return (cat?.price ?? 0) * selectedSeats.value.length
})

function getSeatClass(seat: Seat): string {
  if (seat.status === 'occupied') return 'bg-neutral-200 cursor-not-allowed border-neutral-300'
  if (selectedSeats.value.includes(seat.seatNumber)) return 'bg-blue-500 border-blue-600 text-white cursor-pointer'
  if (selectedCategory.value && seat.category !== selectedCategory.value) return 'bg-neutral-100 cursor-not-allowed border-neutral-200 opacity-40'
  return 'bg-white border-neutral-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
}

function toggleSeat(seat: Seat) {
  if (seat.status === 'occupied') return
  if (selectedCategory.value && seat.category !== selectedCategory.value) return
  const idx = selectedSeats.value.indexOf(seat.seatNumber)
  if (idx === -1) {
    selectedSeats.value.push(seat.seatNumber)
  } else {
    selectedSeats.value.splice(idx, 1)
  }
}

function selectCategory(catId: string) {
  if (selectedCategory.value === catId) return
  selectedCategory.value = catId
  selectedSeats.value = []
}

function openSeatMap() {
  showSeatMap.value = true
  setTimeout(() => {
    document.getElementById('seat-map')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function proceedToCheckout() {
  if (selectedSeats.value.length === 0) return
  router.push({
    path: '/checkout',
    query: {
      eventId: event.value!.id,
      seats: selectedSeats.value.join(','),
      category: selectedCategory.value,
    }
  })
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    showSeatMap.value = false
    showCommentForm.value = false
  }
}

onMounted(() => {
  const id = Number(route.params.id)
  event.value = getEventById(id) ?? null
  if (event.value) {
    seatMapData.value = getSeatMapByEventId(id)
    selectedCategory.value = event.value.categories[0]?.id ?? ''
  }
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f7]">
    <EventDetailHeader />

    <div v-if="event" class="pt-20">

      <!-- Alert para eventos não disponíveis -->
      <div v-if="!isAvailable" class="max-w-5xl mx-auto px-6 mb-6 animate-fade-in-up stagger-1">
        <div class="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <PhWarning weight="duotone" class="text-red-500 flex-shrink-0 mt-0.5" :size="20" />
          <div>
            <p class="font-semibold text-red-900 text-sm">Este evento já ocorreu</p>
            <p class="text-red-700 text-xs mt-0.5">Infelizmente não é possível comprar ingressos para sessões passadas.</p>
          </div>
        </div>
      </div>

      <!-- Alert para eventos em breve -->
      <div v-if="eventStatus === 'coming-soon'" class="max-w-5xl mx-auto px-6 mb-6 animate-fade-in-up stagger-1">
        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
          <PhCalendar weight="duotone" class="text-blue-500 flex-shrink-0 mt-0.5" :size="20" />
          <div>
            <p class="font-semibold text-blue-900 text-sm">Estreia em breve!</p>
            <p class="text-blue-700 text-xs mt-0.5">Ingressos serão disponibilizados em breve. Fique atento!</p>
          </div>
        </div>
      </div>

      <!-- Slide de imagens -->
      <section class="max-w-5xl mx-auto px-6 mb-8 animate-fade-in-up stagger-2">
        <div class="relative w-full h-[420px] rounded-3xl overflow-hidden bg-neutral-200" :class="{ 'opacity-60': !isAvailable }">
          <transition-group name="fade">
            <img
              v-for="(src, i) in slides"
              :key="i"
              v-show="currentSlide === i"
              :src="src"
              :alt="event.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </transition-group>

          <!-- Gradient bottom -->
          <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          <!-- Título sobre o slide -->
          <div class="absolute bottom-6 left-8">
            <span
              class="inline-block px-2 py-0.5 rounded text-xs font-bold text-white mb-2"
              :class="classificationColor[event.classification] ?? 'bg-neutral-500'"
            >{{ event.classification }}</span>
            <h1 class="font-heading text-4xl font-bold text-white drop-shadow-lg">{{ event.title }}</h1>
          </div>

          <!-- Controles -->
          <button
            @click="prevSlide"
            :disabled="!isAvailable"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style="background:rgba(255,255,255,0.2);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.3)"
          >
            <PhCaretLeft weight="bold" class="text-white" :size="18" />
          </button>
          <button
            @click="nextSlide"
            :disabled="!isAvailable"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style="background:rgba(255,255,255,0.2);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.3)"
          >
            <PhCaretRight weight="bold" class="text-white" :size="18" />
          </button>

          <!-- Dots -->
          <div class="absolute bottom-6 right-6 flex gap-1.5">
            <button
              v-for="(_, i) in slides"
              :key="i"
              @click="currentSlide = i"
              class="rounded-full transition-all duration-300"
              :class="currentSlide === i ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50'"
            />
          </div>
        </div>
      </section>

      <!-- Cards informativos -->
      <section class="max-w-5xl mx-auto px-6 mb-8 animate-fade-in-up stagger-3">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

          <!-- Sinopse -->
          <div class="md:col-span-2 glass-panel rounded-2xl p-6">
            <div class="flex items-center gap-2 mb-3">
              <PhFilmSlate weight="duotone" :size="18" class="text-blue-500" />
              <span class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Sinopse</span>
            </div>
            <p class="text-neutral-700 text-sm leading-relaxed">{{ event.description }}</p>
            <div class="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100">
              <div class="flex items-center gap-1.5 text-xs text-neutral-500">
                <PhClock weight="duotone" :size="14" class="text-neutral-400" />
                {{ event.duration }}
              </div>
              <div class="flex items-center gap-1.5 text-xs text-neutral-500">
                <PhStar weight="duotone" :size="14" class="text-yellow-400" />
                Muito bom
              </div>
            </div>
          </div>

          <!-- Faixa etária -->
          <div class="glass-panel rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <PhWarning weight="duotone" :size="18" class="text-blue-500" />
                <span class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Classificação</span>
              </div>
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-heading font-bold text-xl mb-3"
                :class="classificationColor[event.classification] ?? 'bg-neutral-500'"
              >
                {{ event.classification }}
              </div>
              <p class="text-neutral-600 text-xs leading-relaxed">
                {{ classificationLabel[event.classification] ?? 'Classificação indicativa' }}
              </p>
            </div>
          </div>

          <!-- Sala de exibição -->
          <div class="glass-panel rounded-2xl p-6">
            <div class="flex items-center gap-2 mb-3">
              <PhMapPin weight="duotone" :size="18" class="text-blue-500" />
              <span class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Sala</span>
            </div>
            <p class="font-heading font-bold text-neutral-900 text-base">{{ event.location }}</p>
            <p class="text-xs text-neutral-500 mt-1">Capacidade: {{ event.totalSeats }} lugares</p>
            <div class="mt-4 pt-4 border-t border-neutral-100">
              <div class="flex gap-3 text-xs text-neutral-500 flex-wrap">
                <span v-for="cat in event.categories" :key="cat.id" class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full"
                    :class="cat.id === 'normal' ? 'bg-neutral-400' : cat.id === 'vip' ? 'bg-blue-400' : 'bg-yellow-400'"
                  />
                  {{ cat.name }}: R$ {{ cat.price }}
                </span>
              </div>
            </div>
          </div>

          <!-- Horário -->
          <div class="glass-panel rounded-2xl p-6">
            <div class="flex items-center gap-2 mb-3">
              <PhCalendar weight="duotone" :size="18" class="text-blue-500" />
              <span class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Horário</span>
            </div>
            <p class="font-heading font-bold text-neutral-900 text-2xl">{{ event.time }}</p>
            <p class="text-xs text-neutral-500 mt-1 capitalize">{{ formattedDate }}</p>
            <div class="mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
              Duração aproximada: <span class="font-medium text-neutral-700">{{ event.duration }}</span>
            </div>
          </div>

          <!-- Ingressos / CTA -->
          <div class="glass-panel rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <PhTicket weight="duotone" :size="18" class="text-blue-500" />
                <span class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Ingressos</span>
              </div>
              <p class="text-neutral-500 text-xs mb-3">A partir de</p>
              <p class="font-heading font-bold text-3xl text-neutral-900">R$ {{ minPrice }}</p>
              <p class="text-xs text-neutral-500 mt-1">{{ event.categories.length }} categorias disponíveis</p>
            </div>
            <button
              @click="openSeatMap"
              :disabled="!isAvailable"
              class="mt-6 w-full py-3 px-4 bg-red-500 hover:bg-red-600 disabled:bg-neutral-300 disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <PhArmchair weight="duotone" :size="18" />
              {{ eventStatus === 'coming-soon' ? 'Em Breve' : eventStatus === 'past' ? 'Indisponível' : 'Comprar Ingresso' }}
            </button>
          </div>

        </div>
      </section>

      <!-- Mapa de assentos -->
      <section
        v-if="showSeatMap && seatMapData && isAvailable"
        id="seat-map"
        class="max-w-5xl mx-auto px-6 mb-12 animate-fade-in-up stagger-4"
      >
        <div class="glass-panel rounded-2xl overflow-hidden">

          <!-- Topo do mapa -->
          <div class="px-4 md:px-8 py-4 md:py-6 border-b border-neutral-100">
            <h2 class="font-heading text-lg md:text-xl font-bold text-neutral-900">Escolha seus assentos</h2>
            <p class="text-xs md:text-sm text-neutral-500 mt-1">Selecione a categoria e depois clique nos assentos desejados</p>
          </div>

          <!-- Seleção de categoria -->
          <div class="px-4 md:px-8 py-3 md:py-5 border-b border-neutral-100 flex flex-wrap gap-2 md:gap-3">
            <button
              v-for="cat in event.categories"
              :key="cat.id"
              @click="selectCategory(cat.id)"
              class="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg md:rounded-xl border text-xs md:text-sm font-medium transition-all duration-200 min-h-[44px]"
              :class="selectedCategory === cat.id
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'bg-white border-neutral-200 text-neutral-600 hover:border-blue-300'"
            >
              <span
                class="w-2.5 h-2.5 rounded-full flex-shrink-0"
                :class="cat.id === 'normal' ? 'bg-neutral-400' : cat.id === 'vip' ? 'bg-blue-300' : 'bg-yellow-400'"
                :style="selectedCategory === cat.id ? 'background:white' : ''"
              />
              <span class="whitespace-nowrap">{{ cat.name }} — R$ {{ cat.price }}</span>
              <span class="text-xs opacity-70 hidden md:inline">({{ cat.available }} disp.)</span>
            </button>
          </div>

          <!-- Tela do cinema -->
          <div class="px-4 md:px-8 pt-6 md:pt-8">
            <div class="relative flex justify-center mb-6 md:mb-8">
              <div class="w-2/3 h-2 rounded-full bg-linear-to-r from-transparent via-neutral-300 to-transparent" />
              <span class="absolute -bottom-5 text-xs text-neutral-400 tracking-widest uppercase">Tela</span>
            </div>
          </div>

          <!-- Grade de assentos -->
          <div class="px-3 md:px-8 pb-6 md:pb-8 overflow-x-auto">
            <div class="inline-block min-w-full">
              <div
                v-for="row in seatMapData.rows"
                :key="row.row"
                class="flex items-center gap-1 md:gap-1.5 mb-1 md:mb-1.5"
              >
                <span class="w-4 md:w-5 text-xs font-mono text-neutral-400 text-center shrink-0">{{ row.row }}</span>
                <div class="flex gap-1 md:gap-1.5">
                  <button
                    v-for="seat in row.seats"
                    :key="seat.seatNumber"
                    @click="toggleSeat(seat)"
                    :disabled="seat.status === 'occupied'"
                    :title="seat.status === 'occupied' ? 'Ocupado' : seat.seatNumber"
                    class="w-7 h-7 md:w-8 md:h-8 rounded-md border text-[10px] font-mono transition-all duration-150 flex items-center justify-center hover:scale-110"
                    :class="getSeatClass(seat)"
                  >
                    <span v-if="selectedSeats.includes(seat.seatNumber)">✓</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Legenda + resumo -->
          <div class="px-4 md:px-8 py-4 md:py-6 border-t border-neutral-100 bg-neutral-50 flex flex-col gap-4">
            <div class="flex items-center gap-3 md:gap-5 flex-wrap text-xs text-neutral-500">
              <span class="flex items-center gap-1">
                <span class="w-4 h-4 md:w-5 md:h-5 rounded-md bg-white border border-neutral-300 inline-block" />
                <span class="hidden md:inline">Disponível</span>
              </span>
              <span class="flex items-center gap-1">
                <span class="w-4 h-4 md:w-5 md:h-5 rounded-md bg-blue-500 inline-block" />
                <span class="hidden md:inline">Selecionado</span>
              </span>
              <span class="flex items-center gap-1">
                <span class="w-4 h-4 md:w-5 md:h-5 rounded-md bg-neutral-200 inline-block" />
                <span class="hidden md:inline">Ocupado</span>
              </span>
            </div>

            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
              <div class="text-left md:text-right w-full md:w-auto">
                <p class="text-xs text-neutral-500">
                  {{ selectedSeats.length }} assento(s) · {{ event.categories.find(c => c.id === selectedCategory)?.name }}
                </p>
                <p class="font-heading font-bold text-base md:text-lg text-neutral-900">R$ {{ totalPrice.toFixed(2) }}</p>
              </div>
              <button
                @click="proceedToCheckout"
                :disabled="selectedSeats.length === 0"
                class="w-full md:w-auto px-4 md:px-6 py-3 md:py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm md:text-base rounded-lg md:rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 min-h-[44px]"
              >
                <PhTicket weight="duotone" :size="16" />
                <span>Continuar</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>

    <!-- Estado de erro: evento não encontrado -->
    <div v-if="!event" class="flex flex-col items-center justify-center min-h-[70vh] px-6 animate-fade-in-up stagger-1">
      <div class="text-center max-w-sm">
        <div class="w-20 h-20 rounded-3xl bg-neutral-100 flex items-center justify-center mx-auto mb-6">
          <PhFilmSlate weight="duotone" class="text-neutral-300" :size="40" />
        </div>
        <h2 class="font-heading font-bold text-2xl text-neutral-900 mb-2">Evento não encontrado</h2>
        <p class="text-neutral-500 text-sm leading-relaxed mb-8">O evento que você está procurando não existe ou foi removido da programação.</p>
        <button
          @click="router.back()"
          class="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all duration-200"
        >
          <PhCaretLeft weight="bold" :size="16" />
          Voltar
        </button>
      </div>
    </div>

    <!-- Formulário para escrever comentário -->
    <section v-if="event && eventStatus !== 'coming-soon' && eventStatus !== 'past'" class="max-w-5xl mx-auto px-6 mb-16 animate-fade-in-up stagger-5">
      <div class="glass-panel rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-heading text-xl font-bold text-neutral-900">Compartilhe sua avaliação</h2>
          <button
            v-if="showCommentForm"
            @click="showCommentForm = false"
            class="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            Cancelar
          </button>
        </div>

        <div v-if="!showCommentForm" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
            <PhUser weight="duotone" :size="18" class="text-neutral-500" />
          </div>
          <button
            @click="showCommentForm = true"
            class="flex-1 text-left px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-500 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-sm"
          >
            O que você achou deste filme?
          </button>
        </div>

        <div v-if="showCommentForm" class="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <!-- Rating -->
          <div class="flex items-center gap-3">
            <span class="text-xs font-medium text-neutral-600">Sua avaliação:</span>
            <div class="flex items-center gap-1">
              <button
                v-for="i in 5"
                :key="i"
                @click="userRating = i"
                class="transition-transform duration-150 hover:scale-110"
              >
                <PhStar
                  weight="duotone"
                  :class="i <= userRating ? 'text-yellow-400' : 'text-neutral-300'"
                  :size="20"
                />
              </button>
            </div>
          </div>

          <!-- Textarea -->
          <textarea
            v-model="userComment"
            @keydown.ctrl.enter="submitComment"
            placeholder="Compartilhe sua experiência com este filme... (Ctrl+Enter para enviar)"
            class="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 resize-none"
            rows="4"
          />

          <!-- Botão Enviar -->
          <div class="flex justify-end">
            <button
              @click="submitComment"
              :disabled="!userComment.trim()"
              class="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              Publicar avaliação
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Avaliações e comentários -->
    <section v-if="event && eventStatus !== 'coming-soon' && eventStatus !== 'past'" class="max-w-5xl mx-auto px-6 mb-16 animate-fade-in-up stagger-6">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="font-heading text-2xl font-bold text-neutral-900">Avaliações e comentários</h2>
          <p class="text-sm text-neutral-500 mt-1">O que os espectadores acharam deste filme</p>
        </div>
        <div class="text-right">
          <div class="flex items-center gap-1.5">
            <div class="flex items-center gap-0.5">
              <PhStar
                v-for="i in 5"
                :key="i"
                weight="duotone"
                :class="i <= Math.round(averageRating) ? 'text-yellow-400' : 'text-neutral-300'"
                :size="18"
              />
            </div>
          </div>
          <p class="font-heading font-bold text-lg text-neutral-900 mt-0.5">{{ averageRating }}</p>
          <p class="text-xs text-neutral-500">{{ comments.length }} avaliações</p>
        </div>
      </div>

      <div class="relative">
        <!-- Slider de comentários -->
        <div class="overflow-hidden">
          <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentCommentSlide * 100}%)` }">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="w-full shrink-0 px-4"
            >
              <div class="glass-panel rounded-2xl p-6">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <p class="font-heading font-bold text-neutral-900">{{ comment.author }}</p>
                    <p class="text-xs text-neutral-500 mt-0.5">{{ comment.date }}</p>
                  </div>
                  <div class="flex  items-center gap-0.5">
                    <PhStar
                      v-for="i in 5"
                      :key="i"
                      weight="duotone"
                      :class="i <= comment.rating ? 'text-yellow-400' : 'text-neutral-300'"
                      :size="16"
                    />
                  </div>
                </div>
                <p class="text-neutral-700 text-sm leading-relaxed">{{ comment.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Controles -->
        <button
          @click="prevCommentSlide"
          class="arrow-btn absolute -left-5 top-3/7 -translate-y-1/2"
        >
          <PhCaretLeft weight="bold" class="text-neutral-600" :size="16" />
        </button>
        <button
          @click="nextCommentSlide"
          class="arrow-btn absolute -right-5 top-3/7 -translate-y-1/2"
        >
          <PhCaretRight weight="bold" class="text-neutral-600" :size="16" />
        </button>

        <!-- Indicador de posição -->
        <div class="flex justify-center gap-1.5 mt-6">
          <button
            v-for="(_, i) in comments"
            :key="i"
            @click="currentCommentSlide = i"
            class="rounded-full transition-all duration-300"
            :class="currentCommentSlide === i ? 'w-6 h-2 bg-neutral-400' : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'"
          />
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.arrow-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: center;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.15s ease, border-color 0.15s ease;
}
.arrow-btn:hover {
  color: #374151;
  border-color: #9ca3af;
}
</style>
