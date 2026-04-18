import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Palette {
  id: string
  label: string
  main: string        // primary color
  accent: string      // text/icon color readable on main
  light: string       // very light tint — used as page background
  frameBg?: string    // frame inner background (defaults to light) — match image bg
}

export const palettes: Palette[] = [
  { id: 'teal',    label: 'Vert foncé',   main: '#283D38', accent: '#BCDDB1', light: '#e9ebeb', frameBg: '#ffffff' },
  { id: 'forest',  label: 'Forêt',        main: '#395A45', accent: '#BCDDB1', light: '#eaf0ec' },
  { id: 'sage',    label: 'Sauge',        main: '#BCDDB1', accent: '#283D38', light: '#eff8ec' },
  { id: 'terracotta', label: 'Terracotta',     main: '#B94A3F', accent: '#FE9172', light: '#f0e8e7' },
  { id: 'lightPink',   label: 'Rose clair',       main: '#FF7369', accent: '#ffffff', light: '#fff2f0' },
  { id: 'coral',  label: 'Corail',       main: '#FE9172', accent: '#B94A3F', light: '#fff4f0' },
]

export const useThemeStore = defineStore('theme', () => {
  const activeIndex = ref(0)

  function applyPalette(p: Palette) {
    const root = document.documentElement.style
    root.setProperty('--accent-fill', p.main)
    root.setProperty('--accent-fill-hover', p.main + 'cc')
    root.setProperty('--accent-text', p.accent)
    root.setProperty('--topbar-text', p.accent)
    root.setProperty('--location-fill', p.main)
    root.setProperty('--location-text', p.accent)
    root.setProperty('--countdown-fill', p.accent)
  }

  watch(activeIndex, (i) => {
    const palette = palettes[i]
    if (palette) applyPalette(palette)
  }, { immediate: true })

  function setIndex(i: number) {
    activeIndex.value = Math.max(0, Math.min(i, palettes.length - 1))
  }

  return { activeIndex, setIndex, palettes }
})
