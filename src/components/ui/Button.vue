<script setup lang="ts">
import { type Component } from 'vue'
import { PhArrowRight } from '@phosphor-icons/vue'

defineProps<{
  label?: string
  variant?: 'primary' | 'ghost'
  color?: 'blue' | 'red'
  loading?: boolean
  showArrow?: boolean
  icon?: Component
  type?: 'button' | 'submit' | 'reset'
}>()
</script>

<template>
  <button :type="type ?? 'button'" :disabled="loading"
    class="w-full py-3 px-4 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    :class="[
      variant === 'ghost'
        ? 'bg-transparent border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
        : color === 'red'
          ? 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]'
          : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-[0.98]'
    ]">
    <span v-if="loading" class="flex items-center justify-center gap-2">
      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      Aguarde...
    </span>
    <div v-else class="flex items-center justify-center gap-2 relative">
      <component :is="icon" v-if="icon" :size="18" weight="duotone" />
      <span>{{ label ?? 'Continuar' }}</span>
      <PhArrowRight v-if="showArrow" :size="20" weight="duotone" class="absolute right-0" />
    </div>
  </button>
</template>
