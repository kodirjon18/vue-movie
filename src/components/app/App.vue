<script setup>
import AppInfo from "@/components/app-info/AppInfo.vue";
import SearchPanel from "../search-panel/SearchPanel.vue";
import AppFilter from "../app-filter/AppFilter.vue";
import MovieList from "../movie-list/MovieList.vue";
import MovieAddForm from "../movie-add-form/MovieAddForm.vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import axios from "axios";
import Loader from "@/ui-components/Loader.vue";
import Pagination from "@/ui-components/Pagination.vue";

const fetchMovie = async () => {
  try {
    isLoader.value = true;
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
      params: {
        _limit: limit.value,
        _page: pages.value,
      },
    });
    const newArr = response.data.map((item) => ({
      id: item.id,
      name: item.title,
      like: false,
      favourite: false,
      viewers: item.id * 10,
    }));
    totalPages.value = Math.ceil(response.headers["x-total-count"] / limit.value);
    movies.value = newArr;
  } catch (error) {
    alert(error.message);
  } finally {
    isLoader.value = false;
  }
};

onMounted(() => {
  fetchMovie();
});

const movies = ref([]);
const terms = ref("");
const filters = ref("all");
const isLoader = ref(false);
const limit = ref(10);
const pages = ref(1);
const totalPages = ref(0);

const favouriteMovie = computed(() => {
  return movies.value.filter((item) => item.favourite).length;
});

const handleCreateMovie = async (movie) => {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", movie);
    movies.value.push(response.data);
  } catch (error) {
    alert(error.message)
  }
};

const onToggleHandler = ({ id, prop }) => {
  movies.value = movies.value.map((item) => {
    if (item.id === id) {
      return { ...item, [prop]: !item[prop] };
    }
    return item;
  });
};

const onRemoveHendler = async (id) => {
   try {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    movies.value = movies.value.filter((item) => item.id !== id);
  } catch (error) {
    alert(error.message)
  }
  
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
  filters.value = filter;
};

const changePageHandler = (page) => {
  pages.value = page;
};

watchEffect((pages) => {
  fetchMovie();
});
</script>

<template>
  <div class="app font-monospace">
    <div class="content">
      <AppInfo :allMoviesCount="movies.length" :allFavouriteCount="favouriteMovie" />
      <box class="search-panel">
        <SearchPanel :updateTermHandler="updateTermHandler" />
        <AppFilter :updateFilterHandler="updateFilterHandler" :filterName="filters" />
      </box>
      <box v-if="!movies.length && !isLoader">
        <p class="text-center fs-3 text-danger">Kinolar yo'q</p>
      </box>
      <box v-else-if="isLoader" class="d-flex justify-content-center">
        <Loader />
      </box>
      <MovieList
        v-else
        :movies="onFilterHandler(onSearchHendler(movies, terms), filters)"
        @onToggle="onToggleHandler"
        @onRemove="onRemoveHendler"
      />
      <div class="d-flex justify-content-center">
        <nav aria-label="pagination">
          <ul class="pagination pagination-sm">
            <li
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              :class="{ active: pageNumber === pages }"
              @click="changePageHandler(pageNumber)"
            >
              <span class="page-link">{{ pageNumber }}</span>
            </li>
          </ul>
        </nav>
      </div>
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
}
</style>
