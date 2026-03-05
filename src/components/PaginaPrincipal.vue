<template>
  <v-app>
    <AppHeader />

    <v-main>
      <v-container class="cards-section">

        <!-- Alerta de error -->
        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          closable
          class="mb-4"
          @click:close="error = ''"
        >
          {{ error }}
        </v-alert>

      

        <v-row align="center" class="mb-4">
          <v-col>
            <h2 class="text-h5 font-weight-bold" style="font-family:'Playfair Display',serif; color:#c7406b;">
              Nuestras Tarjetas
            </h2>
          </v-col>
        </v-row>

        <!-- Tarjetas -->
        <v-row>
          <TarjetaConImagen
            :imageUrl="card1.imageUrl"
            :titulo="card1.titulo"
            :descripcion="card1.descripcion"
            :autor="card1.autor"
          />
          <TarjetaConImagen
            :imageUrl="card2.imageUrl"
            :titulo="card2.titulo"
            :descripcion="card2.descripcion"
            :autor="card2.autor"
          />
        </v-row>

        <!-- Botón de actualización -->
        <v-row justify="center" class="my-6">
          <v-col cols="auto">
            <v-btn
              color="pink-darken-2"
              rounded="pill"
              size="large"
              :loading="loading"
              :disabled="loading"
              @click="refreshCards"
            >
              ↺ Nuevas imágenes
            </v-btn>
          </v-col>
        </v-row>

      </v-container>

      <TablaDeDatos />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import TarjetaConImagen from './TarjetaConImagen.vue'
import TablaDeDatos from './TablaDeDatos.vue'

interface CardData {
  imageUrl: string
  titulo: string
  descripcion: string
  autor: string
}

const loading = ref(false)
const error = ref('')

const card1 = ref<CardData>({ imageUrl: '', titulo: '', descripcion: '', autor: '' })
const card2 = ref<CardData>({ imageUrl: '', titulo: '', descripcion: '', autor: '' })

// Busca álbum en iTunes y devuelve los datos necesarios
async function fetchAlbum(artist: string, album: string): Promise<CardData> {
  const term = encodeURIComponent(`${artist} ${album}`)
  const res = await fetch(`https://itunes.apple.com/search?term=${term}&entity=album&limit=1`)
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

  const data = await res.json()
  if (data.resultCount === 0) throw new Error('No se encontró el álbum')

  const result = data.results[0]
  return {
    imageUrl: result.artworkUrl100.replace('100x100', '600x600'),
    titulo: result.collectionName,
    descripcion: `${result.primaryGenreName} · ${result.releaseDate?.slice(0, 4) ?? ''}`,
    autor: result.artistName
  }
}

const AlbumPool = [
  { artist: 'The Beatles', album: 'Abbey Road' },
  { artist: 'Thelonious Monk', album: 'Underground' },
  { artist: 'Fleetwood Mac', album: 'Rumours' },
  { artist: 'Radiohead', album: 'In Rainbows' },
  { artist: 'Nick Drake', album: 'Bryter Layter' },
  { artist: 'Talk Talk', album: 'Laughing Stock' },
  { artist: 'Sufjan Stevens', album: 'Seven Swans' },
  { artist: 'black midi', album: 'schlagenheim' },
  { artist: 'Belle and Sebastian', album: "If You're Feeling Sinister" },
  { artist: 'Kate Bush', album: 'Hounds of Love' },
  { artist: 'Arthur Russell', album: 'World of Echo' },
  { artist: 'Sonic Youth', album: 'Daydream Nation' },
  { artist: 'The Velvet Underground', album: 'The Velvet Underground & Nico' },
]

// Devuelve dos índices diferentes del pool
function getTwoRandomIndexes(): [number, number] {
  const i = Math.floor(Math.random() * AlbumPool.length)
  let j = Math.floor(Math.random() * AlbumPool.length)
  while (j === i) j = Math.floor(Math.random() * AlbumPool.length)
  return [i, j]
}

async function refreshCards() {
  loading.value = true
  error.value = ''
  try {
    const [i, j] = getTwoRandomIndexes()
    const [data1, data2] = await Promise.all([
      fetchAlbum(AlbumPool[i]!.artist, AlbumPool[i]!.album),
      fetchAlbum(AlbumPool[j]!.artist, AlbumPool[j]!.album)
    ])
    card1.value = data1
    card2.value = data2
  } catch (err) {
    error.value = 'No se pudieron cargar las imágenes. Verifica tu conexión e intenta de nuevo.'
    console.warn(err)
  } finally {
    loading.value = false
  }
}

// Carga inicial al montar el componente
onMounted(refreshCards)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@300;400;700&display=swap');

:root {
  --rojo: #c7406b;
  --magenta: #766775;
  --naranja: #f3e0d8;
  --crema: #f9f7f2;
  --texto: #1b1b1b;
}

body {
  font-family: 'Lato', sans-serif;
  background-color: var(--crema) !important;
  color: var(--texto);
}

.cards-section {
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>