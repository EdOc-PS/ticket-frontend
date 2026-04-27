<script setup lang="ts">
import {
  PhFilmSlate,
  PhFilmReel,
  PhFilmStrip,
  PhPopcorn,
  PhTicket,
  PhVideoCamera,
  PhStar,
  PhProjectorScreen,
  PhMonitorPlay,
} from '@phosphor-icons/vue'

// Memphis-style scattered items - each has position, size, rotation, opacity, color, delay
const items = [
  // Top-left cluster
  { icon: PhFilmSlate, x: 4, y: 5, size: 52, rotate: -15, opacity: 0.28, color: '#3b82f6', delay: 0 },
  { icon: PhStar, x: 20, y: 8, size: 20, rotate: 25, opacity: 0.18, color: '#93c5fd', delay: 1.5 },
  { icon: PhTicket, x: 8, y: 22, size: 36, rotate: 40, opacity: 0.22, color: '#60a5fa', delay: 3 },

  // Top-right cluster
  { icon: PhPopcorn, x: 78, y: 4, size: 48, rotate: 12, opacity: 0.30, color: '#3b82f6', delay: 0.8 },
  { icon: PhFilmReel, x: 90, y: 15, size: 28, rotate: -30, opacity: 0.20, color: '#9ca3af', delay: 2 },
  { icon: PhVideoCamera, x: 68, y: 18, size: 22, rotate: 20, opacity: 0.16, color: '#6b7280', delay: 4 },

  // Left side
  { icon: PhMonitorPlay, x: 3, y: 45, size: 40, rotate: -20, opacity: 0.24, color: '#60a5fa', delay: 1 },
  { icon: PhFilmStrip, x: 10, y: 65, size: 56, rotate: 35, opacity: 0.22, color: '#93c5fd', delay: 2.5 },
  { icon: PhStar, x: 5, y: 82, size: 18, rotate: -45, opacity: 0.18, color: '#9ca3af', delay: 3.5 },

  // Right side
  { icon: PhProjectorScreen, x: 85, y: 40, size: 44, rotate: 15, opacity: 0.25, color: '#3b82f6', delay: 1.8 },
  { icon: PhTicket, x: 92, y: 60, size: 30, rotate: -25, opacity: 0.20, color: '#9ca3af', delay: 0.5 },
  { icon: PhFilmSlate, x: 80, y: 78, size: 38, rotate: 30, opacity: 0.24, color: '#60a5fa', delay: 3.2 },

  // Bottom
  { icon: PhPopcorn, x: 25, y: 88, size: 34, rotate: -10, opacity: 0.22, color: '#6b7280', delay: 2.2 },
  { icon: PhVideoCamera, x: 55, y: 92, size: 26, rotate: 45, opacity: 0.18, color: '#93c5fd', delay: 4.5 },
  { icon: PhFilmReel, x: 72, y: 90, size: 46, rotate: -35, opacity: 0.26, color: '#3b82f6', delay: 1.2 },

  // Center-outskirts (far from form)
  { icon: PhStar, x: 30, y: 12, size: 16, rotate: 60, opacity: 0.15, color: '#d1d5db', delay: 5 },
  { icon: PhFilmStrip, x: 65, y: 10, size: 32, rotate: -50, opacity: 0.18, color: '#9ca3af', delay: 2.8 },
  { icon: PhMonitorPlay, x: 18, y: 42, size: 24, rotate: 15, opacity: 0.15, color: '#93c5fd', delay: 3.8 },
  { icon: PhProjectorScreen, x: 75, y: 55, size: 28, rotate: -20, opacity: 0.16, color: '#9ca3af', delay: 1.5 },
  { icon: PhTicket, x: 42, y: 90, size: 22, rotate: 30, opacity: 0.15, color: '#93c5fd', delay: 4.2 },
]

// Memphis geometric shapes (circles, dots, lines, crosses)
const shapes = [
  // Dots
  { type: 'dot', x: 15, y: 15, size: 12, color: '#3b82f6', opacity: 0.28, delay: 0 },
  { type: 'dot', x: 88, y: 25, size: 8, color: '#93c5fd', opacity: 0.22, delay: 1 },
  { type: 'dot', x: 10, y: 75, size: 14, color: '#60a5fa', opacity: 0.20, delay: 2 },
  { type: 'dot', x: 92, y: 80, size: 10, color: '#9ca3af', opacity: 0.24, delay: 3 },
  { type: 'dot', x: 35, y: 5, size: 7, color: '#d1d5db', opacity: 0.30, delay: 1.5 },
  { type: 'dot', x: 60, y: 95, size: 11, color: '#3b82f6', opacity: 0.22, delay: 2.5 },

  // Rings
  { type: 'ring', x: 22, y: 30, size: 28, color: '#93c5fd', opacity: 0.22, delay: 0.5 },
  { type: 'ring', x: 82, y: 50, size: 20, color: '#60a5fa', opacity: 0.18, delay: 2 },
  { type: 'ring', x: 50, y: 8, size: 18, color: '#d1d5db', opacity: 0.22, delay: 3.5 },
  { type: 'ring', x: 8, y: 55, size: 24, color: '#3b82f6', opacity: 0.16, delay: 1.2 },

  // Crosses
  { type: 'cross', x: 28, y: 75, size: 16, color: '#6b7280', opacity: 0.24, delay: 1 },
  { type: 'cross', x: 75, y: 30, size: 14, color: '#93c5fd', opacity: 0.20, delay: 2.5 },
  { type: 'cross', x: 45, y: 3, size: 12, color: '#3b82f6', opacity: 0.22, delay: 4 },
  { type: 'cross', x: 90, y: 70, size: 14, color: '#60a5fa', opacity: 0.18, delay: 0.8 },

  // Zigzag lines (short)
  { type: 'zigzag', x: 18, y: 50, size: 36, color: '#93c5fd', opacity: 0.18, delay: 1.5 },
  { type: 'zigzag', x: 80, y: 88, size: 30, color: '#d1d5db', opacity: 0.16, delay: 3 },
]
</script>

<template>
  <div class="memphis-bg absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <!-- Gradient base -->
    <div class="absolute inset-0" style="background: radial-gradient(ellipse at 30% 20%, rgba(219,234,254,0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(219,234,254,0.3) 0%, transparent 50%);" />

    <!-- Phosphor icon elements -->
    <component
      v-for="(item, i) in items"
      :key="'icon-' + i"
      :is="item.icon"
      weight="duotone"
      :size="item.size"
      class="memphis-icon absolute"
      :style="{
        left: item.x + '%',
        top: item.y + '%',
        '--base-rotate': `rotate(${item.rotate}deg)`,
        opacity: item.opacity,
        color: item.color,
        animationDelay: item.delay + 's',
      }"
    />

    <!-- Geometric shapes -->
    <template v-for="(shape, i) in shapes" :key="'shape-' + i">
      <!-- Dots -->
      <div
        v-if="shape.type === 'dot'"
        class="memphis-shape absolute rounded-full"
        :style="{
          left: shape.x + '%',
          top: shape.y + '%',
          width: shape.size + 'px',
          height: shape.size + 'px',
          backgroundColor: shape.color,
          opacity: shape.opacity,
          animationDelay: shape.delay + 's',
        }"
      />

      <!-- Rings -->
      <div
        v-if="shape.type === 'ring'"
        class="memphis-shape absolute rounded-full"
        :style="{
          left: shape.x + '%',
          top: shape.y + '%',
          width: shape.size + 'px',
          height: shape.size + 'px',
          border: '2px solid ' + shape.color,
          opacity: shape.opacity,
          animationDelay: shape.delay + 's',
        }"
      />

      <!-- Crosses (+) -->
      <svg
        v-if="shape.type === 'cross'"
        class="memphis-shape absolute"
        :width="shape.size"
        :height="shape.size"
        :style="{
          left: shape.x + '%',
          top: shape.y + '%',
          opacity: shape.opacity,
          animationDelay: shape.delay + 's',
        }"
        viewBox="0 0 12 12"
      >
        <line x1="6" y1="1" x2="6" y2="11" :stroke="shape.color" stroke-width="2" stroke-linecap="round" />
        <line x1="1" y1="6" x2="11" y2="6" :stroke="shape.color" stroke-width="2" stroke-linecap="round" />
      </svg>

      <!-- Zigzag -->
      <svg
        v-if="shape.type === 'zigzag'"
        class="memphis-shape absolute"
        :width="shape.size"
        :height="Math.round(shape.size * 0.4)"
        :style="{
          left: shape.x + '%',
          top: shape.y + '%',
          opacity: shape.opacity,
          animationDelay: shape.delay + 's',
        }"
        :viewBox="`0 0 ${shape.size} ${Math.round(shape.size * 0.4)}`"
      >
        <polyline
          :points="`0,${Math.round(shape.size * 0.35)} ${Math.round(shape.size * 0.2)},${Math.round(shape.size * 0.05)} ${Math.round(shape.size * 0.4)},${Math.round(shape.size * 0.35)} ${Math.round(shape.size * 0.6)},${Math.round(shape.size * 0.05)} ${Math.round(shape.size * 0.8)},${Math.round(shape.size * 0.35)} ${shape.size},${Math.round(shape.size * 0.05)}`"
          fill="none"
          :stroke="shape.color"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </template>
  </div>
</template>

<style scoped>
/* Floating animation for icons */
.memphis-icon {
  animation: memphis-float 8s ease-in-out infinite;
}

/* Subtle pulse for shapes */
.memphis-shape {
  animation: memphis-pulse 6s ease-in-out infinite;
}

@keyframes memphis-float {
  0% {
    transform: var(--base-rotate, rotate(0deg)) translateY(0px) rotate(0deg);
  }
  33% {
    transform: var(--base-rotate, rotate(0deg)) translateY(-12px) rotate(5deg);
  }
  66% {
    transform: var(--base-rotate, rotate(0deg)) translateY(5px) rotate(-5deg);
  }
  100% {
    transform: var(--base-rotate, rotate(0deg)) translateY(0px) rotate(0deg);
  }
}

@keyframes memphis-pulse {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.15) rotate(15deg);
  }
}
</style>
