<template>
  <v-col cols="12" md="6">
    <v-card rounded="xl" elevation="2" class="album-card h-100">
      <v-img
        :src="imageUrl"
        :alt="`Portada de ${titulo}`"
        aspect-ratio="1"
        cover
      >
        <template v-slot:placeholder>
          <v-skeleton-loader type="image" />
        </template>
      </v-img>

      <v-card-title style="font-family:'Playfair Display',serif; color:#c7406b;">
        {{ titulo }}
      </v-card-title>

      <v-card-subtitle>{{ autor }}</v-card-subtitle>

      <v-card-text style="color:#555;">
        {{ descripcion }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
defineProps<{
  imageUrl: string
  titulo: string
  descripcion: string
  autor: string
}>()
</script>

<style scoped>
.album-card {
  transition: transform .3s ease, box-shadow .3s ease;
}
.album-card:hover {
  transform: translateY(-6px);
}
</style>