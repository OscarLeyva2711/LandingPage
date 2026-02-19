<template>
  <article class="col-12 col-md-6">
    <div class="card h-100">
      <img
        :src="imageUrl"
        :alt="`Portada del álbum ${album}`"
        :class="{ 'img-loading': loading }"
        @load="loading = false"
        @error="loading = false"
      />
      <div class="card-body">
        <h3 class="card-title">{{ artist }}</h3>
        <p class="card-text">{{ album }}</p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  albumObj: {
    type: Object,
    required: true
  }
})

const imageUrl = ref('')
const artist = ref('')
const album = ref('')
const loading = ref(true)

async function fetchAlbumData(albumObj, size = 600) {
  const term = encodeURIComponent(`${albumObj.artist} ${albumObj.album}`)
  const url = `https://itunes.apple.com/search?term=${term}&entity=album&limit=1`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

  const data = await res.json()
  if (data.resultCount === 0) throw new Error('No album found')

  const result = data.results[0]
  let img = result.artworkUrl100.replace('100x100', `${size}x${size}`)

  return {
    image: img,
    artist: result.artistName,
    album: result.collectionName
  }
}

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

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 36px rgba(0,0,0,.13);
}

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

.img-loading {
  opacity: 0.4;
}
</style>