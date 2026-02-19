<template>
  <!-- Encabezado de la pagina con imagen de fondo dinámica -->
  <header class="hero">

    <!-- Imagen de fondo: su :src se asigna dinamicamente desde heroUrl (variable reactiva).
         La clase 'img-loading' se aplica mientras heroLoading sea true, reduciendo la opacidad -->
    <img
      id="hero-bg"
      :src="heroUrl"
      alt="Imagen de fondo del encabezado"
      :class="{ 'img-loading': heroLoading }"
    />

    <!-- Contenido del hero: título y subtitulo posicionados sobre la imagen -->
    <div class="hero-content container">
      <h1>Biblioteca Musical</h1>
      <p class="lead">Explora nuestro contenido y descubre todo lo que tenemos para ti</p>
    </div>

  </header>
</template>

<script setup>
// ref: crea variables reactivas — cuando su valor cambia, el template se re-renderiza
// onMounted: hook que se ejecuta una vez que el componente ya está visible en el DOM
import { ref, onMounted } from 'vue'

// URL de la imagen de fondo. Empieza vacia y se llena después del fetch
const heroUrl = ref('')

// Controla si la imagen sigue cargando (true = opacidad reducida, false = visible)
const heroLoading = ref(true)

// Hace un fetch a picsum.photos con las dimensiones dadas.
// Picsum redirige a la imagen real, por eso usamos res.url (la URL final tras la redireccion)
async function fetchImage(w, h) {
  const res = await fetch(`https://picsum.photos/${w}/${h}`)
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
  return res.url
}

// onMounted se ejecuta automaticamente cuando el componente aparece en la pagina.
// Es el lugar correcto para hacer fetches iniciales, ya que el DOM ya está listo
onMounted(async () => {
  try {
    // Pedimos una imagen de 1400×500 para el hero y la asignamos a heroUrl
    heroUrl.value = await fetchImage(1400, 500)
  } catch (err) {
    console.warn('No se pudo cargar la imagen del hero:', err)
  } finally {
    // finalmente se ejecuta siempre, haya error o no.
    // Quitamos el estado de carga para mostrar la imagen (o el espacio vacío si falló)
    heroLoading.value = false
  }
})
</script>

<style scoped>
/* scoped: estos estilos solo afectan elementos de ESTE componente,
   no se filtran al resto de la aplicación */

.hero {
  position: relative;
  height: 340px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Capa oscura semitransparente sobre la imagen para que el texto sea legible */
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

/* z-index: 2 coloca el texto por encima de la capa oscura (z-index: 1) */
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

/* Mientras la imagen no ha terminado de cargar, la mostramos translucida */
.img-loading {
  opacity: 0.4;
}
</style>