<template>
  <box class="movie-list">
    <ul class="list-group">
      <MovieListItem
        v-for="movie in movies"
        v-bind="movie"
        :key="movie.id"
        @onToggle="$emit('onToggle', $event)"
        @onRemove="$emit('onRemove', $event)"
      />
    </ul>
  </box>
</template>
<script setup>
import MovieListItem from "../movie-list-item/MovieListItem.vue";
defineProps({
  movies: Array,
});
</script>
<style scoped>
.movie-list {
  margin-bottom: 2rem;
}
</style>
