<template>
  <!-- Pie de pagina simple, solo muestra texto estático -->
  <footer>
    <p class="mb-0">&copy; 2026 Mi Sitio Web — Hecho con Bootstrap 5</p>
  </footer>
</template>

<!-- Este componente no necesita <script> porque no tiene logica ni datos dinamicos -->

<style scoped>
/* scoped: estilos exclusivos de este componente */
footer {
  background-color: var(--rojo);       /* Variable CSS definida en App.vue */
  color: rgba(255,255,255,.7);
  text-align: center;
  padding: 20px;
  font-size: .85rem;
}
</style>