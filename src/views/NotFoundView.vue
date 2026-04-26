<script setup lang="ts">
import { useThemeStore } from '../stores/themeStore'
const store = useThemeStore()
</script>

<template>
  <div class="not-found">
    <p class="code">404</p>
    <p class="message">La perd' chemin kwé ?</p>
    <RouterLink to="/" class="main-form-btn">Retour à l'accueil</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: var(--accent-text);
}

.main-form-btn {
  color: var(--accent-fill) !important;
  border-color: var(--accent-fill) !important;
}

.code {
  margin: 0;
  font-family: 'Monelos', system-ui, sans-serif;
  font-size: clamp(5rem, 20vw, 10rem);
  font-weight: 800;
  color: var(--accent-fill);
  line-height: 1;
}

.message {
  margin: 0;
  font-family: 'Monelos', system-ui, sans-serif;
  font-size: 1.2rem;
  color: var(--accent-fill);
}
</style>
