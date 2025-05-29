<template>
  <div class="app-info">
    <p class="fs-3 text-uppercase">Barcha kinolar soni: {{ allMoviesCount }}</p>
    <p class="fs-4 text-uppercase">Ko'rilgan kinolar soni: {{ allFavouriteCount }}</p>
  </div>
</template>

<script setup>
defineProps({
  allMoviesCount: Number,
  allFavouriteCount: Number
})
</script>

<style>
.app-info {
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
  background-color: #fcfaf5;
}
</style>
