<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheTopbar from './components/TheTopbar.vue'
</script>

<template>
  <header>
    <TheTopbar msg="Arie & Aviran" />
  </header>
  <RouterView />
</template>

