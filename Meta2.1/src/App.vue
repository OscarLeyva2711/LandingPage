<template>
  <AppHeader />

  <!-- SECCIÓN DE TARJETAS -->
  <section class="cards-section" aria-labelledby="cards-heading">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 id="cards-heading" class="h4 mb-0" style="font-family:'Playfair Display',serif; color:var(--rojo);">
          Nuestras Tarjetas
        </h2>
        <button class="btn-refresh" @click="refreshCards">↺ Nuevas imágenes</button>
      </div>

      <div class="row g-4">
        <TarjetaConImagen :albumObj="card1" :key="card1.artist + card1.album" />
        <TarjetaConImagen :albumObj="card2" :key="card2.artist + card2.album" />
      </div>
    </div>
  </section>

  <TablaDeDatos />
  <AppFooter />
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import TarjetaConImagen from './components/TarjetaConImagen.vue'
import TablaDeDatos from './components/TablaDeDatos.vue'

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
  { artist: 'Fiona Apple', album: 'Fetch the Bolt Cutters' },
  { artist: 'Sonic Youth', album: 'Daydream Nation' },
  { artist: 'The Velvet Underground', album: 'The Velvet Underground & Nico' },
]

function randomAlbum() {
  return AlbumPool[Math.floor(Math.random() * AlbumPool.length)]
}

const card1 = ref(randomAlbum())
const card2 = ref(randomAlbum())

function refreshCards() {
  card1.value = randomAlbum()
  card2.value = randomAlbum()
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@300;400;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css');

:root {
  --rojo: #c7406b;
  --magenta: #766775;
  --naranja: #f3e0d8;
  --crema: #f9f7f2;
  --texto: #1b1b1b;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Lato', sans-serif;
  background-color: var(--crema);
  color: var(--texto);
}

.cards-section {
  padding: 60px 0 40px;
}

.btn-refresh {
  background: transparent;
  border: 2px solid var(--rojo);
  color: var(--rojo);
  border-radius: 50px;
  padding: 7px 22px;
  font-size: .85rem;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  transition: all .25s;
  cursor: pointer;
}

.btn-refresh:hover {
  background: var(--rojo);
  color: #fff;
}
</style>