<template>
  <v-footer color="pink-darken-2" class="mt-6">
    <v-container>
      <v-row justify="center" align="center">

        <v-col cols="12" md="4" class="text-center">
          <p class="mb-0 font-weight-bold" style="color:#fff;">Oscar Leyva Herrera</p>
          <p class="mb-0" style="color:rgba(255,255,255,.7); font-size:.85rem;">Matrícula: 1191105</p>
        </v-col>

        <v-col cols="12" md="4" class="text-center">
          <p class="mb-0" style="color:rgba(255,255,255,.7); font-size:.85rem;">
            {{ fechaActual }}
          </p>
        </v-col>

        <v-col cols="12" md="4" class="text-center">
          <p class="mb-0" style="color:rgba(255,255,255,.7); font-size:.85rem;">
            &copy; 2026 Desarrollo de Aplicaciones Web
          </p>
        </v-col>

      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const fechaActual = new Date().toLocaleDateString('es-MX', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>