<script setup lang="ts">
import TheCountdown from '../components/TheCountDown.vue'
import TheLocationInfo from '../components/TheLocationInfo.vue'

// This is a placeholder component for the marriage welcome page
import bg from '../assets/background-img.png'
</script>

<template>
  <main>
    <section
    class="welcome-mariage"
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

.welcome-mariage {
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
</style>