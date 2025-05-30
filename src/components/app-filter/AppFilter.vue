<template>
  <div class="btn-group">
    <button
      v-for="btn in filterButtons"
      :key="btn.name"
      class="btn"
      type="button"
      @click="filterHandler(btn.name)"
      :class="[filterName === btn.name ? 'btn-dark' : 'btn-outline-dark']"
    >
      {{ btn.title }}
    </button>
  </div>
</template>
<script setup>
import { ref } from "vue";

const filters = ref("all");

const props = defineProps({
  updateFilterHandler: Function,
  filterName: String,
});

const filterButtons = [
  {
    title: "Barcha kinolar",
    name: "all",
  },
  {
    title: "Mashhur kinolar",
    name: "popular",
  },
  {
    title: "Eng kop korilgan kinolar",
    name: "mostViewer",
  },
];

const filterHandler = (filter) => {
  filters.value = filter;
  props.updateFilterHandler(filters.value);
};
</script>
<style></style>
