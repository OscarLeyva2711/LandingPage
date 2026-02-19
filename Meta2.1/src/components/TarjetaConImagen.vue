<template>
  <!-- Columna de Bootstrap que contiene la tarjeta -->
  <article class="col-12 col-md-6">
    <div class="card h-100">

      <!-- Portada del album.
           @load: cuando la imagen termina de cargar, quitamos el estado de carga
           @error: si la imagen falla, llamamos a onImageError para cargar un fallback -->
      <img
        :src="imageUrl"
        :alt="`Portada del álbum ${album}`"
        :class="{ 'img-loading': loading }"
        @load="loading = false"
        @error="onImageError"
      />

      <div class="card-body">
        <!-- Estos valores se llenan dinamicamente con los datos que devuelve iTunes -->
        <h3 class="card-title">{{ artist }}</h3>
        <p class="card-text">{{ album }}</p>
      </div>

    </div>
  </article>
</template>

<script setup>
// ref: variables reactivas
// watch: observa cambios en una variable y ejecuta una función cuando cambia
import { ref, watch } from 'vue'

// defineProps: declara las props que este componente puede recibir desde su padre (App.vue).
// albumObj es un objeto con { artist, album } que App.vue le pasa a cada tarjeta
const props = defineProps({
  albumObj: {
    type: Object,
    required: true  // Es obligatorio — la tarjeta no funciona sin un album
  }
})

// Variables reactivas que se muestran en el template
const imageUrl = ref('')   // URL de la portada del álbum
const artist = ref('')     // Nombre del artista
const album = ref('')      // Nombre del álbum
const loading = ref(true)  // Estado de carga para mostrar/ocultar la opacidad

// Busca el álbum en la API de iTunes y devuelve imagen, artista y álbum
async function fetchAlbumData(albumObj, size = 600) {
  // Combinamos artista y álbum en un término de búsqueda para iTunes
  const term = encodeURIComponent(`${albumObj.artist} ${albumObj.album}`)
  const url = `https://itunes.apple.com/search?term=${term}&entity=album&limit=1`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

  const data = await res.json()
  if (data.resultCount === 0) throw new Error('No album found')

  const result = data.results[0]

  // iTunes devuelve imágenes de 100x100 por defecto.
  // Reemplazamos '100x100' por el tamaño que queremos (600x600)
  let img = result.artworkUrl100.replace('100x100', `${size}x${size}`)

  return {
    image: img,
    artist: result.artistName,
    album: result.collectionName
  }
}

// Si la imagen de iTunes falla, cargamos una imagen aleatoria de picsum como respaldo
async function onImageError() {
  const res = await fetch('https://picsum.photos/600/600')
  imageUrl.value = res.url
  loading.value = false
}

// Carga los datos del album y actualiza las variables reactivas
async function loadAlbum() {
  loading.value = true
  try {
    const data = await fetchAlbumData(props.albumObj, 600)
    imageUrl.value = data.image
    artist.value = data.artist
    album.value = data.album
  } catch (err) {
    console.warn('No se pudo cargar el álbum:', err)
    loading.value = false
  }
}

// watch: observa la prop albumObj. Cada vez que App.vue le pase un álbum diferente
// (cuando el usuario presiona "Nuevas imágenes"), este watch lo detecta y llama a loadAlbum.
// { immediate: true } hace que también se ejecute la primera vez que el componente se monta
watch(() => props.albumObj, loadAlbum, { immediate: true })
</script>

<style scoped>
.card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0,0,0,.08);
  overflow: hidden;
  transition: transform .3s ease, box-shadow .3s ease;
  background: #fff;
}

/* Efecto hover: la tarjeta sube ligeramente y la sombra se intensifica */
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 36px rgba(0,0,0,.13);
}

/* aspect-ratio 1/1 mantiene la imagen siempre cuadrada sin importar el tamaño */
.card img {
  aspect-ratio: 1 / 1;
  width: 100%;
  object-fit: cover;
}

.card-body {
  padding: 1.4rem 1.6rem 1.6rem;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  color: var(--rojo);
}

.card-text {
  color: #555;
  font-size: .95rem;
  line-height: 1.65;
}

/* Imagen semitransparente mientras esta cargando */
.img-loading {
  opacity: 0.4;
}
</style>