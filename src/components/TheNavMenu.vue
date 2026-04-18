<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const menuOpen = ref(false)
const toggle = () => { menuOpen.value = !menuOpen.value }
const close = () => { menuOpen.value = false }
</script>

<template>
  <button class="menu-btn" @click="toggle" :aria-expanded="menuOpen" :class="{ open: menuOpen }" aria-label="Menu">
    <span class="bar top"></span>
    <span class="bar mid"></span>
    <span class="bar bot"></span>
  </button>

  <Transition name="roll">
    <nav class="nav-overlay" v-if="menuOpen" @click.self="close">
      <ul>
        <li><RouterLink to="/" @click="close">Accueil</RouterLink></li>
        <li><RouterLink to="/nos-couleurs" @click="close">Nos couleurs</RouterLink></li>
      </ul>
    </nav>
  </Transition>
</template>

<style scoped>
.menu-btn {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 42px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
}

.menu-btn:focus { outline: none; }

.bar {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--accent-text, #F4E4C6);
  border-radius: 2px;
  transition: transform 280ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity   180ms ease;
  transform-origin: center;
}

/* ── X state ── */
.menu-btn.open .bar.top { transform: translateY(7px) rotate(45deg); }
.menu-btn.open .bar.mid { opacity: 0; transform: scaleX(0); }
.menu-btn.open .bar.bot { transform: translateY(-7px) rotate(-45deg); }

/* ── Overlay ── */
.nav-overlay {
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  height: calc(100vh - 56px);
  background: rgba(0, 0, 0, 0.85);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.nav-overlay ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  text-align: center;
}

.nav-overlay ul li a {
  font-family: 'Monelos', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.6rem, 5vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.08em;
  transition: color 200ms ease;
}
.nav-overlay ul li a:hover { color: var(--accent-text, #bcddb1); }

/* ── Roll animation ── */
.roll-enter-active {
  animation: rollDown 350ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.roll-leave-active {
  animation: rollUp 280ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes rollDown {
  from { clip-path: inset(0 0 100% 0); }
  to   { clip-path: inset(0 0 0% 0); }
}

@keyframes rollUp {
  from { clip-path: inset(0 0 0% 0); }
  to   { clip-path: inset(0 0 100% 0); }
}
</style>
