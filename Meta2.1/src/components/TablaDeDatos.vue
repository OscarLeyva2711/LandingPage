<template>
  <section class="table-section" aria-labelledby="table-heading">
    <div class="container">
      <h2 id="table-heading">Tabla de Datos</h2>

      <div class="table-wrapper">
        <table class="table table-borderless mb-0">
          <thead>
            <tr>
              <th scope="col">Columna 1</th>
              <th scope="col">Columna 2</th>
              <th scope="col">Columna 3</th>
            </tr>
          </thead>
          <tbody>
            <!-- v-for: itera sobre el array 'rows' y genera una fila <tr> por cada elemento.
                 :key es obligatorio en v-for — ayuda a Vue a identificar cada fila de forma única -->
            <tr v-for="(row, i) in rows" :key="i">
              <!-- Itera sobre cada celda dentro de la fila -->
              <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-center mt-5">
        <!-- @click: cuando el usuario hace click, llama a la funcion handleEnviar -->
        <button class="btn-enviar" type="button" @click="handleEnviar">Enviar</button>
      </div>
    </div>
  </section>
</template>

<script setup>
// Los datos de la tabla estan hardcodeados aqui como un array de arrays.
// Cada array interno representa una fila, y cada string dentro es una celda.
const rows = [
  ['Valor 1', 'Valor 2', 'Valor 3'],
  ['Valor 4', 'Valor 5', 'Valor 6'],
]

// Funcion que se ejecuta al presionar el botón Enviar
function handleEnviar() {
  alert('¡Formulario enviado correctamente!')
}
</script>

<style scoped>
.table-section {
  padding: 20px 0 60px;
}

.table-section h2 {
  font-family: 'Playfair Display', serif;
  color: var(--rojo);
  margin-bottom: 1.2rem;
  font-size: 1.6rem;
}

/* border-radius en el wrapper para esquinas redondeadas en la tabla completa */
.table-wrapper {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(0,0,0,.07);
}

.table {
  margin-bottom: 0;
}

.table thead {
  background-color: var(--rojo);
  color: #fff;
}

.table thead th {
  padding: 14px 20px;
  font-weight: 700;
  letter-spacing: .04em;
  border: none;
}

.table tbody tr {
  background-color: #fff;
  transition: background .2s;
}

/* Filas pares con fondo ligeramente diferente para mejorar la legibilidad */
.table tbody tr:nth-child(even) {
  background-color: #f4faf7;
}

.table tbody tr:hover {
  background-color: var(--naranja);
}

.table tbody td {
  padding: 13px 20px;
  border-color: #e8f5ee;
  color: #444;
}

.btn-enviar {
  background-color: var(--rojo);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 13px 48px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  transition: background .3s, transform .2s, box-shadow .3s;
  box-shadow: 0 4px 16px rgba(45,106,79,.35);
  cursor: pointer;
}

.btn-enviar:hover {
  background-color: var(--magenta);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(45,106,79,.4);
}

.btn-enviar:active {
  transform: translateY(0);
}
</style>