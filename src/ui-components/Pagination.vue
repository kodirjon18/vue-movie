<template>
  <nav aria-label="pagination">
    <ul class="pagination pagination-sm">
      <li
        v-for="pageNumber in totalPages"
        :class="{ active: pageNumber === page }"
        @click="changePageHandler(pageNumber)"
      >
        <span class="page-link">{{ pageNumber }}</span>
      </li>
    </ul>
  </nav>
</template>
<script setup>
const props = defineProps({
  totalPages: Number,
  page: Number,
});

console.log(props.page);


const changePageHandler = (page) => {
  props.page = page;
};
</script>
<style></style>
