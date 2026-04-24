<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'

const isFocused = ref(false)

const props = defineProps<{
  label: string
  type?: string
  placeholder?: string
  modelValue?: string
  icon?: Component
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label class="text-xs font-medium text-neutral-500 tracking-wide">
      {{ label }}
    </label>
    <div
      class="flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-200 transition-all duration-200"
      :class="[
        disabled ? 'bg-neutral-50 cursor-not-allowed opacity-80' : 'bg-white focus-within:border-blue-500 focus-within:shadow-sm focus-within:shadow-blue-500/10',
      ]"
    >
      
      <input
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
        class="flex-1 bg-transparent text-neutral-900 placeholder-neutral-300 text-sm outline-none disabled:cursor-not-allowed disabled:text-neutral-500"
      />
      <component
        :is="icon"
        v-if="icon"
        :size="18"
        weight="duotone"
        :class="isFocused ? 'text-blue-500' : 'text-neutral-400'"
        class="shrink-0 transition-colors duration-200"
      />
    </div>
  </div>
</template>
