<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  PhMagnifyingGlass,
  PhBell,
  PhUser,
  PhFilmSlate,
  PhClockCounterClockwise,
  PhHeart,
  PhSignOut,
  PhCaretRight,
} from '@phosphor-icons/vue'
import { mockEvents } from '../../mocks/events'
import { useAuth } from '../../composables/useAuth'
import LogoutModal from '../ui/LogoutModal.vue'

const router = useRouter()
const { logout } = useAuth()

// --- Logout Modal ---
const showLogoutModal = ref(false)
function handleLogout() {
  logout()
  router.push('/auth/login')
}

// --- Search ---
const showSearch = ref(false)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

// Mock: histórico com um item (primeiro mock disponível)
const searchHistory = [mockEvents[0]]
const imageErrors = ref<Record<number, boolean>>({})

function toggleSearch() {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    showProfile.value = false
    setTimeout(() => searchInputRef.value?.focus(), 50)
  } else {
    searchQuery.value = ''
  }
}

function goToEvent(id: number) {
  showSearch.value = false
  searchQuery.value = ''
  router.push(`/evento/${id}`)
}

// --- Profile ---
const showProfile = ref(false)

function toggleProfile() {
  showProfile.value = !showProfile.value
  if (showProfile.value) showSearch.value = false
}

// Fechar ao clicar fora
function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('[data-header-dropdown]')) {
    showSearch.value = false
    showProfile.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-4">
    <nav
      class="w-full max-w-5xl flex items-center justify-between px-2 py-2 rounded-full"
      style="background: rgba(255,255,255,0.5); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 4px 24px rgba(0,0,0,0.08);"
    >
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <PhFilmSlate weight="duotone" class="text-white" :size="18" />
        </div>
        <span class="font-heading font-bold text-neutral-900 text-lg tracking-tight">CineTicket</span>
      </div>

      <!-- Nav links -->
      <div class="hidden md:flex items-center gap-8">
        <router-link to="/home#inicio" class="text-sm text-neutral-800 font-medium hover:text-blue-500 transition-colors duration-200">Filmes</router-link>
        <router-link to="/home#em-cartaz" class="text-sm text-neutral-800 hover:text-blue-500 transition-colors duration-200">Em Cartaz</router-link>
        <router-link to="/home#em-breve" class="text-sm text-neutral-800 hover:text-blue-500 transition-colors duration-200">Em Breve</router-link>
        <router-link to="/home#festivais" class="text-sm text-neutral-800 hover:text-blue-500 transition-colors duration-200">Festivais</router-link>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-1">

        <!-- Search -->
        <div class="relative" data-header-dropdown>
          <button
            @click="toggleSearch"
            class="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
            :class="showSearch ? 'text-blue-500 bg-blue-50' : 'text-neutral-700 hover:text-blue-500 hover:bg-blue-50'"
          >
            <PhMagnifyingGlass weight="duotone" :size="20" />
          </button>

          <!-- Search dropdown -->
          <Transition name="dropdown">
            <div
              v-if="showSearch"
              class="dropdown-panel absolute right-0 top-12 w-96"
            >
              <!-- Input -->
              <div class="flex items-center gap-2 px-3 py-2 border-b border-neutral-100">
                <PhMagnifyingGlass weight="duotone" class="text-neutral-400 flex-shrink-0" :size="16" />
                <input
                  ref="searchInputRef"
                  v-model="searchQuery"
                  placeholder="Pesquisar filmes..."
                  class="flex-1 bg-transparent text-sm text-neutral-900 placeholder-neutral-400 outline-none"
                />
              </div>

              <!-- Histórico -->
              <div class="p-2">
                <p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 px-2 mb-1">Recentes</p>
                <button
                  v-for="item in searchHistory"
                  :key="item.id"
                  @click="goToEvent(item.id)"
                  class="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-neutral-50 transition-colors duration-150 group text-left"
                >
                  <div class="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <PhClockCounterClockwise weight="duotone" class="text-neutral-400" :size="14" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-neutral-800 font-medium truncate">{{ item.title }}</p>
                    <p class="text-xs text-neutral-400 truncate">{{ item.location }}</p>
                  </div>
                  <!-- Thumbnail com fallback -->
                  <div class="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      v-if="!imageErrors[item.id]"
                      :src="item.poster"
                      alt=""
                      class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      @error="imageErrors[item.id] = true"
                    />
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center text-white text-sm font-bold"
                      :style="{ background: `hsl(${(item.id * 53) % 360}, 60%, 55%)` }"
                    >{{ item.title[0] }}</div>
                  </div>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Bell -->
        <button class="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-700 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200">
          <PhBell weight="duotone" :size="20" />
        </button>

        <!-- Profile -->
        <div class="relative" data-header-dropdown>
          <button
            @click="toggleProfile"
            class="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
            :class="showProfile ? 'bg-blue-500 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-blue-500 hover:text-white'"
          >
            <PhUser weight="duotone" :size="20" />
          </button>

          <!-- Profile dropdown -->
          <Transition name="dropdown">
            <div
              v-if="showProfile"
              class="dropdown-panel absolute right-0 top-12 w-52"
            >
              <div class="p-2 space-y-0.5">
                <button class="profile-item" @click="router.push('/perfil'); showProfile = false">
                  <PhUser weight="duotone" :size="16" class="text-neutral-500" />
                  Ver perfil
                </button>
                <button class="profile-item" @click="showProfile = false">
                  <PhHeart weight="duotone" :size="16" class="text-neutral-500" />
                  Favoritos
                </button>
                <div class="h-px bg-neutral-100 my-1" />
                <button class="profile-item text-red-500" @click="showProfile = false; showLogoutModal = true">
                  <PhSignOut weight="duotone" :size="16" class="text-red-400" />
                  Sair
                </button>
              </div>
            </div>
          </Transition>
        </div>

      </div>
    </nav>
  </header>

  <LogoutModal
    :open="showLogoutModal"
    @confirm="handleLogout"
    @cancel="showLogoutModal = false"
  />
</template>

<style scoped>
.dropdown-panel {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.profile-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.625rem;
  border-radius: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #374151;
  transition: background 0.15s ease;
  text-align: left;
  cursor: pointer;
}
.profile-item:hover {
  background: rgba(0, 0, 0, 0.04);
}
.profile-item.text-red-500 {
  color: #ef4444;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.18s ease, transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
