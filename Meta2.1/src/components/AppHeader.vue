<template>
  <header class="hero">
    <img
      id="hero-bg"
      :src="heroUrl"
      alt="Imagen de fondo del encabezado"
      :class="{ 'img-loading': heroLoading }"
    />
    <div class="hero-content container">
      <h1>Biblioteca Musical</h1>
      <p class="lead">Explora nuestro contenido y descubre todo lo que tenemos para ti</p>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const heroUrl = ref('')
const heroLoading = ref(true)

async function fetchImage(w, h) {
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
  height: 340px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,.45) 0%, rgba(45,106,79,.55) 100%);
  z-index: 1;
}

.hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(.85);
  transition: opacity .6s ease;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: #fff;
  text-shadow: 0 3px 12px rgba(0,0,0,.45);
  letter-spacing: .03em;
}

.hero-content p.lead {
  color: rgba(255,255,255,.85);
  font-weight: 300;
  font-size: 1.15rem;
}

.img-loading {
  opacity: 0.4;
}
</style>