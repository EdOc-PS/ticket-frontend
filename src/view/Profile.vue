<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  PhUser,
  PhHeart,
  PhStar,
  PhTicket,
  PhSignOut,
  PhPencilSimple,
  PhEnvelope,
  PhCalendar,
} from '@phosphor-icons/vue'
import { mockUsers } from '../mocks/users'
import { mockEvents, getEventById } from '../mocks/events'
import { mockTickets } from '../mocks/tickets'
import { useAuth } from '../composables/useAuth'
import Header from '../components/layout/Header.vue'
import EventDetailHeader from '../components/layout/EventDetailHeader.vue'
import Footer from '../components/layout/Footer.vue'
import LogoutModal from '../components/ui/LogoutModal.vue'
import Input from '../components/ui/Input.vue'
import FavoriteCard from '../components/ui/FavoriteCard.vue'
import ReviewCard from '../components/ui/ReviewCard.vue'
import HistoryCard from '../components/ui/HistoryCard.vue'

const router = useRouter()
const { logout } = useAuth()

// Mock do usuário logado
const user = mockUsers[0]

// Tabs
type Tab = 'dados' | 'favoritos' | 'avaliacoes' | 'historico'
const activeTab = ref<Tab>('dados')

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: 'dados', label: 'Meus Dados', icon: PhUser },
  { id: 'favoritos', label: 'Favoritos', icon: PhHeart },
  { id: 'avaliacoes', label: 'Avaliações', icon: PhStar },
  { id: 'historico', label: 'Histórico', icon: PhTicket },
]

// Mock: favoritos (primeiros 3 eventos)
const favorites = mockEvents.slice(0, 3)

// Mock: avaliações
const reviews = [
  { eventId: 1, rating: 5, text: 'Incrível! Um dos melhores filmes que já vi.', date: '10 Abr 2026' },
  { eventId: 2, rating: 4, text: 'Muito bom, história envolvente.', date: '15 Abr 2026' },
]

// Histórico de compra com dados dos eventos
const purchaseHistory = mockTickets.map(ticket => ({
  ...ticket,
  event: getEventById(ticket.eventId),
}))

// Logout modal
const showLogoutModal = ref(false)

function handleLogout() {
  logout()
  router.push('/auth/login')
}



function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f7]">
    <EventDetailHeader />

    <div class="max-w-5xl mx-auto px-6 pt-28 pb-20">

      <!-- Profile header card -->
      <div class="bg-white rounded-3xl border border-neutral-100 overflow-hidden mb-6">
        <!-- Cover -->
        <div class="h-28 relative" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);">
          <div class="absolute inset-0 opacity-20"
            style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px); background-size: 40px 40px;" />
        </div>

        <div class="px-8 pb-6">
          <!-- Avatar + actions -->
          <div class="flex items-end justify-between -mt-10 mb-4">
            <div class="relative">
              <div class="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white shadow-lg">
                <PhUser weight="duotone" class="text-white" :size="36" />
              </div>
            </div>
          </div>

          <!-- Name & info -->
          <div>
            <h1 class="font-heading font-bold text-xl text-neutral-900">{{ user.name }}</h1>
            <p class="text-neutral-500 text-sm mt-0.5 flex items-center gap-1.5">
              <PhEnvelope weight="duotone" :size="13" />
              {{ user.email }}
            </p>
            <p class="text-neutral-400 text-xs mt-1 flex items-center gap-1.5">
              <PhCalendar weight="duotone" :size="12" />
              Membro desde {{ formatDate(user.createdAt) }}
            </p>
          </div>

          <!-- Stats -->
          <div class="flex items-center gap-6 mt-5 pt-5 border-t border-neutral-100">
            <div class="text-center">
              <p class="font-heading font-bold text-lg text-neutral-900">{{ purchaseHistory.length }}</p>
              <p class="text-xs text-neutral-500">Ingressos</p>
            </div>
            <div class="w-px h-8 bg-neutral-100" />
            <div class="text-center">
              <p class="font-heading font-bold text-lg text-neutral-900">{{ favorites.length }}</p>
              <p class="text-xs text-neutral-500">Favoritos</p>
            </div>
            <div class="w-px h-8 bg-neutral-100" />
            <div class="text-center">
              <p class="font-heading font-bold text-lg text-neutral-900">{{ reviews.length }}</p>
              <p class="text-xs text-neutral-500">Avaliações</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-6 items-start">

        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <!-- Tabs -->
          <div class="flex gap-1 bg-white rounded-3xl p-1.5 border border-neutral-100 mb-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-sm font-medium transition-all duration-200"
              :class="activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'"
            >
              <component :is="tab.icon" weight="duotone" :size="15" />
              <span class="hidden sm:inline">{{ tab.label }}</span>
            </button>
          </div>

          <!-- Tab: Meus Dados -->
          <div v-if="activeTab === 'dados'" class="bg-white rounded-3xl border border-neutral-100 p-6 space-y-6">
            <h2 class="font-heading font-bold text-base text-neutral-900">Informações pessoais</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <Input
                label="NOME COMPLETO"
                :model-value="user.name"
                disabled
                :icon="PhUser"
              />
              <Input
                label="E-MAIL"
                :model-value="user.email"
                disabled
                :icon="PhEnvelope"
              />
              <Input
                label="MEMBRO DESDE"
                :model-value="formatDate(user.createdAt)"
                disabled
                :icon="PhCalendar"
              />
              <Input
                label="LOCALIZAÇÃO"
                model-value="Não informado"
                disabled
                :icon="PhMapPin"
              />
            </div>

            <div class="pt-2">
              <button class="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]">
                <PhPencilSimple weight="duotone" :size="15" />
                Editar informações
              </button>
            </div>
          </div>

          <!-- Tab: Favoritos -->
          <div v-if="activeTab === 'favoritos'" class="space-y-3">
            <FavoriteCard
              v-for="event in favorites"
              :key="event.id"
              :event="event"
              @click="router.push(`/event/${event.id}`)"
            />

            <div v-if="favorites.length === 0" class="bg-white rounded-3xl border border-neutral-100 p-12 text-center">
              <PhHeart weight="duotone" class="text-neutral-200 mx-auto mb-3" :size="40" />
              <p class="text-neutral-400 text-sm">Nenhum favorito ainda.</p>
            </div>
          </div>

          <!-- Tab: Avaliações -->
          <div v-if="activeTab === 'avaliacoes'" class="space-y-3">
            <ReviewCard
              v-for="review in reviews"
              :key="review.eventId"
              :review="review"
              :event="getEventById(review.eventId)"
            />

            <div v-if="reviews.length === 0" class="bg-white rounded-3xl border border-neutral-100 p-12 text-center">
              <PhStar weight="duotone" class="text-neutral-200 mx-auto mb-3" :size="40" />
              <p class="text-neutral-400 text-sm">Nenhuma avaliação ainda.</p>
            </div>
          </div>

          <!-- Tab: Histórico -->
          <div v-if="activeTab === 'historico'" class="space-y-3">
            <HistoryCard
              v-for="item in purchaseHistory"
              :key="item.id"
              :ticket="item"
            />

            <div v-if="purchaseHistory.length === 0" class="bg-white rounded-3xl border border-neutral-100 p-12 text-center">
              <PhTicket weight="duotone" class="text-neutral-200 mx-auto mb-3" :size="40" />
              <p class="text-neutral-400 text-sm">Nenhuma compra realizada ainda.</p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="w-64 flex-shrink-0 space-y-3">
          <!-- Quick info -->
          <div class="bg-white rounded-3xl border border-neutral-100 p-5">
            <h3 class="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Conta</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-2.5 text-sm text-neutral-600">
                <PhEnvelope weight="duotone" :size="15" class="text-blue-400 flex-shrink-0" />
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
              <div class="flex items-center gap-2.5 text-sm text-neutral-600">
                <PhCalendar weight="duotone" :size="15" class="text-blue-400 flex-shrink-0" />
                <span class="text-xs">{{ formatDate(user.createdAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Logout card -->
          <button
            @click="showLogoutModal = true"
            class="cursor-pointer w-full bg-white rounded-3xl border border-neutral-100 p-5 flex items-center gap-3 hover:border-red-200 hover:bg-red-50/50 transition-all duration-200 group text-left"
          >
            <div class="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
              <PhSignOut weight="duotone" class="text-red-400" :size="18" />
            </div>
            <div>
              <p class="text-sm font-semibold text-neutral-700 group-hover:text-red-600 transition-colors">Sair da conta</p>
              <p class="text-xs text-neutral-400 mt-0.5">Encerrar sessão</p>
            </div>
          </button>
        </div>

      </div>
    </div>

    <Footer />

    <!-- Logout Modal -->
    <LogoutModal
      :open="showLogoutModal"
      @confirm="handleLogout"
      @cancel="showLogoutModal = false"
    />
  </div>
</template>
