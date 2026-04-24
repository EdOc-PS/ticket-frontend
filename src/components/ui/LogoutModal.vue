<script setup lang="ts">
import { PhSignOut, PhWarning, PhX } from '@phosphor-icons/vue'
import Button from './Button.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ confirm: []; cancel: [] }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[200] flex items-center justify-center px-4"
        @mousedown.self="emit('cancel')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <!-- Dialog -->
        <div class="modal-card relative w-full max-w-sm">
          <!-- Close button -->
          <button
            @click="emit('cancel')"
            class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all duration-150"
          >
            <PhX :size="14" weight="bold" />
          </button>

          <!-- Icon -->
          <div class="flex justify-center mb-5">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center"
              style="background: linear-gradient(135deg, #fef2f2, #fee2e2);">
              <PhSignOut weight="duotone" class="text-red-500" :size="28" />
            </div>
          </div>

          <!-- Text -->
          <h2 class="font-heading font-bold text-xl text-neutral-900 text-center mb-2">
            Sair da conta?
          </h2>
          <p class="text-neutral-500 text-sm text-center leading-relaxed mb-6">
            Você precisará entrar novamente para acessar seus ingressos e favoritos.
          </p>

          <!-- Alert tip -->
          <div class="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl p-3 mb-6">
            <PhWarning weight="duotone" class="text-amber-500 flex-shrink-0 mt-0.5" :size="16" />
            <p class="text-xs text-amber-700 leading-relaxed">
              Ingressos comprados ficam salvos no e-mail cadastrado.
            </p>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <div class="flex-1">
              <Button
                label="Cancelar"
                variant="ghost"
                :show-arrow="false"
                @click="emit('cancel')"
              />
            </div>
            <div class="flex-1">
              <Button
                label="Sair"
                color="red"
                :icon="PhSignOut"
                :show-arrow="false"
                @click="emit('confirm')"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-card {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 1.25rem;
  padding: 1.75rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.08);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-card {
  transform: scale(0.94) translateY(8px);
  opacity: 0;
}
.modal-leave-to .modal-card {
  transform: scale(0.96);
  opacity: 0;
}
</style>
