<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheTopbar from './components/TheTopbar.vue'
import { useThemeStore } from './stores/themeStore'

// Initialise store so CSS vars are applied on first load
useThemeStore()
</script>

<template>
  <header>
    <TheTopbar msg="Arie & Aviran" />
  </header>
  <RouterView />
</template>

