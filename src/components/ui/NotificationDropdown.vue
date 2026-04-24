<script setup lang="ts">
import { ref } from 'vue'
import { PhBell } from '@phosphor-icons/vue'

interface Notification {
  id: number
  title: string
  message: string
  time: string
  icon: any
  color: string
  bg: string
}

defineProps<{
  notifications: Notification[]
  showNotifications?: boolean
}>()

const emit = defineEmits<{
  'update:showNotifications': [value: boolean]
  'toggle': []
}>()

function handleToggle() {
  emit('toggle')
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('[data-notification-dropdown]')) {
    emit('update:showNotifications', false)
  }
}
</script>

<template>
  <div class="relative" data-notification-dropdown>
    <button
      @click="handleToggle"
      class="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
      :class="showNotifications ? 'text-blue-500 bg-blue-50' : 'text-neutral-700 hover:text-blue-500 hover:bg-blue-50'"
    >
      <div class="relative">
        <PhBell weight="duotone" :size="20" />
        <div v-if="notifications.length > 0" class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </div>
    </button>

    <!-- Notifications dropdown -->
    <Transition name="dropdown">
      <div v-if="showNotifications" class="dropdown-panel absolute right-0 top-12 w-80">
        <div class="p-3 border-b border-neutral-100 flex items-center justify-between">
          <h3 class="text-xs font-bold uppercase tracking-widest text-neutral-400">Notificações</h3>
          <span class="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-bold">{{ notifications.length }}</span>
        </div>
        <div class="max-h-80 overflow-y-auto">
          <div v-if="notifications.length > 0" class="divide-y divide-neutral-50">
            <div v-for="notif in notifications" :key="notif.id" class="p-3 hover:bg-neutral-50 transition-colors cursor-pointer group">
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" :class="[notif.bg]">
                  <component :is="notif.icon" weight="duotone" :size="18" :class="[notif.color]" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <p class="text-sm font-bold text-neutral-800 leading-tight">{{ notif.title }}</p>
                    <span class="text-[10px] text-neutral-400 whitespace-nowrap">{{ notif.time }}</span>
                  </div>
                  <p class="text-xs text-neutral-500 mt-1 leading-normal">{{ notif.message }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-10 text-center">
            <PhBell weight="duotone" class="text-neutral-200 mx-auto mb-2" :size="32" />
            <p class="text-sm text-neutral-400">Nenhuma notificação</p>
          </div>
        </div>
        <div class="p-2 border-t border-neutral-100">
          <button class="w-full py-2 text-xs font-semibold text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
            Ver todas as notificações
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-panel {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 1rem;
  overflow: hidden;
}

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
