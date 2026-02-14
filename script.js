// ============================================================
//  script.js — Lógica de la página
// ============================================================

// ----------------------------------------------------------
// Configuración de imágenes
// Define qué elementos recibirán imágenes y de qué tamaño.
// ----------------------------------------------------------
const IMAGE_TARGETS = [
    { id: 'hero-bg', w: 1400, h: 500 },
    { id: 'card-img-1', w: 500, h: 500 },
    { id: 'card-img-2', w: 500, h: 500 },
];

// ----------------------------------------------------------
// fetchImage(w, h)
// Realiza un fetch a picsum.photos y devuelve la URL final
// de la imagen (picsum redirige, por eso usamos res.url).
// ----------------------------------------------------------
async function fetchImage(w, h) {
    const res = await fetch(`https://picsum.photos/${w}/${h}`);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    return res.url; // URL real tras la redirección
}

const AlbumPool = [
    { artist: 'The Beatles', album: 'Abbey Road' },
    { artist: 'Geese', album: '3D Country' },
    { artist: 'Thelonious Monk', album: 'Underground' },
    { artist: 'Fleetwood Mac', album: 'Rumours' },
    { artist: 'Radiohead', album: 'In Rainbows' },
    { artist: 'Nick Drake', album: 'Bryter Layter' },
    { artist: 'Junior H', album: "$AD BOYZ 4 LIFE II" },
    { artist: 'Talk Talk', album: 'Laughing Stock' },
    { artist: 'Sufjan Stevens', album: 'Seven Swans' },
    { artist: 'Kendrick Lamar', album: 'To Pimp a Butterfly' },
    { artist: 'black midi', album: 'schlagenheim' },
    { artist: 'Belle and Sebastian', album: 'If You’re Feeling Sinister' },
    { artist: 'Kate Bush', album: 'Hounds of Love' },
    { artist: 'Dry Cleaning', album: 'Secret Love' },
    { artist: 'Arthur Russell', album: 'World of Echo' },
    { artist: 'The Strokes', album: 'Is This It' },
    { artist: 'Fiona Apple', album: 'Fetch the Bolt Cutters' },
    { artist: 'Sonic Youth', album: 'Daydream Nation' },
    { artist: 'Kanye West', album: 'My Beautiful Dark Twisted Fantasy' },
    { artist: 'The Velvet Underground', album: 'The Velvet Underground & Nico' },
]
// ----------------------------------------------------------
// fetchAlbumCover(size)
// Realiza un fetch a iTunes Search API para obtener la portada de un álbum
// aleatorio del pool. Devuelve la URL de la imagen con el tamaño especificado.
// ----------------------------------------------------------
async function fetchAlbumCover(size = 600) {
    const random = AlbumPool[Math.floor(Math.random() * AlbumPool.length)];

    const term = encodeURIComponent(`${random.artist} ${random.album}`);
    const url = `https://itunes.apple.com/search?term=${term}&entity=album&limit=1`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

    const data = await res.json();
    if (data.resultCount === 0) throw new Error(`No se encontro el álbum:`);

    let imageUrl = data.results[0].artworkUrl100; // URL de 100x100
    imageUrl = imageUrl.replace('100x100', `${size}x${size}`); // Reemplazar por el tamaño deseado

    return imageUrl;
}

// ----------------------------------------------------------
// fetchAlbumData(albumObj, size)
// Realiza un fetch a iTunes Search API para obtener la portada de un álbum
// dado un objeto con artista y álbum. Devuelve un objeto con la URL de la imagen
// y los nombres del artista y álbum. El tamaño de la imagen se puede especificar.
// ----------------------------------------------------------
async function fetchAlbumData(albumObj, size = 600) {
    const term = encodeURIComponent(`${albumObj.artist} ${albumObj.album}`);
    const url = `https://itunes.apple.com/search?term=${term}&entity=album&limit=1`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

    const data = await res.json();
    if (data.resultCount === 0) throw new Error("No album found");

    const result = data.results[0];

    let imageUrl = result.artworkUrl100;
    imageUrl = imageUrl.replace('100x100', `${size}x${size}`);

    return {
        image: imageUrl,
        artist: result.artistName,
        album: result.collectionName
    };
}
// ----------------------------------------------------------
// setImage(id, url)
// Asigna una URL a un elemento <img> y quita la clase
// de carga cuando la imagen termina de renderizarse.
// ----------------------------------------------------------
function setImage(id, url) {
    const el = document.getElementById(id);
    if (!el) return;

    el.onload = () => el.classList.remove('img-loading');
    el.onerror = () => el.classList.remove('img-loading');
    el.src = url;
}

// ----------------------------------------------------------
// refreshImages()
// Carga una imagen aleatoria para cada target en paralelo.
// ----------------------------------------------------------
async function refreshImages() {
  IMAGE_TARGETS.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('img-loading');
  });

  const promises = IMAGE_TARGETS.map(async ({ id, w, h }) => {
    try {

      if (id === 'hero-bg') {
        const url = await fetchImage(w, h);
        setImage(id, url);
        return;
      }

      // Para las tarjetas, obtenemos un álbum aleatorio del pool y su imagen
      const randomAlbum =
        AlbumPool[Math.floor(Math.random() * AlbumPool.length)];

      const albumData = await fetchAlbumData(randomAlbum, 600);

      setImage(id, albumData.image);

      // Actualizar título y texto debajo de la imagen
      const cardNumber = id.split('-').pop(); // gets 1 or 2

      const titleEl = document.getElementById(`card-title-${cardNumber}`);
      const textEl  = document.getElementById(`card-text-${cardNumber}`);

      if (titleEl) titleEl.textContent = albumData.artist;
      if (textEl)  textEl.textContent  = albumData.album;

    } catch (err) {
      console.warn(`No se pudo cargar la imagen para #${id}:`, err);
      const el = document.getElementById(id);
      if (el) el.classList.remove('img-loading');
    }
  });

  await Promise.all(promises);
}

// ----------------------------------------------------------
// handleEnviar()
// Acción del botón "Enviar" debajo de la tabla.
// ----------------------------------------------------------
function handleEnviar() {
    alert('¡Formulario enviado correctamente!');
}

// ----------------------------------------------------------
// init()
// Punto de entrada: asigna eventos y carga las imágenes
// iniciales cuando el DOM está listo.
// ----------------------------------------------------------
function init() {
    // Botón de refresco de imágenes
    const btnRefresh = document.getElementById('btn-refresh');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', refreshImages);
    }

    // Botón de enviar
    const btnEnviar = document.getElementById('btn-enviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', handleEnviar);
    }

    // Cargar imágenes al iniciar
    refreshImages();
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);