<template>
  <div class="home pa-4">
    <!-- Search Bar Component -->
    <search-bar />

    <!-- Error Alert Component -->
    <error-alert />

    <!-- Loading State Component -->
    <loading-state />

    <!-- Results Grid Component -->
    <results-grid />
  </div>
</template>

<script>
import SearchBar from "@/components/search/SearchBar.vue";
import ErrorAlert from "@/components/search/ErrorAlert.vue";
import LoadingState from "@/components/search/LoadingState.vue";
import ResultsGrid from "@/components/search/ResultsGrid.vue";

export default {
  name: "Home",

  components: {
    SearchBar,
    ErrorAlert,
    LoadingState,
    ResultsGrid,
  },
};
</script>

<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
