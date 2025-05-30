<script setup>
import AppInfo from "@/components/app-info/AppInfo.vue";
import SearchPanel from "../search-panel/SearchPanel.vue";
import AppFilter from "../app-filter/AppFilter.vue";
import MovieList from "../movie-list/MovieList.vue";
import MovieAddForm from "../movie-add-form/MovieAddForm.vue";
import { computed, ref } from "vue";

const movies = ref([
  {
    name: "Omar",
    viewers: 811,
    favourite: false,
    like: true,
    id: 1,
  },
  {
    name: "Emires of osman",
    viewers: 411,
    favourite: false,
    like: false,
    id: 2,
  },
  {
    name: "Ertugrul",
    viewers: 711,
    favourite: true,
    like: false,
    id: 3,
  },
]);

const terms = ref("");
const filters = ref("all");

const favouriteMovie = computed(() => {
  return movies.value.filter((item) => item.favourite).length;
});

const handleCreateMovie = (movie) => {
  movies.value.push(movie);
};

const onToggleHandler = ({ id, prop }) => {
  movies.value = movies.value.map((item) => {
    if (item.id === id) {
      return { ...item, [prop]: !item[prop] };
    }
    return item;
  });
};

const onRemoveHendler = (id) => {
  movies.value = movies.value.filter((item) => item.id !== id);
};

const onSearchHendler = (arr, term) => {
  if (term.length === 0) {
    return arr;
  }

  return arr.filter((item) => item.name.toLowerCase().indexOf(term) > -1);
};

const onFilterHandler = (arr, filter) => {
  switch (filter) {
    case "popular":
      return arr.filter((item) => item.like);
    case "mostViewer":
      return arr.filter((item) => item.viewers > 500);
    default:
      return arr;
  }
};

const updateTermHandler = (term) => {
  terms.value = term;
};

const updateFilterHandler = (filter) => {
  filters.value = filter
}
</script>

<template>
  <div class="app font-monospace">
    <div class="content">
      <AppInfo :allMoviesCount="movies.length" :allFavouriteCount="favouriteMovie" />
      <div class="search-panel">
        <SearchPanel :updateTermHandler="updateTermHandler" />
        <AppFilter :updateFilterHandler="updateFilterHandler" :filterName="filters"/>
      </div>
      <MovieList
        :movies="onFilterHandler(onSearchHendler(movies, terms), filters)"
        @onToggle="onToggleHandler"
        @onRemove="onRemoveHendler"
      />
      <MovieAddForm @createMovie="handleCreateMovie" />
    </div>
  </div>
</template>

<style>
.app {
  height: 100vh;
  color: #000;
}

.content {
  width: 1000px;
  min-height: 700px;
  background-color: #fff;
  margin: 0 auto;
  padding: 5rem 0;
}

.search-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
