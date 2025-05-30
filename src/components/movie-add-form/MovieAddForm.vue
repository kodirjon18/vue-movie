<template>
  <div class="movie-add-form">
    <h3>Yangi kino qoshish</h3>
    <form class="add-form d-flex" @submit.prevent>
      <input
        type="text"
        class="form-control new-movie-label"
        placeholder="Qanday kino?"
        :value="name"
        @input="name = $event.target.value"
      />
      <input
        type="number"
        class="form-control new-movie-label"
        placeholder="Nechi marotaba ko'rilgan?"
        :value="viewers"
        @input="viewers = +$event.target.value"
      />
      <button class="btn btn-outline-dark" type="submit" @click="addMovie">Qo'shish</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";

const name = ref("");
const viewers = ref('');

const emit = defineEmits()

const addMovie = () => {
  if(!name.value || !viewers.value) return
  
  const newMovie = {
    name: name.value,
    viewers: viewers.value,
    favourite: false,
    like: false,
    id: Number(new Date())
  }

  name.value = ''
  viewers.value = ''

  emit('createMovie', newMovie)
};




</script>
<style scoped>
.movie-add-form {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
