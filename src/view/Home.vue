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
    <section id="inicio" class="relative h-[90vh] overflow-hidden scroll-mt-24" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
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
              <div class="max-w-5xl mx-auto px-6 w-full mt-16">
                <div class="max-w-lg">
                  <div class="flex items-center gap-3 mb-4">
                    <span
                      class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-white"
                      :class="classificationColor[movie.classification] || 'bg-neutral-500'"
                    >{{ movie.classification }}</span>
                    <span class="text-sm text-white/70">{{ movie.genre }}</span>
                    <span class="text-white/40">·</span>
                    <span class="text-sm text-white/70 flex items-center gap-1">
                      <PhClock weight="duotone" :size="14" />{{ movie.duration }}
                    </span>
                  </div>

                  <h1 class="font-heading text-5xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                    {{ movie.title }}
                  </h1>

                  <p class="text-white/80 text-base leading-relaxed mb-8 max-w-sm">
                    {{ movie.description }}
                  </p>

                  <div class="flex items-center gap-4">
                    <button class="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/30">
                      <PhTicket weight="duotone" :size="18" />
                      Comprar Ingresso
                    </button>
                    <button @click="goToEvent(movie.id)"
                      class="flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-200 active:scale-95"
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
        class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 z-10"
        style="background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.25);"
        @click="prevSlide"
      >
        <PhCaretLeft weight="bold" class="text-white" :size="20" />
      </button>
      <button
        class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 z-10"
        style="background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.25);"
        @click="nextSlide"
      >
        <PhCaretRight weight="bold" class="text-white" :size="20" />
      </button>

      <!-- Dots -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
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
    <section id="em-cartaz" class="py-16 px-6 scroll-mt-24">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="font-heading text-2xl font-bold text-neutral-900">Em Cartaz</h2>
            <p class="text-sm text-neutral-500 mt-1">Os melhores filmes desta semana</p>
          </div>
          <button class="text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
            Ver todos <PhCaretRight :size="14" weight="bold" />
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
    <section id="em-breve" class="py-16 px-6 bg-white/50 scroll-mt-24">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="font-heading text-2xl font-bold text-neutral-900">Em Breve</h2>
            <p class="text-sm text-neutral-500 mt-1">Fique por dentro das próximas estreias</p>
          </div>
          <button class="text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
            Ver todos <PhCaretRight :size="14" weight="bold" />
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
    <section class="py-20 px-6 overflow-hidden relative">
      <div class="max-w-5xl mx-auto">
        <div
          class="relative rounded-3xl px-10 py-14 overflow-hidden"
          style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);"
        >
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style="background: radial-gradient(circle, #3b82f6, transparent); transform: translate(30%, -30%);"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style="background: radial-gradient(circle, #8b5cf6, transparent); transform: translate(-30%, 30%);"></div>

          <div class="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-4">
                <PhSparkle weight="duotone" class="text-blue-400" :size="20" />
                <span class="text-blue-400 text-sm font-semibold tracking-wide uppercase">CineTicket Experience</span>
              </div>
              <h2 class="font-heading text-4xl font-bold text-white leading-tight mb-4">
                Sua experiência<br />cinematográfica,<br />
                <span class="text-blue-400">reinventada.</span>
              </h2>
              <p class="text-white/60 text-base leading-relaxed max-w-sm">
                Compre ingressos, escolha seus assentos e viva a magia do cinema com total comodidade. Sem filas, sem complicação.
              </p>
              <div class="flex items-center gap-6 mt-8">
                <div class="text-center">
                  <div class="font-heading text-2xl font-bold text-white">200+</div>
                  <div class="text-white/50 text-xs mt-1">Filmes</div>
                </div>
                <div class="w-px h-10 bg-white/10"></div>
                <div class="text-center">
                  <div class="font-heading text-2xl font-bold text-white">50+</div>
                  <div class="text-white/50 text-xs mt-1">Cinemas</div>
                </div>
                <div class="w-px h-10 bg-white/10"></div>
                <div class="text-center">
                  <div class="font-heading text-2xl font-bold text-white">1M+</div>
                  <div class="text-white/50 text-xs mt-1">Ingressos</div>
                </div>
              </div>
            </div>

            <div class="shrink-0">
              <div
                class="w-64 h-64 rounded-3xl flex flex-col items-center justify-center gap-4 p-8 text-center"
                style="background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1);"
              >
                <div class="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <PhTicket weight="duotone" class="text-white" :size="32" />
                </div>
                <div>
                  <p class="text-white font-semibold text-sm">Ingresso Digital</p>
                  <p class="text-white/50 text-xs mt-1">QR Code no celular</p>
                </div>
                <button class="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95">
                  Começar agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filmes em Festival -->
    <section id="festivais" class="py-16 px-6 pb-24 scroll-mt-24">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <PhTrophy weight="duotone" class="text-yellow-500" :size="20" />
              <h2 class="font-heading text-2xl font-bold text-neutral-900">Filmes em Festival</h2>
            </div>
            <p class="text-sm text-neutral-500">Premiados e aclamados pela crítica mundial</p>
          </div>
          <button class="text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
            Ver todos <PhCaretRight :size="14" weight="bold" />
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
