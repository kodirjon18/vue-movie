<template>
  <box class="movie-add-form">
    <h3>Yangi kino qoshish</h3>
    <form class="add-form d-flex" @submit.prevent>
      <k-input class="new-movie-label" placeholder="Qanday kino?" v-model="name" />
      <k-input
        type="number"
        class="new-movie-label"
        placeholder="Nechi marotaba ko'rilgan?"
        v-model="viewers"
      />
      <primary-button class="btn-outline-dark" type="submit" @click="addMovie"
        >Qo'shish</primary-button
      >
    </form>
  </box>
</template>
<script setup>
import { ref } from "vue";

const name = ref("");
const viewers = ref("");

const emit = defineEmits();

const addMovie = () => {
  if (!name.value || !viewers.value) return;

  const newMovie = {
    name: name.value,
    viewers: Number(viewers.value),
    favourite: false,
    like: false,
    id: Number(new Date()),
  };

  name.value = "";
  viewers.value = "";

  emit("createMovie", newMovie);
};
</script>
<style scoped>
.movie-add-form {
  margin-bottom: 2rem;
}
</style>
