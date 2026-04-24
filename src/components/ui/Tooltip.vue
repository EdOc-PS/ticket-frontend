<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  text: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}>()

const show = ref(false)
</script>

<template>
  <div class="relative inline-block group">
    <slot />
    <Transition name="tooltip">
      <div
        v-if="show"
        class="absolute z-50 px-2 py-1 text-xs text-white bg-neutral-800 rounded whitespace-nowrap pointer-events-none"
        :class="{
          'bottom-full left-1/2 -translate-x-1/2 mb-2': side === 'top',
          'top-full left-1/2 -translate-x-1/2 mt-2': side === 'bottom',
          'right-full top-1/2 -translate-y-1/2 mr-2': side === 'left',
          'left-full top-1/2 -translate-y-1/2 ml-2': side === 'right',
        }"
      >
        {{ text }}
        <!-- Arrow -->
        <div
          class="absolute w-2 h-2 bg-neutral-800"
          :class="{
            'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45': side === 'top',
            'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45': side === 'bottom',
            'right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45': side === 'left',
            'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45': side === 'right',
          }"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.15s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}

/* Hover para mostrar tooltip */
.group:hover ~ div {
  display: block;
}
</style>
