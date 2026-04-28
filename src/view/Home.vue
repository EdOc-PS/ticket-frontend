<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  PhCaretLeft,
  PhCaretRight,
  PhStar,
  PhClock,
  PhTicket,
  PhSparkle,
  PhTrophy,
} from '@phosphor-icons/vue'
import { featuredMovies, nowPlayingMovies, comingSoonMovies, festivalMovies } from '../mocks/movies'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import NowPlayingCard from '../components/ui/NowPlayingCard.vue'
import ComingSoonCard from '../components/ui/ComingSoonCard.vue'
import FestivalCard from '../components/ui/FestivalCard.vue'

const currentSlide = ref(0)
const isTransitioning = ref(false)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

function goToSlide(index: number) {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentSlide.value = (index + featuredMovies.length) % featuredMovies.length
  setTimeout(() => { isTransitioning.value = false }, 600)
}

function nextSlide() { goToSlide(currentSlide.value + 1) }
function prevSlide() { goToSlide(currentSlide.value - 1) }

function startAutoplay() {
  autoplayTimer = setInterval(nextSlide, 5000)
}

function stopAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer)
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)

const router = useRouter()
function goToEvent(id: number) {
  router.push(`/event/${id}`)
}

const classificationColor: Record<string, string> = {
  'L': 'bg-green-500',
  '10': 'bg-blue-500',
  '12': 'bg-yellow-500',
  '14': 'bg-orange-500',
  '16': 'bg-red-500',
  '18': 'bg-red-800',
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f7]">
    <Header />

    <!-- Hero slider -->
    <section id="inicio" class="relative h-[70vh] md:h-[90vh] overflow-hidden scroll-mt-24 animate-fade-in-up stagger-1" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
      <!-- Slides -->
      <div class="relative w-full h-full">
        <transition-group name="slide-fade">
          <div
            v-for="(movie, index) in featuredMovies"
            :key="movie.id"
            v-show="currentSlide === index"
            class="absolute inset-0"
          >
            <img
              :src="movie.backdrop"
              :alt="movie.title"
              class="w-full h-full object-cover"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);"></div>
            <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%);"></div>

            <!-- Content -->
            <div class="absolute inset-0 flex items-center">
              <div class="max-w-5xl mx-auto px-4 md:px-6 w-full mt-8 md:mt-16">
                <div class="max-w-lg">
                  <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-4 flex-wrap">
                    <span
                      class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-white"
                      :class="classificationColor[movie.classification] || 'bg-neutral-500'"
                    >{{ movie.classification }}</span>
                    <span class="text-xs md:text-sm text-white/70">{{ movie.genre }}</span>
                    <span class="text-white/40">·</span>
                    <span class="text-xs md:text-sm text-white/70 flex items-center gap-1">
                      <PhClock weight="duotone" :size="12" />{{ movie.duration }}
                    </span>
                  </div>

                  <h1 class="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 md:mb-4 drop-shadow-lg">
                    {{ movie.title }}
                  </h1>

                  <p class="text-white/80 text-xs md:text-base leading-relaxed mb-4 md:mb-8 max-w-sm line-clamp-2 md:line-clamp-none">
                    {{ movie.description }}
                  </p>

                  <div class="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <button class="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs md:text-base rounded-lg md:rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/30 min-h-[44px]">
                      <PhTicket weight="duotone" :size="16" />
                      <span class="hidden md:inline">Comprar Ingresso</span>
                      <span class="md:hidden">Comprar</span>
                    </button>
                    <button @click="goToEvent(movie.id)"
                      class="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 font-semibold text-xs md:text-base rounded-lg md:rounded-xl transition-all duration-200 active:scale-95 min-h-[44px]"
                      style="background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.25); color: white;"
                    >
                      Ver Detalhes
                    </button>
                  </div>

                  <div class="flex items-center gap-2 mt-6">
                    <PhStar weight="duotone" class="text-yellow-400" :size="16" />
                    <span class="text-white font-semibold text-sm">{{ movie.rating }}</span>
                    <span class="text-white/40 text-sm">/ 10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Controls -->
      <button
        class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 z-10 min-w-[44px] min-h-[44px]"
        style="background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.25);"
        @click="prevSlide"
      >
        <PhCaretLeft weight="bold" class="text-white" :size="18" />
      </button>
      <button
        class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 z-10 min-w-[44px] min-h-[44px]"
        style="background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.25);"
        @click="nextSlide"
      >
        <PhCaretRight weight="bold" class="text-white" :size="18" />
      </button>

      <!-- Dots -->
      <div class="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2 z-10">
        <button
          v-for="(_, i) in featuredMovies"
          :key="i"
          class="transition-all duration-300 rounded-full"
          :class="currentSlide === i ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'"
          @click="goToSlide(i)"
        />
      </div>
    </section>

    <!-- Em Cartaz -->
    <section id="em-cartaz" class="py-12 md:py-16 px-4 md:px-6 scroll-mt-24 animate-fade-in-up stagger-2">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 class="font-heading text-xl md:text-2xl font-bold text-neutral-900">Em Cartaz</h2>
            <p class="text-xs md:text-sm text-neutral-500 mt-1">Os melhores filmes desta semana</p>
          </div>
          <button class="text-xs md:text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
            Ver todos <PhCaretRight :size="12" weight="bold" />
          </button>
        </div>

        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          <NowPlayingCard
            v-for="movie in nowPlayingMovies"
            :key="movie.id"
            :movie="movie"
            @click="goToEvent(movie.id)"
          />
        </div>
      </div>
    </section>

    <!-- Em Breve -->
    <section id="em-breve" class="py-12 md:py-16 px-4 md:px-6 bg-white/50 scroll-mt-24 animate-fade-in-up stagger-3">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 class="font-heading text-xl md:text-2xl font-bold text-neutral-900">Em Breve</h2>
            <p class="text-xs md:text-sm text-neutral-500 mt-1">Fique por dentro das próximas estreias</p>
          </div>
          <button class="text-xs md:text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
            Ver todos <PhCaretRight :size="12" weight="bold" />
          </button>
        </div>

        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          <ComingSoonCard
            v-for="movie in comingSoonMovies"
            :key="movie.id"
            :movie="movie"
            @click="goToEvent(movie.id)"
          />
        </div>
      </div>
    </section>

    <!-- Promo section (inspired by print 3) -->
    <section class="py-12 md:py-20 px-4 md:px-6 overflow-hidden relative animate-fade-in-up stagger-4">
      <div class="max-w-5xl mx-auto">
        <div
          class="relative rounded-2xl md:rounded-3xl px-4 md:px-10 py-8 md:py-14 overflow-hidden"
          style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);"
        >
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style="background: radial-gradient(circle, #3b82f6, transparent); transform: translate(30%, -30%);"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style="background: radial-gradient(circle, #8b5cf6, transparent); transform: translate(-30%, 30%);"></div>

          <div class="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-3 md:mb-4">
                <PhSparkle weight="duotone" class="text-blue-400" :size="18" />
                <span class="text-blue-400 text-xs md:text-sm font-semibold tracking-wide uppercase">Cinematica Experience</span>
              </div>
              <h2 class="font-heading text-2xl md:text-4xl font-bold text-white leading-tight mb-3 md:mb-4">
                Sua experiência<br />cinematográfica,<br />
                <span class="text-blue-400">reinventada.</span>
              </h2>
              <p class="text-white/60 text-xs md:text-base leading-relaxed max-w-sm">
                Compre ingressos, escolha seus assentos e viva a magia do cinema com total comodidade. Sem filas, sem complicação.
              </p>
              <div class="flex items-center gap-3 md:gap-6 mt-6 md:mt-8">
                <div class="text-center">
                  <div class="font-heading text-lg md:text-2xl font-bold text-white">200+</div>
                  <div class="text-white/50 text-xs mt-1">Filmes</div>
                </div>
                <div class="w-px h-8 md:h-10 bg-white/10"></div>
                <div class="text-center">
                  <div class="font-heading text-lg md:text-2xl font-bold text-white">50+</div>
                  <div class="text-white/50 text-xs mt-1">Cinemas</div>
                </div>
                <div class="w-px h-8 md:h-10 bg-white/10"></div>
                <div class="text-center">
                  <div class="font-heading text-lg md:text-2xl font-bold text-white">1M+</div>
                  <div class="text-white/50 text-xs mt-1">Ingressos</div>
                </div>
              </div>
            </div>

            <div class="shrink-0 w-full md:w-auto mt-4 md:mt-0">
              <div
                class="w-full md:w-64 h-48 md:h-64 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-8 text-center"
                style="background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1);"
              >
                <div class="w-14 md:w-16 h-14 md:h-16 bg-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <PhTicket weight="duotone" class="text-white" :size="28" />
                </div>
                <div>
                  <p class="text-white font-semibold text-xs md:text-sm">Ingresso Digital</p>
                  <p class="text-white/50 text-xs mt-1">QR Code no celular</p>
                </div>
                <button class="w-full py-2 md:py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-lg md:rounded-xl transition-all duration-200 active:scale-95 min-h-[44px]">
                  Começar agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filmes em Festival -->
    <section id="festivais" class="py-12 md:py-16 px-4 md:px-6 pb-16 md:pb-24 scroll-mt-24 animate-fade-in-up stagger-5">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <PhTrophy weight="duotone" class="text-yellow-500" :size="18" />
              <h2 class="font-heading text-xl md:text-2xl font-bold text-neutral-900">Filmes em Festival</h2>
            </div>
            <p class="text-xs md:text-sm text-neutral-500">Premiados e aclamados pela crítica mundial</p>
          </div>
          <button class="text-xs md:text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 flex-shrink-0">
            Ver todos <PhCaretRight :size="12" weight="bold" />
          </button>
        </div>

        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          <FestivalCard
            v-for="movie in festivalMovies"
            :key="movie.id"
            :movie="movie"
            @click="goToEvent(movie.id)"
          />
        </div>
      </div>
    </section>

    <Footer />

  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.6s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
