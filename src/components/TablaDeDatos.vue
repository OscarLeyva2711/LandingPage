<template>
  <v-container class="table-section">
    <h2 class="table-title mb-5">Tabla de Datos</h2>

    <v-table class="rounded-lg elevation-1">
      <thead>
        <tr>
          <th class="table-header">No. Dato</th>
          <th class="table-header">Algo</th>
          <th class="table-header">Otra Cosa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i" class="table-row">
          <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
        </tr>
      </tbody>
    </v-table>

    <div class="text-center mt-8">
      <v-btn
        color="pink-darken-2"
        rounded="pill"
        size="large"
        elevation="4"
        @click="handleEnviar"
      >
        Enviar
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const rows = [
  ['Dato 1',   'Hola',  'Quizas'],
  ['Dato 2',   'Adios',      'Tal vez'],
  ['Dato 3',   'Hola de Nuevo',    'Es posible'],
]

function handleEnviar() {
  alert('¡Formulario enviado correctamente!')
}
</script>

<style scoped>
.table-section {
  padding-bottom: 60px;
}

.table-title {
  font-family: 'Playfair Display', serif;
  color: var(--rojo);
  font-size: 1.6rem;
}

.table-header {
  background-color: #c7406b !important;
  color: #fff !important;
  font-weight: 700 !important;
  letter-spacing: .04em;
  padding: 14px 20px !important;
}

.table-row:nth-child(even) td {
  background-color: #f4faf7;
}

.table-row:hover td {
  background-color: var(--naranja) !important;
}

td {
  padding: 13px 20px !important;
  color: #444;
}
</style>