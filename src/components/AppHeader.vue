<template>
  <header class="hero">
    <v-img
      :src="heroUrl"
      height="340"
      cover
      :style="{ opacity: heroLoading ? 0.4 : 1, transition: 'opacity .6s ease' }"
      @load="heroLoading = false"
    >
      <!-- Overlay oscuro -->
      <div class="hero-overlay" />

      <!-- Contenido centrado sobre la imagen -->
      <v-container
        class="hero-content fill-height d-flex flex-column align-center justify-center text-center"
      >
        <h1 class="hero-title">Biblioteca Musical</h1>
        <p class="hero-subtitle">Explora nuestro contenido y descubre todo lo que tenemos para ti</p>
        <v-btn
          to="/perros"
          color="pink-darken-2"
          rounded="pill"
          size="large"
          elevation="4"
          class="mt-4"
        >
          Ver Galería de Perros
        </v-btn>
      </v-container>
    </v-img>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const heroUrl = ref('')
const heroLoading = ref(true)

async function fetchImage(w: number, h: number) {
  const res = await fetch(`https://picsum.photos/${w}/${h}`)
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
  return res.url
}

onMounted(async () => {
  try {
    heroUrl.value = await fetchImage(1400, 500)
  } catch (err) {
    console.warn('No se pudo cargar la imagen del hero:', err)
  } finally {
    heroLoading.value = false
  }
})
</script>

<style scoped>
.hero {
  position: relative;
}

/* Capa oscura semitransparente sobre la imagen */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,.45) 0%, rgba(45,106,79,.55) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: #fff;
  text-shadow: 0 3px 12px rgba(0,0,0,.45);
  letter-spacing: .03em;
}

.hero-subtitle {
  color: rgba(255,255,255,.85);
  font-weight: 300;
  font-size: 1.15rem;
}
</style>