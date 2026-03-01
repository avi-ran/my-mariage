<script setup lang="ts">
import { mariageDate } from '../stores/mariageConst'

const timeBeforeMariage = Math.max(0, Math.ceil((mariageDate.getTime() - Date.now())));

</script>

<template>
  <!-- Timer -->
  <vue-countdown :time="timeBeforeMariage" v-slot="{ days, hours, minutes, seconds }" class="countdown-timer">
      <div class="countdown-item">
        <div class="countdown-number">{{ days }}</div>
        <div class="countdown-label">Jours</div>
      </div>
      <div class="countdown-colon" aria-hidden="true">:</div>
      <div class="countdown-item">
        <div class="countdown-number">{{ hours }}</div>
        <div class="countdown-label">Heures</div>
      </div>
      <div class="countdown-colon" aria-hidden="true">:</div>
      <div class="countdown-item">
        <div class="countdown-number">{{ minutes }}</div>
        <div class="countdown-label">Minutes</div>
      </div>
      <div class="countdown-colon" aria-hidden="true">:</div>
      <div class="countdown-item">
        <div class="countdown-number">{{ seconds }}</div>
        <div class="countdown-label">Secondes</div>
    </div>
  </vue-countdown>
  <!-- Timer description -->
  <!-- Main message -->
  <!-- Location description -->  
</template>
<style scoped>

/* Countdown layout: centered horizontally, positioned just below the topbar */
/* Use a centralized CSS var for the top so other elements can align to it */
.countdown-timer {
  position: fixed; /* fix to viewport so it stays under the topbar */
  top: var(--countdown-top, calc(var(--topbar-height, 0px) + 13.5rem));
  left: 50%;
  z-index: 20; /* above the background but below the topbar (topbar is 1000) */
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem; /* space between items and colons */
  pointer-events: none; /* not interactive */
  text-align: center;
  font-size: clamp(30px, 4.5vw, 70px); /* responsive clamp: min 30px, preferred 4.5vw, max 70px */
  font-family: 'Monelos', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--countdown-fill); /* contrasting color */
  width: 100%;
  box-sizing: border-box;
  word-spacing: 30px;
  padding: 0 1rem;
  /* provide a helpful fallback for other components */
  --countdown-height: var(--countdown-height, 4rem);
}


.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 4.5rem; /* make items reasonably wide for even spacing */
  padding: 0.25rem 0.5rem;
  text-align: center;
  color: var(--countdown-fill);
}

.countdown-number {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.countdown-label {
  font-size: 1.5rem;
  margin-top: 0.125rem;
}

.countdown-colon {
  font-size: 3rem;
  font-weight: 700;
  padding: 0 0.25rem;
  color: var(--countdown-fill);
  pointer-events: none;
}

/* Small screens: scale down and reduce spacing */
@media (max-width: 520px) {
  .countdown-number { font-size: 2rem; }
  .countdown-label { font-size: 1rem; }

  .countdown-timer {
    top: 40%;
    gap: 0.5rem;
    transform: translate(-50%, -50%) scale(0.9);
  }
}
</style>