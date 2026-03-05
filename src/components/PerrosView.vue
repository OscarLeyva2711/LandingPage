<template>
    <div class="perros-container">
        <h1>Galería de Perros</h1>
        <img :src="imgUrl" alt="Perro aleatorio"></img>
        <div class="button-group">
            <button @click="cambiarPerro">Cambiar Imagen</button>
            <button @click="regresarPrincipal" class="btn-regreso">← Regresar</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const imgUrl = ref("");

const cambiarPerro = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        imgUrl.value = data.message;
    } catch (error) {
        console.error('Error al obtener la imagen del perro:', error);
    }
}

const regresarPrincipal = () => {
    router.push('/')
}

onMounted(() => {
    cambiarPerro();
});

</script>

<style scoped>
.perros-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 1rem;
}

img {
    max-width: 500px;
    max-height: 500px;
    border-radius: 8px;
}

.button-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}

button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #359268;
}

.btn-regreso {
    background-color: #c7406b;
}

.btn-regreso:hover {
    background-color: #a83052;
}
</style>
