<template>
  <k-input class="search-input" placeholder="Kinolarni qidirish" v-model="term" @input="changeHendler"/>
</template>
<script setup>
import { ref } from "vue";

const term = ref('');

const props = defineProps({
  updateTermHandler: Function,
});

const changeHendler = e => {
  term.value = e.target.value
  props.updateTermHandler(term.value)
}
</script>
<style scoped>
.search-input {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
