<template>
  <box>
    <p class="fs-3 text-uppercase">Barcha kinolar soni: {{ allMoviesCount }}</p>
    <p class="fs-4 text-uppercase">Ko'rilgan kinolar soni: {{ allFavouriteCount }}</p>
  </box>
</template>

<script setup>

defineProps({
  allMoviesCount: Number,
  allFavouriteCount: Number
})
</script>

<style>

</style>
