<script setup lang="ts">
import { computed } from 'vue'
import TheCountdown from '../components/TheCountDown.vue'
import TheLocationInfo from '../components/TheLocationInfo.vue'
import { useThemeStore, palettes } from '../stores/themeStore'

import bg from '../assets/background-img.png'

const store = useThemeStore()
const grayscaleIds = new Set(['sage', 'crimson', 'salmon'])
const isGrayscale = computed(() => { const id = palettes[store.activeIndex]?.id; return id !== undefined && grayscaleIds.has(id) })
</script>

<template>
  <main>
    <section
    class="welcome-mariage"
    :class="{ grayscale: isGrayscale }"
    :style="{ backgroundImage: `url(${bg})` }"
    >
    </section>
    <TheCountdown />
    <TheLocationInfo targetDate="Samedi 21 Aout 2027"
        :location="`Ô Jardin,
    81 route de l'Entre-Deux,
    Saint-Pierre 97410,
    La Réunion`" />
  </main>
</template>

<style scoped>
@keyframes slideAndZoom {
  0% {
    transform: translateX(-58%) scale(1);
  }
  100% {
    transform: translateX(-58%) translateX(-8vw) scale(1.08);
  }
}

.welcome-mariage.grayscale {
  filter: grayscale(100%);
}

.welcome-mariage {
  transition: filter 600ms ease;
  position: relative;
  width: 140vw;
  left: 50%;
  animation: slideAndZoom 60s ease-in-out alternate infinite;
  min-height: 100vh;
  padding-top: 50px;             /* keep below fixed topbar */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center; /* ensure image is centered */
  background-attachment: scroll; /* avoid weird fixed behavior on mobile */
  overflow: hidden;
}

@media (max-width: 520px) {
  .welcome-mariage {
    width: 100vw;
    left: 0;
    height: 100vh;
    min-height: unset;
    animation: none;
    background-position: center center;
  }
}
</style>
