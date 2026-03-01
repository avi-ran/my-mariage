<script setup lang="ts">
defineProps<{
  targetDate: string
  location: string
}>()

import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
</script>

<template>
  <div v-if="width > 520" class="location-box" role="note" aria-label="Location summary">
    <div class="location-box-text">
      <div class="location-box-address">{{ targetDate }}</div>
      <div class="location-box-separator"></div>
      <div class="location-box-address">{{ location }}</div>
    </div>
  </div>
  <div v-if="width <= 520">
    <div class="date-box-text">
      <div>{{ targetDate }}</div>
    </div>
    <div class="location-box" role="note" aria-label="Location summary">
      <div class="location-box-text">
        <div class="location-box-address">{{ location }}</div>
      </div>
    </div>
  </div>
  <div class="main-form-btn"><a href="https://forms.gle/6WRiV1nW85Rj7Jw9A" target="_blank" rel="noopener noreferrer">Remplir le formulaire</a></div>
</template>
<style scoped>

.location-box {
  position: fixed; /* anchor to viewport so it can sit under the countdown */
  top: var(--location-box-top, calc(var(--countdown-top, calc(var(--topbar-height, 56px) + 13.5rem)) + var(--countdown-height, 4rem) + 1.5cm));
  left: 50%;
  transform: translateX(-50%);
  z-index: 20; /* same layer as countdown */
  width: 14cm;
  height: var(--location-box-height, 3cm);
  background: var(--location-fill, #F4E4C6);
  color: var(--location-text, #1f2937);
  border-radius: 4cm; /* fully rounded left/right sides */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  font-family: inherit;
  font-weight: 600;
  padding: 0 0.75rem;
  box-sizing: border-box;
}

.location-box-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  font-family: 'Monelos', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  flex-wrap: wrap;
}

.location-box-address {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  line-height: 1.3;
  padding: 0.25rem;
  box-sizing: border-box;
  white-space: pre-line; /* preserve line breaks in the text */
  word-break: break-word;
  overflow: hidden;
  text-align: center;
}

.location-box-separator {
  width: 2px;
  height: 2cm;
  background: var(--accent-text, #1f2937);
  opacity: 0.4;
  flex-shrink: 0;
  border-radius: 1px;
}

.main-form-btn {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: calc(var(--location-box-top, 0px) + var(--location-box-height, 3cm) + 50px);
  z-index: 21
}

/* Small screens: make it fluid and slightly smaller */
@media (max-width: 520px) {
  
  .date-box-text {
    position: fixed;
    top: calc(var(--topbar-height, 48px) + 10rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    font-family: 'Monelos', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 1.5rem;
    color: var(--location-text, #1f2937);
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    white-space: nowrap;
  }

  .location-box {
    top: calc(47% + 1rem) !important;
    width: 80vw;
    height: var(--location-box-height-mobile, 1.6cm) + 30px;
    border-radius: 2.9cm;
  }
  
  .location-box-address {
    font-size: 1rem;
  }

  .location-box-separator {
    height: 0;
    width: 0;
  }

  .main-form-btn {
    font-size: 1.3rem;
    top: calc(calc(50% + 3.5rem + 1cm) + var(--location-box-height-mobile, 1.6cm) + 80px) !important;
    width: 80vw;
  }
}

</style>