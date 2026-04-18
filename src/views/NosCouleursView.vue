<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useSwipe } from '@vueuse/core'
import { useThemeStore, palettes, type Palette } from '../stores/themeStore'
import darkGreenImg from '../assets/colors-images/DARK-GREEN.png'
import lightGreenImg from '../assets/colors-images/LIGHT-GREEN.png'
import forestGreenImg from '../assets/colors-images/FOREST-GREEN.png'
import terracottaImg from '../assets/colors-images/TERRACOTTA.png'
import lightPink from '../assets/colors-images/LIGHT-PINK.png'
import coral from '../assets/colors-images/CORAL.png'

const paletteImages: Record<string, string> = {
  teal: darkGreenImg,
  sage: lightGreenImg,
  forest: forestGreenImg,
  terracotta: terracottaImg,
  lightPink: lightPink,
  coral: coral,
}

const store = useThemeStore()
const current = computed<Palette>(() => palettes[store.activeIndex] ?? palettes[0] as Palette)

// ── Swipe ──────────────────────────────────────────────────────────────────
const swipeTarget = ref<HTMLElement | null>(null)
const hintDone = ref(false)

useSwipe(swipeTarget, {
  onSwipeEnd(_, direction) {
    hintDone.value = true
    if (direction === 'left')  store.setIndex(store.activeIndex + 1)
    if (direction === 'right') store.setIndex(store.activeIndex - 1)
  },
})

// Keyboard navigation
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') store.setIndex(store.activeIndex + 1)
  if (e.key === 'ArrowLeft')  store.setIndex(store.activeIndex - 1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div
    class="page"
    ref="swipeTarget"
    :style="{ background: current.light }"
  >
    <!-- Left arrow -->
    <button
      class="nav-arrow left"
      :style="{ color: current.main, borderColor: current.main }"
      :disabled="store.activeIndex === 0"
      @click="store.setIndex(store.activeIndex - 1)"
      aria-label="Couleur précédente"
    >&#8249;</button>

    <!-- Slide area -->
    <div class="slide-viewport">
      <Transition name="slide" mode="out-in">
        <div class="slide" :key="current.id">
          <!-- Colored frame around placeholder image -->
          <div
            class="frame"
            :style="{ borderColor: current.main, background: current.frameBg ?? current.light }"
          >
            <img v-if="paletteImages[current.id]" class="frame-img" :src="paletteImages[current.id]" alt="" />
            <div v-else class="img-placeholder">
              <span>Image à venir</span>
            </div>
          </div>

          <!-- Label -->
          <p class="palette-label" :style="{ color: current.main }">
            {{ current.label }}
          </p>

          <!-- Color chip row -->
          <div class="chips">
            <span
              v-for="p in palettes"
              :key="p.id"
              class="chip"
              :style="{ background: p.main, outline: p.id === current.id ? `3px solid ${current.main}` : 'none' }"
              @click="store.setIndex(palettes.indexOf(p))"
            />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Right arrow -->
    <button
      class="nav-arrow right"
      :style="{ color: current.main, borderColor: current.main }"
      :disabled="store.activeIndex === palettes.length - 1"
      @click="store.setIndex(store.activeIndex + 1)"
      aria-label="Couleur suivante"
    >&#8250;</button>

    <!-- Swipe hint (disappears after first swipe or arrow click) -->
    <Transition name="fade">
      <div v-if="!hintDone" class="swipe-hint" :style="{ color: current.main }">
        <span class="hint-icon">&#8592;</span>
        <span>Glissez pour explorer</span>
        <span class="hint-icon">&#8594;</span>
      </div>
    </Transition>

    <!-- Dot indicators -->
    <div class="dots">
      <span
        v-for="(p, i) in palettes"
        :key="p.id"
        class="dot"
        :style="{ background: i === store.activeIndex ? current.main : current.main + '44' }"
        @click="store.setIndex(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 56px;
  padding-bottom: 80px;
  position: relative;
  transition: background 500ms ease;
  touch-action: pan-y;
  user-select: none;
  width: 100%;
}

/* ── Slide viewport ─────────────────────────────────────────────────────── */
.slide-viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

/* ── Color frame ─────────────────────────────────────────────────────────── */
.frame {
  width: clamp(220px, 50vmin, 340px);
  height: clamp(220px, 50vmin, 340px);
  border-radius: 50%;
  border: 10px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: border-color 500ms ease, background 500ms ease;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}

.img-placeholder {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: rgba(0,0,0,0.06);
  border: 2px dashed rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: rgba(0,0,0,0.35);
  font-family: system-ui, sans-serif;
  text-align: center;
  padding: 1rem;
}

.frame-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Label & chips ───────────────────────────────────────────────────────── */
.palette-label {
  margin: 0;
  font-family: 'Monelos', system-ui, sans-serif;
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  transition: color 400ms ease;
}

.chips {
  display: flex;
  gap: 10px;
}

.chip {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: outline 200ms ease, transform 150ms ease;
}
.chip:hover { transform: scale(1.2); }

/* ── Nav arrows ──────────────────────────────────────────────────────────── */
.nav-arrow {
  background: transparent;
  border: none;
  font-size: 3rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 1rem;
  opacity: 0.7;
  transition: opacity 200ms ease, color 400ms ease;
  flex-shrink: 0;
}
.nav-arrow:hover:not(:disabled) { opacity: 1; }
.nav-arrow:disabled { opacity: 0.15; cursor: default; }

/* ── Dot indicators ──────────────────────────────────────────────────────── */
.dots {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  padding: 4px;
  overflow: visible;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 400ms ease, transform 200ms ease;
}
.dot:hover { transform: scale(1.3); }

/* ── Swipe hint ──────────────────────────────────────────────────────────── */
.swipe-hint {
  position: fixed;
  bottom: 4.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-family: system-ui, sans-serif;
  white-space: nowrap;
  transition: color 400ms ease;
  pointer-events: none;
}

.hint-icon {
  animation: nudge 1.2s ease-in-out infinite alternate;
  display: inline-block;
}
.hint-icon:last-child { animation-direction: alternate-reverse; }

@keyframes nudge {
  from { transform: translateX(0); }
  to   { transform: translateX(5px); }
}

/* ── Slide transition ────────────────────────────────────────────────────── */
.slide-enter-active,
.slide-leave-active { transition: opacity 300ms ease, transform 300ms ease; }
.slide-enter-from   { opacity: 0; transform: translateY(16px); }
.slide-leave-to     { opacity: 0; transform: translateY(-16px); }

/* ── Fade transition (hint) ──────────────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 500ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Mobile ──────────────────────────────────────────────────────────────── */
@media (max-width: 520px) {
  .nav-arrow { padding: 0 0.4rem; font-size: 2.2rem; }
}
</style>
