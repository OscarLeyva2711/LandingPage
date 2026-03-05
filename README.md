# 🎵 Biblioteca Musical

Aplicación web de portafolio desarrollada con Vue 3 y Vuetify 3. Muestra tarjetas de álbumes musicales obtenidas dinámicamente desde la API de iTunes, permitiendo al usuario actualizar las imágenes y descubrir nuevos álbumes con un solo clic.

---

## 📸 Captura de pantalla

<!-- Reemplaza esta línea con tu captura de pantalla -->
![Captura de la aplicación](./screenshot.png)

---

## 🚀 Instalación y ejecución

### Requisitos previos
- Node.js 18 o superior
- npm 9 o superior

### Pasos

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

### Compilar para producción
```bash
npm run build
```

---

## 🛠 Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Vue 3 | ^3.4 | Framework principal |
| Vuetify 3 | ^3.6 | Componentes de UI (Material Design) |
| Vite | ^5.0 | Bundler y servidor de desarrollo |
| TypeScript | ^5.0 | Tipado estático |
| iTunes Search API | — | Fuente de imágenes y metadatos de álbumes |
| Fetch API | nativa | Peticiones HTTP |

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── TarjetaConImagen.vue   # Tarjeta reutilizable con imagen, título, autor y descripción
│   ├── AppHeader.vue          # Barra superior con logo y título (v-app-bar)
│   ├── AppFooter.vue          # Pie de página con datos personales y fecha dinámica
│   ├── TablaDeDatos.vue       # Tabla con perfil técnico del estudiante
│   └── PaginaPrincipal.vue    # Componente principal — integra todo y maneja la lógica
├── pages/
│   └── index.vue              # Page que renderiza PaginaPrincipal
├── router/
│   └── index.ts               # Configuración de rutas
├── plugins/
│   └── vuetify.ts             # Configuración de Vuetify
├── App.vue                    # Punto de entrada de la aplicación
└── main.ts                    # Inicialización de Vue
```

---

## 🌐 Integración con la API de iTunes

La aplicación consume la **iTunes Search API** para obtener portadas de álbumes y metadatos de artistas.

### Endpoint utilizado

```
GET https://itunes.apple.com/search?term={artista}+{album}&entity=album&limit=1
```

### Estructura de la respuesta

```json
{
  "resultCount": 1,
  "results": [
    {
      "artistName": "The Beatles",
      "collectionName": "Abbey Road",
      "artworkUrl100": "https://is1-ssl.mzstatic.com/.../100x100bb.jpg",
      "primaryGenreName": "Rock",
      "releaseDate": "1969-09-26T07:00:00Z"
    }
  ]
}
```

### Flujo de la aplicación

1. Al montar `PaginaPrincipal`, se llama automáticamente a `refreshCards()`
2. Se seleccionan **dos índices diferentes** del pool de álbumes para garantizar que las tarjetas nunca muestren el mismo contenido
3. Se realizan **dos peticiones en paralelo** con `Promise.all()` para optimizar el tiempo de carga
4. La URL de la imagen se construye reemplazando `100x100` por `600x600` en la URL de iTunes para obtener mayor resolución
5. Los datos resueltos (imagen, título, autor, descripción) se pasan como **props** a cada `TarjetaConImagen`
6. Si ocurre un error de red, se muestra un mensaje con `v-alert` y el botón se reactiva

### Manejo de errores

- Errores HTTP: capturados con `if (!res.ok)`
- Álbum no encontrado: verificación de `resultCount === 0`
- Errores de red: bloque `try/catch` con mensaje amigable en `v-alert`
- Estado de carga: el botón se deshabilita con `:disabled="loading"` durante el fetch

---

## 👤 Autor

**Oscar Leyva Herrera**  
Matrícula: 123456  
Ingeniería en Computación — Desarrollo de Aplicaciones Web